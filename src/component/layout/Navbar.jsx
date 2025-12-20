import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Heart, ChevronDown } from 'lucide-react';
import { centralizedBooksData } from '../pages/LibrarySection';
import { useSelector } from 'react-redux';
import { useGetAllBooksQuery } from '../../utils/booksService';
import WhyEbooksButton from './Button';

const Navbar = ({ cartCount = 0, wishlistCount = 0,isAdminRoute }) => {
  const [whyButtonHover, setWhyButtonHover] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveringFloatingLogo, setHoveringFloatingLogo] = useState(false);
const [hoveringNavbar, setHoveringNavbar] = useState(false);
  
  // Simplified state: We only need to know if we are on desktop and scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Search Suggestions State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Redux/Auth Hooks
  const user = useSelector((state) => state.userAuth.user);
  // Destructuring booksResponse is kept for completeness, though not strictly used in the UI logic here
  const { data: booksResponse, isLoading, isError } = useGetAllBooksQuery({
      page: 1,
      pageSize: 10,
    });



  // ---- CART BADGE STATE (LOCAL STORAGE + LISTENERS) ----
  const [localCartCount, setLocalCartCount] = useState(() => {
    try {
      const local = JSON.parse(localStorage.getItem("cart")) || [];
      return local.length;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const update = () => {
      try {
        const local = JSON.parse(localStorage.getItem("cart")) || [];
        setLocalCartCount(local.length);
      } catch {
        setLocalCartCount(0);
      }
    };

    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  // FINAL COUNT TO SHOW IN BADGE
  const finalCartCount = localCartCount || cartCount;


  // --- SCROLL & MOBILE HANDLERS ---
  useEffect(() => {
    const checkMobile = () => {
      // Use 1024px to align with standard Tailwind 'lg' breakpoint
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      // Only track scroll for desktop
      if (window.innerWidth >= 1024) {
        setIsScrolled(window.scrollY > 100);
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

  // Scroll to section when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        // Clear the state
        navigate(location.pathname, { replace: true, state: {} });
      }, 300);
    }
  }, [location, navigate]);

  // detect pointer within top-area (desktop only) so hovering the top of the screen
// triggers floatingLogo behaviour without placing any clickable overlay above the navbar
useEffect(() => {
  if (isMobile) return; // skip for touch devices

  const threshold = 120; // px from top — tweak to your liking
  const handleMove = (e) => {
    const hovering = e.clientY <= threshold;
    // update only when value changes (avoids excessive re-renders)
    setHoveringFloatingLogo(prev => (prev === hovering ? prev : hovering));
  };

  window.addEventListener('mousemove', handleMove);
  // also check pointer leaving the window (hide)
  const handleLeave = () => setHoveringFloatingLogo(false);
  window.addEventListener('mouseleave', handleLeave);
  window.addEventListener('blur', handleLeave);

  return () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseleave', handleLeave);
    window.removeEventListener('blur', handleLeave);
  };
}, [isMobile]);


  // --- SEARCH LOGIC ---
  const generateSuggestions = (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const q = query.toLowerCase().trim();
    const allSuggestions = [];

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

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      generateSuggestions(value);
    }, 200);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (suggestion = null) => {
    let searchTerm = '';
    
    if (suggestion) {
      if (suggestion.type === 'book') {
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
// derived flags --------------------
// show floating G logo when page is scrolled AND the Why button is hovered,
// and we are not interacting with the navbar/search/menu.



// show navbar when WHY button is NOT hovered AND one of the normal conditions applies.
// (when whyButtonHover === true we force-hide the navbar)
const shouldShowNavbar = !whyButtonHover && (
  !isScrolled || isSearchFocused || hoveringFloatingLogo || hoveringNavbar || isMenuOpen
);  // --- LOGO NAVIGATION FIX ---
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      // Only scroll to top if not already at the top
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
const floatingLogoVisible =
  !shouldShowNavbar && (  // ⬅ NEW CONDITION ADDED
    (isScrolled && !hoveringNavbar && !isSearchFocused && !isMenuOpen) ||
    (whyButtonHover && !hoveringNavbar)
  );
  const renderSearchInput = (isMobileVersion = false) => (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={handleSearchFocus}
          placeholder={isMobileVersion ? "Search..." : "Search books, authors, categories..."}
          className={`w-full bg-gronik-secondary/20 text-gronik-light placeholder-gronik-light/60 px-3 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gronik-accent focus:bg-gronik-secondary/30 focus:shadow-lg transition-all duration-200 ${
            isMobileVersion ? 'text-xs border-2 border-white/40 pr-3' : 'border border-gronik-secondary/30 pr-8'
          } ${showSuggestions ? 'rounded-b-none' : ''}`}
        />
        {!isMobileVersion && (
          <button
            onClick={() => handleSearchSubmit()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 hover:bg-gronik-accent/20 rounded transition-all duration-200"
          >
            <Search className="w-3.5 h-3.5 text-gronik-light hover:text-gronik-accent" />
          </button>
        )}
        
        {showSuggestions && suggestions.length > 0 && !isMobileVersion && (
          // ChevronDown button/icon for visual cue (not needed for functionality)
          <ChevronDown className="absolute right-7 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gronik-light/60" />
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className={`absolute top-full left-0 right-0 backdrop-blur-xl rounded-b-lg shadow-2xl z-50 max-h-80 overflow-y-auto ${
            isMobileVersion 
              ? 'bg-white border-2 border-white/80' 
              : 'bg-white/95 border border-gronik-secondary/30 border-t-0'
          }`}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.text}-${index}`}
              onClick={() => handleSearchSubmit(suggestion)}
              className={`flex items-center space-x-3 px-3 py-3 cursor-pointer transition-colors duration-150 border-b last:border-b-0 group ${
                isMobileVersion 
                  ? `${selectedSuggestionIndex === index ? 'bg-[#9B7BB8]/20' : 'hover:bg-[#9B7BB8]/10'} border-gray-200`
                  : `${selectedSuggestionIndex === index ? 'bg-[#9B7BB8]/15' : 'hover:bg-[#9B7BB8]/10'} border-gronik-secondary/10`
              }`}
            >
              <div className="flex-shrink-0">
                {suggestion.type === 'book' && suggestion.image ? (
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.text}
                    className={isMobileVersion ? "w-10 h-12 object-cover rounded shadow-md" : "w-8 h-10 object-cover rounded"}
                  />
                ) : (
                  <div className={`bg-gronik-secondary/20 rounded flex items-center justify-center ${
                    isMobileVersion ? 'w-10 h-12' : 'w-8 h-10'
                  }`}>
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`font-bold truncate ${
                  isMobileVersion ? 'text-[#2D1B3D] text-sm' : 'text-[#2D1B3D] text-sm'
                }`}>
                  {suggestion.text}
                </div>
                <div className="text-xs flex items-center space-x-2 text-[#2D1B3D]/60">
                  <span className="font-semibold">{suggestion.category}</span>
                </div>
              </div>
              
              {!isMobileVersion && (
                <div className="flex-shrink-0 text-[#9B7BB8] opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Using ChevronDown as a visual right-arrow cue */}
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </div>
              )}
            </div>
          ))}
          
          {searchQuery.trim() && (
            <div
              onClick={() => handleSearchSubmit()}
              className={`flex items-center space-x-3 px-3 py-3 cursor-pointer transition-colors duration-150 border-t-2 ${
                isMobileVersion
                  ? 'hover:bg-[#9B7BB8]/10 border-gray-300 bg-gray-50'
                  : 'hover:bg-[#9B7BB8]/10 border-gronik-secondary/20 bg-gronik-secondary/5'
              }`}
            >
              <Search className={`w-4 h-4 text-[#9B7BB8]`} />
              <span className={`text-sm font-bold text-[#2D1B3D]`}>
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
  <nav className="fixed top-0 left-0 right-0 z-[9999] bg-gronik-primary backdrop-blur-md shadow-lg border-b border-gronik-secondary/20">
    <div className="flex flex-col">

      {/* TOP BAR */}
      <div className="flex items-center justify-between h-16 px-3 gap-3 w-full">

        {/* LOGO */}
        <div className="flex-shrink-0">
          <a href="/" onClick={handleLogoClick}>
            <img
              src="/images/logo.png"
              alt="Gronik Logo"
              className="h-10 object-contain"
            />
          </a>
        </div>

        {/* SEARCH BOX (same for tablet + mobile) */}
      

  <div className="ml-4 flex justify-center w-[280px] md:w-[360px]">
    <div className="w-full max-w-[360px]">
      {renderSearchInput(true)}
    </div>
  </div>

        {/* CART + MENU BUTTONS */}
        <div className="flex items-center gap-2">
          
          {/* CART */}
          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="relative p-2 text-gronik-light hover:text-gronik-accent"
          >
            <ShoppingCart className="w-6 h-6" />

            {finalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {finalCartCount}
              </span>
            )}
          </Link>

          {/* MENU */}
          <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="p-2 flex items-center justify-center text-gronik-light hover:text-gronik-accent"
>
  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="bg-gronik-primary/98 backdrop-blur-xl border-t border-white/10 shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-5 space-y-4">

            {/* LINKS */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gronik-light hover:text-gronik-accent block font-medium">
              Home
            </Link>

            <Link to="/library" onClick={() => setIsMenuOpen(false)} className="text-gronik-light hover:text-gronik-accent block font-medium">
              Library
            </Link>

            <button
              onClick={() => scrollToSection("about")}
              className="text-gronik-light hover:text-gronik-accent block w-full text-left font-medium"
            >
              About
            </button>

            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gronik-light hover:text-gronik-accent block font-medium">
              Contact
            </Link>

            {/* ACCOUNT MENU */}
            <div className="border-t border-white/20 pt-4 space-y-3">

            <Link
                to="/my-library"
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between text-gronik-light hover:text-gronik-accent"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> My Library
                </span>
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between text-gronik-light hover:text-gronik-accent"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-5 h-5" /> Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between text-gronik-light hover:text-gronik-accent"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" /> Cart
                </span>
                {finalCartCount > 0 && (
                  <span className="bg-gronik-accent text-white text-xs rounded-full px-2 py-0.5">
                    {finalCartCount}
                  </span>
                )}
              </Link>

              <Link
                to={user ? "/profile" : "/login"}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-gronik-light hover:text-gronik-accent"
              >
                <User className="w-5 h-5" />
                {user ? "Profile" : "Login"}
              </Link>

              {/* ADMIN BUTTON */}
              {user?.role_name === "ADMIN" && (
  <Link
    to="/admin"
    onClick={() => setIsMenuOpen(false)}
    className="block bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white px-4 py-2 rounded-lg font-medium text-center"
  >
    Admin
  </Link>
)}

            </div>

          </div>
        </div>
      )}
    </div>
  </nav>
)}


      {/* Desktop Navbar (Hidden/Shown based on scroll) */}
      {!isMobile && (
       <div
 className={`
    fixed top-0 left-0 right-0 z-[9999]
    transition-all duration-300 ease-in-out
    ${shouldShowNavbar ? "translate-y-0" : "-translate-y-full"}
  `}
  onMouseEnter={() => setHoveringNavbar(true)}
  onMouseLeave={() => setHoveringNavbar(false)}
>
    <nav
      className={`
        w-full mx-auto px-8
        ${isScrolled 
          ? 'h-20 bg-gronik-primary shadow-lg border-b border-gronik-secondary/20' 
          : 'h-20 bg-gronik-primary shadow-lg border-b border-gronik-secondary/20'
        }
      `}
    >

            <div className="flex items-center justify-between h-full w-full">
              
              {/* Logo */}
              <a
                href="/"
                onClick={handleLogoClick}
                className="flex items-center"
              >
                <img
                  src="/images/logo.png"
                  alt="Gronik Logo"
                  className={`object-contain transition-all duration-300 ${isScrolled ? 'h-14' : 'h-14'}`}
                />
              </a>

              {/* Menu Items (Always visible when desktop) */}
              <div className="flex items-center space-x-10">
                <Link to="/" className="text-gronik-light hover:text-gronik-accent font-medium transition-transform hover:scale-105">Home</Link>
                <Link to="/library" className="text-gronik-light hover:text-gronik-accent font-medium transition-transform hover:scale-105">Library</Link>
                <button onClick={() => scrollToSection("about")} className="text-gronik-light hover:text-gronik-accent font-medium transition-transform hover:scale-105">About</button>
                <Link to="/contact" className="text-gronik-light hover:text-gronik-accent font-medium transition-transform hover:scale-105">Contact</Link>
              </div>

              {/* Right Side */}
              <div className="flex items-center space-x-5 transform-gpu will-change-transform">
                <div className="w-[350px]">
                  {renderSearchInput(false)}
                </div>

{/* Icons */}
<Link
to="/my-library"
className="relative p-2 rounded-lg  transition-transform duration-200 hover:-translate-y-2"
>
<BookOpen className="w-5 h-5 text-gronik-light" />          
</Link>
<Link
  to="/wishlist"
  className="relative p-2 rounded-lg  transition-transform duration-200 hover:-translate-y-2"
>
  <Heart className="w-5 h-5 text-gronik-light" />
  {wishlistCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {wishlistCount}
    </span>
  )}
</Link>

<Link
  to="/cart"
  className="relative p-2 rounded-lg transition-transform duration-200 hover:-translate-y-2"
>
  <ShoppingCart className="w-5 h-5 text-gronik-light" />
  {finalCartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-gronik-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {finalCartCount}
    </span>
  )}
</Link>

<Link
  to={user ? "/profile" : "/login"}
  className="relative p-2 rounded-lg  transition-transform duration-200 hover:-translate-y-2"
>
  <User className="w-5 h-5 text-gronik-light" />
</Link>


                {/* Login/Admin Button */}
                {!user ? (
  <button
    onClick={() => navigate("/login")}
    className="px-6 py-2 bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white rounded-lg shadow-lg transition-transform hover:scale-105"
  >
    Login
  </button>
) : user.role_name === "ADMIN" ? (
  <Link
    to="/admin"
    className="px-6 py-2 bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white rounded-lg shadow-lg transition-transform hover:scale-105"
  >
    Admin
  </Link>
) : null}

              </div>
            </div>
          </nav>
        </div>
      )}
      
      {/* Floating G Logo - Desktop Only (Simplified CSS) */}
{!isMobile && (
  <div
    className={`
      fixed top-0 left-0 w-full h-[130px] z-[9998]
      transition-all duration-300 ease-in-out
      ${floatingLogoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}
    // No pointer-events handlers here — we rely on global mousemove instead
    style={{ pointerEvents: "none" }} // let clicks pass through to navbar/content
  >
    {/* Only the logo itself accepts pointer events/clicks */}
    <div
      className="absolute -left-1 top-2 cursor-pointer"
      style={{ pointerEvents: "auto" }}
      onClick={handleLogoClick}
      // keep accessible: keyboard activation too
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLogoClick(e); }}
    >
      <img
        src="/images/icon.png"
        alt="Gronik G Logo"
        className="w-24 h-24 object-contain"
      />
      <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-gronik-accent/20 to-gronik-secondary/20 blur-xl animate-pulse pointer-events-none" />
    </div>
  </div>
)}



      {/* Spacer to prevent content from hiding behind fixed Navbar */}
      <div className={`${isMobile ? 'h-16' : 'h-20'}`}></div>
      {!isAdminRoute && <WhyEbooksButton setWhyButtonHover={setWhyButtonHover} />}
    </>
  );
};

export default Navbar;