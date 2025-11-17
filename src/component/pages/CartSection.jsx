import React from 'react';
import { Trash2, ShoppingBag, ArrowLeft, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSaveCartMutation, useGetCartByUserIdQuery } from '../../utils/cartService';
import { useSaveWishlistMutation } from '../../utils/wishListService';

const CartSection = ({
  removeFromCart,
  addToWishlist,
  wishlist = []
}) => {
  // cart = (cart || []).map(item => ({
  //   ...item,
  //   price: parseFloat(item.price ?? item.final_price ?? 0),
  //   originalPrice: parseFloat(item.originalPrice ?? item.original_price ?? item.price ?? 0),
  //   quantity: item.quantity ?? 1,
  // }));
  // ---- FETCH CART FOR LOGGED-IN USER ----
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.guid;

const [saveWishlist] = useSaveWishlistMutation();
const [localCartState, setLocalCartState] = React.useState(0);

const { data: cartResponse } = useGetCartByUserIdQuery(userId, { skip: !userId });

console.log("CART RESPONSE:", cartResponse);


const [cart, setCart] = React.useState([]);

// ---------------------------
// Load Cart (backend or local)
// ---------------------------
React.useEffect(() => {
  if (userId && cartResponse?.data?.product_details) {
    // Logged-in user → backend cart
    setCart(
      cartResponse.data.product_details.map(item => ({
        id: item._id,
        title: item.title,
        author: item.author,
        image: item.coverImageUrl,
        price: parseFloat(item.final_price),
        originalPrice: parseFloat(item.original_price),
        quantity: 1
      }))
    );
  } else {
    // Logged-out user → localStorage cart
    const local = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(
      local.map(item => ({
        ...item,
        price: parseFloat(item.price),
        originalPrice: parseFloat(item.originalPrice),
        quantity: item.quantity ?? 1,
      }))
    );
  }
}, [userId, cartResponse, localCartState]);

// ---------------------------
// Listen for storage updates
// ---------------------------
React.useEffect(() => {
  const update = () => setLocalCartState(x => x + 1);
  window.addEventListener("storage", update);
  return () => window.removeEventListener("storage", update);
}, []);



const handleAddWishlist = (book) => {
  addToWishlist(book);   // redux
  window.dispatchEvent(new Event("wishlist-updated"));
};

  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/library');
  };

   const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * (item.quantity || 1)), 0);
  const total = subtotal;

  const [saveCart] = useSaveCartMutation();

const handleRemove = (id) => {
  removeFromCart(id);   // redux
  window.dispatchEvent(new Event("cart-updated"));
};

React.useEffect(() => {
  const refresh = () => setLocalCartState(x => x + 1);

  window.addEventListener("cart-updated", refresh);
  window.addEventListener("wishlist-updated", refresh);

  return () => {
    window.removeEventListener("cart-updated", refresh);
    window.removeEventListener("wishlist-updated", refresh);
  };
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Header */}
        <div className="hidden sm:flex items-center mb-8">
          <button className="flex items-center text-white/80 hover:text-white transition-colors duration-200 mr-6" onClick={handleContinueShopping}>
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <div className="flex items-center">
            <ShoppingBag className="w-8 h-8 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
            <span className="ml-3 bg-white text-[#2D1B3D] text-sm px-3 py-1 rounded-full font-semibold">
              {cart.length} items
            </span>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handleContinueShopping}
              className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Continue Shopping</span>
            </button>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <ShoppingBag className="w-6 h-6 text-white mr-2" />
              <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
            </div>
            <span className="inline-block bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D] text-sm px-4 py-1 rounded-full font-semibold">
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
                <div className="text-center py-16 bg-[#2D1B3D]/80 backdrop-blur-sm rounded-2xl border border-white/10">
                  <ShoppingBag className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
                  <p className="text-white/60 mb-6">Add some books to get started!</p>
                  <button 
                    onClick={handleContinueShopping}
                    className="bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] hover:from-[#8A6AA7] hover:to-[#9B7BB8] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Now
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-[#2D1B3D]/95 rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 group hover:scale-105">
                    {/* Book Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <img
                            src={
                              item.image ||
                              item.coverImageUrl ||
                              "https://via.placeholder.com/300x400?text=No+Image"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        <div className="absolute top-2 right-2">
                          <button
                             onClick={() => handleAddWishlist(item)}
                            className={`p-1 bg-[#2D1B3D]/80 rounded-full hover:bg-[#3D2A54]/80 transition-colors duration-200 ${wishlist.some(w => w.id === item.id) ? 'animate-pulse' : ''}`}
                          >
                            <Heart className={`w-4 h-4 ${wishlist.some(w => w.id === item.id) ? 'fill-current text-white' : 'text-white'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Book Details */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-white group-hover:text-gray-200 transition-colors duration-200">
                              {item.title}
                            </h3>
                            <p className="text-white/80">by {item.author}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-white/60 ml-2">({item.rating})</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      {/* Price Section - REMOVED QUANTITY */}
                      <div className="flex items-center justify-end">
                        <div className="flex flex-col items-end">
                          {item.originalPrice !== item.price && (
                            <span className="text-sm text-white/60 line-through">
                              ₹{item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lg font-bold text-white">
                            ₹{item.price.toFixed(2)}
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
                <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2 text-white" />
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-white">
                      <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>You Save</span>
                        <span>-₹{savings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between text-lg font-bold text-white">
                        <span>Total</span>
                        <span className="text-gray-200">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] hover:from-[#8A6AA7] hover:to-[#9B7BB8] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/10 mb-4"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Cart View */}
        <div className="sm:hidden">
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-[#2D1B3D]/80 backdrop-blur-sm rounded-2xl border border-white/10">
              <ShoppingBag className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
              <p className="text-white/60 mb-6">Add some books to get started!</p>
              <button 
                onClick={handleContinueShopping}
                className="bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] hover:from-[#8A6AA7] hover:to-[#9B7BB8] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Explore Now
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 pb-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-28 rounded-xl overflow-hidden shadow-lg bg-[#3D2A54]/20">
                          <img
                            src={
                              item.image ||
                              item.coverImageUrl ||
                              "https://via.placeholder.com/300x400?text=No+Image"
                            }

                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => addToWishlist(item)}
                          className={`absolute -top-0.5 -right-0.5 w-6 h-6 bg-[#2D1B3D]/90 hover:bg-[#3D2A54]/90 rounded-full transition-colors duration-200 shadow-lg flex items-center justify-center ${wishlist.some(w => w.id === item.id) ? 'animate-pulse' : ''}`}
                        >
                          <Heart className={`w-4 h-4 ${wishlist.some(w => w.id === item.id) ? 'fill-current text-white' : 'text-white hover:text-gray-200'}`} />
                        </button>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-bold text-white text-base leading-tight mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-white/80 text-sm mb-1 truncate">
                              by {item.author}
                            </p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                />
                              ))}
                              <span className="text-xs text-white/60 ml-1">({item.rating})</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price Section - REMOVED QUANTITY */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white">
                              ₹{item.price.toFixed(2)}
                            </span>
                            {item.originalPrice !== item.price && (
                              <span className="text-sm text-white/60 line-through">
                                ₹{item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mobile Order Summary */}
              <div className="mt-6 mb-4">
                <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h2 className="text-lg font-bold text-white mb-6 flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2 text-white" />
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-white">
                      <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>You Save</span>
                        <span>-₹{savings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between text-base font-bold text-white">
                        <span>Total</span>
                        <span className="text-gray-200">₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] hover:from-[#8A6AA7] hover:to-[#9B7BB8] text-white py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/10 mb-2"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSection;