import { baseApi } from "@/shared/api";
import { IChangePasswordRequest } from "../model/types";

const securityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<void, IChangePasswordRequest>({
      query: ({ password, old_password }) => ({
        url: '/password/change/',
        method: 'POST',
        body: {
          password,
          old_password
        }
      })
    }),
    changeEmail: build.mutation<void, string>({
      query: (email) => ({
        url: '/change/email/',
        method: 'POST',
        body: {
          email
        }
      })
    })
  })
})

export const {
  useChangePasswordMutation,
  useChangeEmailMutation
} = securityApi;
