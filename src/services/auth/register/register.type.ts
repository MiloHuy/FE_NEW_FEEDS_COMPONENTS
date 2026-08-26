export interface IRequestRegister {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IResponseRegister {
  data: {
    refreshToken: string;
    accessToken: string;
  }
}
