import axios, { type AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { deleteTokenFromCookie, getAccessTokenFromCookie, setTokenInCookie } from '../utils/app.utils'
import { SSOCOOKIES } from '../constants/cookies.const'
import { API_AUTH_ROUTERS } from './auth/router'
import type { IRefreshTokenData, IResponseRefreshToken } from './auth/refresh-token/refresh-token.type'

type RetryableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
}

const baseURL = import.meta.env.VITE_BASE_URL_API || ''

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  paramsSerializer: (params) => {
    return qs.stringify(params)
  },
})

const refreshAxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
})

axiosInstance.defaults.headers['Accept'] = 'application/json'
refreshAxiosInstance.defaults.headers['Accept'] = 'application/json'

let refreshTokenPromise: Promise<IRefreshTokenData> | null = null

const parseRefreshTokenResponse = (raw: IResponseRefreshToken): IRefreshTokenData => {
  return {
    accessToken: raw.data?.accessToken ?? raw.accessToken ?? raw.token ?? '',
    refreshToken: raw.data?.refreshToken ?? raw.refreshToken ?? '',
  }
}

const refreshAccessToken = (refreshToken: string) => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = refreshAxiosInstance
      .post<IResponseRefreshToken>(API_AUTH_ROUTERS.POST.REFRESH_TOKEN, { refreshToken })
      .then((response) => {
        const parsed = parseRefreshTokenResponse(response.data)

        if (!parsed.accessToken) {
          throw new Error('No access token returned from refresh token')
        }

        return parsed
      })
      .finally(() => {
        refreshTokenPromise = null
      })
  }

  return refreshTokenPromise
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookie(SSOCOOKIES.ACCESS_TOKEN)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined
    const authRoutes = Object.values(API_AUTH_ROUTERS.POST)
    const isAuthRequest = authRoutes.some((route) => originalRequest?.url?.includes(route))

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true

      const refreshToken = getAccessTokenFromCookie(SSOCOOKIES.REFRESH_TOKEN)

      try {
        if (!refreshToken) throw new Error('No refresh token available')

        const res = await refreshAccessToken(refreshToken)

        if (res.accessToken) {
          setTokenInCookie(SSOCOOKIES.ACCESS_TOKEN, res.accessToken)
          originalRequest.headers = originalRequest.headers ?? {}
          originalRequest.headers.Authorization = `Bearer ${res.accessToken}`
        }

        if (res.refreshToken) {
          setTokenInCookie(SSOCOOKIES.REFRESH_TOKEN, res.refreshToken)
        }

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        deleteTokenFromCookie(SSOCOOKIES.ACCESS_TOKEN)
        deleteTokenFromCookie(SSOCOOKIES.REFRESH_TOKEN)
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
