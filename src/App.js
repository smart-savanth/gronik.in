import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Navbar from './component/layout/Navbar';
import Notification from './component/layout/Notification';
import HeroSection from './component/home/HeroSection';
import AboutSection from './component/home/AboutSection';
import FeaturedBooks from './component/home/FeaturedBooks';
import ReviewsSection from './component/home/ReviewsSection';
import Footer from './component/layout/Footer';
import WhyEbooksButton from './component/layout/Button';
import ContactSection from './component/pages/ContactSection';
import CartSection from './component/pages/CartSection';
import WishlistPage from './component/pages/WishlsitSection';
import ProductSection from './component/pages/ProductSection';
import ProfileSection from './component/pages/ProfileSection';
import LibraryPage from './component/pages/LibrarySection';
import LoginSection from './component/pages/LoginSection';
import OrderHistorySection from './component/pages/OrderHistorySection';
import MyLibrarySection from './component/pages/MyLibrarySection';
import ScrollToTop from './component/layout/ScrollToTop';
import AdminDashboard from './component/admin/AdminDashboard';
import BooksManagement from './component/admin/BooksManagement';
import UsersManagement from './component/admin/UsersManagement';
import OrdersManagement from './component/admin/OrdersManagement';
import Transactions from './component/admin/Transactions'; // ADD THIS
import SettingsPage from './component/admin/Settings';
import CheckoutSection from './component/pages/CheckoutSection';
import AdminLogin from './component/admin/AdminLogin';
import NotFound from './component/pages/NotFound';
import LoadingSpinner from './component/layout/LoadingSpinner';
import SkeletonLoader from './component/layout/SkeletonLoader';
import AccessDenied from './component/pages/AccessDenied';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateCartItemQuantity } from './slices/cartSlice';
import { addToWishlist, removeFromWishlist } from './slices/wishlistSlice';
import { useNotification } from './hooks/useNotification';

function App() {
  const cart = useSelector(state => state.cart.items);
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const notification = useNotification();

  // ENHANCED HANDLERS WITH NOTIFICATIONS
  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    notification.addToCart(book.title);
  };

  const handleRemoveFromCart = (id) => {
    const bookToRemove = cart.find(item => item.id === id);
    dispatch(removeFromCart(id));
    notification.removeFromCart(bookToRemove?.title);
  };

  const handleUpdateCartItemQuantity = (id, newQuantity) => {
    dispatch(updateCartItemQuantity({ id, newQuantity }));
    if (newQuantity > 0) {
      notification.custom('Cart updated successfully!', 'success');
    }
  };

  const handleAddToWishlist = (book) => {
    dispatch(addToWishlist(book));
    notification.addToWishlist(book.title);
  };

  const handleRemoveFromWishlist = (id) => {
    const bookToRemove = wishlist.find(item => item.id === id);
    dispatch(removeFromWishlist(id));
    notification.removeFromWishlist(bookToRemove?.title);
  };

  // HOME PAGE
  const HomePage = () => (
    <>
      <HeroSection
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        cart={cart}
        wishlist={wishlist}
      />
      <FeaturedBooks
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onAddToWishlist={handleAddToWishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        cart={cart}
        wishlist={wishlist}
      />
      <AboutSection />
      <ReviewsSection />
    </>
  );

  // LIBRARY PAGE
  const LibraryPageWrapper = () => (
    <LibraryPage
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
      onAddToWishlist={handleAddToWishlist}
      onRemoveFromWishlist={handleRemoveFromWishlist}
      cart={cart}
      wishlist={wishlist}
    />
  );

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdmin = useSelector(state => state.adminAuth.adminRole) === 'admin';

  return (
    <div className="App">
      {!isAdminRoute && <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />}
      <ScrollToTop />
      
      <Notification />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPageWrapper />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/wishlist" element={
          <WishlistPage
            wishlist={wishlist}
            removeFromWishlist={handleRemoveFromWishlist}
            addToCart={handleAddToCart}
            cart={cart}
          />
        } />
        <Route path="/cart" element={
          <CartSection
            cart={cart}
            removeFromCart={handleRemoveFromCart}
            updateCartItemQuantity={handleUpdateCartItemQuantity}
            addToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        } />
        <Route path="/product/:productId" element={
          <ProductSection
            cart={cart}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
          />
        } />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/order-history" element={<OrderHistorySection />} />
        <Route path="/my-library" element={<MyLibrarySection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/checkout" element={<CheckoutSection cart={cart} />} />
        
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<BooksManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/orders" element={<OrdersManagement />} />
        <Route path="/admin/transactions" element={<Transactions />} /> {/* ADD THIS LINE */}
        <Route path="/admin/settings" element={<SettingsPage />} />
        
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhyEbooksButton />}
    </div>
  );
}

export default App;