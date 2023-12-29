import {createSlice} from '@reduxjs/toolkit'
import {login} from './asyncAction';
import {AuthResponse} from '../../api';
import {Status} from '../type';

export interface AuthState extends AuthResponse {
  status : Status
}

const initialState: AuthState = {
  status : Status.INITIAL_STATE,
  refresh: '',
  access: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    })

    builder.addCase(login.pending, (state) => {
      state.status = Status.LOADING
    })

    builder.addCase(login.rejected, (state) => {
      state.status = Status.ERROR
    })
  }
})

export default authSlice.reducer
