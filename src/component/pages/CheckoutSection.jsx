import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, CreditCard, ArrowLeft, ArrowRight, Banknote, Smile } from 'lucide-react';

// 4 steps: Cart → Payment → Review → Success
const steps = [
  { label: 'Cart', icon: ShoppingBag },
  { label: 'Payment', icon: CreditCard },
  { label: 'Review', icon: CheckCircle },
  { label: 'Success', icon: Smile },
];

// REMOVED: Cash on Delivery - Only online payments
const paymentMethods = [
  { label: 'Credit/Debit Card', value: 'card', icon: CreditCard },
  { label: 'UPI', value: 'upi', icon: Banknote },
];

const CheckoutSection = ({ cart = [] }) => {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // UPI details
  const [upiProvider, setUpiProvider] = useState('googlepay');
  const [upiId, setUpiId] = useState('');
  
  // Card details
  const [cardDetails, setCardDetails] = useState({ 
    number: '', 
    name: '', 
    expiry: '', 
    cvv: '' 
  });
  
  const [paymentErrors, setPaymentErrors] = useState({});
  const [paymentFailed, setPaymentFailed] = useState(false);

  // REMOVED TAX - Only subtotal and savings
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const total = subtotal; // No tax added

  // Validate UPI ID format
  const validateUpiId = (id) => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    return upiRegex.test(id);
  };

  // Validate Card Number (basic Luhn algorithm)
  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Validate Expiry Date
  const validateExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiry)) return false;
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const cardYear = parseInt(year);
    const cardMonth = parseInt(month);
    
    if (cardYear < currentYear) return false;
    if (cardYear === currentYear && cardMonth < currentMonth) return false;
    
    return true;
  };

  const validatePayment = () => {
    const errs = {};
    
    if (payment === 'upi') {
      if (!upiId.trim()) {
        errs.upiId = 'UPI ID is required';
      } else if (!validateUpiId(upiId)) {
        errs.upiId = 'Invalid UPI ID format (e.g., name@bank)';
      }
    }
    
    if (payment === 'card') {
      if (!cardDetails.number.trim()) {
        errs.number = 'Card number is required';
      } else if (!validateCardNumber(cardDetails.number)) {
        errs.number = 'Invalid card number';
      }
      
      if (!cardDetails.name.trim()) {
        errs.name = 'Cardholder name is required';
      } else if (cardDetails.name.trim().length < 3) {
        errs.name = 'Name must be at least 3 characters';
      }
      
      if (!cardDetails.expiry.trim()) {
        errs.expiry = 'Expiry date is required';
      } else if (!validateExpiry(cardDetails.expiry)) {
        errs.expiry = 'Invalid or expired date (MM/YY)';
      }
      
      if (!cardDetails.cvv.trim()) {
        errs.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        errs.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validatePayment()) return;
    setStep(s => Math.min(s + 1, steps.length));
  };
  
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep(4);
  };

  // Format card number as user types
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  // Format expiry as user types
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] w-full px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center pt-24 sm:pt-28 md:pt-32">
      
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
      <div className="w-full max-w-3xl bg-[#2D1B3D]/95 rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 text-white">
        
        {/* Payment Failed Screen */}
        {paymentFailed && (
          <div className="text-center py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mb-4 sm:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" />
            </svg>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-3 sm:mb-4">Payment Failed</h2>
            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base px-4">Something went wrong with your payment. Please try again.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
              <button 
                onClick={() => { setPaymentFailed(false); setStep(2); }} 
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                Retry Payment
              </button>
              <button 
                onClick={() => { setPaymentFailed(false); setStep(1); }} 
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-gray-300 text-[#2D1B3D] font-bold hover:bg-gray-400 transition text-sm sm:text-base"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Cart Summary */}
        {step === 1 && !paymentFailed && (
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
              <div className="space-y-3 sm:space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 sm:gap-4 bg-[#9B7BB8]/10 rounded-xl p-3 sm:p-4">
                    <img src={item.image} alt={item.title} className="w-12 h-16 sm:w-14 sm:h-20 rounded-lg object-cover shadow" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white truncate text-sm sm:text-base">{item.title}</h4>
                      <p className="text-white/80 text-xs sm:text-sm truncate">by {item.author}</p>
                      <span className="text-[10px] sm:text-xs text-white/60">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Price Summary - NO TAX */}
            {cart.length > 0 && (
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4 mb-6">
                <div className="flex justify-between text-white/80 text-sm mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-500 text-sm mb-2">
                    <span>You Save</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
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
                onClick={handleNext} 
                disabled={cart.length === 0} 
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 2: Payment - ONLY Card & UPI */}
        {step === 2 && !paymentFailed && (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Payment Method
            </h2>
            
            {/* Payment Method Selection */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
              {paymentMethods.map(pm => (
                <button
                  key={pm.value}
                  onClick={() => {
                    setPayment(pm.value);
                    setPaymentErrors({});
                  }}
                  className={`flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg
                    ${payment === pm.value ? 'border-[#9B7BB8] bg-[#9B7BB8]/10 text-white' : 'border-gray-200 bg-[#2D1B3D]/80 text-white/60 hover:border-[#9B7BB8]'}
                  `}
                >
                  <pm.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  {pm.label}
                </button>
              ))}
            </div>

            {/* UPI Fields with Validation */}
            {payment === 'upi' && (
              <div className="mb-6 sm:mb-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {['googlepay', 'phonepe', 'paytm', 'other'].map(provider => (
                    <button
                      key={provider}
                      onClick={() => setUpiProvider(provider)}
                      className={`px-2 sm:px-3 py-2 rounded-lg font-semibold border-2 transition-all duration-200 text-[10px] sm:text-xs truncate
                        ${upiProvider === provider ? 'border-[#9B7BB8] bg-[#9B7BB8]/10 text-white' : 'border-gray-200 bg-[#2D1B3D]/80 text-white/70 hover:border-[#9B7BB8]'}
                      `}
                    >
                      {provider === 'googlepay' && 'Google Pay'}
                      {provider === 'phonepe' && 'PhonePe'}
                      {provider === 'paytm' && 'Paytm'}
                      {provider === 'other' && 'Other UPI'}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">UPI ID *</label>
                  <input
                    type="text"
                    className={`px-3 sm:px-4 py-2 rounded-lg w-full border text-white placeholder-white/60 bg-transparent text-sm sm:text-base
                      ${paymentErrors.upiId ? 'border-red-400' : 'border-[#9B7BB8]/40'} 
                      focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                    value={upiId}
                    onChange={e => {
                      setUpiId(e.target.value);
                      setPaymentErrors(prev => ({ ...prev, upiId: '' }));
                    }}
                    placeholder="yourname@okaxis"
                  />
                  {paymentErrors.upiId && <span className="text-xs text-red-400 mt-1 block">{paymentErrors.upiId}</span>}
                </div>
                <div className="text-xs text-white/70 mt-2">We'll send a payment request to your UPI app.</div>
              </div>
            )}

            {/* Card Fields with Validation */}
            {payment === 'card' && (
              <div className="mb-6 sm:mb-8 space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Card Number *</label>
                  <input
                    type="text"
                    className={`px-3 sm:px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 text-sm sm:text-base
                      ${paymentErrors.number ? 'border-red-400' : 'border-[#9B7BB8]/40'} 
                      focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                    value={cardDetails.number}
                    onChange={e => {
                      const formatted = formatCardNumber(e.target.value);
                      setCardDetails(d => ({ ...d, number: formatted }));
                      setPaymentErrors(prev => ({ ...prev, number: '' }));
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {paymentErrors.number && <span className="text-xs text-red-400 mt-1 block">{paymentErrors.number}</span>}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Name on Card *</label>
                  <input
                    type="text"
                    className={`px-3 sm:px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 text-sm sm:text-base
                      ${paymentErrors.name ? 'border-red-400' : 'border-[#9B7BB8]/40'} 
                      focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                    value={cardDetails.name}
                    onChange={e => {
                      setCardDetails(d => ({ ...d, name: e.target.value }));
                      setPaymentErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Full Name"
                  />
                  {paymentErrors.name && <span className="text-xs text-red-400 mt-1 block">{paymentErrors.name}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Expiry *</label>
                    <input
                      type="text"
                      className={`px-3 sm:px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 text-sm sm:text-base
                        ${paymentErrors.expiry ? 'border-red-400' : 'border-[#9B7BB8]/40'} 
                        focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                      value={cardDetails.expiry}
                      onChange={e => {
                        const formatted = formatExpiry(e.target.value);
                        setCardDetails(d => ({ ...d, expiry: formatted }));
                        setPaymentErrors(prev => ({ ...prev, expiry: '' }));
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {paymentErrors.expiry && <span className="text-xs text-red-400 mt-1 block">{paymentErrors.expiry}</span>}
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm sm:text-base">CVV *</label>
                    <input
                      type="password"
                      className={`px-3 sm:px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 text-sm sm:text-base
                        ${paymentErrors.cvv ? 'border-red-400' : 'border-[#9B7BB8]/40'} 
                        focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                      value={cardDetails.cvv}
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                        setCardDetails(d => ({ ...d, cvv: value }));
                        setPaymentErrors(prev => ({ ...prev, cvv: '' }));
                      }}
                      placeholder="123"
                      maxLength={4}
                    />
                    {paymentErrors.cvv && <span className="text-xs text-red-400 mt-1 block">{paymentErrors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <button 
                onClick={handleBack} 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                onClick={handleNext} 
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {step === 3 && !paymentFailed && (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Review & Confirm
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Payment Method</h4>
                <div className="text-white/80 text-sm capitalize">
                  {paymentMethods.find(pm => pm.value === payment)?.label}
                </div>
              </div>
              
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-2 mt-2">
                    <div className="flex justify-between text-white text-base sm:text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 sm:mt-8">
              <button 
                onClick={handleBack} 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button 
                onClick={handlePlaceOrder} 
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition text-sm sm:text-base"
              >
                Place Order
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 4: Success */}
        {step === 4 && orderPlaced && !paymentFailed && (
          <div className="text-center py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4 sm:mb-6" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Order Placed Successfully!</h2>
            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base px-4">Thank you for your purchase. You will receive a confirmation email soon.</p>
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