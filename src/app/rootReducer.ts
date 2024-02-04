import { combineReducers } from '@reduxjs/toolkit'
import { baseApi, jwtApi } from '@/shared/api'
import {SessionSlice} from "@/entities/session/model/slice";

export const rootReducer = combineReducers({
  session: SessionSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [jwtApi.reducerPath]: jwtApi.reducer,
})
