import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSaveOrderMutation } from "../../../utils/orderServices";

const CheckoutVerify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [saveOrder] = useSaveOrderMutation();

  useEffect(() => {
    // 🔑 1. Extract orderId from URL
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      navigate("/checkout/failed", { replace: true });
      return;
    }

    const verifyPayment = async () => {
      try {
        // 🔑 2. Call NEW checkStatus API
        const res = await fetch(
          `https://dev-api.gronik.in/payment/checkStatus/${orderId}`
        );

        const result = await res.json();
        console.log("🔎 Payment status response:", result);

        // 🔑 3. Validate success + lowercase status
        if (result?.success && result?.data?.status === "completed") {
          const { user_id, product_details } = result.data;

          // 🔑 4. Save order using API response (SOURCE OF TRUTH)
          await saveOrder({
            userId: user_id,
            paymentId: orderId,
            productIds: product_details,
          }).unwrap();

          // 🔑 5. Cleanup
          localStorage.removeItem("pendingPayment");
          localStorage.removeItem("paymentFlow");
          localStorage.setItem("cart", JSON.stringify([]));
          window.dispatchEvent(new Event("storage"));

          navigate("/checkout/success", { replace: true });
        } else {
          throw new Error("Payment not completed");
        }
      } catch (error) {
        console.error("❌ Payment verification failed:", error);

        localStorage.removeItem("pendingPayment");
        localStorage.removeItem("paymentFlow");

        navigate("/checkout/failed", { replace: true });
      }
    };

    verifyPayment();
  }, [navigate, saveOrder, searchParams]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#2D1B3D]/95 rounded-2xl p-10 text-white text-center">
      <Loader2 className="mx-auto mb-4 animate-spin" size={40} />
      <h2 className="text-xl font-bold mb-2">Verifying your payment</h2>
      <p className="text-white/70">
        Please wait, do not refresh or close this page.
      </p>
    </div>
  );
};

export default CheckoutVerify;
