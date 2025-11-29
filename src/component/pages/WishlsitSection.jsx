import React, { useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Heart, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const WishlistCard = React.memo(function WishlistCard({ item, onAddToCart, onRemove }) {
  return (
    <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-2xl p-6 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300 group hover:transform hover:scale-105">
      <div className="relative mb-4">
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg bg-[#2D1B3D]/80">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 w-8 h-8 bg-gronik-primary/80 hover:bg-red-500 rounded-full transition-colors duration-200 flex items-center justify-center shadow-md"
          aria-label="Remove from wishlist"
          type="button"
        >
          <Heart className="w-4 h-4 text-gronik-accent fill-current hover:text-white" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-gronik-accent transition-colors duration-200 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-gronik-light/80 text-sm">by {item.author}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gronik-light/30'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gronik-light/60 ml-2">({item.rating})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {Number.isFinite(item.originalPrice) && Number.isFinite(item.price) && item.originalPrice > item.price && (
            <span className="text-sm text-gronik-light/60 line-through">₹{item.originalPrice.toFixed(2)}</span>
          )}
          <span className="text-lg font-bold text-gronik-accent">₹{item.price.toFixed(2)}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => onAddToCart(item)}
            disabled={!item.inStock}
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
              item.inStock ? 'bg-gronik-accent hover:bg-gronik-secondary text-white transform hover:scale-105' : 'bg-gronik-light/20 text-gronik-light/50 cursor-not-allowed'
            }`}
            type="button"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            onClick={() => onRemove(item.id)}
            type="button"
            className="p-2 text-gronik-light/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
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

const handleRemoveFromWishlist = useCallback((id) => {
  removeFromWishlist(id);
}, [removeFromWishlist]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-8 sm:py-2 py-1">
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
