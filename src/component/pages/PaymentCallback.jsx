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
    let cancelled = false;

    const safeNavigate = (to, options) => {
      if (!cancelled) {
        navigate(to, options);
      }
    };

    const verifyPayment = async () => {
      if (!orderId || !userId) {
        console.error('Invalid payment callback params:', { orderId, userId });
        setStatus('failed');
        setMessage('Invalid payment information');
        setTimeout(() => safeNavigate('/checkout'), 2000);
        return;
      }

      try {
        const checkStatusUrl = `https://dev-api.gronik.in/payment/checkStatus/${orderId}/userId/${userId}`;
        const response = await fetch(checkStatusUrl, { method: 'GET', credentials: 'include' });

        if (!response.ok) {
          console.error('Payment checkStatus API error:', response.status, response.statusText);
          throw new Error(`Payment verification failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log('🔎 Payment status response:', result);

        // Extract payment status from possible shapes:
        // - result.data.payment.status
        // - result.data.status
        // - result.status (less likely)
        const paymentStatusRaw =
          result?.data?.payment?.status ??
          result?.data?.status ??
          result?.status ??
          '';

        const paymentStatus = String(paymentStatusRaw || '').toUpperCase();
        console.log('🔍 Extracted payment status:', paymentStatus);

        // Interpret `success` flag if present; otherwise rely on status string
        const successFlag = result?.success === true || result?.success === 'true';

        if (successFlag && paymentStatus === 'COMPLETED') {
          // Payment successful
          const pendingPaymentStr = localStorage.getItem('pendingPayment');
          if (pendingPaymentStr) {
            let pendingPayment;
            try {
              pendingPayment = JSON.parse(pendingPaymentStr);
            } catch (err) {
              console.error('Failed to parse pendingPayment from localStorage:', err);
              pendingPayment = null;
            }

            try {
              // Save order via backend
              await saveOrder({
                userId,
                paymentId: orderId,
                productIds: (pendingPayment && pendingPayment.productIds) || [],
              }).unwrap();

              // Attempt to remove purchased items from backend cart (if any)
              if (pendingPayment?.productIds && Array.isArray(pendingPayment.productIds) && pendingPayment.productIds.length > 0) {
                await Promise.all(
                  pendingPayment.productIds.map((productId) =>
                    // swallow individual remove errors so one failure won't block others
                    removeFromCart({ userId, productId })
                      .unwrap()
                      .catch((err) => {
                        console.error(`Failed to remove product ${productId} from cart:`, err);
                      })
                  )
                );
              }

              // Clear pendingPayment and local cart
              localStorage.removeItem('pendingPayment');
              localStorage.setItem('cart', JSON.stringify([]));

              // Trigger events to update UI (some listeners may rely on these)
              window.dispatchEvent(new Event('storage'));
              window.dispatchEvent(new Event('cart-updated'));

              setStatus('success');
              setMessage('Payment successful! Redirecting to checkout...');

              setTimeout(() => safeNavigate('/checkout', { replace: true, state: { paymentSuccess: true } }), 1500);
            } catch (orderError) {
              console.error('Error saving order or removing cart items:', orderError);
              // Even if saving order failed, clear pendingPayment to avoid duplicate attempts
              localStorage.removeItem('pendingPayment');
              setStatus('failed');
              setMessage('Payment successful but failed to save order. Redirecting...');
              setTimeout(() => safeNavigate('/checkout'), 2000);
            }
          } else {
            // No pendingPayment stored locally — just redirect
            setStatus('success');
            setMessage('Payment successful! Redirecting...');
            setTimeout(() => safeNavigate('/checkout', { replace: true, state: { paymentSuccess: true } }), 1500);
          }
        } else {
          // Payment not completed
          console.error('❌ Payment not completed. Response:', result);
          console.error('❌ Payment status:', paymentStatus);
          localStorage.removeItem('pendingPayment');
          setStatus('failed');
          setMessage('Payment failed or was cancelled. Redirecting...');
          setTimeout(() => safeNavigate('/checkout'), 2000);
        }
      } catch (error) {
        console.error('❌ Payment verification error:', error);
        // Best-effort cleanup
        try {
          localStorage.removeItem('pendingPayment');
        } catch (e) {
          /* ignore */
        }
        setStatus('failed');
        setMessage('Unable to verify payment. Redirecting...');
        setTimeout(() => safeNavigate('/checkout'), 2000);
      }
    };

    verifyPayment();

    return () => {
      cancelled = true;
    };
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