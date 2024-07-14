import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
  popupType?: 'password' | 'email' | null;
  newEmail?: string;
}

const initialState: IInitialState = {
  isOpen: false,
  popupType: null,
  newEmail: ''
}

const securityPopupSlice = createSlice({
  name: 'passwordPopup',
  initialState,
  reducers: {
    securityPopupSetted: (state, { payload: { isOpen, popupType, newEmail } }: { payload: IInitialState }) => ({
      ...state, isOpen, popupType: popupType ?? null, newEmail: newEmail ?? ''
    })
  }
})

export const { securityPopupSetted } = securityPopupSlice.actions;

export default securityPopupSlice;
