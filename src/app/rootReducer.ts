import {combineReducers} from '@reduxjs/toolkit';
import {baseApi, jwtApi} from '@/shared/api';
import {SessionSlice} from "@/entities/session/model/slice";
import {registerFormSlice} from '@/features/authentication/registration/model/formState';
import { searchFilterSlice } from '@/features/searchFilter/model/SearchFilterSlice';
import addressControlSlice from '@/widgets/mapWidget/model/addressControlSlice';

export const rootReducer = combineReducers({
  session: SessionSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
  addressControl: addressControlSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [jwtApi.reducerPath]: jwtApi.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
})
