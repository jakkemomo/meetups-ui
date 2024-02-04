import {type FetchArgs, type FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {baseQuery} from './baseQuery'
import {Mutex} from 'async-mutex'
import {jwtApi} from "@/shared/api/baseApi";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";

const mutex: Mutex = new Mutex()


export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  console.log(api.endpoint, 'ENDPOINT')
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401 && api.endpoint !== "refreshAccessToken") {
    let state = api.getState() as RootState
    let refreshToken = state.session.refresh
    if (!mutex.isLocked() && refreshToken) {
      const release = await mutex.acquire()
      try {
        await api.dispatch(
            jwtApi.endpoints.refreshAccessToken.initiate({
              refresh: refreshToken
            })).unwrap();
        // Retry the original query with the new token
        result = await baseQuery(args, api, extraOptions)
      } catch (error) {
        console.error('Error refreshing access token:', error);
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
