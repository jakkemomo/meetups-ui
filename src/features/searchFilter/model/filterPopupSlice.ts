import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
}

const initialState: IInitialState = {
  isOpen: false,
}

const filterPopupSlice = createSlice({
  name: 'filterPopup',
  initialState,
  reducers: {
    isPopupOpenSetted: (state, { payload: isOpen }: { payload: boolean }) => ({
      ...state, isOpen
    })
  }
})

export const { isPopupOpenSetted } = filterPopupSlice.actions;

export default filterPopupSlice;
