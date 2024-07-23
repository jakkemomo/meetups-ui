// searchUsersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface IGlobalUsersSearchState {
  search: string;
}

const initialState: IGlobalUsersSearchState = {
  search: "",
};

export const searchUsersSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    setSearchUsers: (state, { payload: inputValue }: { payload: string }) => ({
      ...state,
      search: inputValue,
    }),
  },
});

export const { setSearchUsers } = searchUsersSlice.actions;
export default searchUsersSlice.reducer;
