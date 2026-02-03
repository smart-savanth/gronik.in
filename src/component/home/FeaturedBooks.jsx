import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, ArrowRight, Sparkles, BookOpen, Check, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { centralizedBooksData } from '../pages/LibrarySection';
import { useGetAllBooksQuery } from '../../utils/booksService';

const FeaturedBooksSection = ({
  cart = [],
  wishlist = [],
  onAddToCart,
  onRemoveFromCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [cartButtonClicked, setCartButtonClicked] = useState({});
  const [wishlistButtonClicked, setWishlistButtonClicked] = useState({});
  const [animatingCart, setAnimatingCart] = useState({});
  const [animatingWishlist, setAnimatingWishlist] = useState({});
  
  // Use navigate hook directly in component
  const navigate = useNavigate();
  
  // Get only featured books from centralized data
    const { data: booksResponse, isLoading, isError } = useGetAllBooksQuery({
      page: 1,
      pageSize: 10,
    });
const featuredBooks = booksResponse?.data
  ?.filter(book => book.featured)
  ?.map(book => ({
    ...book,
    id: book._id   
  })) ?? [];

const [localCart, setLocalCart] = useState([]);

React.useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("cart")) || [];
  setLocalCart(stored);
}, []);

React.useEffect(() => {
  const update = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(stored);
  };
  window.addEventListener("storage", update);
  return () => window.removeEventListener("storage", update);
}, []);


  
  // Helper functions to check if a book is in cart/wishlist
  const isInCart = (book) =>
  localCart.some(item => item.id === book.id);
  const isInWishlist = (book) => wishlist.some(item => item.id === book.id);

  // FIXED: Digital platform - all books are always available, no stock check needed
