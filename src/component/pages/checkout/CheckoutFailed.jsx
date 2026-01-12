import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CheckoutFailed() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto bg-[#2D1B3D]/95 rounded-2xl p-10 text-white text-center">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />

      <h2 className="text-3xl font-bold mb-3">
        Payment Failed ❌
      </h2>

      <p className="text-white/80 mb-8">
        The transaction could not be completed.  
        Don’t worry — no money was deducted.
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate("/checkout/review")}
          className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-600"
        >
          Retry Payment
        </button>

        <button
          onClick={() => navigate("/checkout")}
          className="px-6 py-3 bg-[#9B7BB8] rounded-xl font-bold hover:bg-[#8A6AA7]"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
