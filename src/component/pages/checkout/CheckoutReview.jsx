import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";
import { useSavePaymentMutation } from "../../../utils/paymentService";

export default function CheckoutReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.userAuth.user);
  const userId = user?.guid;

  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [savePayment] = useSavePaymentMutation();

  // Authentication check - redirect to login if not authenticated
  useEffect(() => {
    if (!userId) {
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
    }
  }, [userId, navigate, location]);
const subtotal = cart.reduce((sum, item) => {
  const original = Number(item.originalPrice || item.price || 0);
  const qty = Number(item.quantity || 1);
  return sum + original * qty;
}, 0);

const savings = cart.reduce((sum, item) => {
  const original = Number(item.originalPrice || 0);
  const price = Number(item.price || 0);
  const qty = Number(item.quantity || 1);
  return sum + (original - price) * qty;
}, 0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  // 🚀 INITIATE PAYMENT
  const handlePay = async () => {
    setError("");
    setIsProcessing(true);

    try {
      if (!userId) throw new Error("Login required");
      if (!cart.length) throw new Error("Cart empty");

      const productIds = cart.map((i) => i.id || i._id).filter(Boolean);

      const res = await savePayment({
        userId,
        amount: Number(total.toFixed(2)),
        productId: productIds,
      }).unwrap();

      const redirectUrl = res?.data?.redirectUrl;
      const orderId = res?.data?.orderId;

      if (!redirectUrl || !orderId) throw new Error("Invalid payment response");

      // Save pending payment data for cart removal after successful payment
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
      localStorage.setItem("paymentFlow", "IN_PROGRESS");

      // Backend + CheckoutVerify handle status and order saving.
      // Just redirect user to payment gateway.
      window.location.href = redirectUrl;
      } catch (e) {
      setError(e.message || "Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl text-white bg-[#2D1B3D]/95 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CheckCircle className="mr-2" /> Review & Confirm
      </h2>

{/* Order Items */}
<div className="bg-[#9B7BB8]/10 rounded-xl p-4 mb-4">
  <h4 className="font-semibold mb-3">Order Items</h4>
  <div className="space-y-2">
    {cart.map((item) => (
      <div key={item.id} className="flex justify-between text-white/80 text-sm">
        <span>{item.title}</span>
        <span>
          ₹{(item.price * (item.quantity || 1)).toFixed(2)}
        </span>
      </div>
    ))}
  </div>
</div>

{/* Order Summary */}
<div className="bg-[#9B7BB8]/10 rounded-xl p-4 mb-6">
  <h4 className="font-semibold mb-3">Order Summary</h4>

  <div className="flex justify-between text-white/80 text-sm mb-1">
    <span>Subtotal ({cart.length} items)</span>
    <span>₹{subtotal.toFixed(2)}</span>
  </div>

  {savings > 0 && (
    <div className="flex justify-between text-green-400 text-sm mb-1">
      <span>You Save</span>
      <span>-₹{savings.toFixed(2)}</span>
    </div>
  )}

  <div className="border-t border-white/20 mt-2 pt-2 flex justify-between font-bold">
    <span>Total</span>
    <span>₹{total.toFixed(2)}</span>
  </div>
</div>


      <div className="border-t border-white/20 pt-4 flex justify-between font-bold mb-6">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/40 text-red-300 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      {!userId && (
        <div className="bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 p-3 rounded-lg mb-4 text-center">
          Please login to place an order.
        </div>
      )}
      <button
        onClick={handlePay}
        disabled={isProcessing || !userId}
        className="w-full py-3 bg-green-600 rounded-lg font-bold disabled:opacity-50"
      >
        {isProcessing ? "Redirecting..." : "Pay Now"}
      </button>
    </div>
  );
}
