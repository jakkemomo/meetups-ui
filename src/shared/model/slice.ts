import {createSlice} from '@reduxjs/toolkit'

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
    reducers: {
        clearSessionData: (state) => {
            state.access = undefined;
            state.isAuthorized = false;
        },
        setAccessToken: (state, action) => {
            state.access = action.payload.access;
            state.isAuthorized = true;
        },
        setSessionData: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthorized = true;
        }
    },
})

export const selectIsAuthorized = (state: RootState) =>
    state.session.isAuthorized
export const selectAccessToken = (state: RootState) =>
    state.session.access
export const selectRefreshToken = (state: RootState) =>
    state.session.refresh

export const {setSessionData, clearSessionData, setAccessToken} = SessionSlice.actions
export const sessionReducer = SessionSlice.reducer
