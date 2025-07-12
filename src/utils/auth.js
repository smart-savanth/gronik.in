// Authentication utility functions for Gronik app

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('gronik_jwt');
  return !!token;
};

// Get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem('gronik_user');
  return userData ? JSON.parse(userData) : null;
};

// Get JWT token
export const getToken = () => {
  return localStorage.getItem('gronik_jwt');
};

// Logout user
export const logout = () => {
  localStorage.removeItem('gronik_jwt');
  localStorage.removeItem('gronik_user');
  window.location.href = '/login';
};

// Set authentication data
export const setAuthData = (token, userData) => {
  localStorage.setItem('gronik_jwt', token);
  localStorage.setItem('gronik_user', JSON.stringify(userData));
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