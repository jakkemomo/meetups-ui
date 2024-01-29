import { combineReducers } from '@reduxjs/toolkit'
import { baseApi, jwtApi } from '@/shared/api'
import {SessionSlice} from "@/shared/model/slice.ts";

export const rootReducer = combineReducers({
  session: SessionSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [jwtApi.reducerPath]: jwtApi.reducer,
})
