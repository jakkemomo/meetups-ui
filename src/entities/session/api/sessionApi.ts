import {baseApi, SESSION_TAG} from '@/shared/api'
import {mapSession} from '@/shared/lib/mapSession'
import {RefreshToken, Session, SessionDto} from "@/shared/model/types";
import {RequestEmailCheckBody, RequestLoginBody, RequestRegistrationBody} from '../model/types';


export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<Session, RequestLoginBody>({
            query: (body) => ({
                url: `/login/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
            transformResponse: (response: SessionDto) => mapSession(response),
        }),
        logout: build.mutation<{}, RefreshToken>({
            query: (body) => ({
                url: `/logout/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
        }),
        register: build.mutation<null, RequestRegistrationBody>({
            query: (body) => ({
              url: `/signup/`,
              method: 'POST',
              body,
            }),
            invalidatesTags: [SESSION_TAG]
        }),
        checkEmail: build.mutation<null, RequestEmailCheckBody>({
            query: (body) => ({
              url: `/email-exists/`,
              method: 'POST',
              body,
            })
        })
    }),
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useCheckEmailMutation} = sessionApi
