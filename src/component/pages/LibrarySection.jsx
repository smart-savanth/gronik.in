import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Filter, ChevronDown, Check, X } from 'lucide-react';

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
    // image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    image: "/images/book1.jpg",
    description: "Transform your mindset and unlock the secrets to wealth and success.",
    badge: "BESTSELLER",
    discount: "25% OFF",
    featured: true,
    hero: true,
    inStock: true,
    tags: ["Success", "Mindset", "Wealth", "Motivation"],
    fileSize: "2.4 MB"
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
    hero: true,
    inStock: true,
    tags: ["Power", "Influence", "Strategy", "Leadership"],
    fileSize: "1.8 MB"
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
    hero: true,
    inStock: true,
    tags: ["Habits", "Productivity", "Self-Improvement", "Behavior"],
    fileSize: "1.2 MB"
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
    hero: true,
    inStock: true,
    tags: ["Effectiveness", "Leadership", "Personal Development", "Success"],
    fileSize: "2.0 MB"
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
    hero: true,
    inStock: true,
    tags: ["Mindset", "Psychology", "Growth", "Success"],
    fileSize: "1.9 MB"
  },
  {
    id: 6,
    title: "Out of Stock Book - Test",
    author: "Test Author",
    category: "Self Development",
    price: 120,
    originalPrice: 150,
    rating: 4.3,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "This book is out of stock for testing purposes.",
    badge: "OUT OF STOCK",
    discount: "20% OFF",
    featured: false,
    hero: false,
    inStock: false,
    tags: ["Test", "Out of Stock", "Sample"],
    fileSize: "1.5 MB"
  },
  {
    id: 7,
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
    hero: false,
    inStock: false,
    tags: ["Productivity", "Time Management", "Organization", "Stress-Free"],
    fileSize: "1.0 MB"
  },
  {
    id: 8,
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
    hero: false,
    inStock: true,
    tags: ["Focus", "Deep Work", "Concentration", "Success"],
    fileSize: "1.1 MB"
  },
  {
    id: 9,
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
    hero: false,
    inStock: true,
    tags: ["Life Philosophy", "Happiness", "Mindfulness", "Self-Help"],
    fileSize: "0.8 MB"
  },
  {
    id: 10,
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
    hero: false,
    inStock: false,
    tags: ["History", "Anthropology", "Human Evolution", "Civilization"],
    fileSize: "2.5 MB"
  },
  {
    id: 11,
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
    hero: false,
    inStock: true,
    tags: ["Spirituality", "Mindfulness", "Enlightenment", "Present Moment"],
    fileSize: "1.3 MB"
  }
];

