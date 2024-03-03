import {BaseQueryFn, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {config} from '../config'
import {FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta} from "@reduxjs/toolkit/query";
import {selectAccessToken} from "@/shared/lib";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: config.BASE_URL_API,
  prepareHeaders: (headers) => {
    console.log('Envs', import.meta.env)
    console.log('Envs System', process.env)
    console.log(config.BASE_URL_API)
    let accessToken = selectAccessToken();

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
})
