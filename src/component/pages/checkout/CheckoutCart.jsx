import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useOutletContext } from "react-router-dom";


export default function CheckoutCart() {
    const { cart } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.userAuth.user);
  const userId = user?.guid;
  

  // Authentication check - redirect to login if not authenticated
  useEffect(() => {
    if (!userId) {
      const currentPath = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, { replace: true });
    }
  }, [userId, navigate, location]);


  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);

  const originalTotal = cart.reduce((sum, item) => {
  const original = Number(item.originalPrice || item.price || 0);
  const qty = Number(item.quantity || 1);
  return sum + original * qty;
}, 0);

const savings = originalTotal - subtotal;


  return (
      <div className="w-full max-w-3xl text-white bg-[#2D1B3D]/95 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
  
<h2 className="text-2xl font-bold mb-6 flex items-center">
  <ShoppingBag className="mr-2" /> Cart Summary
</h2>

{/* Subtotal */}
<div className="bg-white/10 rounded-xl p-4 mb-3 flex justify-between">
  <span className="text-white/70">Subtotal</span>
  <span>₹{originalTotal.toFixed(2)}</span>
</div>

{/* Discount */}
<div className="bg-white/10 rounded-xl p-4 mb-3 flex justify-between">
  <span className="text-green-400">You Save</span>
  <span className="text-green-400">
    -₹{savings.toFixed(2)}
  </span>
</div>

{/* Items */}
<div className="space-y-3 my-6">
  {cart.map((item) => (
    <div
      key={item.id}
      className="bg-white/10 rounded-xl p-4 flex justify-between"
    >
      <span>{item.title}</span>
      <span>
        ₹{(item.price * (item.quantity || 1)).toFixed(2)}
      </span>
    </div>
  ))}
</div>

<hr className="border-white/20 my-4" />

{/* Total */}
<div className="flex justify-between text-lg font-bold mb-6">
  <span>Total</span>
  <span>₹{subtotal.toFixed(2)}</span>
</div>

{/* Buttons */}
<div className="flex justify-between">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg"
  >
    <ArrowLeft size={16} /> Back
  </button>

  <button
    disabled={cart.length === 0 || !userId}
    onClick={() => {
      if (!userId) {
        navigate(`/login?redirect=${encodeURIComponent("/checkout/review")}`, { replace: true });
        return;
      }
      navigate("/checkout/review");
    }}
    className="flex items-center gap-2 px-6 py-2 bg-[#9B7BB8] rounded-lg font-bold disabled:opacity-50"
  >
    Next <ArrowRight size={16} />
  </button>
</div>

      </div>
 
  );
}
