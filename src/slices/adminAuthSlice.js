import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminToken: localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken') || null,
  adminRole: localStorage.getItem('role') || null,
  isAdminAuthenticated: !!(localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')),
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.adminToken = action.payload.token;
      state.adminRole = action.payload.role;
      state.isAdminAuthenticated = true;
      localStorage.setItem('adminToken', state.adminToken);
      localStorage.setItem('role', state.adminRole);
      sessionStorage.setItem('adminToken', state.adminToken);
    },
    adminLogout: (state) => {
      state.adminToken = null;
      state.adminRole = null;
      state.isAdminAuthenticated = false;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('role');
      sessionStorage.removeItem('adminToken');
    },
    setAdminRole: (state, action) => {
      state.adminRole = action.payload;
      localStorage.setItem('role', state.adminRole);
    },
  },
});

export const { adminLogin, adminLogout, setAdminRole } = adminAuthSlice.actions;
export default adminAuthSlice.reducer; 