const handleCartAction = (e, book) => {
  

  e.stopPropagation();
  e.preventDefault();

  let localCart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = localCart.some(item => item.id === book.id);

  if (!exists) {
    const newItem = {
  id: book.id,
  title: book.title,
  author: book.author,
  image:
  book.coverImageUrl ||
  book.image ||
  "https://via.placeholder.com/300x400?text=No+Image",
  price: Number(book.final_price),
  originalPrice: Number(book.original_price),
  quantity: 1
};


    localStorage.setItem("cart", JSON.stringify([...localCart, newItem]));
    window.dispatchEvent(new Event("storage"));
  }

  setCartButtonClicked(prev => ({ ...prev, [book.id]: true }));
  setTimeout(() => {
    setCartButtonClicked(prev => ({ ...prev, [book.id]: false }));
  }, 800);
};



  const handleToggleWishlist = (e, book) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (animatingWishlist[book.id]) return;
    setAnimatingWishlist(prev => ({ ...prev, [book.id]: true }));
    setWishlistButtonClicked(prev => ({ ...prev, [book.id]: true }));
    setTimeout(() => {
      if (isInWishlist(book)) onRemoveFromWishlist && onRemoveFromWishlist(book.id);
      else onAddToWishlist && onAddToWishlist(book);
      setAnimatingWishlist(prev => ({ ...prev, [book.id]: false }));
      setWishlistButtonClicked(prev => ({ ...prev, [book.id]: false }));
    }, 250);
  };

  const handleCardClick = (book) => {
    navigate(`/product/${book.id}`, { state: { from: 'featured' } });
  };

  return (
    <section id="featured-books" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9B7BB8] via-[#8A6BA3] to-[#2D1B3D]" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#9B7BB8]/20 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-white/20">
            <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-[#2D1B3D] mr-1 sm:mr-2" />
            <span className="text-[#2D1B3D] font-medium text-xs sm:text-base">Featured Collection</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#2D1B3D] mb-6 sm:mb-8 leading-tight">
            Premium E-Books
          </h2>
        </div>

        {/* Grid */}
        <div className="flex justify-center mb-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 sm:gap-2 lg:gap-2 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-0">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative flex justify-center"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-2xl p-3 sm:p-3 md:p-4 lg:p-4 border border-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl w-full max-w-[260px] flex flex-col card-hover-gold ${hoveredBook === book.id ? 'gold-glow' : ''}`}
                  onClick={(e) => {
                    if (e.target.closest('.add-to-cart-btn') || e.target.closest('.wishlist-btn')) return;
                    handleCardClick(book);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Image */}
                  <div className="relative mb-2 sm:mb-3 lg:mb-3 flex justify-center mt-2 sm:mt-6">
                    <div className="relative w-[70%] sm:w-[75%] md:w-[80%] aspect-[3/4] rounded-xl overflow-hidden shadow-xl transition-transform duration-500 mx-auto">
                      <img
                            src={
                              book.coverImageUrl ||
                              book.image ||
                              "https://via.placeholder.com/300x400?text=No+Image"
                            }
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />

                    </div>
                  </div>

                  {/* Details */}
                  <div className="text-center space-y-2 sm:space-y-3 lg:space-y-3 flex-1 flex flex-col">
                    <div className="mb-2 sm:mb-3">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 sm:mb-2 group-hover:text-white/90 transition-colors duration-300 leading-snug break-words line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-white/70 font-medium text-xs sm:text-sm lg:text-sm">by {book.author}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                        ))}
                      </div>
                      <span className="text-white/80 text-xs sm:text-sm font-medium">{book.rating}</span>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">₹{book.original_price}</span>
                        <span className="text-xs sm:text-sm text-white/50 line-through">₹{book.final_price}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-green-400 font-medium">
                        {Math.round(((book.original_price - book.final_price) / book.original_price) * 100)}% OFF
                      </div>
                    </div>

                    {/* Actions - All books are available in digital platform */}
                   <div className="flex flex-row gap-2 w-full mb-4">

                      <button
                        onClick={(e) => handleCartAction(e, book)}
                        disabled={animatingCart[book.id]}
                        className={`add-to-cart-btn cart-button-animated ${cartButtonClicked[book.id] ? 'clicked' : ''} flex-1 py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl ${
                          isInCart(book)
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                            : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#2D1B3D] shadow-xl'
                        }`}
                      >
                        {isInCart(book) ? (
                          <ExternalLink className="w-5 h-5" />
                        ) : (
                          <>
                            <ShoppingCart className="cart-icon w-5 h-5" />
                            <div className="box-icon w-3 h-3 bg-current rounded-sm"></div>
                          </>
                        )}

                        {/* Button Labels */}
                        <span className="cart-text" aria-live="polite" aria-atomic="true">
                          {animatingCart[book.id] ? (
                            <>
                              <span className="sm:hidden">Adding…</span>
                              <span className="hidden sm:inline">Adding to Cart…</span>
                            </>
                          ) : isInCart(book) ? (
                            <>
                              <span className="sm:hidden">Go&nbsp;Cart</span>
                              <span className="hidden sm:inline">Go to Cart</span>
                            </>
                          ) : (
                            <>
                              <span className="sm:hidden">Cart</span>
                              <span className="hidden sm:inline">Add to Cart</span>
                            </>
                          )}
                        </span>

                        <span className="added-text">
                          <Check className="w-5 h-5 mr-2 inline" />
                          Added!
                        </span>
                      </button>

                      <button
                        onClick={(e) => handleToggleWishlist(e, book)}
                        disabled={animatingWishlist[book.id]}
                        className={`wishlist-btn wishlist-button-animated ${wishlistButtonClicked[book.id] ? 'clicked' : ''} p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${
                          isInWishlist(book)
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7]'
                        }`}
                        style={{ minWidth: 0 }}
                      >
                        <Heart className={`heart-static w-5 h-5 ${isInWishlist(book) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="h-2 sm:h-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All */}
        {featuredBooks.length > 0 && (
          <div className="text-center mt-20 pt-8 border-t border-white/10">
            <button
              onClick={() => navigate('/library')}
              className="group inline-flex items-center justify-center bg-[#2D1B3D]/90 backdrop-blur-md hover:bg-[#2D1B3D] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-white/20 hover:border-white/40 w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-lg">View All Books</span>
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {featuredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-8 border border-[#3D2A54]/50 max-w-md mx-auto shadow-xl">
              <BookOpen className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">No Featured Books</h3>
              <p className="text-white/80 mb-6">
                No books are currently marked as featured. Check our full library for all available books.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .card-hover-gold:hover, .card-hover-gold.gold-glow {
          box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1;
        }
        @media (hover: none) and (pointer: coarse) {
          .card-hover-gold:active {
            box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1;
          }
        }
        .cart-button-animated { position: relative; overflow: hidden; }
        .cart-button-animated .cart-icon { position: absolute; z-index: 2; top: 50%; left: -10%; transform: translate(-50%, -50%); opacity: 0; }
        .cart-button-animated .box-icon { position: absolute; z-index: 3; top: -20%; left: 52%; transform: translate(-50%, -50%); opacity: 0; }
        .cart-button-animated .cart-text { position: relative; z-index: 3; transition: opacity 0.3s ease; }
        .cart-button-animated .added-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; opacity: 0; }
        .cart-button-animated.clicked .cart-icon { animation: cartAnimation 1.5s ease-in-out forwards; }
        .cart-button-animated.clicked .box-icon { animation: boxAnimation 1.5s ease-in-out forwards; }
        .cart-button-animated.clicked .cart-text { animation: textOut 1.5s ease-in-out forwards; }
        .cart-button-animated.clicked .added-text { animation: textIn 1.5s ease-in-out forwards; }
        @keyframes cartAnimation { 0% { left: -10%; opacity: 1; } 40%, 60% { left: 50%; opacity: 1; } 100% { left: 110%; opacity: 0; } }
        @keyframes boxAnimation { 0%, 40% { top: -20%; opacity: 1; } 60% { top: 40%; left: 52%; opacity: 1; } 100% { top: 40%; left: 112%; opacity: 0; } }
        @keyframes textOut { 0% { opacity: 1; } 20%, 100% { opacity: 0; } }
        @keyframes textIn { 0%, 80% { opacity: 0; } 100% { opacity: 1; } }
        .wishlist-button-animated { position: relative; }
        .wishlist-button-animated .heart-static { transition: transform 0.2s ease; }
        .wishlist-button-animated.clicked { animation: pop 0.3s ease-out; }
        .wishlist-button-animated.clicked .heart-static { transform: scale(1.2); }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
      `}</style>
    </section>
  );
};

export default FeaturedBooksSection;