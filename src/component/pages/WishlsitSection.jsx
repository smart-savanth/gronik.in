import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Heart, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const WishlistPage = ({
  wishlist = [],
  removeFromWishlist,
  addToCart,
  cart = []
}) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

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

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gronik-bg via-gronik-primary to-gronik-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button 
              onClick={handleContinueShopping}
              className="flex items-center text-gronik-light hover:text-gronik-accent transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </button>
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-gronik-accent mr-3" />
              <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
              <span className="ml-3 bg-gronik-accent text-white text-sm px-3 py-1 rounded-full">
                {wishlist.length} items
              </span>
            </div>
          </div>
          {wishlist.length > 0 && (
            <button 
              onClick={() => wishlist.forEach(item => removeFromWishlist(item.id))}
              className="text-gronik-light hover:text-red-400 transition-colors duration-200 font-medium"
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
            {wishlist.length > 0 && (
              <button 
                onClick={() => wishlist.forEach(item => removeFromWishlist(item.id))}
                className="text-xs text-gronik-light hover:text-red-400 transition-colors duration-200 bg-gronik-shadow/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gronik-accent/20"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-6 h-6 text-gronik-accent mr-2 fill-current" />
              <h1 className="text-xl font-bold text-white">My Wishlist</h1>
            </div>
            <span className="inline-block bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white text-xs px-3 py-1 rounded-full">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
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
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map(item => (
                <div key={item.id} className="bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl p-6 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300 group hover:transform hover:scale-105">
                  {/* Book Image */}
                  <div className="relative mb-4">
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg bg-gronik-primary/20">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded-full text-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-2 bg-gronik-primary/80 hover:bg-red-500 rounded-full transition-colors duration-200"
                    >
                      <Heart className="w-4 h-4 text-gronik-accent fill-current hover:text-white" />
                    </button>
                  </div>
                  {/* Book Details */}
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
                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      {item.originalPrice !== item.price && (
                        <span className="text-sm text-gronik-light/60 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gronik-accent">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    {/* Category */}
                    <div className="flex items-center">
                      <span className="text-xs bg-gronik-accent/20 text-gronik-accent px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                        className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                          item.inStock 
                            ? 'bg-gronik-accent hover:bg-gronik-secondary text-white transform hover:scale-105' 
                            : 'bg-gronik-light/20 text-gronik-light/50 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-gronik-light/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile Carousel View */}
            <div className="sm:hidden">
              <div className="relative">
                {wishlist.length > 2 && (
                  <>
                    <button 
                      onClick={scrollToPrev}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gronik-shadow/80 backdrop-blur-sm rounded-full border border-gronik-accent/30 text-gronik-light hover:text-gronik-accent hover:bg-gronik-accent/20 transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={scrollToNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gronik-shadow/80 backdrop-blur-sm rounded-full border border-gronik-accent/30 text-gronik-light hover:text-gronik-accent hover:bg-gronik-accent/20 transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide px-8 py-4"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {wishlist.map(item => (
                    <div 
                      key={item.id} 
                      className="flex-none w-40 bg-gronik-shadow/40 backdrop-blur-sm rounded-xl p-3 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {/* Compact Book Image */}
                      <div className="relative mb-3">
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-md bg-gronik-primary/20">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-medium bg-red-500 px-2 py-0.5 rounded-full text-xs">
                                Out of Stock
                              </span>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute -top-1 -right-1 p-1.5 bg-gronik-primary/90 hover:bg-red-500 rounded-full transition-colors duration-200 shadow-lg"
                        >
                          <Heart className="w-3 h-3 text-gronik-accent fill-current hover:text-white" />
                        </button>
                      </div>
                      {/* Compact Details */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-xs text-white line-clamp-2">{item.title}</h3>
                        <p className="text-gronik-light/80 text-xs">{item.author}</p>
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
                        <div className="flex items-center space-x-1">
                          {item.originalPrice !== item.price && (
                            <span className="text-xs text-gronik-light/60 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-sm font-bold text-gronik-accent">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-xs bg-gronik-accent/20 text-gronik-accent px-1.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <div className="flex flex-col gap-1.5 pt-1">
                          <button 
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                            className={`w-full flex items-center justify-center py-1.5 px-2 rounded-lg font-medium text-xs transition-all duration-200 ${
                              item.inStock 
                                ? 'bg-gronik-accent hover:bg-gronik-secondary text-white' 
                                : 'bg-gronik-light/20 text-gronik-light/50 cursor-not-allowed'
                            }`}
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button 
                            onClick={() => removeFromWishlist(item.id)}
                            className="w-full py-1.5 px-2 text-gronik-light/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

export default WishlistPage;