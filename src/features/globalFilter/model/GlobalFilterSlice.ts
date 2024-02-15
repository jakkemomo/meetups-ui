import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
}

const initialState: IGlobalFilterState = {
  search: '',
}

const globalFilterSlice = createSlice({
  name: 'globalFilter',
  initialState,
  reducers: {
    setSearchFilter: (state, { payload: inputValue }: { payload: string }) => ({
      search: inputValue,
    })
  }
})

export const { setSearchFilter } = globalFilterSlice.actions;

export default globalFilterSlice.reducer;
