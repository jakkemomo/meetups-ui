import {IConfirmResetPasswordResponse, IResetPasswordResponse} from "../model/types";

export function mapEmail(dto: IResetPasswordResponse): IResetPasswordResponse {
  return {
    email: dto.email,
  }
}

export function mapPassword(dto: IConfirmResetPasswordResponse): IConfirmResetPasswordResponse {
  return {
    password: dto.password,
  }
}
