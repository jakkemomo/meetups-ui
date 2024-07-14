import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isParticipant?: boolean;
  isFavorite: boolean;
}

const initialState: IInitialState = {
  isParticipant: false,
  isFavorite: false
}

const eventInfoSlice = createSlice({
  name: 'isParticipant',
  initialState,
  reducers: {
    isParticipantSetted: (state, { payload: isParticipant }: { payload: boolean | undefined }) => ({
      ...state, isParticipant
    }),
    isFavoriteSetted: (state, { payload: isFavorite }: { payload: boolean }) => ({
      ...state, isFavorite
    })
  }
})

export const { isParticipantSetted, isFavoriteSetted } = eventInfoSlice.actions;

export default eventInfoSlice;
