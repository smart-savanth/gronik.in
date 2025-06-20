import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Play } from 'lucide-react';
import { centralizedBooksData } from '../pages/LibrarySection';

const HeroSection = () => {
  const [activeBook, setActiveBook] = useState(0); // Start with first book
  const [isAnimating, setIsAnimating] = useState(false);

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
      '-2': { x: -140, y: 30, scale: 0.7, zIndex: 1, opacity: 0.7, rotation: -12 },
      '-1': { x: -75, y: 15, scale: 0.85, zIndex: 3, opacity: 0.9, rotation: -6 },
      '0': { x: 0, y: 0, scale: 1, zIndex: 5, opacity: 1, rotation: 0 },
      '1': { x: 75, y: 15, scale: 0.85, zIndex: 3, opacity: 0.9, rotation: 6 },
      '2': { x: 140, y: 30, scale: 0.7, zIndex: 1, opacity: 0.7, rotation: 12 }
    };

    let normalizedDiff = diff;
    if (diff > 2) normalizedDiff = diff - heroBooks.length;
    if (diff < -2) normalizedDiff = diff + heroBooks.length;

    return positions[normalizedDiff.toString()] || { x: 0, y: 0, scale: 0, zIndex: 0, opacity: 0, rotation: 0 };
  };

  const scrollToFeaturedBooks = () => {
    const featuredSection = document.getElementById('featured-books');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1]">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-white/5 rounded-full blur-xl animate-float animation-delay-1500"></div>
      </div>

      {/* Main Content Container - ULTRA COMPACT MOBILE */}
      <div className="relative z-10 min-h-screen flex items-center pt-1 sm:pt-4 md:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-2 sm:gap-6 lg:gap-8 items-center min-h-[95vh] sm:min-h-[85vh]">
            
            {/* Left Content - ULTRA COMPACT MOBILE */}
            <div className="flex flex-col justify-center space-y-1 sm:space-y-3 lg:space-y-4 max-w-full lg:pr-6">
              
              {/* Professional heading - Smooth fade in */}
              <div className="animate-smooth-entry">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D1B3D]">
                  Where every page
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D1B3D]">
                  opens a new world
                </h2>
              </div>

              {/* Description */}
              <div className="animate-smooth-entry">
                <p className="text-sm sm:text-base lg:text-xl text-[#2D1B3D]/80 leading-relaxed font-medium max-w-lg">
                  Discover endless knowledge and imagination in our curated digital library with interactive reading experience.
                </p>
              </div>
              
              {/* Two buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 animate-smooth-entry">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse"></div>
                  <span className="text-[#2D1B3D] font-semibold text-xs sm:text-sm group-hover:text-[#1A0F26]">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse animation-delay-500"></div>
                  <span className="text-[#2D1B3D] font-semibold text-xs sm:text-sm group-hover:text-[#1A0F26]">Instant Access</span>
                </div>
              </div>
              
              {/* Featured Book Tab - Dynamic content from selected book */}
              <div className="animate-smooth-entry">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/30 hover:bg-white/25 transition-all duration-300 group">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-12 sm:w-12 sm:h-16 bg-gradient-to-br from-[#4A3B5C] to-[#2D1B3D] rounded-lg shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#2D1B3D] group-hover:text-[#1A0F26] transition-colors duration-300">
                        {currentBook?.title || 'Select a Book'}
                      </h3>
                      <p className="text-[#2D1B3D]/70 text-xs sm:text-sm group-hover:text-[#2D1B3D]/80 transition-colors duration-300">
                        by {currentBook?.author || 'Unknown Author'}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 fill-current" />
                        <span className="text-[#2D1B3D] text-xs sm:text-sm font-semibold">
                          {currentBook?.rating || '0.0'}
                        </span>
                        <span className="text-[#2D1B3D]/60 text-xs">
                          ({currentBook?.reviews || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* CTA Button - ZERO MOBILE SPACING */}
              <div className="animate-smooth-entry pt-0 sm:pt-2">
                <button 
                  onClick={scrollToFeaturedBooks}
                  className="bg-gradient-to-r from-[#2D1B3D] to-[#4A3B5C] text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-2xl font-semibold text-sm sm:text-base md:text-lg hover:from-[#4A3B5C] hover:to-[#2D1B3D] transition-all duration-500 flex items-center space-x-2 sm:space-x-3 group shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 w-fit"
                >
                  <span>Start Reading Today</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right Side - ULTRA COMPACT MOBILE */}
            <div className="flex justify-center lg:justify-start mt-0 sm:mt-0">
              <div className="relative w-full max-w-2xl h-[250px] xs:h-[280px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[600px]">

                {/* 3D Book Carousel with Uniform Book Sizing */}
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
                          {/* Uniform Book Container */}
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

                {/* Book Indicators - ZERO MOBILE SPACING */}
                <div className="absolute bottom-0 sm:bottom-2 md:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-3 z-20">
                  {heroBooks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleBookClick(index)}
                      className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                        index === activeBook 
                          ? 'bg-white w-5 sm:w-6 md:w-8 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/70 w-2 sm:w-2.5 md:w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Custom Styles */}
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

        /* UNIFORM BOOK SIZING - MOBILE OPTIMIZED */
        .book-card-container {
          width: 180px;
          height: 270px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          padding: 12px;
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
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        
        .book-image-uniform {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          border-radius: 8px;
          display: block;
        }
        
        .book-fallback-uniform {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%);
          border-radius: 8px;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px;
          position: relative;
          overflow: hidden;
        }

        /* MOBILE RESPONSIVE BOOK SIZES - OPTIMIZED */
        @media (min-width: 640px) {
          .book-card-container {
            width: 200px;
            height: 300px;
            padding: 14px;
          }
        }
        
        @media (min-width: 1024px) {
          .book-card-container {
            width: 220px;
            height: 330px;
            padding: 16px;
          }
        }

        /* MOBILE OPTIMIZATIONS - SPACE EFFICIENT */
        @media (max-width: 768px) {
          .book-card-container {
            width: 140px;
            height: 210px;
            padding: 8px;
          }
        }
        
        @media (max-width: 640px) {
          .book-card-container {
            width: 120px;
            height: 180px;
            padding: 6px;
          }
        }
        
        /* EXTRA SMALL MOBILE - COMPACT */
        @media (max-width: 480px) {
          .book-card-container {
            width: 100px;
            height: 150px;
            padding: 5px;
          }
        }
        
        /* VERY SMALL MOBILE - ULTRA COMPACT */
        @media (max-width: 400px) {
          .book-card-container {
            width: 85px;
            height: 128px;
            padding: 4px;
          }
          
          .book-fallback-uniform {
            padding: 4px;
          }
        }

        /* ULTRA SMALL SCREENS */
        @media (max-width: 350px) {
          .book-card-container {
            width: 75px;
            height: 112px;
            padding: 3px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;