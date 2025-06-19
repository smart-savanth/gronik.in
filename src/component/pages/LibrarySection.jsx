import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, Filter, Grid, List, ChevronDown } from 'lucide-react';

const LibraryPage = ({ onAddToCart, onAddToWishlist, onQuickView }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToWishlist, setAddedToWishlist] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // All books data - Extended to show more variety
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
    },
    {
      id: 7,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      category: "Self Development",
      price: 165,
      originalPrice: 195,
      rating: 4.6,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1519682577862-22b62bb24e93?w=300&h=400&fit=crop",
      description: "A guide to spiritual enlightenment and living in the present moment.",
      badge: "SPIRITUAL",
      discount: "15% OFF",
      featured: false
    },
    {
      id: 8,
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      category: "Psychology",
      price: 155,
      originalPrice: 185,
      rating: 4.5,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
      description: "Timeless advice on building relationships and social skills.",
      badge: "TIMELESS",
      discount: "16% OFF",
      featured: false
    },
    {
      id: 9,
      title: "Deep Work",
      author: "Cal Newport",
      category: "Productivity",
      price: 185,
      originalPrice: 230,
      rating: 4.7,
      reviews: 398,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "Rules for focused success in a distracted world.",
      badge: "FOCUS",
      discount: "20% OFF",
      featured: false
    },
    {
      id: 10,
      title: "The Lean Startup",
      author: "Eric Ries",
      category: "Business",
      price: 190,
      originalPrice: 240,
      rating: 4.4,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      description: "How today's entrepreneurs use continuous innovation to create successful businesses.",
      badge: "STARTUP",
      discount: "21% OFF",
      featured: false
    },
    {
      id: 11,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      category: "Finance",
      price: 145,
      originalPrice: 175,
      rating: 4.3,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      description: "What the rich teach their kids about money that the poor and middle class do not.",
      badge: "MONEY",
      discount: "17% OFF",
      featured: false
    },
    {
      id: 12,
      title: "The 4-Hour Workweek",
      author: "Timothy Ferriss",
      category: "Productivity",
      price: 175,
      originalPrice: 210,
      rating: 4.2,
      reviews: 298,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      description: "Escape 9-5, live anywhere, and join the new rich.",
      badge: "LIFESTYLE",
      discount: "17% OFF",
      featured: false
    }
  ];

  // Get unique categories
  const categories = ['All', ...new Set(allBooks.map(book => book.category))];

  // Filter books based on category
  const filteredBooks = allBooks.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesCategory;
  });

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

  return (
    <div className="min-h-screen bg-[#9B7BB8] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2D1B3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#3D2A54] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#2D1B3D] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
          {/* Left Side - Title */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2D1B3D] mb-4">
              Our Complete
              <span className="block bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] bg-clip-text text-transparent">
                Book Library
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Explore our comprehensive collection of life-changing books across all categories
            </p>
          </div>

          {/* Right Side - Filters and View Options */}
          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 bg-[#2D1B3D]/90 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-[#2D1B3D]/30 hover:bg-[#2D1B3D] transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                <Filter className="w-5 h-5" />
                <span>{selectedCategory}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full mt-2 right-0 bg-[#2D1B3D]/95 backdrop-blur-md rounded-2xl border border-[#3D2A54]/50 shadow-2xl min-w-48 z-50">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl ${
                        selectedCategory === category 
                          ? 'bg-[#3D2A54] text-white font-medium' 
                          : 'text-white/80 hover:bg-[#3D2A54]/50 hover:text-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#2D1B3D]/90 backdrop-blur-sm rounded-full p-1 border border-[#2D1B3D]/30 shadow-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-[#3D2A54] text-white shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-[#3D2A54] text-white shadow-md' : 'text-white/60 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-[#2D1B3D]/80 text-lg font-medium">
            Showing {filteredBooks.length} books
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Books Grid - 4 books per row in grid mode */}
        <div className={`gap-6 mb-12 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'flex flex-col space-y-6'
        }`}>
          {filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className="group relative"
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`relative bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl border border-[#3D2A54]/50 hover:border-[#3D2A54]/70 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl ${
                viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center space-x-6'
              }`}>
                
                {/* Featured Badge */}
                {book.featured && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      FEATURED
                    </div>
                  </div>
                )}

                {/* Book Image - Fixed dimensions for book proportions */}
                <div className={`relative ${viewMode === 'grid' ? 'mb-4' : 'flex-shrink-0'}`}>
                  <div className={`relative overflow-hidden rounded-xl shadow-xl ${
                    viewMode === 'grid' ? 'w-full h-48' : 'w-20 h-28'
                  }`}>
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Quick View Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#2D1B3D]/80 via-transparent to-transparent transition-opacity duration-300 ${
                      hoveredBook === book.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute bottom-2 left-2 right-2">
                        <button 
                          onClick={() => handleQuickView(book)}
                          className="w-full bg-white/90 backdrop-blur-sm text-[#2D1B3D] py-2 rounded-md font-semibold flex items-center justify-center space-x-2 hover:bg-white transition-colors duration-200 text-sm transform hover:scale-105"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className={`${viewMode === 'grid' ? 'text-center space-y-3' : 'flex-1 space-y-2'}`}>
                  {/* Category Badge for Grid View */}
                  {viewMode === 'grid' && (
                    <div className="inline-block bg-gradient-to-r from-[#3D2A54] to-[#2D1B3D] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                      {book.category}
                    </div>
                  )}
                  
                  {/* Title & Author */}
                  <div>
                    <h3 className={`font-bold text-white mb-1 group-hover:text-white/90 transition-colors duration-300 line-clamp-2 ${
                      viewMode === 'grid' ? 'text-base' : 'text-lg'
                    }`}>
                      {book.title}
                    </h3>
                    <p className={`text-white/80 font-medium ${viewMode === 'grid' ? 'text-sm' : 'text-base'}`}>
                      by {book.author}
                    </p>
                    {viewMode === 'list' && (
                      <p className="text-white/60 text-sm mt-1">{book.category}</p>
                    )}
                  </div>

                  {/* Rating and Price */}
                  <div className={`flex items-center ${viewMode === 'grid' ? 'justify-between' : 'space-x-6'}`}>
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-white/80 text-xs font-medium">{book.rating}</span>
                    </div>
                    
                    {/* Price */}
                    <div className={viewMode === 'grid' ? 'text-right' : ''}>
                      <span className="text-lg font-bold text-white">${book.price}</span>
                      <div className="text-xs text-white/50 line-through">${book.originalPrice}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex items-center space-x-2 ${viewMode === 'grid' ? 'pt-2' : ''}`}>
                    <button 
                      onClick={() => handleAddToCart(book)}
                      className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-xs flex items-center justify-center space-x-2 ${
                        addedToCart[book.id] 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-gradient-to-r from-[#3D2A54] to-[#2D1B3D] hover:from-[#2D1B3D] hover:to-[#3D2A54] text-white'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{addedToCart[book.id] ? 'Added!' : 'Add to Cart'}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleAddToWishlist(book)}
                      className={`p-2 backdrop-blur-sm border rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        addedToWishlist[book.id] 
                          ? 'bg-red-500/20 border-red-500/60 text-red-400' 
                          : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 transition-colors duration-300 ${
                        addedToWishlist[book.id] ? 'fill-current' : ''
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-8 border border-[#3D2A54]/50 max-w-md mx-auto shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">No Books Found</h3>
              <p className="text-white/80 mb-6">
                Try selecting a different category
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="bg-gradient-to-r from-[#3D2A54] to-[#2D1B3D] hover:from-[#2D1B3D] hover:to-[#3D2A54] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Show All Books
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;