import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
  checkedCategories: number[];
  selectedDate: string;
  endDate: string;
  startDate: string;
  city: number;
}

const initialState: IGlobalFilterState = {
  search: "",
  checkedCategories: [],
  selectedDate: "",
  endDate: "",
  startDate: "",
  city: NaN
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setSearchFilter: (state, { payload: inputValue }: { payload: string }) => ({
      ...state,
      search: inputValue,
    }),
    categorySetted: (
      state,
      { payload: checkedCategories }: { payload: number[] }
    ) => ({
      ...state,
      checkedCategories,
    }),
    selectedDateSetted: (state, { payload: selectedDate }: { payload: string }) => ({
      ...state,
      selectedDate: selectedDate,
    }),
    startDateSetted: (
      state,
      { payload: startDate }: { payload: string }
    ) => ({
      ...state,
      startDate: startDate,
    }),
    endDateSetted: (state, { payload: endDate }: { payload: string }) => ({
      ...state,
      endDate: endDate,
    }),
    citySetted: (state, { payload: city }: { payload: number }) => ({
      ...state,
      city
    }),
  },
});

export const {
  setSearchFilter,
  categorySetted,
  selectedDateSetted,
  endDateSetted,
  startDateSetted,
  citySetted
} = searchFilterSlice.actions;
