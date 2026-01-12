import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-[#2D1B3D]/95 rounded-2xl p-10 text-white text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

      <h2 className="text-3xl font-bold mb-3">
        Payment Successful 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your order has been placed successfully.
      </p>

      <button
        onClick={() => navigate("/library")}
        className="px-8 py-3 bg-[#9B7BB8] rounded-xl font-bold hover:bg-[#8A6AA7]"
      >
        Go to Library
      </button>
    </div>
  );
}
