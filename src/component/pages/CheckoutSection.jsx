import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, ArrowLeft, ArrowRight, Smile } from 'lucide-react';

// 3 steps: Cart → Review → Success (Payment removed)
const steps = [
  { label: 'Cart', icon: ShoppingBag },
  { label: 'Review', icon: CheckCircle },
  { label: 'Success', icon: Smile },
];

const CheckoutSection = () => {
  const [cart, setCart] = useState([]);
  const [transactionError, setTransactionError] = useState("");

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  React.useEffect(() => {
    const update = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(stored);
    };
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * (item.quantity || 1)), 0);
  const total = subtotal;

  const handleNext = () => {
    setStep(s => Math.min(s + 1, steps.length));
  };
  
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
 const handlePlaceOrder = async () => {
  setTransactionError("");

  // 1) Start fake payment
  const payment = await simulateTransaction();

  if (payment.status === "success") {
    // 2) Clear cart
    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new Event("storage"));

    // 3) Go to success screen
    setOrderPlaced(true);
    setStep(3);
    
  } else {
    // 4) Payment failed (do NOT clear cart)
    setTransactionError("Transaction failed. Please try again.");
  }
};


  const simulateTransaction = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {

        const success = false; // transaction api should be added here
  
        if (success) {
          resolve({ status: "success", transactionId: "TXN" + Date.now() });
        } else {
          resolve({ status: "failed" });
        }
      }, 1500); 
    });
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] w-full px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      
      {/* Stepper */}
      <div className="relative w-full max-w-3xl flex flex-col items-center mb-6 sm:mb-8 md:mb-12 px-2">
        <div className="absolute top-1/2 left-0 right-0 h-3 sm:h-4 -translate-y-1/2 bg-[#e9d6f7] rounded-full z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-3 sm:h-4 -translate-y-1/2 bg-gradient-to-r from-[#9B7BB8] to-[#B894D1] rounded-full z-10 transition-all duration-500"
          style={{ width: `${(100 * (step-1)/(steps.length-1))}%` }}
        ></div>
        
        <div className="relative flex justify-between items-center w-full z-20">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center flex-1">
              <div
                className={`rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-lg
                  ${step > i+1 ? 'bg-green-400 border-green-400 text-white scale-110' : 
                    step === i+1 ? 'bg-[#9B7BB8] border-[#9B7BB8] text-white scale-125' : 
                    'bg-white border-gray-300 text-gray-400'}
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
                `}
              >
                <s.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-semibold text-center
                ${step === i+1 ? 'text-white' : step > i+1 ? 'text-green-500' : 'text-[#2D1B3D]'}
              `}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-3xl bg-[#2D1B3D]/95 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-white mb-8 sm:mb-12 md:mb-16">
        
        {/* Step 1: Cart Summary */}
        {step === 1 && (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Cart Summary
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-[#9B7BB8]/60 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                <p className="text-white/60 mb-6 text-sm sm:text-base">Add some books to get started!</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 sm:gap-4 bg-[#9B7BB8]/10 rounded-xl p-3 sm:p-4">
                      <img src={item.image} alt={item.title} className="w-12 h-16 sm:w-14 sm:h-20 rounded-lg object-cover shadow" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate text-sm sm:text-base">{item.title}</h4>
                        <p className="text-white/80 text-xs sm:text-sm truncate">by {item.author}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white text-sm sm:text-base">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="bg-[#9B7BB8]/10 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-white/80 text-sm mb-2">
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-500 text-sm mb-2">
                      <span>You Save</span>
                      <span>-₹{savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between text-white text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                onClick={handleNext} 
                disabled={cart.length === 0} 
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 2: Review & Confirm */}
        {step === 2 && (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Review & Confirm
            </h2>
            
            <div className="space-y-4 mb-6">
              {/* Order Items */}
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Order Items</h4>
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-white/80 text-sm">
                      <span className="truncate flex-1 mr-4">{item.title}</span>
                      <span className="font-semibold text-white">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              {transactionError && (
                <div className="bg-red-500/20 border border-red-500/40 text-red-300 p-3 rounded-lg text-center mt-3">
                  {transactionError}
                </div>
              )}
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>You Save</span>
                      <span>-₹{savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between text-white text-base sm:text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Notice */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-blue-400 text-sm text-center">
                  <strong>Payment will be processed securely</strong> after you place your order.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <button 
                onClick={handleBack} 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                onClick={handlePlaceOrder} 
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition text-sm sm:text-base"
              >
                Place Order
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && orderPlaced && (
          <div className="text-center py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Order Placed Successfully!</h2>
            <p className="text-white/80 mb-2 text-sm sm:text-base px-4">Thank you for your purchase.</p>
            <button 
              onClick={() => window.location.href = '/library'} 
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
            >
              Back to Library
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSection;