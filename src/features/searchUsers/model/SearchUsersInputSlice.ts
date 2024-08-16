// searchUsersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface IGlobalUsersSearchState {
  username: string;
}

const initialState: IGlobalUsersSearchState = {
  username: "",
};

export const searchUsersSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    setSearchUsers: (state, { payload: usernameValue }: { payload: string }) => ({
      ...state,
      username: usernameValue,
    }),
  },
});

export const { setSearchUsers } = searchUsersSlice.actions;
export default searchUsersSlice.reducer;

