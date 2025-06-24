import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './component/layout/Navbar';
import HeroSection from './component/home/HeroSection';
import AboutSection from './component/home/AboutSection';
import FeaturedBooks from './component/home/FeaturedBooks';
import ReviewsSection from './component/home/ReviewsSection';
import Footer from './component/layout/Footer';
import ContactSection from './component/pages/ContactSection';
import CartSection from './component/pages/CartSection';
import WishlistPage from './component/pages/WishlsitSection';
import ProductSection from './component/pages/ProductSection';
import ProfileSection from './component/pages/ProfileSection';
import LibraryPage from './component/pages/LibrarySection';
import LoginSection from './component/pages/LoginSection';

// Home page component with product view state
const HomePage = () => {
  const [currentView, setCurrentView] = useState('books'); // 'books' or 'product'
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Handle Quick View - navigate to product details
  const handleQuickView = (book) => {
    setSelectedBook(book);
    setCurrentView('product');
  };

  // Handle Go Back - return to library view
  const handleGoBack = () => {
    setCurrentView('books');
    setSelectedBook(null);
  };

  // Handle Add to Cart
  const handleAddToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
    console.log('Added to cart:', book.title);
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = (book) => {
    setWishlist(prevWishlist => {
      const isAlreadyInWishlist = prevWishlist.find(item => item.id === book.id);
      if (!isAlreadyInWishlist) {
        return [...prevWishlist, book];
      }
      return prevWishlist;
    });
    console.log('Added to wishlist:', book.title);
  };

  // Conditional rendering based on current view
  if (currentView === 'product' && selectedBook) {
    return (
      <ProductSection 
        book={selectedBook}
        onGoBack={handleGoBack}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }

  // Default home page view
  return (
    <>
      <HeroSection/>
      <FeaturedBooks
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
      <AboutSection/>
      <ReviewsSection/>
    </>
  );
};

// Library page wrapper component to handle state
const LibraryPageWrapper = () => {
  const [currentView, setCurrentView] = useState('library');
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Handle Add to Cart
  const handleAddToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
    console.log('Added to cart:', book.title);
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = (book) => {
    setWishlist(prevWishlist => {
      const isAlreadyInWishlist = prevWishlist.find(item => item.id === book.id);
      if (!isAlreadyInWishlist) {
        return [...prevWishlist, book];
      }
      return prevWishlist;
    });
    console.log('Added to wishlist:', book.title);
  };

  // Handle Quick View - navigate to product details
  const handleQuickView = (book) => {
    setSelectedBook(book);
    setCurrentView('product');
  };

  // Handle Go Back - return to library view
  const handleGoBack = () => {
    setCurrentView('library');
    setSelectedBook(null);
  };

  // Conditional rendering based on current view
  if (currentView === 'product' && selectedBook) {
    return (
      <ProductSection 
        book={selectedBook}
        onGoBack={handleGoBack}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }

  // Default library page view
  return (
    <LibraryPage
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleAddToWishlist}
      onQuickView={handleQuickView}
    />
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<LibraryPageWrapper />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartSection />} />
          <Route path="/profile" element={<ProfileSection/>} />
          <Route path="/login" element={<LoginSection/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;