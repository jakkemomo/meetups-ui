import {configureStore, Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {baseApi, jwtApi} from '@/shared/api'
import {setupListeners} from "@reduxjs/toolkit/query";
import {rootReducer} from "@/app/rootReducer";


const localStorageMiddleware: Middleware = (api: MiddlewareAPI<AppDispatch, RootState>) => next => action => {
  const result = next(action);
  localStorage.setItem('applicationState', JSON.stringify(api.getState()));
  return result;
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    let appState = localStorage.getItem('applicationState')
    if (appState === null) {
      return undefined;
    }
    return JSON.parse(appState);
  }
};

export function makeStore() {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware, jwtApi.middleware, localStorageMiddleware
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
