import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Heart, ChevronDown } from 'lucide-react';
// Import centralizedBooksData for search
import { centralizedBooksData } from '../pages/LibrarySection';

const Navbar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Search Suggestions State
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const searchTimeoutRef = useRef(null);

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

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = query.toLowerCase().trim();
    const allSuggestions = [];

    // Get book matches
    centralizedBooksData.forEach(book => {
      // Title matches
      if (book.title.toLowerCase().includes(q)) {
        allSuggestions.push({
          type: 'book',
          text: book.title,
          author: book.author,
          category: book.category,
          image: book.image,
          id: book.id,
          priority: book.title.toLowerCase().startsWith(q) ? 1 : 2
        });
      }
      
      // Author matches
      if (book.author.toLowerCase().includes(q) && !allSuggestions.find(s => s.text === book.author && s.type === 'author')) {
        allSuggestions.push({
          type: 'author',
          text: book.author,
          category: 'Author',
          priority: book.author.toLowerCase().startsWith(q) ? 1 : 3
        });
      }
      
      // Category matches
      if (book.category.toLowerCase().includes(q) && !allSuggestions.find(s => s.text === book.category && s.type === 'category')) {
        allSuggestions.push({
          type: 'category',
          text: book.category,
          category: 'Category',
          priority: book.category.toLowerCase().startsWith(q) ? 1 : 4
        });
      }
      
      // Tag matches
      if (book.tags) {
        book.tags.forEach(tag => {
          if (tag.toLowerCase().includes(q) && !allSuggestions.find(s => s.text === tag && s.type === 'tag')) {
            allSuggestions.push({
              type: 'tag',
              text: tag,
              category: 'Tag',
              priority: tag.toLowerCase().startsWith(q) ? 1 : 5
            });
          }
        });
      }
    });

    // Sort by priority and limit results
    const sortedSuggestions = allSuggestions
      .sort((a, b) => a.priority - b.priority || a.text.localeCompare(b.text))
      .slice(0, 8);

    setSuggestions(sortedSuggestions);
    setShowSuggestions(sortedSuggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  // Debounced search
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      generateSuggestions(value);
    }, 200);
  };

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

  const handleSearchSubmit = (suggestion = null) => {
    let searchTerm = '';
    
    if (suggestion) {
      if (suggestion.type === 'book') {
        // Navigate to specific book
        navigate(`/product/${suggestion.id}`);
        setSearchQuery('');
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        return;
      } else {
        searchTerm = suggestion.text;
      }
    } else {
      searchTerm = searchQuery.trim();
    }
    
    if (searchTerm) {
      navigate(`/library?search=${encodeURIComponent(searchTerm)}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleKeyPress = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearchSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSearchSubmit(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearchSubmit();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        searchRef.current?.blur();
        break;
    }
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.length >= 2) {
      generateSuggestions(searchQuery);
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-4 h-4 text-[#9B7BB8]" />;
      case 'author':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'category':
        return <div className="w-4 h-4 bg-green-500 rounded-sm" />;
      case 'tag':
        return <div className="w-4 h-4 bg-orange-500 rounded-full" />;
      default:
        return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderSearchInput = (isMobileVersion = false) => (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={handleSearchFocus}
          placeholder="Search books, authors, categories..."
          className={`w-full bg-gronik-secondary/20 text-gronik-light placeholder-gronik-light/60 px-4 py-2 pr-10 rounded-lg border border-gronik-secondary/30 focus:outline-none focus:border-gronik-accent focus:bg-gronik-secondary/30 focus:shadow-lg transition-all duration-200 ${
            isMobileVersion ? 'text-sm' : ''
          } ${showSuggestions ? 'rounded-b-none' : ''}`}
        />
        <button
          onClick={() => handleSearchSubmit()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gronik-accent/20 rounded transition-all duration-200"
        >
          <Search className="w-4 h-4 text-gronik-light hover:text-gronik-accent" />
        </button>
        
        {showSuggestions && suggestions.length > 0 && (
          <>
            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-3 h-3 text-gronik-light/60" />
          </>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border border-gronik-secondary/30 border-t-0 rounded-b-lg shadow-2xl z-50 max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.text}-${index}`}
              onClick={() => handleSearchSubmit(suggestion)}
              className={`flex items-center space-x-3 px-4 py-3 hover:bg-[#9B7BB8]/10 cursor-pointer transition-colors duration-150 border-b border-gronik-secondary/10 last:border-b-0 ${
                selectedSuggestionIndex === index ? 'bg-[#9B7BB8]/15' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {suggestion.type === 'book' && suggestion.image ? (
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.text}
                    className="w-8 h-10 object-cover rounded"
                  />
                ) : (
                  <div className="w-8 h-10 bg-gronik-secondary/20 rounded flex items-center justify-center">
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[#2D1B3D] truncate text-sm">
                  {suggestion.text}
                </div>
                <div className="text-xs text-[#2D1B3D]/60 flex items-center space-x-2">
                  <span>{suggestion.category}</span>
                  {suggestion.author && suggestion.type === 'book' && (
                    <>
                      <span>•</span>
                      <span>by {suggestion.author}</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0 text-[#9B7BB8] opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </div>
            </div>
          ))}
          
          {searchQuery.trim() && (
            <div
              onClick={() => handleSearchSubmit()}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-[#9B7BB8]/10 cursor-pointer transition-colors duration-150 border-t-2 border-gronik-secondary/20 bg-gronik-secondary/5"
            >
              <Search className="w-4 h-4 text-[#9B7BB8]" />
              <span className="text-sm font-medium text-[#2D1B3D]">
                Search for "<span className="text-[#9B7BB8]">{searchQuery}</span>"
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Navbar */}
      {isMobile && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gronik-primary/95 backdrop-blur-md shadow-lg border-b border-gronik-secondary/20">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="w-28 h-10 sm:w-32 sm:h-12">
                  <img
                    src="/images/logo.png"
                    alt="Gronik Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <button
                className="p-2 text-gronik-light hover:text-gronik-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
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
                  {renderSearchInput(true)}
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white px-4 py-2 rounded-lg font-medium text-sm"
                    >
                      Login
                    </button>
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white px-4 py-2 rounded-lg font-medium text-sm text-center"
                    >
                      Admin
                    </Link>
                  </div>
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
              <div className="flex items-center space-x-10 ml-48">
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
              <div className="flex items-center space-x-5 ml-12">
                <div className="w-64 lg:w-72 xl:w-80">
                  {renderSearchInput(false)}
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