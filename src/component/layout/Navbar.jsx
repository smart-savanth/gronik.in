import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Heart } from 'lucide-react';
// Import centralizedBooksData for search
import { centralizedBooksData } from '../pages/LibrarySection';

const Navbar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (window.innerWidth >= 768) {
        setIsScrolled(currentScrollY > 100);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
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
      // Enhanced search: match title, author, category, tags
      const q = searchQuery.trim().toLowerCase();
      const filtered = centralizedBooksData.filter(book =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        (book.tags && book.tags.some(tag => tag.toLowerCase().includes(q)))
      );
      // Pass filtered results via state (or fallback to query param for now)
      navigate(`/library?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      {isMobile && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gronik-primary/95 backdrop-blur-md shadow-lg border-b border-gronik-secondary/20">
          <div className="flex items-center justify-between h-16 px-4">
            <Link to="/" className="flex items-center">
              <div className="w-32 h-14">
                <img
                  src="/images/logo.png"
                  alt="Gronik Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <button
              className="p-2 text-gronik-light hover:text-gronik-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="bg-gronik-primary/98 backdrop-blur-md border-t border-gronik-secondary/20 shadow-xl">
              <div className="p-4 space-y-3">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gronik-light hover:text-gronik-accent py-2 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/library"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gronik-light hover:text-gronik-accent py-2 font-medium"
                >
                  Library
                </Link>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left text-gronik-light hover:text-gronik-accent py-2 font-medium"
                >
                  About
                </button>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gronik-light hover:text-gronik-accent py-2 font-medium"
                >
                  Contact
                </Link>
                <div className="pt-3 border-t border-gronik-secondary/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search books..."
                      className="w-full bg-gronik-secondary/20 text-gronik-light placeholder-gronik-light/60 px-4 py-2 pr-10 rounded-lg border border-gronik-secondary/30 focus:outline-none focus:border-gronik-accent"
                    />
                    <button
                      onClick={handleSearchSubmit}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    >
                      <Search className="w-4 h-4 text-gronik-light" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gronik-secondary/20">
                  <div className="flex items-center space-x-4">
                    <Link to="/wishlist" className="p-2 rounded-lg relative">
                      <Heart className="w-5 h-5 text-gronik-light" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link to="/cart" className="p-2 rounded-lg relative">
                      <ShoppingCart className="w-5 h-5 text-gronik-light" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg"
                    >
                      <User className="w-5 h-5 text-gronik-light" />
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}

      {/* Desktop Navbar */}
      {!isMobile && (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 bg-gronik-primary/95 backdrop-blur-md shadow-lg border-b border-gronik-secondary/20 
            ${(!isScrolled || isHovering) ? 'translate-y-0' : '-translate-y-full pointer-events-none'
            } transition-transform duration-500 ease-in-out`}
          onMouseEnter={() => isScrolled && setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between h-24 px-2">
            <Link to="/" className="flex items-center absolute left-0 -ml-16">
          <div className="w-40 h-16 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Gronik Logo"
              className="w-full h-full mr-[150px]"
            />
          </div>
        </Link>
              <div className="flex items-center space-x-8 ml-48">
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
              <div className="flex items-center space-x-4">
                <div className="relative">
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gronik-accent/20 rounded transition-all duration-200"
                  >
                    <Search className="w-4 h-4 text-gronik-light hover:text-gronik-accent" />
                  </button>
                </div>
                <Link to="/wishlist" className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group">
                  <Heart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 relative group">
                  <ShoppingCart className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="p-2 hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200 group"
                >
                  <User className="w-5 h-5 text-gronik-light group-hover:text-gronik-accent transition-colors duration-200" />
                </Link>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  Login
                </button>
                <Link
                  to="/admin"
                  className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Floating G Logo - Desktop Only */}
      {!isMobile && (
        <div 
          className={`fixed top-4 left-4 z-50 transition-all duration-500 ease-in-out ${
            isScrolled && !isHovering
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-75 -translate-y-4 pointer-events-none'
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Link 
            to="/" 
            className="block transform hover:scale-125 transition-all duration-300 group cursor-pointer"
          >
            <img 
              src="/images/icon.png" 
              alt="Gronik G Logo"
              className="w-24 h-24 object-contain drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:brightness-125 transition-all duration-300 filter contrast-125 saturate-150"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 8px rgba(168,85,247,0.3)) contrast(1.3) saturate(1.4) brightness(1.1)'
              }}
            />
          </Link>
          
          <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-gronik-accent/20 to-gronik-secondary/20 blur-xl animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Extended Hover Area - Desktop only */}
      {isScrolled && !isMobile && (
        <div 
          className="fixed top-0 left-0 w-full h-32 z-40"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;