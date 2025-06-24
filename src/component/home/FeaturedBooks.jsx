import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

// Import the centralized books data (named export)
import { centralizedBooksData } from '../pages/LibrarySection';

const FeaturedBooksSection = ({ onAddToCart, onAddToWishlist, onQuickView, onViewAllBooks }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToWishlist, setAddedToWishlist] = useState({});

  // Get only featured books from centralized data
  const featuredBooks = centralizedBooksData.filter(book => book.featured === true);

  const handleAddToCart = (book) => {
    onAddToCart && onAddToCart(book);
    setAddedToCart(prev => ({ ...prev, [book.id]: true }));
    
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [book.id]: false }));
    }, 2000);
  };

  const handleAddToWishlist = (book) => {
    onAddToWishlist && onAddToWishlist(book);
    setAddedToWishlist(prev => ({ ...prev, [book.id]: !prev[book.id] }));
  };

  const handleQuickView = (book) => {
    onQuickView && onQuickView(book);
  };

  const handleViewAllBooks = () => {
    onViewAllBooks && onViewAllBooks();
  };

  return (
    <section id="featured-books" className="py-20 relative overflow-hidden">
      {/* Background with matching hero colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9B7BB8] via-[#8A6BA3] to-[#2D1B3D]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#9B7BB8]/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Made more minimalistic for mobile */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-white/20">
            <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-[#2D1B3D] mr-1 sm:mr-2" />
            <span className="text-[#2D1B3D] font-medium text-xs sm:text-base">Featured Collection</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#2D1B3D] mb-6 sm:mb-8 leading-tight">
            Premium E-Books
          </h2>
        </div>

        {/* Books Grid - Improved mobile design with better space utilization */}
        <div className="flex justify-center mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-10 w-full max-w-full px-2 sm:px-6 lg:px-0">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative flex justify-center"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card with improved spacing and sizing */}
                <div className="relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-2xl p-3 sm:p-6 lg:p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] w-full max-w-none sm:max-w-[280px] lg:max-w-[320px] h-auto flex flex-col">

                  {/* Category Badge - Hidden on mobile */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
                    <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-white/20">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Image Container - Better proportions */}
                  <div className="relative mb-3 sm:mb-4 lg:mb-4 flex justify-center mt-2 sm:mt-6">
                    <div className="relative w-24 sm:w-48 lg:w-44 h-32 sm:h-64 lg:h-60 rounded-lg overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Quick View Overlay - Hidden on mobile */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-[#2D1B3D]/80 via-transparent to-transparent transition-opacity duration-300 hidden sm:block ${
                        hoveredBook === book.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                          <button 
                            onClick={() => handleQuickView(book)}
                            className="w-full bg-white/90 backdrop-blur-sm text-[#2D1B3D] py-1.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-white transition-colors duration-200 text-xs sm:text-sm transform hover:scale-105"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Details - Removed description and improved spacing */}
                  <div className="text-center space-y-2 sm:space-y-3 lg:space-y-3 flex-1 flex flex-col">
                    {/* Title & Author */}
                    <div className="mb-2 sm:mb-3">
                      <h3 className="text-sm sm:text-lg lg:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-white/90 transition-colors duration-300 leading-tight line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-white/70 font-medium text-xs sm:text-sm lg:text-sm">
                        by {book.author}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-white/80 text-xs sm:text-sm font-medium">{book.rating}</span>
                      <span className="hidden sm:inline text-white/60 text-xs">({book.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">${book.price}</span>
                        <span className="text-xs sm:text-sm text-white/50 line-through">${book.originalPrice}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-green-400 font-medium">{book.discount}</div>
                    </div>

                    {/* Action Buttons - Better spacing and sizing */}
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-auto pt-2 sm:pt-3">
                      <button 
                        onClick={() => handleAddToCart(book)}
                        className={`flex-1 py-2 sm:py-3 lg:py-3 px-2 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-1 sm:space-x-2 ${
                          addedToCart[book.id] 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] hover:from-[#3D2A54] hover:to-[#2D1B3D] text-white'
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">{addedToCart[book.id] ? 'Added!' : 'Add to Cart'}</span>
                        <span className="sm:hidden text-xs">{addedToCart[book.id] ? 'Added!' : 'Cart'}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleAddToWishlist(book)}
                        className={`p-2 sm:p-3 lg:p-3 backdrop-blur-sm border rounded-lg transition-all duration-300 transform hover:scale-105 ${
                          addedToWishlist[book.id] 
                            ? 'bg-red-500/20 border-red-500/60 text-red-400' 
                            : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-colors duration-300 ${
                          addedToWishlist[book.id] ? 'fill-current' : ''
                        }`} />
                      </button>
                    </div>

                    {/* Added spacing at bottom of card */}
                    <div className="h-2 sm:h-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Featured Books Message */}
        {featuredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-8 border border-[#3D2A54]/50 max-w-md mx-auto shadow-xl">
              <BookOpen className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">No Featured Books</h3>
              <p className="text-white/80 mb-6">
                No books are currently marked as featured. Check our full library for all available books.
              </p>
              <button
                onClick={handleViewAllBooks}
                className="bg-gradient-to-r from-[#3D2A54] to-[#2D1B3D] hover:from-[#2D1B3D] hover:to-[#3D2A54] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Books
              </button>
            </div>
          </div>
        )}

        {/* View All Books Button - Minimalistic design for mobile */}
        {featuredBooks.length > 0 && (
          <div className="text-center mt-20 pt-8 border-t border-white/10">
            <button 
              onClick={handleViewAllBooks}
              className="group inline-flex items-center bg-[#2D1B3D]/90 backdrop-blur-md hover:bg-[#2D1B3D] text-white px-6 py-3 sm:px-10 sm:py-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-white/20 hover:border-white/40"
            >
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-lg">View All Books</span>
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooksSection;