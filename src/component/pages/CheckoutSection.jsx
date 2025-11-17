import React, { useState } from 'react';
import { ShoppingBag, CheckCircle, CreditCard, Home, ArrowLeft, ArrowRight, User, MapPin, Mail, Phone, Banknote, Smile } from 'lucide-react';

const steps = [
  { label: 'Cart', icon: ShoppingBag },
  { label: 'Address', icon: Home },
  { label: 'Payment', icon: CreditCard },
  { label: 'Review', icon: CheckCircle },
  { label: 'Success', icon: Smile },
];

const paymentMethods = [
  { label: 'Credit/Debit Card', value: 'card', icon: CreditCard },
  { label: 'UPI', value: 'upi', icon: Banknote },
  { label: 'Cash on Delivery', value: 'cod', icon: Home },
];

const CheckoutSection = ({ cart = [] }) => {
  const [step, setStep] = useState(1); // 1-based index
  const [address, setAddress] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', zip: ''
  });
  const [payment, setPayment] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  // Add state for UPI and Card details
  const [upiProvider, setUpiProvider] = useState('googlepay');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [paymentFailed, setPaymentFailed] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const validateAddress = () => {
    const errs = {};
    if (!address.name) errs.name = 'Name required';
    if (!address.email) errs.email = 'Email required';
    if (!address.phone) errs.phone = 'Phone required';
    if (!address.address) errs.address = 'Address required';
    if (!address.city) errs.city = 'City required';
    if (!address.state) errs.state = 'State required';
    if (!address.zip) errs.zip = 'ZIP required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs = {};
    if (payment === 'upi') {
      if (!upiId) errs.upiId = 'UPI ID required';
    }
    if (payment === 'card') {
      if (!cardDetails.number) errs.number = 'Card number required';
      if (!cardDetails.name) errs.name = 'Name required';
      if (!cardDetails.expiry) errs.expiry = 'Expiry required';
      if (!cardDetails.cvv) errs.cvv = 'CVV required';
    }
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !validateAddress()) return;
    if (step === 3 && !validatePayment()) return;
    setStep(s => Math.min(s + 1, steps.length));
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] w-full px-2 sm:px-6 lg:px-8 flex flex-col items-center pt-28 sm:pt-32">
      {/* Beautiful Stepper */}
      <div className="relative w-full max-w-2xl flex flex-col items-center mb-8 sm:mb-12" style={{ minHeight: '70px' }}>
        {/* Stepper Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 bg-[#e9d6f7] rounded-full z-0 w-full"></div>
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 h-4 -translate-y-1/2 bg-gradient-to-r from-[#9B7BB8] to-[#B894D1] rounded-full z-10 transition-all duration-500"
          style={{ width: `${(100 * (step-1)/(steps.length-1))}%`, maxWidth: '100%' }}
        ></div>
        {/* Step Icons */}
        <div className="relative flex justify-between items-center w-full z-20 px-2 sm:px-6">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center flex-1">
              <div
                className={`rounded-full flex items-center justify-center border-4 transition-all duration-200 shadow-lg
                  ${step > i+1 ? 'bg-green-400 border-green-400 text-white scale-110' : step === i+1 ? 'bg-[#9B7BB8] border-[#9B7BB8] text-white scale-125' : 'bg-white border-gray-300 text-gray-400'}
                  w-10 h-10 sm:w-14 sm:h-14
                `}
              >
                <s.icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <span className={`mt-2 text-xs sm:text-sm font-semibold 
                ${step === i+1 ? 'text-white' : step > i+1 ? 'text-green-500' : 'text-[#2D1B3D]'}
              `}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl bg-[#2D1B3D]/95 rounded-2xl shadow-2xl p-4 sm:p-10 text-white mx-auto 
        sm:max-w-2xl max-w-xs 
        sm:p-10 p-4 ">
        {/* Payment Failed/Error Screen */}
        {paymentFailed && (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6m0-6l6 6" /></svg>
            <h2 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-white/80 mb-6">Something went wrong with your payment. Please try again or choose a different payment method.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { setPaymentFailed(false); setStep(3); }} className="px-8 py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition">Retry Payment</button>
              <button onClick={() => { setPaymentFailed(false); setStep(1); }} className="px-8 py-3 rounded-xl bg-gray-300 text-[#2D1B3D] font-bold hover:bg-gray-400 transition">Back to Cart</button>
            </div>
          </div>
        )}
        {/* Step 1: Cart Summary */}
        {step === 1 && !paymentFailed && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><ShoppingBag className="w-6 h-6 mr-2 text-white" />Cart Summary</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-[#9B7BB8]/60 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#2D1B3D] mb-2">Your cart is empty</h3>
                <p className="text-[#2D1B3D]/60 mb-6">Add some books to get started!</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-[#9B7BB8]/10 rounded-xl p-3">
                    <img src={item.image} alt={item.title} className="w-14 h-20 rounded-lg object-cover shadow" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white truncate">{item.title}</h4>
                      <p className="text-white/80 text-sm truncate">by {item.author}</p>
                      <span className="text-xs text-white/60">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center mt-8">
              <button onClick={() => window.history.back()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition"><ArrowLeft className="w-4 h-4" />Back</button>
              <button onClick={handleNext} disabled={cart.length === 0} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition disabled:opacity-50 disabled:cursor-not-allowed">Next<ArrowRight className="w-4 h-4" /></button>
            </div>
          </>
        )}

        {/* Step 2: Address */}
        {step === 2 && !paymentFailed && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><Home className="w-6 h-6 mr-2" />Shipping Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 w-4 h-4 text-white/80" />
                    <input type="text" className={`pl-8 pr-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.name ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} />
                  </div>
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 w-4 h-4 text-white/80" />
                    <input type="email" className={`pl-8 pr-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.email ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.email} onChange={e => setAddress(a => ({ ...a, email: e.target.value }))} />
                  </div>
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 w-4 h-4 text-white/80" />
                    <input type="tel" className={`pl-8 pr-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.phone ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} />
                  </div>
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-2.5 w-4 h-4 text-white/80" />
                    <input type="text" className={`pl-8 pr-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.address ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.address} onChange={e => setAddress(a => ({ ...a, address: e.target.value }))} />
                  </div>
                  {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-1">City</label>
                  <input type="text" className={`px-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.city ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.city} onChange={e => setAddress(a => ({ ...a, city: e.target.value }))} />
                  {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1">State</label>
                  <input type="text" className={`px-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.state ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.state} onChange={e => setAddress(a => ({ ...a, state: e.target.value }))} />
                  {errors.state && <span className="text-xs text-red-500">{errors.state}</span>}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1">ZIP</label>
                  <input type="text" className={`px-3 py-2 rounded-lg w-full border text-white placeholder-white/60 ${errors.zip ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`} value={address.zip} onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))} />
                  {errors.zip && <span className="text-xs text-red-500">{errors.zip}</span>}
                </div>
              </div>
            </form>
            <div className="flex justify-between items-center mt-8">
              <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition"><ArrowLeft className="w-4 h-4" />Back</button>
              <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition">Next<ArrowRight className="w-4 h-4" /></button>
            </div>
          </>
        )}

        {/* Step 3: Payment */}
        {step === 3 && !paymentFailed && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><CreditCard className="w-6 h-6 mr-2" />Payment Method</h2>
            <div className="flex flex-col gap-4 mb-8">
              {paymentMethods.map(pm => (
                <button
                  key={pm.value}
                  onClick={() => setPayment(pm.value)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 font-semibold text-lg 
                    ${payment === pm.value ? 'border-[#9B7BB8] bg-[#9B7BB8]/10 text-white' : 'border-gray-200 bg-[#2D1B3D]/80 text-white/60 hover:border-[#9B7BB8]'}
                  `}
                >
                  <pm.icon className="w-6 h-6" />
                  {pm.label}
                </button>
              ))}
            </div>
            {/* UPI Fields */}
            {payment === 'upi' && (
              <div className="mb-8">
                {/* Providers - responsive, non-overlapping */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {['googlepay', 'phonepe', 'paytm', 'other'].map(provider => (
                    <button
                      key={provider}
                      onClick={() => setUpiProvider(provider)}
                      className={`w-full px-3 py-2 rounded-lg font-semibold border-2 transition-all duration-200 text-xs sm:text-sm truncate 
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
                <div className="mb-2">
                  <label className="block text-white font-semibold mb-1">UPI ID</label>
                  <input
                    type="text"
                    className={`px-4 py-2 rounded-lg w-full border text-white placeholder-white/60 bg-transparent ${paymentErrors.upiId ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@okaxis"
                  />
                  {paymentErrors.upiId && <span className="text-xs text-red-500">{paymentErrors.upiId}</span>}
                </div>
                <div className="text-xs text-white/70 mb-2">We'll send a payment request to your UPI app after order confirmation.</div>
              </div>
            )}
            {/* Card Fields */}
            {payment === 'card' && (
              <div className="mb-8 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    className={`px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 ${paymentErrors.number ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                    value={cardDetails.number}
                    onChange={e => setCardDetails(d => ({ ...d, number: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {paymentErrors.number && <span className="text-xs text-red-500">{paymentErrors.number}</span>}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1">Name on Card</label>
                  <input
                    type="text"
                    className={`px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 ${paymentErrors.name ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                    value={cardDetails.name}
                    onChange={e => setCardDetails(d => ({ ...d, name: e.target.value }))}
                    placeholder="Full Name"
                  />
                  {paymentErrors.name && <span className="text-xs text-red-500">{paymentErrors.name}</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      className={`px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 ${paymentErrors.expiry ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                      value={cardDetails.expiry}
                      onChange={e => setCardDetails(d => ({ ...d, expiry: e.target.value }))}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {paymentErrors.expiry && <span className="text-xs text-red-500">{paymentErrors.expiry}</span>}
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1">CVV</label>
                    <input
                      type="password"
                      className={`px-4 py-2 rounded-lg w-full border bg-white text-[#2D1B3D] placeholder-gray-400 ${paymentErrors.cvv ? 'border-red-400' : 'border-[#9B7BB8]/40'} focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]`}
                      value={cardDetails.cvv}
                      onChange={e => setCardDetails(d => ({ ...d, cvv: e.target.value }))}
                      placeholder="123"
                      maxLength={3}
                    />
                    {paymentErrors.cvv && <span className="text-xs text-red-500">{paymentErrors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}
            {/* COD Message */}
            {payment === 'cod' && (
              <div className="mb-8 text-white/80 text-center font-medium bg-[#9B7BB8]/10 rounded-xl p-4">
                You will pay in cash upon delivery. No extra details required.
              </div>
            )}
            <div className="flex justify-between items-center mt-8 gap-2 flex-wrap">
              <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition"><ArrowLeft className="w-4 h-4" />Back</button>
              <div className="flex gap-2">
                <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition">Next<ArrowRight className="w-4 h-4" /></button>
                <button onClick={() => setPaymentFailed(true)} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition">Simulate Failure</button>
              </div>
            </div>
          </>
        )}

        {/* Step 4: Review */}
        {step === 4 && !paymentFailed && (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center"><CheckCircle className="w-6 h-6 mr-2" />Review & Confirm</h2>
            <div className="mb-6 space-y-2">
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Shipping Address</h4>
                <div className="text-white/80 text-sm">
                  <div>{address.name}</div>
                  <div>{address.email}</div>
                  <div>{address.phone}</div>
                  <div>{address.address}, {address.city}, {address.state} - {address.zip}</div>
                </div>
              </div>
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Payment Method</h4>
                <div className="text-white/80 text-sm capitalize">{paymentMethods.find(pm => pm.value === payment)?.label}</div>
              </div>
              <div className="bg-[#9B7BB8]/10 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Order Summary</h4>
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-500 text-sm">
                    <span>You Save</span>
                    <span>-₹{savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Tax (8%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-base font-bold mt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
              <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#9B7BB8]/80 text-white font-semibold hover:bg-[#8A6AA7] transition"><ArrowLeft className="w-4 h-4" />Back</button>
              <button onClick={handlePlaceOrder} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition">Place Order<CheckCircle className="w-4 h-4" /></button>
            </div>
          </>
        )}

        {/* Step 5: Success */}
        {step === 5 && orderPlaced && !paymentFailed && (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h2>
            <p className="text-white/80 mb-6">Thank you for your purchase. You will receive a confirmation email soon.</p>
            <button onClick={() => window.location.href = '/library'} className="px-8 py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition">Back to Library</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSection; 