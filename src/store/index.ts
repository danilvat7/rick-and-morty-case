/**
 * Root store settings
 * */
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import charactersReducer from './characters';
import commonReducer from './common';

export const store = configureStore({
  reducer: { characters: charactersReducer, common: commonReducer },
  middleware: [thunkMiddleware],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
