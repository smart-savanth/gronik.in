import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('gronik-wishlist')) || [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem('gronik-wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('gronik-wishlist', JSON.stringify(state.items));
    },
    setWishlist: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('gronik-wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem('gronik-wishlist', JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 