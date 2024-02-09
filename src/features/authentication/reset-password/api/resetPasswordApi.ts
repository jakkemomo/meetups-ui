import {baseApi} from "@/shared/api";
import {
  IConfirmResetPasswordParams,
  IResetPasswordParams,
  TResetPasswordResponse
} from "@/features/authentication/reset-password/model/types";

export const passwordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    resetPassword: build.mutation<TResetPasswordResponse, IResetPasswordParams>({
      query: (body) => ({
        url: `/password/reset/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: TResetPasswordResponse) => response,
    }),
    confirmResetPassword: build.mutation<TResetPasswordResponse, IConfirmResetPasswordParams>({
      query: ({password, token}) => ({
        url: `/password/reset/confirm/`,
        method: 'POST',
        body: { password: password },
        params: { token }
      }),
      transformResponse: (response: TResetPasswordResponse) => response,
    }),
  }),
})

export const {useResetPasswordMutation, useConfirmResetPasswordMutation} = passwordApi
