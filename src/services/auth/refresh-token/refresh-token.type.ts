export interface IRequestRefreshToken {
  refreshToken: string;
}

export interface IRefreshTokenData {
  accessToken: string;
  refreshToken: string;
}

export interface IResponseRefreshToken {
  data?: IRefreshTokenData;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}