const LibraryPage = ({ cart = [], wishlist = [], onAddToCart, onRemoveFromCart, onAddToWishlist, onRemoveFromWishlist, onQuickView }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartButtonClicked, setCartButtonClicked] = useState({});
  const [wishlistButtonClicked, setWishlistButtonClicked] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Show 8 items per page
  const navigate = useNavigate();
  const [hoveredBook, setHoveredBook] = useState(null);
  const [animatingCart, setAnimatingCart] = useState({});
  const [animatingWishlist, setAnimatingWishlist] = useState({});

  // Use centralized books data
  const books = centralizedBooksData;

  // Get unique categories
  const categories = ['All', ...new Set(books.map(book => book.category))];

  // Filter books based on category and search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Load more books
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // Scroll to top of library section after pagination
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  // Helper functions to check if a book is in cart/wishlist
  const isInCart = (book) => cart.some(item => item.id === book.id);
  const isInWishlist = (book) => wishlist.some(item => item.id === book.id);

  const handleAddToCart = (e, book) => {
    e.stopPropagation();
    if (!book.inStock || animatingCart[book.id]) return;
    
    // Toggle cart functionality - add if not in cart, remove if in cart
    if (!isInCart(book)) {
      setAnimatingCart(prev => ({ ...prev, [book.id]: true }));
      setCartButtonClicked(prev => ({ ...prev, [book.id]: true }));
      setTimeout(() => {
        onAddToCart && onAddToCart(book);
        setAnimatingCart(prev => ({ ...prev, [book.id]: false }));
        setCartButtonClicked(prev => ({ ...prev, [book.id]: false }));
      }, 1200);
    } else {
      // Remove from cart if already in cart
      setAnimatingCart(prev => ({ ...prev, [book.id]: true }));
      setCartButtonClicked(prev => ({ ...prev, [book.id]: true }));
      setTimeout(() => {
        onRemoveFromCart && onRemoveFromCart(book.id);
        setAnimatingCart(prev => ({ ...prev, [book.id]: false }));
        setCartButtonClicked(prev => ({ ...prev, [book.id]: false }));
      }, 1200);
    }
  };

  const handleToggleWishlist = (e, book) => {
    e.stopPropagation();
    if (animatingWishlist[book.id]) return;
    setAnimatingWishlist(prev => ({ ...prev, [book.id]: true }));
    setWishlistButtonClicked(prev => ({ ...prev, [book.id]: true }));
    setTimeout(() => {
      if (isInWishlist(book)) {
        onRemoveFromWishlist && onRemoveFromWishlist(book.id);
      } else {
        onAddToWishlist && onAddToWishlist(book);
      }
      setAnimatingWishlist(prev => ({ ...prev, [book.id]: false }));
      setWishlistButtonClicked(prev => ({ ...prev, [book.id]: false }));
    }, 250);
  };

  const handleCardClick = (book) => {
    navigate(`/product/${book.id}`, { state: { from: 'library' } });
  };

  return (
    <div className="min-h-screen bg-[#9B7BB8] relative overflow-hidden" key={JSON.stringify(cart) + JSON.stringify(wishlist)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2D1B3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#3D2A54] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#2D1B3D] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-32 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 lg:mb-16 gap-6 pt-16 lg:pt-0">
          <div className="flex-1">
            {/* You can add a title here if needed */}
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center lg:justify-end">
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

        {/* Books Grid */}
        <div className="flex justify-center mb-12">
          <div className="grid gap-3 sm:gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-4 w-full max-w-[340px] sm:max-w-none">
            {currentBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                onClick={() => handleCardClick(book)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Book Card - Mobile first, perfect spacing */}
                <div className={`relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-xl lg:rounded-3xl border border-white/10 hover:border-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-yellow-200 w-full p-3 sm:p-4 lg:p-6 flex flex-col card-hover-gold`}>
                  
                  {/* Out of Stock Overlay */}
                  {!book.inStock && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-xl lg:rounded-3xl z-30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <X className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-white font-semibold text-sm">Out of Stock</p>
                        <p className="text-white/70 text-xs">Coming Soon</p>
                      </div>
                    </div>
                  )}

                  {/* Category Badge - Centered above card (original design) */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-white/20 whitespace-nowrap">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Image */}
                  <div className="mb-2 sm:mb-3 lg:mb-4 flex justify-center mt-1 sm:mt-2 lg:mt-4">
                    <div className="relative w-20 h-28 sm:w-24 sm:h-32 lg:w-48 lg:h-64 rounded-lg lg:rounded-xl overflow-hidden shadow-2xl">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                        style={{ transition: 'none' }}
                      />
                      {/* Stock Status Indicator */}
                      {!book.inStock && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          SOLD OUT
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="text-center flex-1 flex flex-col justify-between">
                    {/* Title & Author */}
                    <div className="mb-2 sm:mb-3">
                      <h3 className="font-bold text-white group-hover:text-white/90 transition-colors duration-300 leading-tight text-xs sm:text-sm lg:text-lg mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center">
                        <span className="text-center">{book.title}</span>
                      </h3>
                      <p className="text-white/70 font-medium text-[10px] sm:text-xs lg:text-sm">
                        by {book.author}
                      </p>
                    </div>

                    {/* Rating and Price */}
                    <div className="mb-2 sm:mb-3">
                      {/* Rating */}
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-white/80 text-xs sm:text-sm font-medium ml-1">{book.rating}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <span className="text-sm sm:text-base lg:text-xl font-bold text-white">₹{book.price}</span>
                          <span className="text-xs sm:text-sm lg:text-sm text-white/50 line-through">₹{book.originalPrice}</span>
                        </div>
                        <div className="text-xs sm:text-xs lg:text-sm text-green-400 font-medium">{book.discount}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row gap-2 w-full mb-4">
                      {book.inStock ? (
                        <button
                          onClick={e => handleAddToCart(e, book)}
                          disabled={animatingCart[book.id]}
                          className={`cart-button-animated ${cartButtonClicked[book.id] ? 'clicked' : ''} flex-1 py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl ${
                            isInCart(book)
                              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                              : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#2D1B3D] shadow-xl'
                          }`}
                        >
                          <ShoppingCart className="cart-icon w-5 h-5" />
                          <div className="box-icon w-3 h-3 bg-current rounded-sm"></div>
                          <span className="cart-text">
                            {animatingCart[book.id] ? (
                              <>
                                <span className="hidden sm:inline">Add to </span>Cart
                              </>
                            ) : isInCart(book) ? (
                              <>
                                <span className="hidden sm:inline">Remove from </span>Cart
                              </>
                            ) : (
                              <>
                                <span className="hidden sm:inline">Add to </span>Cart
                              </>
                            )}
                          </span>
                          <span className="added-text">
                            <Check className="w-5 h-5 mr-2 inline" />
                            Added!
                          </span>
                        </button>
                      ) : (
                        <div className="flex-1 py-3 px-4 rounded-xl text-base font-semibold bg-gray-400/70 text-white/90 text-center cursor-not-allowed select-none">
                          Out of Stock
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleToggleWishlist(e, book);
                        }}
                        disabled={animatingWishlist[book.id]}
                        className={`wishlist-button-animated ${wishlistButtonClicked[book.id] ? 'clicked' : ''} p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${
                          isInWishlist(book)
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7]'
                        }`}
                        style={{ minWidth: 0 }}
                      >
                        <Heart className={`heart-static w-5 h-5 ${isInWishlist(book) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={() => {
                setCurrentPage(prev => Math.max(1, prev - 1));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              disabled={currentPage === 1}
              className="bg-[#2D1B3D]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-[#2D1B3D]/30 hover:bg-[#2D1B3D] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`w-8 h-8 rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-[#9B7BB8] text-white'
                      : 'bg-[#2D1B3D]/50 text-white/70 hover:bg-[#2D1B3D]/70'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => {
                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
              disabled={currentPage === totalPages}
              className="bg-[#2D1B3D]/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-[#2D1B3D]/30 hover:bg-[#2D1B3D] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Load More Button (Alternative to pagination) */}
        {currentPage < totalPages && (
          <div className="text-center mb-8">
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] hover:from-[#8A6AA7] hover:to-[#9B7BB8] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Load More Books
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-8 border border-[#3D2A54]/50 max-w-md mx-auto shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">No Book Found</h3>
              <p className="text-white/80 mb-6">
                Try selecting a different category or adjusting your search.
              </p>
              <button
                onClick={() => navigate('/library')}
                className="bg-gradient-to-r from-[#3D2A54] to-[#2D1B3D] hover:from-[#2D1B3D] hover:to-[#3D2A54] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Show All Books
              </button>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .cart-button-animated {
          position: relative;
          overflow: hidden;
        }
        .cart-button-animated .cart-icon {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: -10%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        .cart-button-animated .box-icon {
          position: absolute;
          z-index: 3;
          top: -20%;
          left: 52%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        .cart-button-animated .cart-text {
          position: relative;
          z-index: 3;
          transition: opacity 0.3s ease;
        }
        .cart-button-animated .added-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          opacity: 0;
        }
        .cart-button-animated.clicked .cart-icon {
          animation: cartAnimation 1.5s ease-in-out forwards;
        }
        .cart-button-animated.clicked .box-icon {
          animation: boxAnimation 1.5s ease-in-out forwards;
        }
        .cart-button-animated.clicked .cart-text {
          animation: textOut 1.5s ease-in-out forwards;
        }
        .cart-button-animated.clicked .added-text {
          animation: textIn 1.5s ease-in-out forwards;
        }
        @keyframes cartAnimation {
          0% { left: -10%; opacity: 1; }
          40%, 60% { left: 50%; opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        @keyframes boxAnimation {
          0%, 40% { top: -20%; opacity: 1; }
          60% { top: 40%; left: 52%; opacity: 1; }
          100% { top: 40%; left: 112%; opacity: 0; }
        }
        @keyframes textOut {
          0% { opacity: 1; }
          20%, 100% { opacity: 0; }
        }
        @keyframes textIn {
          0%, 80% { opacity: 0; }
          100% { opacity: 1; }
        }
        .wishlist-button-animated { position: relative; }
        .wishlist-button-animated .heart-static { transition: transform 0.2s ease; }
        .wishlist-button-animated.clicked { animation: pop 0.3s ease-out; }
        .wishlist-button-animated.clicked .heart-static { transform: scale(1.2); }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default LibraryPage;