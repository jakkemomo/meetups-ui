import {createSlice} from '@reduxjs/toolkit'
import {register} from './asyncAction';
import {Status} from '../type';
import {RegisterResponse} from "@/entities/session/api/types";

export interface AuthState extends RegisterResponse {
  status: Status,
  error: any
}

const initialState: AuthState = {
  status : Status.INITIAL_STATE,
  error: null,
  username: '',
  email: ''
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.username = action.payload.username;
      state.email = action.payload.email;
    })

    builder.addCase(register.pending, (state) => {
      state.status = Status.LOADING
    })

    builder.addCase(register.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.error = action.payload
    })
  }
})

export default registerSlice.reducer
