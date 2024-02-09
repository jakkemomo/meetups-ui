interface IPasswordResponse {
  password: string[]
}

interface IEmailResponse {
  email: string[]
}

export interface SuccessType {
  detail: string;
}

export interface ErrorType {
  data: IPasswordResponse | IEmailResponse,
  status: number
}
export type TResetPasswordResponse = SuccessType | ErrorType;

export interface IResetPasswordParams {
  email: string;
}

export interface IConfirmResetPasswordParams {
  password: string;
  token: string;
}

/*
export interface IResetPasswordResponse {
  email: string;
}

export interface IConfirmResetPasswordResponse {
  password: string;
}*/
