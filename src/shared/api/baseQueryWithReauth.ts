import {type FetchArgs, type FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {baseQuery} from './baseQuery'
import {Mutex} from 'async-mutex'
import {jwtApi} from "@/shared/api/baseApi";
import {BaseQueryFn} from "@reduxjs/toolkit/query/react";
import {selectRefreshToken} from "@/shared/lib";

const mutex: Mutex = new Mutex()


export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  console.debug(api.endpoint, 'ENDPOINT')
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    let refreshToken = selectRefreshToken()
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
