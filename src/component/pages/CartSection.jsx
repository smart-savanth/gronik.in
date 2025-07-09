import React from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSection = ({
  cart = [],
  removeFromCart,
  updateCartItemQuantity,
  addToWishlist,
  wishlist = []
}) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/library');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gronik-bg via-gronik-primary to-gronik-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center mb-8">
          <button className="flex items-center text-gronik-light hover:text-gronik-accent transition-colors duration-200 mr-6" onClick={handleContinueShopping}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 text-gronik-accent mr-3" />
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <span className="ml-3 bg-gronik-accent text-white text-sm px-3 py-1 rounded-full">
              {cart.length} items
            </span>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleContinueShopping}
              className="flex items-center text-gronik-light hover:text-gronik-accent transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Continue Shopping</span>
            </button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ShoppingBag className="w-6 h-6 text-gronik-accent mr-2" />
              <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
            </div>
            <span className="inline-block bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white text-sm px-4 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:block">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-16 bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
                    <ShoppingBag className="w-16 h-16 text-gronik-light/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gronik-light mb-2">Your cart is empty</h3>
                    <p className="text-gronik-light/60 mb-6">Add some books to get started!</p>
                    <button 
                      onClick={handleContinueShopping}
                      className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Now
                    </button>
                  </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => addToWishlist(item)}
                            className="p-1 bg-gronik-primary/80 rounded-full hover:bg-gronik-accent transition-colors duration-200"
                          >
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Book Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-white group-hover:text-gronik-accent transition-colors duration-200">
                              {item.title}
                            </h3>
                            <p className="text-gronik-light/80">by {item.author}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gronik-light/30'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gronik-light/60 ml-2">({item.rating})</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gronik-light/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-gronik-primary/50 rounded-lg border border-gronik-accent/30">
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gronik-accent/20 rounded-l-lg transition-colors duration-200"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-gronik-light" />
                            </button>
                            <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gronik-accent/20 rounded-r-lg transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gronik-light" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          {item.originalPrice !== item.price && (
                            <span className="text-sm text-gronik-light/60 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-gronik-accent">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-gronik-shadow/40 backdrop-blur-sm rounded-2xl p-6 border border-gronik-accent/20 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2 text-gronik-accent" />
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gronik-light">
                      <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>You Save</span>
                        <span>-${savings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gronik-light">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gronik-accent/20 pt-4">
                      <div className="flex justify-between text-lg font-bold text-white">
                        <span>Total</span>
                        <span className="text-gronik-accent">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gronik-accent/25 mb-4">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Cart View */}
        <div className="sm:hidden">
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
              <ShoppingBag className="w-16 h-16 text-gronik-light/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gronik-light mb-2">Your cart is empty</h3>
              <p className="text-gronik-light/60 mb-6">Add some books to get started!</p>
              <button 
                onClick={handleContinueShopping}
                className="bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Explore Now
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pb-32">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-gronik-shadow/40 backdrop-blur-sm rounded-2xl p-4 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-28 rounded-xl overflow-hidden shadow-lg bg-gronik-primary/20">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                         onClick={() => addToWishlist(item)}
                        className="absolute -top-0.5 -right-0.5 w-6 h-6 bg-gronik-primary/90 hover:bg-gronik-accent rounded-full transition-colors duration-200 shadow-lg flex items-center justify-center"
                      >
                        <Heart className="w-4 h-4 text-gronik-light hover:text-white" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-bold text-white text-base leading-tight mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gronik-light/80 text-sm mb-1 truncate">
                            by {item.author}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gronik-light/30'}`} 
                              />
                            ))}
                            <span className="text-xs text-gronik-light/60 ml-1">({item.rating})</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gronik-light/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price Section */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gronik-accent">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice !== item.price && (
                            <span className="text-sm text-gronik-light/60 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gronik-primary/50 rounded-xl border border-gronik-accent/30 overflow-hidden">
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gronik-accent/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4 text-gronik-light" />
                          </button>
                          <div className="px-4 py-2 bg-gronik-accent/20 min-w-[3rem] text-center">
                            <span className="text-white font-semibold">{item.quantity}</span>
                          </div>
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gronik-accent/20 transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4 text-gronik-light" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gronik-light/60 mb-1">Subtotal</div>
                          <div className="text-lg font-bold text-gronik-accent">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSection;