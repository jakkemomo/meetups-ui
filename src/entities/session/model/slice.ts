import { createSlice } from '@reduxjs/toolkit'
import { sessionApi } from '../api/sessionApi'

type SessionSliceState =
  | {
      access: string,
      refresh: string,
      isAuthorized: true
    }
  | {
      isAuthorized: false
      access?: string
      refresh?: string,
    }

const initialState: SessionSliceState = {
  isAuthorized: false,
  access: undefined,
  refresh: undefined,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    clearSessionData: (state) => {
      state.access = undefined;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      sessionApi.endpoints.login.matchFulfilled,
      (state: SessionSliceState, { payload }) => {
        state.isAuthorized = true;

        // say TypeScript that isAuthorized = true
        if (state.isAuthorized) {
          state.access = payload.access;
          state.access = payload.refresh;
        }
      }
    )
  },
})

export const selectIsAuthorized = (state: RootState) =>
  state.session.isAuthorized

export const { clearSessionData } = sessionSlice.actions
