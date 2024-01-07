import { combineReducers } from '@reduxjs/toolkit'
import { sessionSlice } from '@/entities/session'
import { baseApi } from '@/shared/api'
import { debugModeSlice } from '@/shared/model'

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [debugModeSlice.name]: debugModeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
})
