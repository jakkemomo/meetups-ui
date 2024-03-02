import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
}

const initialState: IGlobalFilterState = {
  search: '',
}

export const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchFilter: (state, { payload: inputValue }: { payload: string }) => ({
      search: inputValue,
    })
  }
})

export const { setSearchFilter } = searchFilterSlice.actions;
