import {createSlice} from '@reduxjs/toolkit'
import {jwtApi} from "@/shared/api";
import {sessionApi} from "@/entities/session";


export const SessionSlice = createSlice({
    name: 'base',
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            sessionApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem('access-token', payload.access)
                localStorage.setItem('refresh-token', payload.refresh)
            }
        )
        builder.addMatcher(
            sessionApi.endpoints.logout.matchPending,
            (state) => {
                localStorage.removeItem('access-token')
                localStorage.removeItem('refresh-token')
            }
        )
        builder.addMatcher(
            jwtApi.endpoints.refreshAccessToken.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem('access-token', payload.access)
            }
        )
    },
})
