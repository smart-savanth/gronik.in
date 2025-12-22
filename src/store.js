import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userAuthReducer from './slices/userAuthSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import notificationReducer from './slices/notificationSlice';
import { booksApi } from './utils/booksService';
import { cartApi } from './utils/cartService';
import { productApi } from './utils/productServices';
import { orderApi } from './utils/orderServices';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    notifications: notificationReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer, 
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(cartApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware),
});

export default store;
