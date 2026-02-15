import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/slices/counter.slice';
import userReducer from '@/store/slices/user.slice';
import { pokemonApi } from './apis/pokemon.api';
import { literlyApi } from './apis/literly.api';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [literlyApi.reducerPath]: literlyApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, literlyApi.middleware)
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
