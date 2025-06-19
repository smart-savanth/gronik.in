import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, Play } from 'lucide-react';

const HeroSection = () => {
  const [activeBook, setActiveBook] = useState(2); // Center book is active by default
  const [isAnimating, setIsAnimating] = useState(false);

  // Your book data - replace with actual book details
  const books = [
    { id: 1, title: "The Art of Learning", author: "Josh Waitzkin", rating: 4.8, image: "/images/book1.png" },
    { id: 2, title: "Ego is the Enemy", author: "Ryan Holiday", rating: 4.9, image: "/images/book2.png" },
    { id: 3, title: "Mind Management", author: "David Kadavy", rating: 5.0, image: "/images/book3.png" },
    { id: 4, title: "Manifest", author: "Roxie Nafousi", rating: 4.7, image: "/images/book4.png" },
    { id: 5, title: "Atomic Habits", author: "James Clear", rating: 4.6, image: "/images/book5.png" }
  ];

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
    if (diff > 2) normalizedDiff = diff - books.length;
    if (diff < -2) normalizedDiff = diff + books.length;

    return positions[normalizedDiff.toString()] || { x: 0, y: 0, scale: 0, zIndex: 0, opacity: 0, rotation: 0 };
  };

  const scrollToFeaturedBooks = () => {
    const featuredSection = document.getElementById('featured-books');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1]">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/5 rounded-full blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-white/5 rounded-full blur-xl animate-float animation-delay-1500"></div>
      </div>

      {/* Main Content Container - Reduced top padding */}
      <div className="relative z-10 min-h-screen flex items-center pt-4 md:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[85vh]">
            
            {/* Left Content - Reduced spacing */}
            <div className="flex flex-col justify-center space-y-3 lg:space-y-4 max-w-full lg:pr-6">
              
              {/* Combined heading - New stunning animation */}
              <div className="overflow-hidden">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D1B3D] animate-glow-in">
                  Where every page
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D1B3D] animate-glow-in animation-delay-300">
                  opens a new world
                </h2>
              </div>

              {/* Description */}
              <div className="animate-fade-in-up animation-delay-600">
                <p className="text-base sm:text-lg lg:text-xl text-[#2D1B3D]/80 leading-relaxed font-medium max-w-lg">
                  Discover endless knowledge and imagination in our curated digital library with interactive reading experience.
                </p>
              </div>
              
              {/* Two buttons - Reduced spacing */}
              <div className="flex flex-wrap items-center gap-3 animate-scale-in animation-delay-800">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse"></div>
                  <span className="text-[#2D1B3D] font-semibold text-sm group-hover:text-[#1A0F26]">Premium Quality</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
                  <div className="w-2 h-2 bg-[#2D1B3D] rounded-full animate-pulse animation-delay-500"></div>
                  <span className="text-[#2D1B3D] font-semibold text-sm group-hover:text-[#1A0F26]">Instant Access</span>
                </div>
              </div>
              
              {/* Featured Book Tab - Reduced spacing */}
              <div className="animate-slide-in-left animation-delay-1000">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:bg-white/25 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-16 bg-gradient-to-br from-[#4A3B5C] to-[#2D1B3D] rounded-lg shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#2D1B3D] group-hover:text-[#1A0F26]">{books[activeBook].title}</h3>
                      <p className="text-[#2D1B3D]/70 text-sm group-hover:text-[#2D1B3D]/80">{books[activeBook].author}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-600 fill-current" />
                        <span className="text-[#2D1B3D] text-sm font-semibold">{books[activeBook].rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* CTA Button */}
              <div className="animate-bounce-in animation-delay-1200">
                <button 
                  onClick={scrollToFeaturedBooks}
                  className="bg-gradient-to-r from-[#2D1B3D] to-[#4A3B5C] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:from-[#4A3B5C] hover:to-[#2D1B3D] transition-all duration-500 flex items-center space-x-3 group shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 w-fit"
                >
                  <span>Start Reading Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Right Side - Enhanced Book Carousel */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-2xl h-[450px] sm:h-[500px] lg:h-[550px] xl:h-[600px]">

                {/* 3D Book Carousel with Fixed Sizes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {books.map((book, index) => {
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
                          {/* Fixed Size Book Container - Exact Card Fit */}
                          <div className="book-container-fixed">
                            {/* Book Image or Fallback */}
                            {book.image ? (
                              <div className="book-image-wrapper">
                                <img 
                                  src={book.image} 
                                  alt={book.title}
                                  className="book-image"
                                />
                              </div>
                            ) : (
                              <div className="book-fallback">
                                {/* Book spine effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-slate-600 to-slate-800 rounded-l-xl"></div>
                                
                                {/* Book content */}
                                <div className="text-white text-sm sm:text-base lg:text-lg font-bold leading-tight z-10 relative">
                                  {book.title}
                                </div>
                                
                                <div className="flex flex-col items-end z-10 relative">
                                  <div className="text-white/70 text-xs sm:text-sm mb-2">{book.author}</div>
                                  <div className="flex items-center space-x-1">
                                    <span className="text-yellow-400 text-sm">★</span>
                                    <span className="text-white text-sm">{book.rating}</span>
                                  </div>
                                </div>
                                
                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/20 rounded-full"></div>
                                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"></div>
                              </div>
                            )}
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

                {/* Book Indicators - Reduced gap from books */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                  {books.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleBookClick(index)}
                      className={`h-2.5 sm:h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                        index === activeBook 
                          ? 'bg-white w-6 sm:w-8 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/70 w-2.5 sm:w-3'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        /* New Stunning Animations */
        @keyframes glow-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
            text-shadow: 0 0 20px rgba(45, 27, 61, 0.5);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.02);
            text-shadow: 0 0 30px rgba(45, 27, 61, 0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 15px rgba(45, 27, 61, 0.3);
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(100px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.95) translateY(5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
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
        
        .animate-glow-in {
          animation: glow-in 1.2s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1200 {
          animation-delay: 1.2s;
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

        /* Fixed Book Container Styles - EXACT CARD FIT */
        .book-container-fixed {
          width: 180px !important;
          height: 270px !important;
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0,0,0,0.5);
          background: #fff;
        }
        
        .book-image-wrapper {
          width: 100% !important;
          height: 100% !important;
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #fff;
        }
        
        .book-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          border-radius: 0.75rem;
          display: block !important;
          background: #fff;
        }
        
        .book-fallback {
          width: 100% !important;
          height: 100% !important;
          background: linear-gradient(135deg, #4A5568 0%, #2D3748 50%, #1A202C 100%);
          border-radius: 0.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem;
          border: 2px solid #E2E8F0;
          position: relative;
          overflow: hidden;
        }

        /* Responsive Book Sizes - FIXED CARD DIMENSIONS */
        @media (min-width: 640px) {
          .book-container-fixed {
            width: 200px !important;
            height: 300px !important;
          }
        }
        
        @media (min-width: 1024px) {
          .book-container-fixed {
            width: 220px !important;
            height: 330px !important;
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .book-container-fixed {
            width: 160px !important;
            height: 240px !important;
          }
        }
        
        @media (max-width: 640px) {
          .book-container-fixed {
            width: 140px !important;
            height: 210px !important;
          }
        }
        
        @media (max-width: 480px) {
          .book-container-fixed {
            width: 120px !important;
            height: 180px !important;
          }
        }
        
        @media (max-width: 400px) {
          .book-container-fixed {
            width: 100px !important;
            height: 150px !important;
          }
          
          .book-fallback {
            padding: 0.75rem;
          }
          
          .book-fallback .text-sm { font-size: 0.6rem; }
          .book-fallback .text-base { font-size: 0.7rem; }
          .book-fallback .text-lg { font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;