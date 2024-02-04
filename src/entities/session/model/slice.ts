import {createSlice} from '@reduxjs/toolkit'
import {jwtApi} from "@/shared/api";
import {sessionApi} from "@/entities/session";

type SessionSliceState =
    | {
    access: string,
    refresh: string,
    isAuthorized: boolean
}
    | {
    isAuthorized: boolean
    access?: string
    refresh?: string,
}

const initialState: SessionSliceState = {
    isAuthorized: false,
    access: undefined,
    refresh: undefined,
}

export const SessionSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            sessionApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.access = payload.access;
                state.refresh = payload.refresh;
                state.isAuthorized = true;
            }
        )
        builder.addMatcher(
            sessionApi.endpoints.logout.matchFulfilled,
            (state) => {
                state.access = undefined;
                state.refresh = undefined;
                state.isAuthorized = false;
            }
        )
        builder.addMatcher(
            jwtApi.endpoints.refreshAccessToken.matchFulfilled,
            (state, { payload }) => {
                state.access = payload.access;
                state.isAuthorized = true;
            }
        )
    },
})

export const selectIsAuthorized = (state: RootState) =>
    state.session.isAuthorized
export const selectAccessToken = (state: RootState) =>
    state.session.access
export const selectRefreshToken = (state: RootState) =>
    state.session.refresh