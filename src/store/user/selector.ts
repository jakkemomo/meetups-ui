import { RootState } from "..";

export const selectRoleUser = (state : RootState) => state.userSlice.role
export const selectLoginUser = (state : RootState) => state.userSlice.login
export const selectStatusUser = (state : RootState) => state.userSlice.status
export const selectIsActivated = (state : RootState) => state.userSlice.isActivated
export const selectUser = (state : RootState) => state.userSlice
