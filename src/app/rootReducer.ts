import {combineReducers} from '@reduxjs/toolkit';
import {baseApi, jwtApi} from '@/shared/api';
import {SessionSlice} from "@/entities/session/model/slice";
import {registerFormSlice} from '@/features/authentication/registration/model/formState';
import { searchFilterSlice } from '@/features/searchFilter/model/SearchFilterSlice';

export const rootReducer = combineReducers({
  session: SessionSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [jwtApi.reducerPath]: jwtApi.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
})
