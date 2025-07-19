import store from '../store';
import { login, logout as reduxLogout, setUser, setToken } from '../slices/userAuthSlice';

// Check if user is authenticated
export const isAuthenticated = () => {
  return store.getState().userAuth.isAuthenticated;
};

// Get current user data
export const getCurrentUser = () => {
  return store.getState().userAuth.user;
};

// Get JWT token
export const getToken = () => {
  return store.getState().userAuth.token;
};

// Logout user
export const logout = () => {
  store.dispatch(reduxLogout());
  window.location.href = '/login';
};

// Set authentication data
export const setAuthData = (token, userData) => {
  store.dispatch(login({ token, user: userData }));
};

// Check if token is expired (basic check)
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;
  
  try {
    // In a real app, you would decode the JWT and check expiration
    // For now, we'll just check if token exists
    return false;
  } catch (error) {
    return true;
  }
};

// Protected route wrapper
export const requireAuth = (callback) => {
  if (!isAuthenticated()) {
    window.location.href = '/login';
    return;
  }
  if (callback) callback();
}; 