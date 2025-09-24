import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import userAuthReducer from './slices/userAuthSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import notificationReducer from './slices/notificationSlice'; // Add this import

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
    notifications: notificationReducer, // Add this line
  },
});

export default store;