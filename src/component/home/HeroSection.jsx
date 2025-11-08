import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Play } from 'lucide-react';
import { centralizedBooksData } from '../pages/LibrarySection';

const HeroSection = ({ cart = [], wishlist = [], onAddToCart, onAddToWishlist, onRemoveFromCart, onRemoveFromWishlist }) => {
  const [activeBook, setActiveBook] = useState(0); // Start with first book
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Filter books marked as hero from centralized data
  const heroBooks = centralizedBooksData.filter(book => book.hero === true);
  
  // Set the center book as active initially
  useEffect(() => {
    if (heroBooks.length > 0) {
      setActiveBook(Math.floor(heroBooks.length / 2));
    }
  }, [heroBooks.length]);

  const handleBookClick = (index) => {
    if (index !== activeBook && !isAnimating) {
      setIsAnimating(true);
      setActiveBook(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const getBookPosition = (index) => {
    const diff = index - activeBook;
    const positions = {
      '-2': { x: -180, y: 40, scale: 0.6, zIndex: 1, opacity: 0.5, rotation: -20 },
      '-1': { x: -100, y: 25, scale: 0.75, zIndex: 3, opacity: 0.8, rotation: -10 },
      '0': { x: 0, y: 0, scale: 1, zIndex: 5, opacity: 1, rotation: 0 },
      '1': { x: 100, y: 25, scale: 0.75, zIndex: 3, opacity: 0.8, rotation: 10 },
      '2': { x: 180, y: 40, scale: 0.6, zIndex: 1, opacity: 0.5, rotation: 20 }
    };

    let normalizedDiff = diff;
    if (diff > 2) normalizedDiff = diff - heroBooks.length;
    if (diff < -2) normalizedDiff = diff + heroBooks.length;

    return positions[normalizedDiff.toString()] || { x: 0, y: 0, scale: 0, zIndex: 0, opacity: 0, rotation: 0 };
  };

  const navigateToLibrary = () => {
    // Navigate to the product page of the current active book
    if (currentBook) {
      navigate(`/product/${currentBook.id}`, { state: { from: 'hero' } });
    } else {
      navigate('/library');
    }
  };

  // Get the current active book data
  const currentBook = heroBooks[activeBook];

  if (!heroBooks || heroBooks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1]">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Hero Books Available</h2>
          <p>Please mark some books as hero in your library.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1]"
      style={{
        backgroundImage: `url('/images/hero.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-white/5 rounded-full blur-xl animate-float animation-delay-1500"></div>
      </div>

      {/* Main Content Container - REDUCED TOP PADDING */}
      <div className="relative z-10 min-h-screen flex items-center pt-8 sm:pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* DESKTOP LAYOUT - IMPROVED SPACING & MOVED SLIGHTLY LEFT */}
          <div className="hidden lg:flex lg:grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[calc(100vh-6rem)]">
            
            {/* Left Content - MOVED SLIGHTLY LEFT & REDUCED SPACING */}
            <div className="flex flex-col justify-center space-y-3 lg:space-y-4 xl:space-y-5 max-w-full text-center lg:text-left w-full lg:pr-8 xl:pr-12 lg:-ml-8 xl:-ml-12">
              
              {/* Main Heading - DECREASED FONT SIZE TO KEEP ON 2 LINES */}
              <div className="animate-smooth-entry">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight text-[#2D1B3D]">
                  Where every page
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight text-[#2D1B3D] mt-1">
                  opens a new world
                </h2>
              </div>

              {/* Description */}
              <div className="animate-smooth-entry">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#2D1B3D]/80 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                  Discover endless knowledge and imagination in our curated digital library with interactive reading experience.
                </p>
              </div>
              
              {/* Feature Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 lg:gap-3 animate-smooth-entry">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 lg:px-4 lg:py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse"></div>
                  <span className="text-[#2D1B3D] font-semibold text-xs lg:text-sm group-hover:text-[#1A0F26]">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 lg:px-4 lg:py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse animation-delay-500"></div>
                  <span className="text-[#2D1B3D] font-semibold text-xs lg:text-sm group-hover:text-[#1A0F26]">Instant Access</span>
                </div>
              </div>
              
              {/* Featured Book Card */}
              <div className="animate-smooth-entry">
                <div
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-4 lg:p-5 xl:p-6 border border-white/30 hover:bg-white/25 transition-all duration-300 group max-w-md mx-auto lg:mx-0 cursor-pointer"
                  onClick={navigateToLibrary}
                  tabIndex={0}
                  role="button"
                  aria-label="Explore the book details"
                  style={{ outline: 'none' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-16 lg:w-14 lg:h-18 xl:w-16 xl:h-20 bg-gradient-to-br from-[#4A3B5C] to-[#2D1B3D] rounded-lg shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                      <Play className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg xl:text-xl font-bold text-[#2D1B3D] group-hover:text-[#1A0F26] transition-colors duration-300 truncate">
                        {currentBook?.title || 'Select a Book'}
                      </h3>
                      <p className="text-[#2D1B3D]/70 text-sm lg:text-base group-hover:text-[#2D1B3D]/80 transition-colors duration-300 truncate">
                        by {currentBook?.author || 'Unknown Author'}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600 fill-current flex-shrink-0" />
                        <span className="text-[#2D1B3D] text-sm lg:text-base font-semibold">
                          {currentBook?.rating || '0.0'}
                        </span>
                        <span className="text-[#2D1B3D]/60 text-xs lg:text-sm truncate">
                          ({currentBook?.reviews || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* CTA Button - EXPLORE NOW */}
              <div className="animate-smooth-entry">
                <button 
                  onClick={navigateToLibrary}
                  className="bg-gradient-to-r from-[#2D1B3D] to-[#4A3B5C] text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 rounded-2xl font-semibold text-base md:text-lg lg:text-xl hover:from-[#4A3B5C] hover:to-[#2D1B3D] transition-all duration-500 flex items-center justify-center space-x-3 group shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 w-full max-w-sm mx-auto lg:w-fit lg:mx-0"
                >
                  <span>Explore The Book</span>
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right Side - Books Carousel */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-lg lg:max-w-2xl xl:max-w-4xl h-[300px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">

                {/* 3D Book Carousel */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {heroBooks.map((book, index) => {
                    const position = getBookPosition(index);
                    const isActive = index === activeBook;
                    
                    return (
                      <div
                        key={book.id}
                        className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                          isActive ? 'cursor-default' : 'hover:scale-105 hover:-translate-y-2'
                        }`}
                        style={{
                          transform: `translateX(${position.x}px) translateY(${position.y}px) scale(${position.scale}) rotate(${position.rotation}deg)`,
                          zIndex: position.zIndex,
                          opacity: position.opacity
                        }}
                        onClick={() => handleBookClick(index)}
                      >
                        <div className={`relative ${isActive ? 'animate-float-slow' : ''}`}>
                          {/* Book Container */}
                          <div className="book-card-container">
                            <div className="book-inner-container">
                              {/* Book Image from Library Data */}
                              <img 
                                src={book.image} 
                                alt={book.title}
                                className="book-image-uniform"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              
                              {/* Fallback Book Design */}
                              <div className="book-fallback-uniform" style={{ display: 'none' }}>
                                {/* Book spine effect */}
                                <div className="absolute left-1 top-1 bottom-1 w-2 bg-gradient-to-b from-slate-600 to-slate-800 rounded-l-lg"></div>
                                
                                {/* Book content */}
                                <div className="text-white text-xs font-bold leading-tight z-10 relative text-center p-2">
                                  {book.title}
                                </div>
                                
                                <div className="flex flex-col items-center z-10 relative">
                                  <div className="text-white/70 text-xs mb-1">{book.author}</div>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-yellow-400 text-xs">★</span>
                                    <span className="text-white text-xs">{book.rating}</span>
                                  </div>
                                </div>
                                
                                {/* Book category badge */}
                                <div className="absolute top-2 right-2 bg-[#2D1B3D]/80 text-white text-xs px-2 py-1 rounded-full">
                                  {book.category}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced shadow for active book */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl scale-110 pointer-events-none"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Book Indicators */}
                <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
                  {heroBooks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleBookClick(index)}
                      className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                        index === activeBook 
                          ? 'bg-white w-6 sm:w-6 md:w-8 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/70 w-2 sm:w-2.5 md:w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT - INCREASED HEADING SIZE & CARD WIDTH */}
          <div className="flex flex-col lg:hidden gap-4 items-center min-h-[calc(100vh-5rem)] justify-center px-4">
            
            {/* 1. Main Heading - INCREASED SIZE FOR MOBILE */}
            <div className="animate-smooth-entry text-center w-full mb-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#2D1B3D] px-2">
                Where every page
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#2D1B3D] px-2">
                opens a new world
              </h2>
            </div>

            {/* 2. Books Carousel - INCREASED WIDTH TO SHOW SIDE BOOKS */}
            <div className="flex justify-center w-full mb-4">
              <div className="relative w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] h-[160px] sm:h-[180px] md:h-[220px]">
                {/* 3D Book Carousel */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {heroBooks.map((book, index) => {
                    const position = getBookPosition(index);
                    const isActive = index === activeBook;
                    
                    return (
                      <div
                        key={book.id}
                        className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                          isActive ? 'cursor-default' : 'hover:scale-105 hover:-translate-y-1'
                        }`}
                        style={{
                          transform: `translateX(${position.x * 0.4}px) translateY(${position.y * 0.4}px) scale(${position.scale}) rotate(${position.rotation * 0.3}deg)`,
                          zIndex: position.zIndex,
                          opacity: position.opacity
                        }}
                        onClick={() => handleBookClick(index)}
                      >
                        <div className={`relative ${isActive ? 'animate-float-slow' : ''}`}>
                          {/* Book Container - INCREASED WIDTH FOR MOBILE */}
                          <div className="book-card-container-mobile">
                            <div className="book-inner-container-mobile">
                              {/* Book Image from Library Data */}
                              <img 
                                src={book.image} 
                                alt={book.title}
                                className="book-image-uniform-mobile"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              
                              {/* Fallback Book Design */}
                              <div className="book-fallback-uniform-mobile" style={{ display: 'none' }}>
                                {/* Book spine effect */}
                                <div className="absolute left-0.5 top-0.5 bottom-0.5 w-1 bg-gradient-to-b from-slate-600 to-slate-800 rounded-l-md"></div>
                                
                                {/* Book content */}
                                <div className="text-white text-xs font-bold leading-tight z-10 relative text-center p-1">
                                  {book.title?.substring(0, 8)}...
                                </div>
                                
                                <div className="flex flex-col items-center z-10 relative">
                                  <div className="text-white/70 text-xs">{book.author?.substring(0, 6)}...</div>
                                  <div className="flex items-center space-x-0.5">
                                    <span className="text-yellow-400 text-xs">★</span>
                                    <span className="text-white text-xs">{book.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced shadow for active book */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-lg scale-110 pointer-events-none"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Book Indicators - REMOVED FOR MOBILE */}
                {/* <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-20">
                  {heroBooks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleBookClick(index)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                        index === activeBook 
                          ? 'bg-white w-4 sm:w-5 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/70 w-1.5 sm:w-2'
                      }`}
                    />
                  ))}
                </div> */}
              </div>
            </div>

            {/* 3. Featured Book Card - INCREASED WIDTH FOR MOBILE */}
            <div className="animate-smooth-entry w-full mb-4">
              <div
                className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/30 hover:bg-white/25 transition-all duration-300 group max-w-md mx-auto cursor-pointer"
                onClick={navigateToLibrary}
                tabIndex={0}
                role="button"
                aria-label="Explore the book details"
                style={{ outline: 'none' }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-16 sm:w-14 sm:h-18 bg-gradient-to-br from-[#4A3B5C] to-[#2D1B3D] rounded-lg shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-[#2D1B3D] group-hover:text-[#1A0F26] transition-colors duration-300 truncate">
                      {currentBook?.title || 'Select a Book'}
                    </h3>
                    <p className="text-[#2D1B3D]/70 text-xs sm:text-sm group-hover:text-[#2D1B3D]/80 transition-colors duration-300 truncate">
                      by {currentBook?.author || 'Unknown Author'}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 sm:w-4 sm:h-4 text-yellow-600 fill-current flex-shrink-0" />
                      <span className="text-[#2D1B3D] text-xs sm:text-sm font-semibold">
                        {currentBook?.rating || '0.0'}
                      </span>
                      <span className="text-[#2D1B3D]/60 text-xs truncate">
                        ({currentBook?.reviews || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Description - PERFECT MOBILE SIZE */}
            <div className="animate-smooth-entry text-center w-full mb-4">
              <p className="text-sm sm:text-base text-[#2D1B3D]/80 leading-relaxed font-medium max-w-sm mx-auto px-2">
                Discover endless knowledge and imagination in our curated digital library with interactive reading experience.
              </p>
            </div>
            
            {/* 5. Feature Badges - MOBILE OPTIMIZED */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5 animate-smooth-entry">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse"></div>
                <span className="text-[#2D1B3D] font-semibold text-sm group-hover:text-[#1A0F26]">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse animation-delay-500"></div>
                <span className="text-[#2D1B3D] font-semibold text-sm group-hover:text-[#1A0F26]">Instant Access</span>
              </div>
            </div>
                
            {/* 6. CTA Button - PERFECT MOBILE SIZE */}
            <div className="animate-smooth-entry w-full">
              <button 
                onClick={navigateToLibrary}
                className="bg-gradient-to-r from-[#2D1B3D] to-[#4A3B5C] text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg hover:from-[#4A3B5C] hover:to-[#2D1B3D] transition-all duration-500 flex items-center justify-center space-x-3 group shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 w-full max-w-sm mx-auto"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Professional Smooth Animations */
        @keyframes smooth-entry {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .animate-smooth-entry {
          animation: smooth-entry 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.4), 0 25px 35px -5px rgba(0, 0, 0, 0.25);
        }

        /* DESKTOP BOOK SIZING - KEEPING YOUR EXACT SIZING */
        .book-card-container {
          width: 280px;
          height: 420px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .book-inner-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        
        .book-image-uniform {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          border-radius: 12px;
          display: block;
        }
        
        .book-fallback-uniform {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%);
          border-radius: 12px;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          position: relative;
          overflow: hidden;
        }

        /* MOBILE BOOK SIZING - INCREASED WIDTH FOR MOBILE */
        .book-card-container-mobile {
          width: 100px;
          height: 150px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 12px 25px rgba(0,0,0,0.4);
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .book-inner-container-mobile {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        
        .book-image-uniform-mobile {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          border-radius: 8px;
          display: block;
        }
        
        .book-fallback-uniform-mobile {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%);
          border-radius: 8px;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          position: relative;
          overflow: hidden;
        }

        /* RESPONSIVE MOBILE ADJUSTMENTS - INCREASED WIDTHS */
        @media (max-width: 380px) {
          .book-card-container-mobile {
            width: 90px;
            height: 135px;
            padding: 5px;
          }
        }
        
        @media (min-width: 480px) {
          .book-card-container-mobile {
            width: 110px;
            height: 165px;
            padding: 7px;
          }
        }
        
        @media (min-width: 640px) {
          .book-card-container-mobile {
            width: 120px;
            height: 180px;
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
