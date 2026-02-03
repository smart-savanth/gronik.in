import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Set wishlist (e.g., when fetching from backend)
    setWishlist: (state, action) => {
      state.items = action.payload;
    },

    // Add item to wishlist
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    // Remove item from wishlist
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Clear entire wishlist
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;