import { RxAxiosCaller } from "../../api.svc";
import { API_AUTH_ROUTERS } from "../router";
import type { IRefreshTokenData, IRequestRefreshToken, IResponseRefreshToken } from "./refresh-token.type";

class RefreshTokenSvcCaller extends RxAxiosCaller<
  IRefreshTokenData,
  IRequestRefreshToken,
  IResponseRefreshToken
> {
  constructor() {
    super(API_AUTH_ROUTERS.POST.REFRESH_TOKEN, "POST", (raw) => ({
      accessToken: raw.data?.accessToken ?? raw.accessToken ?? raw.token ?? "",
      refreshToken: raw.data?.refreshToken ?? raw.refreshToken ?? "",
    }))
  }
}

export const refreshTokenSvcCaller = new RefreshTokenSvcCaller();
