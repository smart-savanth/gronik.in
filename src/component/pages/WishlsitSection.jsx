import React, { useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Heart, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const WishlistCard = React.memo(function WishlistCard({ item, onAddToCart, onRemove,onCardClick }) {
  return (
    <div
      className="
        group relative bg-[#1A0F2E]/80 backdrop-blur-md 
        rounded-xl lg:rounded-3xl border border-white/10 
        transition-all duration-500 transform 
        hover:scale-105 hover:-translate-y-2 shadow-2xl
        p-3 sm:p-4 lg:p-6 flex flex-col card-hover-gold mb-4
      "
      onClick={() => onCardClick(item)}
    >

      {/* CATEGORY BADGE (optional — remove if not needed) */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54]
        text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20">
          {item.category || "Wishlist"}
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center mt-4 mb-4">
        <div className="relative w-20 h-28 sm:w-24 sm:h-32 lg:w-48 lg:h-64 
          rounded-lg lg:rounded-xl overflow-hidden shadow-2xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* REMOVE HEART BUTTON */}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 
          bg-red-500/5 hover:bg-red-100 rounded-full transition duration-200
          flex items-center justify-center shadow-md"
        >
          <Heart className="w-4 h-4 text-white fill-white" />
        </button>
      </div>

      {/* TITLE & AUTHOR */}
      <div className="text-center mb-4 px-2">
        <h3 className="font-bold text-white leading-tight text-xs sm:text-sm lg:text-lg mb-1 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-white/70 font-medium text-xs sm:text-sm">
          by {item.author}
        </p>
      </div>

      {/* RATING */}
      <div className="flex justify-center items-center space-x-1 mb-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 lg:w-4 lg:h-4 ${
                i < Math.floor(item.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-white/30"
              }`}
            />
          ))}
        </div>
        <span className="text-white/80 text-xs sm:text-sm font-medium">
          {item.rating}
        </span>
      </div>

      {/* PRICE */}
      <div className="flex justify-center items-center space-x-2 mb-4">
        {item.originalPrice > item.price && (
          <span className="text-xs sm:text-sm text-white/50 line-through">
            ₹{item.originalPrice}
          </span>
        )}
        <span className="text-sm sm:text-base lg:text-xl text-white font-bold">
          ₹{item.price}
        </span>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2 mt-auto w-full">

        {/* ADD TO CART BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(item);
          }}
          className="
            flex-1 py-2 rounded-xl font-semibold text-sm
            bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D]
            shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300
          "
        >
          Add to Cart
        </button>

        {/* REMOVE BUTTON */}
        <button
          onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
          className="
            p-3 bg-gradient-to-r from-red-500 to-red-600 
            text-white rounded-xl hover:scale-105 transition-all
          "
        >
          <Trash2 className="w-4 h-4 m-auto" />
        </button>
      </div>

      {/* Add gold-hover effect like library */}
      <style jsx>{`
        .card-hover-gold:hover {
          box-shadow: 0 0 0 2px #ffe9b3,
                      0 4px 24px 0 #ffe9b3cc,
                      0 1.5px 8px 0 #fff7c1;
        }
      `}</style>
    </div>
  );
});



const WishlistPage = ({
  wishlist = [],
  removeFromWishlist,
  addToCart,
  cart = [],
  isLoading = false
}) => {
  const [localWishlist, setLocalWishlist] = React.useState([]);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  // show a full-page loader only when server says loading AND we have no local items
  const showFullPageLoader = isLoading && localWishlist.length === 0;

  const normalizePrice = (value, fallback = 0) => {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
    const fallbackParsed = Number(fallback);
    return Number.isFinite(fallbackParsed) ? fallbackParsed : 0;
  };

// Sync internal wishlist with props
React.useEffect(() => {
  if (Array.isArray(wishlist)) setLocalWishlist(wishlist);
}, [wishlist]);

// Listen for storage + wishlist updates
React.useEffect(() => {
  const refresh = () => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLocalWishlist(stored);
  };

  window.addEventListener("wishlist-updated", refresh);
  window.addEventListener("storage", refresh);

  return () => {
    window.removeEventListener("wishlist-updated", refresh);
    window.removeEventListener("storage", refresh);
  };
}, []);

// NORMALIZED LIST
const normalizedWishlist = useMemo(() => {
  return localWishlist.map(item => ({
    ...item,
    price: Number(item.price) || 0,
    originalPrice: Number(item.originalPrice) || Number(item.price) || 0,
    inStock: item.inStock ?? true,
    rating: Number(item.rating) || 4.5,
  }));
}, [localWishlist]);



  const handleContinueShopping = () => {
    navigate('/library');
  };

  const handleExploreBooks = () => {
    navigate('/library');
  };

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.offsetWidth + 12;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newScrollLeft = Math.min(container.scrollLeft + itemWidth * 2, maxScroll);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.offsetWidth + 12;
      const newScrollLeft = Math.max(container.scrollLeft - itemWidth * 2, 0);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

const handleAddToCart = useCallback((item) => {
  addToCart(item);
  removeFromWishlist(item.id);
}, [addToCart, removeFromWishlist]);

const handleCardClick = (book) => {
    navigate(`/product/${book.id}`, { state: { from: 'featured' } });
  };

const handleRemoveFromWishlist = useCallback((id) => {
  removeFromWishlist(id);
}, [removeFromWishlist]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] ">
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 lg:py-8 sm:py-2 py-1">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={handleContinueShopping}
              className="flex items-center text-white/80 hover:text-white transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </button>
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-white fill-white mr-3" />
              <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
              <span className="ml-3 bg-white text-[#2D1B3D] text-sm px-3 py-1 rounded-full font-semibold">
                {normalizedWishlist.length} items
              </span>
            </div>
          </div>
          {isLoading && (
            <div
              role="status"
              aria-label="Syncing wishlist"
              className="ml-3 w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"
              title="Syncing wishlist..."
            />
          )}

          {normalizedWishlist.length > 0 && (
            <button 
              onClick={() => normalizedWishlist.forEach(item => removeFromWishlist(item.id))}
              className="text-gronik-light hover:text-white-400 transition-colors duration-200 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleContinueShopping}
              className="flex items-center text-gronik-light hover:text-gronik-accent transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            {normalizedWishlist.length > 0 && (
              <button 
                onClick={() => normalizedWishlist.forEach(item => removeFromWishlist(item.id))}
                 className="text-xs text-white font-semibold transition-colors duration-200"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-6 h-6 text-white fill-white mr-2" />
              <h1 className="text-xl font-bold text-white">My Wishlist</h1>
            </div>
            <span className="inline-block bg-white text-[#2D1B3D] text-xs px-3 py-1 rounded-full font-semibold">
              {normalizedWishlist.length} {normalizedWishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Wishlist Content */}
        {/* Wishlist Content */}
{showFullPageLoader ? (
  // full-page loader only when we truly have nothing yet
  <div className="text-center py-16 bg-[#2D1B3D]/80 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
    <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-gronik-accent mx-auto mb-6 animate-spin" />
    <h3 className="text-xl font-semibold text-white mb-2">Loading your wishlist…</h3>
    <p className="text-gronik-light/70">Hang tight while we sync your saved books.</p>
  </div>
) : normalizedWishlist.length === 0 ? (
  <div className="text-center py-16 bg-[#2D1B3D]/80 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
    <Heart className="w-16 h-16 text-gronik-light/50 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gronik-light mb-2">Your wishlist is empty</h3>
    <p className="text-gronik-light/60 mb-6">Save your favorite books for later!</p>
    <button 
      onClick={handleExploreBooks}
      className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
    >
      Explore Books
    </button>
  </div>
) : (
  <>
    {/* Desktop Grid View */}
    {normalizedWishlist.length > 0 && (
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {normalizedWishlist.map(item => (
          <WishlistCard
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
            onRemove={handleRemoveFromWishlist}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    )}

    {/* Mobile Grid */}
    <div className="sm:hidden grid grid-cols-2 gap-1 px-4">
      {normalizedWishlist.map(item => (
        <div key={item.id} className="p-0">
          <WishlistCard
            item={item}
            onAddToCart={handleAddToCart}
            onRemove={handleRemoveFromWishlist}
            onCardClick={handleCardClick}
          />
        </div>
      ))}
    </div>
  </>
)}

      </div>
      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .aspect-[3/4] {
          aspect-ratio: 3/4;
        }
        @media (max-width: 400px) {
          .w-40 { width: 9rem; }
          .gap-3 { gap: 0.5rem; }
          .px-8 { padding-left: 2rem; padding-right: 2rem; }
          .py-4 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .p-3 { padding: 0.5rem; }
          .mb-3 { margin-bottom: 0.5rem; }
          .space-y-2 > * + * { margin-top: 0.375rem; }
          .rounded-xl { border-radius: 0.75rem; }
          .text-sm { font-size: 0.8125rem; }
          .text-xs { font-size: 0.6875rem; }
          .leading-tight { line-height: 1.1; }
        }
      `}</style>
    </div>
  );
};

export default React.memo(WishlistPage);
