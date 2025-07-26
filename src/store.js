import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import userAuthReducer from './slices/userAuthSlice';
import adminAuthReducer from './slices/adminAuthSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    userAuth: userAuthReducer,
    adminAuth: adminAuthReducer,
  },
});

export default store; 