import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Heart, Star, ShoppingCart } from 'lucide-react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "The Art of Web Development",
      author: "John Smith",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
      rating: 4.5,
      category: "Technology",
      inStock: true
    },
    {
      id: 2,
      title: "Mysteries of the Universe",
      author: "Sarah Johnson",
      price: 24.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
      rating: 4.8,
      category: "Science",
      inStock: true
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      author: "Mike Wilson",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
      rating: 4.3,
      category: "Business",
      inStock: false
    },
    {
      id: 4,
      title: "Psychology of Success",
      author: "Emma Davis",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=280&fit=crop",
      rating: 4.6,
      category: "Self Help",
      inStock: true
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    // Simulate adding to cart
    console.log(`Added ${item.title} to cart`);
    // You can integrate with your cart logic here
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gronik-bg via-gronik-primary to-gronik-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button className="flex items-center text-gronik-light hover:text-gronik-accent transition-colors duration-200 mr-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Shopping
            </button>
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-gronik-accent mr-3" />
              <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
              <span className="ml-3 bg-gronik-accent text-white text-sm px-3 py-1 rounded-full">
                {wishlistItems.length} items
              </span>
            </div>
          </div>
          
          {wishlistItems.length > 0 && (
            <button 
              onClick={clearWishlist}
              className="text-gronik-light hover:text-red-400 transition-colors duration-200 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
            <Heart className="w-16 h-16 text-gronik-light/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gronik-light mb-2">Your wishlist is empty</h3>
            <p className="text-gronik-light/60 mb-6">Save your favorite books for later!</p>
            <button className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
              Explore Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl p-6 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300 group hover:transform hover:scale-105">
                {/* Book Image */}
                <div className="relative mb-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg">
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
                      onClick={() => addToCart(item)}
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
        )}

      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 400px) {
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .text-3xl {
            font-size: 1.5rem;
          }
          
          .p-6 {
            padding: 1rem;
          }
          
          .gap-6 {
            gap: 1rem;
          }
          
          .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          
          .px-4 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          
          .flex-col {
            flex-direction: column;
          }
          
          .space-x-2 > * + * {
            margin-left: 0;
            margin-top: 0.5rem;
          }
          
          .justify-between {
            justify-content: flex-start;
          }
          
          .mb-8 {
            margin-bottom: 1rem;
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;