import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
  checkedCategories: number[];
  age: string;
  free?: boolean;
  selectedDate: string;
  endDate: string;
  startDate: string;
  city: number;
}

const initialState: IGlobalFilterState = {
  search: "",
  checkedCategories: [],
  age: "",
  free: undefined,
  selectedDate: "",
  endDate: "",
  startDate: "",
  city: NaN
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    searchFilterSetted: (state, { payload: inputValue }: { payload: string }) => ({
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
    ageFilterSetted: (state, { payload: inputValue }: { payload: string }) => ({
      ...state,
      age: inputValue,
    }),
    freeFilterSetted: (state, { payload: value }: { payload: boolean | undefined }) => ({
      ...state,
      free: value,
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
  searchFilterSetted,
  categorySetted,
  ageFilterSetted,
  freeFilterSetted,
  selectedDateSetted,
  endDateSetted,
  startDateSetted,
  citySetted
} = searchFilterSlice.actions;
