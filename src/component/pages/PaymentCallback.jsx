import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSaveOrderMutation } from '../../utils/orderServices';
import { useRemoveFromCartMutation } from '../../utils/cartService';
import LoadingSpinner from '../layout/LoadingSpinner';

/**
 * Payment Callback Handler
 * This component handles payment redirects from PhonePe
 * It checks payment status and redirects to checkout page
 * 
 * Backend should be configured to redirect PhonePe to:
 * /payment-callback/{orderId}/userId/{userId}
 */
const PaymentCallback = () => {
  const navigate = useNavigate();
  const { orderId, userId } = useParams();
  const [saveOrder] = useSaveOrderMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [status, setStatus] = useState('checking'); // checking, success, failed
  const [message, setMessage] = useState('Verifying payment status...');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId || !userId) {
        setStatus('failed');
        setMessage('Invalid payment information');
        setTimeout(() => navigate('/checkout'), 2000);
        return;
      }

      try {
        const checkStatusUrl = `https://dev-api.gronik.in/payment/checkStatus/${orderId}/userId/${userId}`;
        console.log("➡️ Sending payment status request:");
console.log("URL:", checkStatusUrl);
        const response = await fetch(checkStatusUrl);
        
console.log("⬅️ Payment status HTTP response:", {
  status: response.status,
  statusText: response.statusText,
  ok: response.ok
});
        if (!response.ok) {
          console.error("❌ Payment checkStatus API error:", response.status, response.statusText);
          throw new Error(`Payment verification failed: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("🔎 Payment status response:", result);

        // Handle different response structures
        // Option 1: result.data.status (direct)
        // Option 2: result.data.payment.status (nested)
        const paymentStatus = result?.data?.payment?.status 
          ? String(result.data.payment.status).toUpperCase()
          : result?.data?.status 
          ? String(result.data.status).toUpperCase()
          : "";
        
      

        if (result?.success && paymentStatus === "COMPLETED") {
          // Payment successful
          const pendingPaymentStr = localStorage.getItem("pendingPayment");
          if (pendingPaymentStr) {
            const pendingPayment = JSON.parse(pendingPaymentStr);
            
            try {
              // Save order
              await saveOrder({
                userId: userId,
                paymentId: orderId,
                productIds: pendingPayment.productIds || [],
              }).unwrap();
              
console.log("➡️ Sending saveOrder payload:", saveOrderPayload);
              // Remove purchased items from backend cart
              if (pendingPayment.productIds && Array.isArray(pendingPayment.productIds)) {
                try {
                  await Promise.all(
                    pendingPayment.productIds.map(productId => 
                      removeFromCart({
                        userId: userId,
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
              localStorage.setItem("cart", JSON.stringify([]));
              
              // Trigger storage events to refresh cart UI
              window.dispatchEvent(new Event("storage"));
              window.dispatchEvent(new Event("cart-updated"));

              setStatus('success');
              setMessage('Payment successful! Redirecting to checkout...');
              
              // Redirect to checkout with success
              setTimeout(() => {
                navigate('/checkout', { 
                  replace: true,
                  state: { paymentSuccess: true }
                });
              }, 1500);
            } catch (orderError) {
              console.error("Error saving order:", orderError);
              setStatus('failed');
              setMessage('Payment successful but failed to save order. Redirecting...');
              setTimeout(() => navigate('/checkout'), 2000);
            }
          } else {
            setStatus('success');
            setMessage('Payment successful! Redirecting...');
            setTimeout(() => navigate('/checkout'), 1500);
          }
        } else {
          // Payment failed
          console.error("❌ Payment not completed. Response:", result);
          console.error("❌ Payment status:", paymentStatus);
          localStorage.removeItem("pendingPayment");
          setStatus('failed');
          setMessage('Payment failed or was cancelled. Redirecting...');
          setTimeout(() => navigate('/checkout'), 2000);
        }
      } catch (error) {
        console.error("❌ Payment verification error:", error);
        console.error("❌ Error details:", {
          message: error.message,
          stack: error.stack,
          response: error.response
        });
        localStorage.removeItem("pendingPayment");
        setStatus('failed');
        setMessage('Unable to verify payment. Redirecting...');
        setTimeout(() => navigate('/checkout'), 2000);
      }
    };

    verifyPayment();
  }, [orderId, userId, navigate, saveOrder, removeFromCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md w-full">
        {status === 'checking' && (
          <>
            <LoadingSpinner />
            <p className="text-white mt-4 text-lg">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold">{message}</p>
          </>
        )}
        {status === 'failed' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-white text-lg font-semibold">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;


