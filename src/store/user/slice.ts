import { createSlice } from '@reduxjs/toolkit'
import { login } from './asyncAction';
import { User } from '../../api';
import { Status } from '../type';

export interface UserTypeWithStatus extends User {
    status : Status
}

const initialState: UserTypeWithStatus = {
    //роль стрингом, потом использовать as
    login : "",
    isActivated : false,
    status : Status.INITIAL_STATE
}

const userSlice = createSlice({
    name: 'menu',
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            //state.isActivated = action.payload.isActivated
            //state.login = action.payload.login
            state.status = Status.SUCCESS
        })

        builder.addCase(login.pending, (state) => {
            //state.isActivated = false
            //state.login = ""
            state.status = Status.LOADING
        })

        builder.addCase(login.rejected, (state) => {
            //state.isActivated = false
            //state.login = ""
            state.status = Status.ERROR
        })
    }
})

export default userSlice.reducer