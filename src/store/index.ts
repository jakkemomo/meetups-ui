import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { mapApi } from './map/mapApi'
import registerSlice from "./user/registerSlice";
import authSlice from './user/loginSlice'

export const store = configureStore({
  reducer: {
    authSlice,
    registerSlice,
    [mapApi.reducerPath] : mapApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mapApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatcher = () => useDispatch<AppDispatch>()
