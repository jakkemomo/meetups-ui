import { createSlice } from "@reduxjs/toolkit";
import { IAddedMarker } from "./types";

interface IInitialState {
  selectedPlace: google.maps.places.PlaceResult | null;
  placesService: google.maps.places.PlacesService | null;
  autocompleteService: google.maps.places.AutocompleteService | null;
  implementMarker: IAddedMarker | null;
}

const initialState: IInitialState = {
  selectedPlace: null,
  placesService: null,
  autocompleteService: null,
  implementMarker: null
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
    }),
    implementMarkerSetted: (state, { payload: implementMarker }: { payload: IAddedMarker | null }) => ({
      ...state, implementMarker
    })
  }
})

export const { selectedPlaceSetted, placesServiceSetted, autocompleteServiceSetted, implementMarkerSetted } = addressControlSlice.actions;

export default addressControlSlice;
