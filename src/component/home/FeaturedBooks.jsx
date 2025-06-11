import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

const FeaturedBooksSection = ({ onAddToCart, onAddToWishlist, onQuickView }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToWishlist, setAddedToWishlist] = useState({});

  const featuredBooks = [
    {
      id: 1,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      category: "Self Development",
      price: 150,
      originalPrice: 200,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      description: "Transform your mindset and unlock the secrets to wealth and success.",
      badge: "BESTSELLER",
      discount: "25% OFF"
    },
    {
      id: 2,
      title: "48 Laws of Power",
      author: "Robert Greene",
      category: "Psychology",
      price: 200,
      originalPrice: 250,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      description: "Master the art of power and influence in every aspect of life.",
      badge: "TRENDING",
      discount: "20% OFF"
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Productivity",
      price: 175,
      originalPrice: 225,
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "Build good habits, break bad ones, and get 1% better every day.",
      badge: "NEW RELEASE",
      discount: "22% OFF"
    }
  ];

  const handleAddToCart = (book) => {
    onAddToCart && onAddToCart(book);
    setAddedToCart(prev => ({ ...prev, [book.id]: true }));
    
    // Reset the animation after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [book.id]: false }));
    }, 2000);
  };

  const handleAddToWishlist = (book) => {
    onAddToWishlist && onAddToWishlist(book);
    setAddedToWishlist(prev => ({ ...prev, [book.id]: true }));
    
    // Reset the animation after 2 seconds
    setTimeout(() => {
      setAddedToWishlist(prev => ({ ...prev, [book.id]: false }));
    }, 2000);
  };

  const handleQuickView = (book) => {
    // Call the parent component's onQuickView function to navigate to ProductSection
    onQuickView && onQuickView(book);
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/20">
            <Sparkles className="w-5 h-5 text-[#2D1B3D] mr-2" />
            <span className="text-[#2D1B3D] font-medium">Featured Collection</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-[#2D1B3D] mb-6 leading-tight">
            Discover Our Curated
            <span className="block bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] bg-clip-text text-transparent">
              Premium E-Books
            </span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Transform your mindset with our handpicked collection of life-changing books
          </p>
        </div>

        {/* Books Grid - Bigger cards to fill screen properly */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-full px-4">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative flex justify-center"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Main Card - Much bigger and fills screen better */}
                <div className="relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] w-full max-w-[400px] min-w-[350px]">
                  
                  {/* Category Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg border border-white/20">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Image Container */}
                  <div className="relative mb-8 flex justify-center mt-4">
                    <div className="relative group-hover:transform group-hover:scale-105 transition-transform duration-500">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      
                      {/* Book Image - Much bigger */}
                      <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Overlay on Hover with Working Quick View Button */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-[#2D1B3D]/80 via-transparent to-transparent transition-opacity duration-300 ${
                          hoveredBook === book.id ? 'opacity-100' : 'opacity-0'
                        }`}>
                          <div className="absolute bottom-6 left-6 right-6">
                            <button 
                              onClick={() => handleQuickView(book)}
                              className="w-full bg-white/90 backdrop-blur-sm text-[#2D1B3D] py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-white transition-colors duration-200 text-base transform hover:scale-105"
                            >
                              <Eye className="w-5 h-5" />
                              <span>Quick View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="text-center space-y-5">
                    {/* Title & Author */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors duration-300 leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-white/70 font-medium text-base">by {book.author}</p>
                    </div>

                    {/* Rating and Price in one line */}
                    <div className="flex items-center justify-between px-4">
                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-white/80 text-base font-medium">{book.rating}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">${book.price}</span>
                        <div className="text-sm text-white/50 line-through">${book.originalPrice}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 pt-3">
                      <button 
                        onClick={() => handleAddToCart(book)}
                        className={`flex-1 bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] hover:from-[#3D2A54] hover:to-[#2D1B3D] text-white py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-base flex items-center justify-center space-x-2 ${
                          addedToCart[book.id] ? 'bg-green-500 hover:bg-green-600' : ''
                        }`}
                        title={addedToCart[book.id] ? 'Added to Cart!' : 'Add to Cart'}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{addedToCart[book.id] ? 'Added!' : 'Add to Cart'}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleAddToWishlist(book)}
                        className={`p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          addedToWishlist[book.id] ? 'bg-red-500/20 border-red-500/40' : ''
                        }`}
                        title={addedToWishlist[book.id] ? 'Added to Wishlist!' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-6 h-6 text-white transition-colors duration-300 ${
                          addedToWishlist[book.id] ? 'fill-red-500 text-red-500' : 'hover:text-red-400'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Books Button */}
        <div className="text-center">
          <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl">
            <BookOpen className="w-6 h-6" />
            <span>View All Books</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooksSection;