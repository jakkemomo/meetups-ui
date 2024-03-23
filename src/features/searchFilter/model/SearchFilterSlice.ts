import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
  checkedCategories: string;
}

const initialState: IGlobalFilterState = {
  search: '',
  checkedCategories: ''
}

export const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchFilter: (state, { payload: inputValue }: { payload: string }) => ({
      ...state, search: inputValue,
    }),
    categorySetted: (state, { payload: checkedCategories }: { payload: string }) => ({
      ...state, checkedCategories
    })
  }
})

export const { setSearchFilter, categorySetted } = searchFilterSlice.actions;
