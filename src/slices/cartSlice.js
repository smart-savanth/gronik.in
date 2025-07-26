import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('gronik-cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('gronik-cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('gronik-cart', JSON.stringify(state.items));
    },
    updateCartItemQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      if (newQuantity < 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        state.items = state.items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
      }
      localStorage.setItem('gronik-cart', JSON.stringify(state.items));
    },
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('gronik-cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('gronik-cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 