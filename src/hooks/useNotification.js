import { useDispatch } from 'react-redux';
import { addNotification } from '../slices/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (message, type = 'info') => {
    dispatch(addNotification({ message, type }));
  };

  // Pre-defined notification helpers for common actions
  const notifications = {
    // Authentication
    loginSuccess: (userName = '') => showNotification(
      userName ? `Welcome back, ${userName}!` : 'You have successfully logged in.',
      'success'
    ),
    loginError: (error = '') => showNotification(
      error || 'Login failed. Please check your credentials.',
      'error'
    ),
    logoutSuccess: () => showNotification(
      'You have been logged out successfully.',
      'info'
    ),
    signupSuccess: () => showNotification(
      'Account created successfully! Welcome to Gronik!',
      'success'
    ),
    
    // Cart Actions
    addToCart: (bookTitle = '') => showNotification(
      bookTitle ? `"${bookTitle}" added to cart!` : 'Book added to cart successfully!',
      'success'
    ),
    removeFromCart: (bookTitle = '') => showNotification(
      bookTitle ? `"${bookTitle}" removed from cart.` : 'Item removed from cart.',
      'info'
    ),
    cartEmpty: () => showNotification(
      'Your cart is now empty.',
      'info'
    ),
    
    // Wishlist Actions
    addToWishlist: (bookTitle = '') => showNotification(
      bookTitle ? `"${bookTitle}" added to wishlist!` : 'Book added to wishlist!',
      'success'
    ),
    removeFromWishlist: (bookTitle = '') => showNotification(
      bookTitle ? `"${bookTitle}" removed from wishlist.` : 'Item removed from wishlist.',
      'info'
    ),
    
    // Purchase & Orders
    orderSuccess: (orderId = '') => showNotification(
      orderId ? `Order #${orderId} placed successfully!` : 'Your order has been placed successfully!',
      'success'
    ),
    orderError: () => showNotification(
      'Failed to place order. Please try again.',
      'error'
    ),
    paymentSuccess: () => showNotification(
      'Payment processed successfully!',
      'success'
    ),
    paymentError: () => showNotification(
      'Payment failed. Please check your payment details.',
      'error'
    ),
    
    // Profile & Settings
    profileUpdated: () => showNotification(
      'Your profile has been updated successfully!',
      'success'
    ),
    profileError: () => showNotification(
      'Failed to update profile. Please try again.',
      'error'
    ),
    passwordChanged: () => showNotification(
      'Password changed successfully!',
      'success'
    ),
    
    // Downloads & Books
    downloadSuccess: (bookTitle = '') => showNotification(
      bookTitle ? `"${bookTitle}" is ready for download!` : 'Download completed successfully!',
      'success'
    ),
    downloadError: () => showNotification(
      'Download failed. Please try again.',
      'error'
    ),
    
    // General Actions
    saveSuccess: (item = 'Changes') => showNotification(
      `${item} saved successfully!`,
      'success'
    ),
    deleteSuccess: (item = 'Item') => showNotification(
      `${item} deleted successfully.`,
      'success'
    ),
    deleteError: (item = 'Item') => showNotification(
      `Failed to delete ${item.toLowerCase()}. Please try again.`,
      'error'
    ),
    
    // Network & Loading
    networkError: () => showNotification(
      'Network error. Please check your connection.',
      'error'
    ),
    serverError: () => showNotification(
      'Server error. Please try again later.',
      'error'
    ),
    
    // Custom notification
    custom: (message, type) => showNotification(message, type)
  };

  return {
    showNotification,
    ...notifications
  };
};