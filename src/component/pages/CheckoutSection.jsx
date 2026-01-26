import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ShoppingBag, CheckCircle, ArrowLeft, ArrowRight, Smile } from 'lucide-react';
import { useSavePaymentMutation } from '../../utils/paymentService';
import { useSaveOrderMutation } from '../../utils/orderServices';
import { useRemoveFromCartMutation } from '../../utils/cartService';


// 3 steps: Cart → Review → Success (Payment removed)
const steps = [
  { label: 'Cart', icon: ShoppingBag },
  { label: 'Review', icon: CheckCircle },
  { label: 'Success', icon: Smile },
];

const CheckoutSection = () => {
  console.log("change 4");
  
const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cart, setCart] = useState([]);
  const [transactionError, setTransactionError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
 const isReturningFromPayment = Boolean(
  localStorage.getItem("paymentFlow") === "IN_PROGRESS" &&
  localStorage.getItem("pendingPayment")
);

  // Get user ID from Redux (same as App.js)
  const user = useSelector(state => state.userAuth.user);
  const userId = user?.guid;

  // API hooks
  const [savePayment] = useSavePaymentMutation();
  const [saveOrder] = useSaveOrderMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  // Authentication check - redirect to login if not authenticated
  React.useEffect(() => {
    if (!userId && !isReturningFromPayment) {
      // Store the intended destination
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
    }
  }, [userId, navigate, location, isReturningFromPayment]);

React.useEffect(() => {
  if (isReturningFromPayment) {
    console.log("🟢 Hard forcing Review step BEFORE render");
 
  }
}, []); // 👈 run only once on mount

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
    window.addEventListener("cart-updated", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("cart-updated", update);
    };
  }, []);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const uiStep = searchParams.get("step"); // "review" | null
const paymentResult = searchParams.get("payment"); // success | failed | null

const step = (() => {
  // 🔥 Highest priority: payment result
  if (paymentResult === "success") return 3;
  if (paymentResult === "failed") return 2;

  // 🔁 Returning from gateway but not resolved yet
  if (
    localStorage.getItem("paymentFlow") === "IN_PROGRESS" &&
    localStorage.getItem("pendingPayment")
  ) {
    return 2;
  }

  // 👉 Manual UI navigation
  if (uiStep === "review") return 2;

  return 1;
})();

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + (price * quantity);
  }, 0);
  const savings = cart.reduce((sum, item) => {
    const originalPrice = parseFloat(item.originalPrice) || 0;
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + ((originalPrice - price) * quantity);
  }, 0);
  // Calculate total as a number (don't use toFixed here - that returns a string)
  const total = Math.round(subtotal * 100) / 100; // Round to 2 decimals without converting to string

 
  

const handlePlaceOrder = async () => {
  console.log("🟡 handlePlaceOrder clicked");

  setTransactionError("");
  setIsProcessing(true);

  try {
    if (!userId) {
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
      return;
    }

    if (!cart.length) {
      setTransactionError("Your cart is empty.");
      return;
    }

    const productIds = cart
      .map(item => item.id || item.productId || item._id)
      .filter(Boolean);

    if (!productIds.length) {
      setTransactionError("Invalid cart items.");
      return;
    }

    const amount = Number(total);
    if (!amount || amount <= 0) {
      setTransactionError("Invalid order total.");
      return;
    }

    console.log("🚀 Calling savePayment API...");

    const res = await savePayment({
      userId,
      amount,
      productId: productIds,
    }).unwrap();

    console.log("✅ savePayment response FULL:", res);

    // 🔑 IMPORTANT FIX
    const redirectUrl = res?.data?.redirectUrl;
    const orderId = res?.data?.orderId;

    console.log("🔗 redirectUrl:", redirectUrl);
    console.log("🆔 orderId:", orderId);

    if (!redirectUrl || !orderId) {
      console.error("❌ redirectUrl or orderId missing");
      setTransactionError("Unable to initiate payment.");
      return;
    }

    // 🔐 Save pending payment
localStorage.setItem(
  "pendingPayment",
  JSON.stringify({
    userId,
    productIds,
    orderId,
    status: "PENDING",
    createdAt: Date.now(),
  })
);

// 🔑 Mark that we are leaving for payment
localStorage.setItem("paymentFlow", "IN_PROGRESS");


    console.log("➡️ Redirecting to PhonePe...");
    window.location.href = redirectUrl;

  } catch (err) {
    console.error("❌ Payment init error:", err);
    setTransactionError("Payment initiation failed.");
  } finally {
    setIsProcessing(false);
  }
};




