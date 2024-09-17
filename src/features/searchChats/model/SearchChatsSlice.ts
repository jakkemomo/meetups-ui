// searchUsersSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface IGlobalChatsSearchState {
  searchChats: string;
}

const initialState: IGlobalChatsSearchState = {
  searchChats: "",
};

export const SearchChatsSlice = createSlice({
  name: "searchChats",
  initialState,
  reducers: {
    setSearchChats: (state, { payload: searchValue }: { payload: string }) => ({
      ...state,
      searchChats: searchValue,
    }),
  },
});

export const { setSearchChats } = SearchChatsSlice.actions;
export default SearchChatsSlice.reducer;

