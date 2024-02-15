import {combineReducers} from '@reduxjs/toolkit';
import {baseApi, jwtApi} from '@/shared/api';
import {SessionSlice} from "@/entities/session/model/slice";
import globalFilterReducer from '@/features/globalFilter/model/GlobalFilterSlice';
import {registerFormSlice} from '@/features/authentication/registration/model/formState';

export const rootReducer = combineReducers({
  session: SessionSlice.reducer,
  globalFilter: globalFilterReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [jwtApi.reducerPath]: jwtApi.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
})
