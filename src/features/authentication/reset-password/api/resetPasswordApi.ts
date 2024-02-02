import {baseApi} from "@/shared/api";
import {
  IConfirmResetPasswordParams,
  IConfirmResetPasswordResponse,
  IResetPasswordParams,
  IResetPasswordResponse
} from "@/features/authentication/reset-password/model/types";
import {
  mapEmail,
  mapPassword,
} from "@/features/authentication/reset-password/lib/mapResponse";

export const passwordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation<IResetPasswordResponse, IResetPasswordParams>({
      query: (body) => ({
        url: `/password/reset/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: IResetPasswordResponse) => mapEmail(response),
    }),
    confirmResetPassword: build.mutation<IConfirmResetPasswordResponse, IConfirmResetPasswordParams>({
      query: ({password, token}) => ({
        url: `/password/reset/confirm/`,
        method: 'POST',
        body: { password: password },
        params: { token }
      }),
      transformResponse: (response: IConfirmResetPasswordResponse) => mapPassword(response),
    }),
  }),
})

export const {useResetPasswordMutation, useConfirmResetPasswordMutation} = passwordApi
