import {createAsyncThunk} from '@reduxjs/toolkit'
import {authApi} from '@/entities/auth'
import {isFetchBaseQueryError, SESSION_TAG} from '@/shared/api'
import {wait} from '@/shared/lib'
import {clearSessionData} from '@/shared/model';
import {RefreshToken} from "@/shared/model/types.ts";

export const logoutThunk = createAsyncThunk<void, RefreshToken, { state: RootState }>(
    'authentication/logout',
    async (body: RefreshToken, {dispatch}) => {
        try {
            await dispatch(authApi.endpoints.logout.initiate(body)).unwrap()
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (typeof error.data === "object") {
                    throw new Error(JSON.stringify(error.data))
                }
            }
            throw new Error('Unknown error')
        } finally {
            dispatch(clearSessionData())
            // Wait 10ms to invalidateTags in next event loop tick.
            // Otherwise, after invalidate related requests with SESSION_TAG
            // will be started, but isAuthorized will still be equal to true
            await wait(10)

            // 👇 ATTENTION: This line clear all baseApi state instead of sessionApi
            // dispatch(sessionApi.util.resetApiState())

            dispatch(authApi.util.invalidateTags([SESSION_TAG]))
        }
    }
)

