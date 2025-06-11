import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Heart, Star } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Art of Web Development",
      author: "John Smith",
      price: 29.99,
      originalPrice: 39.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=280&fit=crop",
      rating: 4.5,
      category: "Technology"
    },
    {
      id: 2,
      title: "Mysteries of the Universe",
      author: "Sarah Johnson",
      price: 24.99,
      originalPrice: 34.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=280&fit=crop",
      rating: 4.8,
      category: "Science"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      author: "Mike Wilson",
      price: 34.99,
      originalPrice: 44.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=280&fit=crop",
      rating: 4.3,
      category: "Business"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gronik-bg via-gronik-primary to-gronik-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="flex items-center text-gronik-light hover:text-gronik-accent transition-colors duration-200 mr-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 text-gronik-accent mr-3" />
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <span className="ml-3 bg-gronik-accent text-white text-sm px-3 py-1 rounded-full">
              {cartItems.length} items
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl border border-gronik-accent/20">
                <ShoppingBag className="w-16 h-16 text-gronik-light/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gronik-light mb-2">Your cart is empty</h3>
                <p className="text-gronik-light/60">Add some books to get started!</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="bg-gronik-shadow/30 backdrop-blur-sm rounded-2xl p-6 border border-gronik-accent/20 hover:border-gronik-accent/40 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <button className="p-1 bg-gronik-primary/80 rounded-full hover:bg-gronik-accent transition-colors duration-200">
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
                            onClick={() => removeItem(item.id)}
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gronik-accent/20 rounded-l-lg transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4 text-gronik-light" />
                            </button>
                            <span className="px-4 py-2 text-white font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gronik-accent/20 rounded-r-lg transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4 text-gronik-light" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {item.originalPrice !== item.price && (
                              <span className="text-sm text-gronik-light/60 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className="text-xl font-bold text-gronik-accent">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <div className="text-sm text-gronik-light/80">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gronik-shadow/40 backdrop-blur-sm rounded-2xl p-6 border border-gronik-accent/20 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-gronik-accent" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gronik-light">
                  <span>Subtotal ({cartItems.length} items)</span>
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

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Promo code"
                    className="flex-1 px-4 py-3 bg-gronik-primary/50 border border-gronik-accent/30 rounded-l-lg text-white placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent"
                  />
                  <button className="px-6 py-3 bg-gronik-accent hover:bg-gronik-secondary text-white rounded-r-lg transition-colors duration-200 font-medium">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-gradient-to-r from-gronik-accent to-gronik-secondary hover:from-gronik-secondary hover:to-gronik-accent text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gronik-accent/25 mb-4">
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button className="w-full border-2 border-gronik-accent text-gronik-accent py-3 rounded-xl font-medium hover:bg-gronik-accent hover:text-white transition-all duration-300">
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center text-sm text-gronik-light/60">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                Secure checkout guaranteed
              </div>
            </div>
          </div>
        </div>
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
          
          .space-y-6 > * + * {
            margin-top: 1rem;
          }
          
          .gap-6 {
            gap: 1rem;
          }
          
          .px-4 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;