import {createAsyncThunk} from '@reduxjs/toolkit'
import {isFetchBaseQueryError} from '@/shared/api'
import {setSessionData} from "@/shared/model";
import {Session} from "@/shared/model/types.ts";
import {authApi} from "@/entities/auth";

interface LoginParams {
  email: Email;
  password: string;
}

export const loginThunk = createAsyncThunk<Session, LoginParams, { state: RootState }>(
    'authentication/login',
    async (body: LoginParams, {dispatch}) => {
        try {
            let session: Session = await dispatch(authApi.endpoints.login.initiate(body)).unwrap()
            dispatch(setSessionData(session))
            return session
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (typeof error.data === "object") {
                    throw new Error(JSON.stringify(error.data))
                }
            }
            throw new Error('Unknown error')
        }
    }
)
