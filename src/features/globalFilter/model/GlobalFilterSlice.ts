import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  filter: string;
}

const initialState: IGlobalFilterState = {
  filter: '',
}

const globalFilterSlice = createSlice({
  name: 'globalFilter',
  initialState,
  reducers: {
    setFilter: (state, { payload: inputValue }: { payload: string }) => ({
      filter: inputValue,
    })
  }
})

export const { setFilter } = globalFilterSlice.actions;

export default globalFilterSlice.reducer;
