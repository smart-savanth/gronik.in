import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check, ExternalLink, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { useGetAllBooksQuery } from '../../utils/booksService';

/**
 * Sub-component: BookCard
 * Replicates the exact styling, size, and animations from LibraryPage
 */

/**
 * Sub-component: BookCard
 * Replicates the exact styling, size, and animations from LibraryPage
 * * CHANGE: Adjusted lg:w-48 lg:h-64 to lg:w-32 lg:h-44 for smaller card size
 */
const BookCard = React.memo(({
  book,
  isInCart,
  isInWishlist,
  animatingCart,
  animatingWishlist,
  cartButtonClicked,
  wishlistButtonClicked,
  onCartClick,
  onWishlistClick,
  onCardClick,
  hovered,
  setHoveredBook
}) => {
  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHoveredBook(book.id)}
      onMouseLeave={() => setHoveredBook(null)}
      onClick={() => onCardClick(book)}
    >
      <div className={`relative bg-[#1A0F2E]/80 backdrop-blur-md rounded-xl lg:rounded-3xl border border-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl w-[175px] sm:w-[150px] lg:w-[250px] p-3 sm:p-4 lg:p-6 flex flex-col card-hover-gold ${hovered === book.id ? 'gold-glow' : ''}`}>

        
        {/* Category Badge */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-white/20 whitespace-nowrap">
            {book.category}
          </div>
        </div>

        {/* Image - **SIZE ADJUSTED HERE** */}
        <div className="mb-2 sm:mb-3 lg:mb-4 flex justify-center mt-1 sm:mt-2 lg:mt-4">
          <div className="relative w-20 h-28 sm:w-24 sm:h-32 lg:w-28 lg:h-40 rounded-lg lg:rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={book.image} 
              alt={book.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Text Details */}
        <div className="text-center flex-1 flex flex-col justify-between">
          <div className="mb-2 sm:mb-3">
            <h3 className="font-bold text-white group-hover:text-white/90 transition-colors duration-300 leading-tight text-xs sm:text-sm lg:text-lg mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center">
              <span className="text-center">{book.title}</span>
            </h3>
            <p className="text-white/70 font-medium text-[10px] sm:text-xs lg:text-sm">by {book.author}</p>
          </div>

          {/* Rating & Price */}
          <div className="mb-2 sm:mb-3">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                ))}
              </div>
              <span className="text-white/80 text-xs sm:text-sm font-medium ml-1">{book.rating}</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className="text-sm sm:text-base lg:text-xl font-bold text-white">₹{book.price}</span>
                <span className="text-xs sm:text-sm lg:text-sm text-white/50 line-through">₹{book.originalPrice}</span>
              </div>
              {book.discount && (
                <div className="text-xs sm:text-xs lg:text-sm text-green-400 font-medium">{book.discount}</div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-row gap-2 w-full mb-4">
            <button
              onClick={(e) => onCartClick(e, book)}
              disabled={animatingCart}
              className={`cart-button-animated ${cartButtonClicked ? 'clicked' : ''} flex-1 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl ${
                isInCart
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#2D1B3D] shadow-xl'
              }`}
            >
              {isInCart ? (
                <ExternalLink className="hidden sm:inline w-5 h-5" />
              ) : (
                <>
                  <ShoppingCart className="hidden sm:inline cart-icon w-5 h-5" />
                  <div className="hidden sm:inline box-icon w-3 h-3 bg-current rounded-sm"></div>
                </>
              )}

              <span className="cart-text" aria-live="polite" aria-atomic="true">
                {animatingCart ? (
                  <>
                    <span className="sm:hidden">Adding…</span>
                    <span className="hidden sm:inline">Adding to Cart…</span>
                  </>
                ) : isInCart ? (
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
              onClick={(e) => onWishlistClick(e, book)}
              disabled={animatingWishlist}
              className={`wishlist-button-animated ${wishlistButtonClicked ? 'clicked' : ''} p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${
                isInWishlist
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7]'
              }`}
              style={{ minWidth: 0 }}
            >
              <Heart className={`heart-static w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
/**
 * Main Component: FeaturedBooksSection
 */
const FeaturedBooksSection = ({
  cart = [],
  wishlist = [],
  onAddToCart,
  onRemoveFromCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const navigate = useNavigate();
  const [hoveredBook, setHoveredBook] = useState(null);
  
  // Animation States
  const [cartButtonClicked, setCartButtonClicked] = useState({});
  const [wishlistButtonClicked, setWishlistButtonClicked] = useState({});
  const [animatingCart, setAnimatingCart] = useState({});
  const [animatingWishlist, setAnimatingWishlist] = useState({});

  // Fetch Data
  const { data: booksResponse, isLoading } = useGetAllBooksQuery({
    page: 1,
    pageSize: 1000,
  });

  // Filter only Featured books
  const featuredBooks = useMemo(() => {
    return booksResponse?.data
      ?.filter(book => book.featured)
      ?.map(book => ({
        id: book._id,
        // Ensure we pass both formats so App.js handlers work correctly
        _id: book._id, 
        title: book.title,
        author: book.author,
        category: book.category,
        price: Number(book.final_price),
        originalPrice: Number(book.original_price),
        // Pass original naming for App.js handlers
        final_price: book.final_price,
        original_price: book.original_price,
        rating: book.rating || 4.5,
        image: book.coverImageUrl || book.image || "https://via.placeholder.com/300x400?text=No+Image",
        // Pass coverImageUrl for App.js handlers
        coverImageUrl: book.coverImageUrl || book.image,
        description: book.description,
        featured: book.featured,
        discount: book.discount || (book.original_price > book.final_price ? `${Math.round(((book.original_price - book.final_price) / book.original_price) * 100)}% OFF` : null)
      })) ?? [];
  }, [booksResponse]);

  // Helpers
  const isInCart = (book) => cart.some(item => item.id === book.id || item.id === book._id);
  const isInWishlist = (book) => wishlist.some(item => item.id === book.id || item.id === book._id);

  // --- Handlers (Replicating LibraryPage Logic) ---

  const handleCartAction = useCallback((e, book) => {
    e.stopPropagation();
    if (animatingCart[book.id]) return;

    if (isInCart(book)) {
      navigate('/cart');
      return;
    }

    // Start Animation
    setAnimatingCart(prev => ({ ...prev, [book.id]: true }));
    setCartButtonClicked(prev => ({ ...prev, [book.id]: true }));

    // Wait for animation, then call parent handler
    setTimeout(() => {
      onAddToCart && onAddToCart(book);
      setAnimatingCart(prev => ({ ...prev, [book.id]: false }));
      setCartButtonClicked(prev => ({ ...prev, [book.id]: false }));
    }, 1200);
  }, [animatingCart, isInCart, navigate, onAddToCart]);

  const handleToggleWishlist = useCallback((e, book) => {
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
  }, [animatingWishlist, isInWishlist, onAddToWishlist, onRemoveFromWishlist]);

  const handleCardClick = (book) => {
    navigate(`/product/${book.id}`, { state: { from: 'featured' } });
  };

  return (
    <section id="featured-books" className="py-20 relative overflow-hidden">
      {/* Background - kept consistent with Featured vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9B7BB8] via-[#8A6BA3] to-[#2D1B3D]" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#9B7BB8]/20 rounded-full blur-2xl" />

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

        {/* Grid - Using the alignment from the previous FeaturedBooks request */}
        <div className="flex justify-center mb-16">
          <div className="
              grid
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      gap-4
      mx-auto
      place-items-center
            ">
            {featuredBooks.map((book, index) => (
              <div key={book.id} style={{ animationDelay: `${index * 200}ms` }}>
                <BookCard
                  book={book}
                  isInCart={isInCart(book)}
                  isInWishlist={isInWishlist(book)}
                  animatingCart={!!animatingCart[book.id]}
                  animatingWishlist={!!animatingWishlist[book.id]}
                  cartButtonClicked={!!cartButtonClicked[book.id]}
                  wishlistButtonClicked={!!wishlistButtonClicked[book.id]}
                  onCartClick={handleCartAction}
                  onWishlistClick={handleToggleWishlist}
                  onCardClick={handleCardClick}
                  hovered={hoveredBook === book.id}
                  setHoveredBook={setHoveredBook}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        {featuredBooks.length > 0 && (
          <div className="text-center mt-8 pt-8 border-t border-white/10">
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

        {/* Empty State */}
        {featuredBooks.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-8 border border-[#3D2A54]/50 max-w-md mx-auto shadow-xl">
              <BookOpen className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">No Featured Books</h3>
              <p className="text-white/80 mb-6">
                Check back later for our premium selection.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Copying the EXACT styles from LibraryPage */}
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