import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSaveOrderMutation } from "../../../utils/orderServices";

const CheckoutVerify = () => {
  const navigate = useNavigate();
  const [saveOrder] = useSaveOrderMutation();

  useEffect(() => {
    const pendingRaw = localStorage.getItem("pendingPayment");

    if (!pendingRaw) {
      navigate("/checkout/failed", { replace: true });
      return;
    }

    const pending = JSON.parse(pendingRaw);
    const { orderId, userId, productIds } = pending;

    if (!orderId || !userId || !productIds?.length) {
      navigate("/checkout/failed", { replace: true });
      return;
    }

    const verifyPayment = async () => {
      try {
        // ✅ UPDATED API (orderId ONLY)
        const res = await fetch(
          `https://dev-api.gronik.in/payment/checkStatus/${orderId}`
        );

        const result = await res.json();
        console.log("🔎 Payment status:", result);

        if (result?.success && result?.data?.status === "COMPLETED") {
          // ✅ Save order ONLY after confirmed payment
          await saveOrder({
            userId,
            paymentId: orderId,
            productIds,
          }).unwrap();

          // ✅ Cleanup
          localStorage.removeItem("pendingPayment");
          localStorage.removeItem("paymentFlow");
          localStorage.setItem("cart", JSON.stringify([]));
          window.dispatchEvent(new Event("storage"));

          navigate("/checkout/success", { replace: true });
        } else {
          throw new Error("Payment not completed");
        }
      } catch (error) {
        console.error("❌ Verification failed:", error);

        localStorage.removeItem("pendingPayment");
        localStorage.removeItem("paymentFlow");

        navigate("/checkout/failed", { replace: true });
      }
    };

    verifyPayment();
  }, [navigate, saveOrder]);

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
