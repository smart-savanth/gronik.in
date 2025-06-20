import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, Filter, ChevronDown } from 'lucide-react';

// Centralized Books Data - This will be your single source of truth
export const centralizedBooksData = [
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
    featured: true,
    hero: true
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
    featured: true,
    hero: true
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
    featured: true,
    hero: true
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
    featured: false,
    hero: true
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
    featured: false,
    hero: true
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
    featured: false,
    hero: false
  },
  {
    id: 7,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    price: 165,
    originalPrice: 195,
    rating: 4.6,
    reviews: 321,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
    description: "Rules for focused success in a distracted world.",
    badge: "RECOMMENDED",
    discount: "15% OFF",
    featured: false,
    hero: false
  },
  {
    id: 8,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self Development",
    price: 155,
    originalPrice: 185,
    rating: 4.3,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    description: "A counterintuitive approach to living a good life.",
    badge: "POPULAR",
    discount: "16% OFF",
    featured: false,
    hero: false
  },
  {
    id: 9,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    price: 190,
    originalPrice: 240,
    rating: 4.8,
    reviews: 543,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "A brief history of humankind and our journey to the top.",
    badge: "BESTSELLER",
    discount: "21% OFF",
    featured: false,
    hero: false
  },
  {
    id: 10,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Spirituality",
    price: 145,
    originalPrice: 175,
    rating: 4.5,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "A guide to spiritual enlightenment and present-moment awareness.",
    badge: "INSPIRING",
    discount: "17% OFF",
    featured: false,
    hero: false
  }
];

const LibraryPage = ({ onAddToCart, onAddToWishlist, onNavigateToProduct }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [addedToCart, setAddedToCart] = useState({});
  const [addedToWishlist, setAddedToWishlist] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use centralized books data
  const allBooks = centralizedBooksData;

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
    // Navigate to ProductSection - you can adjust the path as needed
    if (onNavigateToProduct) {
      onNavigateToProduct(book);
    } else {
      // For now, just navigate to ProductSection
      // You can replace this with your actual navigation logic
      window.location.href = '/ProductSection.jsx';
    }
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div className="flex-1">
          </div>

          {/* Filters - Centered on mobile */}
          <div className="flex items-center justify-center lg:justify-end">
            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 bg-[#2D1B3D]/90 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-[#2D1B3D]/30 hover:bg-[#2D1B3D] transition-all duration-300 shadow-lg hover:shadow-xl font-medium min-w-[140px] justify-center"
              >
                <Filter className="w-5 h-5" />
                <span className="truncate">{selectedCategory}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:transform-none bg-[#2D1B3D]/95 backdrop-blur-md rounded-2xl border border-[#3D2A54]/50 shadow-2xl min-w-48 z-50">
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
          </div>
        </div>

        {/* Books Grid - Improved mobile spacing */}
        <div className="flex justify-center mb-12">
          <div className="grid gap-3 sm:gap-4 lg:gap-8 grid-cols-2 lg:grid-cols-4 w-full max-w-7xl">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Book Card - Optimized for mobile */}
                <div className="relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-xl lg:rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] w-full h-[350px] lg:h-[520px] p-2 lg:p-6 flex flex-col">
                  
                  {/* Category Badge */}
                  <div className="absolute -top-2 lg:-top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-2 lg:px-4 py-1 lg:py-2 rounded-full text-xs font-bold shadow-lg border border-white/20">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Image - Larger on mobile */}
                  <div className="mb-2 lg:mb-4 flex justify-center mt-2 lg:mt-4">
                    <div className="relative w-20 h-28 lg:w-48 lg:h-64 rounded-lg lg:rounded-xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Quick View Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-[#2D1B3D]/80 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredBook === book.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute bottom-1 left-1 right-1">
                          <button 
                            onClick={() => handleQuickView(book)}
                            className="w-full bg-white/90 backdrop-blur-sm text-[#2D1B3D] py-1 lg:py-2 rounded-md lg:rounded-lg font-semibold flex items-center justify-center space-x-1 hover:bg-white transition-colors duration-200 text-xs lg:text-sm transform hover:scale-105"
                          >
                            <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book Details - Compressed spacing */}
                  <div className="text-center space-y-1 lg:space-y-3 flex-1 flex flex-col justify-between">
                    {/* Title & Author - Reduced spacing */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-white group-hover:text-white/90 transition-colors duration-300 leading-tight text-xs lg:text-lg line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-white/70 font-medium text-xs lg:text-sm">
                        by {book.author}
                      </p>
                    </div>

                    {/* Rating and Price - Tighter spacing */}
                    <div className="flex items-center justify-between px-1">
                      {/* Rating */}
                      <div className="flex flex-col items-start space-y-0.5">
                        <div className="flex items-center space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-2.5 h-2.5 lg:w-4 lg:h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-white/80 text-xs lg:text-sm font-medium">{book.rating}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm lg:text-xl font-bold text-white">${book.price}</span>
                        <div className="text-xs text-white/50 line-through">${book.originalPrice}</div>
                      </div>
                    </div>

                    {/* Action Buttons - Reduced padding */}
                    <div className="flex items-center space-x-1.5 lg:space-x-3">
                      <button 
                        onClick={() => handleAddToCart(book)}
                        className={`flex-1 py-1.5 lg:py-3 px-2 lg:px-4 rounded-lg lg:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-xs lg:text-sm flex items-center justify-center space-x-1 ${
                          addedToCart[book.id] 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] hover:from-[#3D2A54] hover:to-[#2D1B3D] text-white'
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span className="hidden sm:inline">{addedToCart[book.id] ? 'Added!' : 'Add To Cart'}</span>
                        <span className="sm:hidden">{addedToCart[book.id] ? '✓' : '+'}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleAddToWishlist(book)}
                        className={`p-1.5 lg:p-3 backdrop-blur-sm border rounded-lg lg:rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          addedToWishlist[book.id] 
                            ? 'bg-red-500/20 border-red-500/60 text-red-400' 
                            : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-3 h-3 lg:w-5 lg:h-5 transition-colors duration-300 ${
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