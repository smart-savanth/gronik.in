import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('gronik_jwt') || null,
  user: JSON.parse(localStorage.getItem('gronik_user')) || null,
  isAuthenticated: !!localStorage.getItem('gronik_jwt'),
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('gronik_jwt', state.token);
      localStorage.setItem('gronik_user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('gronik_jwt');
      localStorage.removeItem('gronik_user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('gronik_user', JSON.stringify(state.user));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('gronik_jwt', state.token);
    },
  },
});

export const { login, logout, setUser, setToken } = userAuthSlice.actions;
export default userAuthSlice.reducer; 