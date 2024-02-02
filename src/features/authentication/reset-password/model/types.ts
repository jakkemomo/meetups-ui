export interface IResetPasswordResponse {
  email: string;
}

export interface IResetPasswordParams {
  email: string;
}


export interface IConfirmResetPasswordResponse {
  password: string;
}

export interface IConfirmResetPasswordParams {
  password: string;
  token: string;
}
