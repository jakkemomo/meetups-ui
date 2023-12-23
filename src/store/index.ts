import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { mapApi } from './map/mapApi'
import userSlice from './user/slice';
import middleware from './user/middleware';

export const store = configureStore({
  reducer: {
    userSlice,
    [mapApi.reducerPath] : mapApi.reducer
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(mapApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatcher = () => useDispatch<AppDispatch>()