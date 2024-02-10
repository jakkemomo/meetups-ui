import {createAsyncThunk} from '@reduxjs/toolkit'
import {sessionApi} from '@/entities/session'
import {isFetchBaseQueryError} from '@/shared/api'

interface Params {
  username: string,
  email: Email;
  password: string;
}

export const registerThunk = createAsyncThunk<void, Params, { state: RootState }>(
  'authentication/register',
  async (body: Params, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.register.initiate(body)).unwrap()
    } catch (error: any) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      throw new Error(JSON.stringify(error.data))
    }
  }
)
