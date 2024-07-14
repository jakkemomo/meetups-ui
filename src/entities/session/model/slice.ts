import {createSlice} from '@reduxjs/toolkit'
import {jwtApi} from "@/shared/api";
import {sessionApi} from "@/entities/session";
import { profileApi } from '@/entities/profile';

const initialState = {
  isAuthorized: false
}

const SessionSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            sessionApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem('access-token', payload.access)
                localStorage.setItem('refresh-token', payload.refresh)
            }
        )
        builder.addMatcher(
            sessionApi.endpoints.logout.matchFulfilled,
            () => {
                localStorage.removeItem('access-token')
                localStorage.removeItem('refresh-token')
            }
        )
        builder.addMatcher(
            jwtApi.endpoints.refreshAccessToken.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem('access-token', payload.access)
            }
        ),
        builder.addMatcher(
          sessionApi.endpoints.confirmEmail.matchFulfilled,
          (state, { payload }) => {
            localStorage.setItem('access-token', payload.access)
          }
        ),
        builder.addMatcher(
          profileApi.endpoints.myDetails.matchRejected,
          () => ({
            isAuthorized: false
          })
        ),
        builder.addMatcher(
          profileApi.endpoints.myDetails.matchFulfilled,
          () => ({
            isAuthorized: true
          })
        )
    },
})

export default SessionSlice;
