import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Navbar from './component/layout/Navbar';
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
import SettingsPage from './component/admin/Settings';
import CheckoutSection from './component/pages/CheckoutSection';
import AdminLogin from './component/admin/AdminLogin';
import NotFound from './component/pages/NotFound';
import LoadingSpinner from './component/layout/LoadingSpinner';
import SkeletonLoader from './component/layout/SkeletonLoader';
import AccessDenied from './component/pages/AccessDenied';

function App() {
  // GLOBAL STATE with localStorage persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('gronik-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('gronik-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem('gronik-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gronik-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // HANDLERS
  const addToCart = (book) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const addToWishlist = (book) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  // HOME PAGE
  const HomePage = () => (
    <>
      <HeroSection
        onAddToCart={addToCart}
        onAddToWishlist={addToWishlist}
        onRemoveFromCart={removeFromCart}
        onRemoveFromWishlist={removeFromWishlist}
        cart={cart}
        wishlist={wishlist}
      />
      <FeaturedBooks
        onAddToCart={addToCart}
        onAddToWishlist={addToWishlist}
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
      onAddToCart={addToCart}
      onAddToWishlist={addToWishlist}
      cart={cart}
      wishlist={wishlist}
    />
  );

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Dummy admin check (replace with real auth/role check after backend integration)
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <div className="App">
      {!isAdminRoute && <Navbar cartCount={cart.length} wishlistCount={wishlist.length} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPageWrapper />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/wishlist" element={
          <WishlistPage
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
            addToCart={addToCart}
            cart={cart}
          />
        } />
        <Route path="/cart" element={
          <CartSection
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartItemQuantity={updateCartItemQuantity}
            addToWishlist={addToWishlist}
            wishlist={wishlist}
          />
        } />
        <Route path="/product/:productId" element={
          <ProductSection
            cart={cart}
            wishlist={wishlist}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onAddToWishlist={addToWishlist}
            onRemoveFromWishlist={removeFromWishlist}
          />
        } />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/order-history" element={<OrderHistorySection />} />
        <Route path="/my-library" element={<MyLibrarySection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/checkout" element={<CheckoutSection cart={cart} />} />
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Admin Routes (protected) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<BooksManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/orders" element={<OrdersManagement />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhyEbooksButton />}
    </div>
  );
}

export default App;