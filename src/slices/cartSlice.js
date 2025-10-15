import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage (if available)
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  items: savedCart, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Set cart (used when syncing from backend)
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ✅ Add item to cart
    addToCart: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ✅ Remove item
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ✅ Update quantity
    updateCartItemQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    // ✅ Clear all
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
