import { configureStore } from '@reduxjs/toolkit';

import deviceReducer from './reducers/deviceSlice';
import categoriesReducer from './reducers/categoriesSlice';
import shoppingCartReducer from './reducers/shoppingCartSlice';
import userInfoReducer from './reducers/userInfoSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    categories: categoriesReducer,
    shoppingCart: shoppingCartReducer,
    userInfo: userInfoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
