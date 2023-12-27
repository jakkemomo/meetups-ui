import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import {mapApi} from './map/mapApi'

export const store = configureStore({
  reducer: {
    [mapApi.reducerPath] : mapApi.reducer
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(mapApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatcher = () => useDispatch<AppDispatch>()