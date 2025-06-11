import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cartCount, setCartCount] = useState(3); // Sample cart count
  const [wishlistCount, setWishlistCount] = useState(2); // Sample wishlist count
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollY > 50 ? 'bg-gronik-primary/95 backdrop-blur-md shadow-lg border-b border-gronik-secondary/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('page', '/')}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200 overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Gronik Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('page', '/')}
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('section', 'featured-books')}
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Library
            </button>
            <button 
              onClick={() => handleNavigation('section', 'about')}
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('page', '/contact')}
              className="text-gronik-light hover:text-gronik-accent transition-colors duration-200 font-medium hover:scale-105 transform"
            >
              Contact
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 group">
              <Search className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
            </button>
            <button 
              onClick={() => handleNavigation('page', '/wishlist')}
              className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
            >
              <Heart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>
             <button 
              onClick={() => handleNavigation('page', '/cart')}
              className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
            >
              <ShoppingCart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg">
              Login
            </button>
            <button className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg">
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
            <button 
              onClick={() => handleNavigation('page', '/')}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('section', 'featured-books')}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              Library
            </button>
            <button 
              onClick={() => handleNavigation('section', 'about')}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('page', '/contact')}
              className="block w-full text-left text-gronik-light hover:text-gronik-accent transition-colors duration-200 py-2 font-medium hover:scale-105 transform"
            >
              Contact
            </button>
            <div className="flex items-center space-x-4 pt-4 border-t border-gronik-secondary/20">
              <button className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 group">
                <Search className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
              </button>
              <button 
                onClick={() => handleNavigation('page', '/wishlist')}
                className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
              >
                <Heart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => handleNavigation('page', '/cart')}
                className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group"
              >
                <ShoppingCart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            <button className="w-full bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg">
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;