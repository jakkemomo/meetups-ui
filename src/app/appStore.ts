import {configureStore} from '@reduxjs/toolkit'
// import {invalidateAccessTokenListener} from '@/features/auth/invalidateAccessToken'
import {baseApi} from '@/shared/api'
import {setupListeners} from "@reduxjs/toolkit/query";
import {rootReducer} from "@/app/rootReducer";


export function makeStore() {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer
    } as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware, /*invalidateAccessTokenListener.middleware*/
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
