import {RootState} from "..";

// export const selectRoleUser = (state : RootState) => state.userSlice.role
export const selectStatusUser = (state: RootState) => state.authSlice.status
export const selectUser = (state: RootState) => state.authSlice

export const selectRegister = (state: RootState) => state.registerSlice
