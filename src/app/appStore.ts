import {configureStore} from '@reduxjs/toolkit'
import {baseApi, jwtApi} from '@/shared/api'
import {setupListeners} from "@reduxjs/toolkit/query";
import {rootReducer} from "@/app/rootReducer";


export function makeStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [
              'addressControl/placesServiceSetted',
              'addressControl/autocompleteServiceSetted',
              'addressControl/selectedPlaceSetted'
            ],
            ignoredPaths: [
              'addressControl.placesService',
              'addressControl.autocompleteService',
              'addressControl.selectedPlace'
            ]
          }
        }).concat(
            baseApi.middleware, jwtApi.middleware,
        ),
  })

  setupListeners(store.dispatch)

  return store
}

export const appStore = makeStore()


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch
