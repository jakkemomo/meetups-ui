import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  selectedPlace: google.maps.places.PlaceResult | null;
  placesService: google.maps.places.PlacesService | null;
  autocompleteService: google.maps.places.AutocompleteService | null;
}

const initialState: IInitialState = {
  selectedPlace: null,
  placesService: null,
  autocompleteService: null
}

const addressControlSlice = createSlice({
  name: 'addressControl',
  initialState,
  reducers: {
    selectedPlaceSetted: (state, { payload: selectedPlace }: { payload: google.maps.places.PlaceResult | null }) => ({
      ...state, selectedPlace
    }),
    placesServiceSetted: (state, { payload: placesService }: { payload: google.maps.places.PlacesService | null }) => ({
      ...state, placesService
    }),
    autocompleteServiceSetted: (state, { payload: autocompleteService }: { payload: google.maps.places.AutocompleteService | null }) => ({
      ...state, autocompleteService
    })
  }
})

export const { selectedPlaceSetted, placesServiceSetted, autocompleteServiceSetted } = addressControlSlice.actions;

export default addressControlSlice;
