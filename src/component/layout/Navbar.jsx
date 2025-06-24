import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cartCount, setCartCount] = useState(3); // Sample cart count
  const [wishlistCount, setWishlistCount] = useState(2); // Sample wishlist count
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // First navigate to home page if not already there
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (type, path) => {
    if (type === 'section') {
      scrollToSection(path);
    } else if (type === 'page') {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gronik-primary/95 backdrop-blur-md shadow-lg border-b border-gronik-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Significantly Increased Size */}
          <Link to="/" className="flex items-center justify-center cursor-pointer">
           <div className="w-20 h-8 xs:w-22 xs:h-9 sm:w-24 sm:h-10 md:w-28 md:h-11 lg:w-32 lg:h-12 flex items-center justify-center">
              <img 
                src="/images/logo.png" 
                alt="Gronik Logo"
                className="w-full h-full object-contain max-w-full max-h-full"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Home
            </Link>
            <Link 
              to="/library"
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Library
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              About
            </button>
            <Link 
              to="/contact"
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Section */}
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search books..."
                  className="bg-gronik-secondary/20 text-gronik-light placeholder-gronik-light/60 px-4 py-2 pr-10 rounded-lg border border-gronik-secondary/30 focus:outline-none focus:border-gronik-accent focus:bg-gronik-secondary/30 focus:shadow-lg transition-all duration-200 w-64"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="absolute right-2 p-1 hover:bg-gronik-accent/20 rounded transition-all duration-200 hover:shadow-md"
                >
                  <Search className="w-4 h-4 text-gronik-light hover:text-gronik-accent" />
                </button>
              </div>
            </div>

            <Link 
              to="/wishlist"
              className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
            >
              <Heart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/cart"
              className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
            >
              <ShoppingCart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Button */}
            <Link 
              to="/profile"
              className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 group"
            >
              <User className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
            </Link>

            {/* Updated Login Button - Now navigates to /login */}
            <button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
            >
              Login
            </button>
            <button 
              onClick={() => handleNavigation('page', '/admin')}
              className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gronik-light hover:text-gronik-accent transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gronik-primary/95 backdrop-blur-md rounded-lg mt-2 p-4 space-y-4 border border-gronik-secondary/20 shadow-lg animate-fade-in">
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              Home
            </Link>
            <Link 
              to="/library"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              Library
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              About
            </button>
            <Link 
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              Contact
            </Link>
            
            {/* Mobile Search */}
            <div className="pt-4 border-t border-gronik-secondary/20">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search books..."
                    className="w-full bg-gronik-secondary/20 text-gronik-light placeholder-gronik-light/60 px-4 py-2 pr-10 rounded-lg border border-gronik-secondary/30 focus:outline-none focus:border-gronik-accent focus:bg-gronik-secondary/30 transition-all duration-200"
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gronik-secondary/20 rounded transition-colors duration-200"
                  >
                    <Search className="w-4 h-4 text-gronik-light hover:text-gronik-accent" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-gronik-secondary/20">
              <Link 
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
              >
                <Heart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
              >
                <ShoppingCart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 group"
              >
                <User className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
              </Link>
            </div>
            {/* Updated Mobile Login Button - Now navigates to /login */}
            <button 
              onClick={() => {
                navigate('/login');
                setIsMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;