React.useEffect(() => {
  if (isReturningFromPayment) {
    console.log("🟢 Forcing Review step (returned from gateway)");
  
  }
}, [isReturningFromPayment]);


React.useEffect(() => {
  // ⛔ DO NOT re-verify if result already known
  if (paymentResult === "success" || paymentResult === "failed") {
    return;
  }

  // Check authentication during payment verification
  if (!userId) {
    const currentPath = location.pathname + location.search;
    navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
    return;
  }

  const pendingStr = localStorage.getItem("pendingPayment");
  if (!pendingStr) return;

  const pending = JSON.parse(pendingStr);

  const verifyPayment = async () => {
    setIsCheckingPayment(true);

    try {
      // Double check authentication before verifying payment
      if (!userId) {
        const currentPath = location.pathname + location.search;
        navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
        return;
      }

      const res = await fetch(
        `https://dev-api.gronik.in/payment/checkStatus/${pending.orderId}/userId/${pending.userId}`
      );
      const result = await res.json();
      console.log(result)
      if (result?.success && result?.data?.status === "COMPLETED") {
        await saveOrder({
          userId: pending.userId,
          paymentId: pending.orderId,
          productIds: pending.productIds,
        }).unwrap();

        // Remove purchased items from backend cart (if user is logged in)
        if (userId && pending.productIds && Array.isArray(pending.productIds)) {
          try {
            // Remove each purchased product from cart
            await Promise.all(
              pending.productIds.map(productId => 
                removeFromCart({
                  userId: pending.userId,
                  productId: productId
                }).unwrap().catch(err => {
                  console.error(`Failed to remove product ${productId} from cart:`, err);
                  // Continue even if one fails
                })
              )
            );
          } catch (cartError) {
            console.error("Error removing items from backend cart:", cartError);
            // Continue even if cart removal fails
          }
        }

        // Clear localStorage cart
        localStorage.removeItem("pendingPayment");
        localStorage.removeItem("paymentFlow");
        localStorage.setItem("cart", JSON.stringify([]));
        
        // Clear cart state
        setCart([]);

        // Trigger storage events to refresh cart UI
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("cart-updated"));

        navigate("/checkout?payment=success", { replace: true });
      } else {
        localStorage.removeItem("pendingPayment");
        localStorage.removeItem("paymentFlow");

        navigate("/checkout?payment=failed", { replace: true });
      }
    } catch (err) {
      navigate("/checkout?payment=failed", { replace: true });
    } finally {
      setIsCheckingPayment(false);
    }
  };

    verifyPayment();
  }, [paymentResult, navigate, saveOrder, removeFromCart, userId, location]);


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
        {step === 1 && !isReturningFromPayment && (
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
  onClick={() => {
    if (!userId) {
      navigate(`/login?redirect=${encodeURIComponent("/checkout?step=review")}`, { replace: true });
      return;
    }
    navigate("/checkout?step=review");
  }}
  disabled={cart.length === 0 || !userId}
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
            
            {isCheckingPayment && (
              <div className="bg-blue-500/20 border border-blue-500/40 text-blue-300 p-3 rounded-lg text-center mb-4">
                Verifying payment status...
              </div>
            )}
            
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
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Order Summary</h4>
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-500 text-sm">
                    <span>You Save</span>
                    <span>-₹{savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white text-base font-bold mt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
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
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing || !userId}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Place Order"}
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