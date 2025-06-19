import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

const FeaturedBooksSection = ({ onAddToCart, onAddToWishlist, onQuickView, onViewAllBooks }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToWishlist, setAddedToWishlist] = useState({});

  // All books data - only featured ones will show in this section
  const allBooks = [
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
      discount: "25% OFF",
      featured: true
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
      discount: "20% OFF",
      featured: true
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
      discount: "22% OFF",
      featured: true
    },
    {
      id: 4,
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey",
      category: "Self Development",
      price: 180,
      originalPrice: 220,
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
      description: "A powerful lesson in personal change and effectiveness.",
      badge: "CLASSIC",
      discount: "18% OFF",
      featured: false
    },
    {
      id: 5,
      title: "Mindset: The New Psychology of Success",
      author: "Carol Dweck",
      category: "Psychology",
      price: 160,
      originalPrice: 190,
      rating: 4.5,
      reviews: 278,
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop",
      description: "Learn how to fulfill your potential with the right mindset.",
      badge: "POPULAR",
      discount: "16% OFF",
      featured: false
    },
    {
      id: 6,
      title: "Getting Things Done",
      author: "David Allen",
      category: "Productivity",
      price: 170,
      originalPrice: 200,
      rating: 4.4,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      description: "The art of stress-free productivity and time management.",
      badge: "RECOMMENDED",
      discount: "15% OFF",
      featured: false
    }
  ];

  // Filter only featured books (exactly 3 books)
  const featuredBooks = allBooks.filter(book => book.featured).slice(0, 3);

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
    // Navigate to individual product page
    onQuickView && onQuickView(book);
  };

  const handleViewAllBooks = () => {
    // Navigate to Library page
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

        {/* Books Grid - Fixed Card Dimensions */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Fixed Size Card - Book Proportions */}
                <div className="relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] w-[320px] h-[520px] flex flex-col">
                  
                  {/* Featured Badge */}
                  <div className="absolute -top-3 right-4 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      FEATURED
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-white/20">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Image Container - Fixed Book Dimensions */}
                  <div className="relative mb-4 flex justify-center mt-4">
                    <div className="relative group-hover:transform group-hover:scale-105 transition-transform duration-500">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                      
                      {/* Book Image - Fixed Book Proportions (3:4 ratio) */}
                      <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl">
                        <img 
                          src={book.image} 
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Quick View Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-[#2D1B3D]/80 via-transparent to-transparent transition-opacity duration-300 ${
                          hoveredBook === book.id ? 'opacity-100' : 'opacity-0'
                        }`}>
                          <div className="absolute bottom-4 left-4 right-4">
                            <button 
                              onClick={() => handleQuickView(book)}
                              className="w-full bg-white/90 backdrop-blur-sm text-[#2D1B3D] py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-white transition-colors duration-200 text-sm transform hover:scale-105"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Quick View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Details - Flexible Space */}
                  <div className="text-center space-y-3 flex-1 flex flex-col justify-between">
                    {/* Title & Author */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90 transition-colors duration-300 leading-tight line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-white/70 font-medium text-sm">by {book.author}</p>
                    </div>

                    {/* Rating and Price */}
                    <div className="flex items-center justify-between px-2">
                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm font-medium">{book.rating}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xl font-bold text-white">${book.price}</span>
                        <div className="text-xs text-white/50 line-through">${book.originalPrice}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleAddToCart(book)}
                        className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-sm flex items-center justify-center space-x-2 ${
                          addedToCart[book.id] 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] hover:from-[#3D2A54] hover:to-[#2D1B3D] text-white'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{addedToCart[book.id] ? 'Added!' : 'Add to Cart'}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleAddToWishlist(book)}
                        className={`p-3 backdrop-blur-sm border rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          addedToWishlist[book.id] 
                            ? 'bg-red-500/20 border-red-500/60 text-red-400' 
                            : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-5 h-5 transition-colors duration-300 ${
                          addedToWishlist[book.id] ? 'fill-current' : ''
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
          <button 
            onClick={handleViewAllBooks}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl"
          >
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