import { combineReducers } from '@reduxjs/toolkit'
import { sessionSlice } from '@/entities/session'
import { baseApi } from '@/shared/api'

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
