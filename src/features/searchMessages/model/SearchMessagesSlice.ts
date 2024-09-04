// searchUsersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface IGlobalUsersSearchState {
  search: string;
}

const initialState: IGlobalUsersSearchState = {
  search: "",
};

export const SearchMessagesSlice = createSlice({
  name: "searchMessages",
  initialState,
  reducers: {
    setSearchMessages: (state, { payload: searchValue }: { payload: string }) => ({
      ...state,
      search: searchValue,
    }),
  },
});

export const { setSearchMessages } = SearchMessagesSlice.actions;
export default SearchMessagesSlice.reducer;

