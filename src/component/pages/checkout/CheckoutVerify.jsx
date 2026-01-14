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
        // 🔑 2. Call checkStatus API with GUID from URL
        const res = await fetch(
          `https://dev-api.gronik.in/payment/checkStatus/${orderId}`
        );

        const result = await res.json();
        console.log("🔎 Payment status response:", result);

        // 🔑 3. Validate success + status from payment object
        const paymentStatus = result?.data?.payment?.status
          ? String(result.data.payment.status).toLowerCase()
          : "";

        if (result?.success && paymentStatus === "completed") {
          const payment = result.data.payment;

          // 🔑 Use product_details from payment as the source of truth
          let productIds = [];
          if (Array.isArray(payment.product_details)) {
            productIds = payment.product_details.filter(Boolean);
          } else if (payment.product_details) {
            productIds = [payment.product_details];
          }

          await saveOrder({
            userId: payment.user_id,
            paymentId: payment.guid,
            productIds,
          }).unwrap();

          navigate("/checkout/success", { replace: true });
        } else {
          throw new Error("Payment not completed");
        }
      } catch (error) {
        console.error("❌ Payment verification failed:", error);
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
