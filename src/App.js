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
import TermsAndConditions from './component/pages/TermsAndConditions';
import PrivacyPolicy from './component/pages/PrivacyPolicy';

function App() {
  const [cart, setCart] = useState([]);
const [wishlist, setWishlist] = useState([]);
  const dispatch = useDispatch();
  const notification = useNotification();

  // ENHANCED HANDLERS WITH NOTIFICATIONS
  const handleAddToCart = (book) => {
  let local = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = local.some(item => item.id === book._id || item.id === book.id);

  if (!exists) {
    local.push({
      id: book._id || book.id,
      title: book.title,
      image: book.coverImageUrl,
      price: book.final_price,
      originalPrice: book.original_price,
      author: book.author,
      quantity: 1
    });

    localStorage.setItem("cart", JSON.stringify(local));
    setCart(local);

    // notify navbar
    window.dispatchEvent(new Event("cart-updated"));
  }

  notification.addToCart(book.title);
};


const handleRemoveFromCart = (id) => {
  const local = JSON.parse(localStorage.getItem("cart")) || [];
  const updated = local.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(updated));
  setCart(updated);

  window.dispatchEvent(new Event("cart-updated"));
  notification.removeFromCart();
};


  const handleUpdateCartItemQuantity = (id, newQuantity) => {
    
    if (newQuantity > 0) {
      notification.custom('Cart updated successfully!', 'success');
    }
  };

const handleAddToWishlist = (book) => {
  let local = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!local.some(item => item.id === book.id || item.id === book._id)) {
    local.push({
      id: book._id || book.id,
      title: book.title,
      image: book.coverImageUrl,
      price: book.final_price,
      author: book.author
    });
    localStorage.setItem("wishlist", JSON.stringify(local));
    setWishlist(local);
  }

  window.dispatchEvent(new Event("wishlist-updated"));
  notification.addToWishlist(book.title);
};


  const handleRemoveFromWishlist = (id) => {
    const bookToRemove = wishlist.find(item => item.id === id);
    
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
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        
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