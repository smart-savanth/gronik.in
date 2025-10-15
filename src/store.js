import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import userAuthReducer from './slices/userAuthSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import notificationReducer from './slices/notificationSlice'; // Add this import
import { booksApi } from './utils/booksService';
import { cartApi } from './utils/cartService';
import { wishlistApi } from './utils/wishListService';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    notifications: notificationReducer, // Add this line
    [booksApi.reducerPath]: booksApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer, 
    [wishlistApi.reducerPath]: wishlistApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(booksApi.middleware)
      .concat(cartApi.middleware)
      .concat(wishlistApi.middleware),
});

export default store;
