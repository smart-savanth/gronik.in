import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userAuthReducer from './slices/userAuthSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import notificationReducer from './slices/notificationSlice';
import { booksApi } from './utils/booksService';
import { cartApi } from './utils/cartService';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    notifications: notificationReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(cartApi.middleware),
});

export default store;
