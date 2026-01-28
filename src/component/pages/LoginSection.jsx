import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock, ArrowRight, Check, X, RefreshCw } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { login, setUser } from '../../slices/userAuthSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const LoginPage = () => {
  const location=useLocation()
  const [whatsappConsent, setWhatsappConsent] = useState(false);

  const from = location.state?.from || "/";
  const [currentStep, setCurrentStep] = useState('login'); // 'choice', 'signup', 'login', 'otp', 'forgot', 'reset'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', ''], // 6-digit OTP
    jwtToken: '',
    fullName: '',
    countryCode: '+91',
    customCountryCode: ''
  });
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
const [forgotOtp, setForgotOtp] = useState("");
const [forgotMobile, setForgotMobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // OTP and JWT related states

  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpError, setOtpError] = useState('');

  const [showAuthSuccess, setShowAuthSuccess] = useState(false);
  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [signupOtpVerified, setSignupOtpVerified] = useState(false);
  const [signupOtpInput, setSignupOtpInput] = useState("");


  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    const isValid = Object.values(requirements).every(req => req);
    return { isValid, requirements };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile, countryCode) => {
    const code = (countryCode || '').trim();
    const digitsOnly = (mobile || '').replace(/\D/g, '');
    if (!digitsOnly) return false;
    const patterns = {
      '+91': /^[6-9]\d{9}$/,
      '+1': /^\d{10}$/,
      '+44': /^\d{9,10}$/,
      '+61': /^\d{9}$/,
      '+971': /^\d{9}$/
    };
    const pattern = patterns[code];
    if (pattern) return pattern.test(digitsOnly);
    return /^\d{6,15}$/.test(digitsOnly);
  };

  const validateCountryCode = (code) => /^\+\d{1,4}$/.test(code);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };











  // Handle signup
const handleSignup = async () => {
if (
  formData.countryCode === "other" &&
  !formData.customCountryCode.trim()
) {
  setErrors({ countryCode: "Enter country code" });
  return;
}
  const newErrors = {};

  if (!formData.fullName) newErrors.fullName = "Full name required";
  if (!formData.mobile) newErrors.mobile = "Mobile required";
  if (!formData.password) newErrors.password = "Password required";

  if (!signupOtpVerified) {
    newErrors.mobile = "Verify phone number first";
  }

  if (!whatsappConsent) {
    newErrors.whatsappConsent = "WhatsApp consent required";
  }

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  try {
    setIsLoading(true);

    const digits = formData.mobile.replace(/\D/g, "").slice(-10);

    const payload = {
      full_name: formData.fullName,
      country_code:
        formData.countryCode === "other"
          ? formData.customCountryCode
          : formData.countryCode,
      mobile: digits,
      email: formData.email || undefined,
      password: formData.password,
      role_name: "USER"
    };

    // SIGNUP API
    await api.post("/auth/signup", payload);

    // AUTO LOGIN AFTER SUCCESSFUL SIGNUP
    const loginRes = await api.post("/auth/login", {
      mobile: digits,
      country_code: payload.country_code,
      password: formData.password
    });

    dispatch(login({
      token: loginRes.data.data.access_token,
      user: loginRes.data.data.user
    }));

    setShowAuthSuccess(true);

    setTimeout(() => {
      navigate(from, { replace: true });
    }, 800);

  } catch (err) {
    setErrors({
      api: err.response?.data?.message || "Signup failed"
    });
  } finally {
    setIsLoading(false);
  }
};


const handleLogin = async () => {
  const newErrors = {};

  // Validate mobile
  if (!formData.mobile.trim()) {
    newErrors.mobile = "Mobile number required";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Password required";
  }

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  const digits = formData.mobile.replace(/\D/g, "").slice(-10);

  if (digits.length !== 10) {
    setErrors({ mobile: "Enter a valid 10-digit mobile number" });
    return;
  }

  const country_code =
    formData.countryCode === "other"
      ? formData.customCountryCode
      : formData.countryCode;

  const payload = {
    mobile: digits,
    country_code,
    password: formData.password,
  };

  try {
    setIsLoading(true);
    const response = await api.post("/auth/login", payload);

    dispatch(
      login({
        token: response.data.data.access_token,
        user: response.data.data.user,
      })
    );

    setShowAuthSuccess(true);
    setTimeout(() => navigate(from, { replace: true }), 500);
  } catch (err) {
    setErrors({ api: err.response?.data?.message || "Login failed" });
  } finally {
    setIsLoading(false);
  }
};

const handleForgotSubmit = async () => {
  if (!formData.mobile.trim()) {
    setErrors({ mobile: "Phone number required" });
    return;
  }

  try {
    setIsLoading(true);

    const digits = formData.mobile.replace(/\D/g, "").slice(-10);

    await api.post("/auth/forgotPassword", {
      mobile: digits,
    });

    setForgotMobile(digits);
    setForgotOtpSent(true);
    setCurrentStep("forgot-otp");

  } catch (err) {
    setErrors({
      api: err.response?.data?.message || "Failed to send OTP",
    });
  } finally {
    setIsLoading(false);
  }
};



const handleResetPassword = async () => {

  const newErrors = {};

  if (!formData.newPassword) {
    newErrors.newPassword = "Password required";
  }

  if (formData.newPassword !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  try {
    setIsLoading(true);

    await api.post("/auth/forgotPassword", {
  mobile: forgotMobile,
  otp: forgotOtp,
  newPassword: formData.newPassword,
});


    setResetSuccess(true);

    setTimeout(() => {
      setResetSuccess(false);
      setCurrentStep("login");

    }, 1500);

  } catch (err) {
    setErrors({
      api: err.response?.data?.message || "Password reset failed",
    });
  } finally {
    setIsLoading(false);
  }
};


  const PasswordRequirements = ({ password }) => {
    const { requirements } = validatePassword(password);
    const requirementsList = [
      { key: 'length', text: 'At least 8 characters', met: requirements.length },
      { key: 'uppercase', text: 'One uppercase letter', met: requirements.uppercase },
      { key: 'lowercase', text: 'One lowercase letter', met: requirements.lowercase },
      { key: 'number', text: 'One number', met: requirements.number },
      { key: 'special', text: 'One special character', met: requirements.special }
    ];
    return (
      <div className="mt-4 p-4 bg-[#2D1B3D]/30 rounded-xl border border-[#2D1B3D]/50 backdrop-blur-sm">
        <h4 className="text-sm font-medium text-white mb-3">Password Requirements:</h4>
        <div className="grid grid-cols-1 gap-2">
          {requirementsList.map(req => (
            <div key={req.key} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}`}>
                {req.met ? (
                  <Check className="w-2.5 h-2.5 text-white" />
                ) : (
                  <X className="w-2.5 h-2.5 text-gray-400" />
                )}
              </div>
              <span className={`text-xs ${req.met ? 'text-green-400' : 'text-white/60'}`}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };


const sendSignupOtp = async () => {

  if (!formData.mobile.trim()) {
    setErrors({ mobile: "Enter mobile number first" });
    return;
  }

  try {
    setIsLoading(true);

    const digits = formData.mobile.replace(/\D/g, "").slice(-10);

    await api.post("/auth/forgotPassword", {
      mobile: digits
    });

    setSignupOtpSent(true);
    setSignupOtpVerified(false);

  } catch (err) {
    setErrors({
      api: err.response?.data?.message || "OTP sending failed"
    });
  } finally {
    setIsLoading(false);
  }
};


const verifySignupOtp = async () => {

  if (signupOtpInput.length !== 6) {
    setErrors({ api: "Enter valid 6 digit OTP" });
    return;
  }

  try {
    setIsLoading(true);

    const digits = formData.mobile.replace(/\D/g, "").slice(-10);

    await api.post("/auth/verifyOtp", {
      mobile: digits,
      otp: signupOtpInput
    });

    // IMPORTANT
    setSignupOtpVerified(true);

  } catch (err) {
    setErrors({
      api: err.response?.data?.message || "OTP verification failed"
    });
  } finally {
    setIsLoading(false);
  }
};






  useEffect(() => {
    if (currentStep === 'choice' || currentStep === 'login' || currentStep === 'signup') {
      setShowAuthSuccess(false);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gronik-primary via-gronik-bg to-gronik-secondary relative flex items-center justify-center p-4" style={{ paddingTop: '6rem' }}>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#2D1B3D]/20 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#2D1B3D]/30"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#2D1B3D]/15 rounded-full blur-3xl animate-pulse delay-1000 shadow-2xl shadow-[#2D1B3D]/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#2D1B3D]/10 rounded-full blur-3xl animate-pulse delay-500 shadow-2xl shadow-[#2D1B3D]/20"></div>
        <div className="absolute top-20 right-1/4 w-36 h-36 bg-[#2D1B3D]/25 rounded-full blur-3xl animate-pulse delay-700 shadow-2xl shadow-[#2D1B3D]/30"></div>
        <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-[#2D1B3D]/20 rounded-full blur-3xl animate-pulse delay-300 shadow-2xl shadow-[#2D1B3D]/25"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
        <div className="bg-[#2D1B3D]/90 backdrop-blur-xl rounded-3xl border border-[#2D1B3D]/50 shadow-2xl shadow-[#2D1B3D]/20 overflow-hidden mt-8 mb-8">
          <div className="p-6 sm:p-10">
            <div className="text-center mb-8">

       <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => {setCurrentStep("login"); setFormData({
    email: '',
    mobile: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', ''], // 6-digit OTP
    jwtToken: '',
    fullName: '',
    countryCode: '+91',
    customCountryCode: ''
  })}}
            className={`
              px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300
              ${currentStep === "login"
                ? "bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white px-4 py-2 rounded-lg font-medium text-sm text-center"
                : "border border-white/30 text-white/70 hover:text-white hover:border-white/60"
              }
            `}
          >
            Login
          </button>

          <button
            onClick={() => {setCurrentStep("signup"); setFormData({
    email: '',
    mobile: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', ''], // 6-digit OTP
    jwtToken: '',
    fullName: '',
    countryCode: '+91',
    customCountryCode: ''
  })}}
            className={`
              px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300
              ${currentStep === "signup"
                ? "bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white px-4 py-2 rounded-lg font-medium text-sm text-center"
                : "border border-white/30 text-white/70 hover:text-white hover:border-white/60"
              }
            `}
          >
            Sign Up
          </button>
        </div>



              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {currentStep === 'choice' ? 'Login' : 
                 currentStep === 'signup' ? 'Sign Up' : 'Login'}
              </h1>
              <p className="text-white/70 text-sm">
                {currentStep === 'choice' ? 'Choose your preferred method' :
                 currentStep === 'signup' ? 'Create your account' : 'Welcome back!'}
              </p>
            </div>

      
            {currentStep === 'signup' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">FULL NAME</label>
                  <input
                    type="text"
                    value={formData.fullName || ''}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-white/30 text-white pl-2 pr-4 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

          
 

               
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={e => handleInputChange('email', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-2 pr-4 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                        <X className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>


                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-2">PHONE NUMBER</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={e => handleInputChange('countryCode', e.target.value)}
                        className="w-32 bg-transparent border-b-2 border-white/30 text-white py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 text-sm"
                      >
                        <option className="bg-[#2D1B3D]" value="+91">+91 (IN)</option>
                        <option className="bg-[#2D1B3D]" value="+1">+1 (US)</option>
                        <option className="bg-[#2D1B3D]" value="+44">+44 (UK)</option>
                        <option className="bg-[#2D1B3D]" value="+61">+61 (AU)</option>
                        <option className="bg-[#2D1B3D]" value="+971">+971 (UAE)</option>
                        <option className="bg-[#2D1B3D]" value="other">Other</option>
                      </select>
                      {formData.countryCode === 'other' && (
                        <input
                          type="text"
                          value={formData.customCountryCode}
                          onChange={e => handleInputChange('customCountryCode', e.target.value)}
                          className="w-24 bg-transparent border-b-2 border-white/30 text-white pl-2 pr-2 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 text-sm"
                          placeholder="+XX"
                        />
                      )}
                      <input
                        type="tel"
                        value={formData.mobile || ''}
                        onChange={e => handleInputChange('mobile', e.target.value)}
                        className="flex-1 bg-transparent border-b-2 border-white/30 text-white pl-2 pr-4 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    {/* ERROR if any */}
                      {(errors.countryCode || errors.mobile) && (
                        <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                          <X className="w-3 h-3" />
                          <span>{errors.countryCode || errors.mobile}</span>
                        </p>
                      )}

                      {/* VERIFY OTP BUTTON */}
                      {!signupOtpSent && (
                        <button
                          type="button"
                          onClick={sendSignupOtp}
                          className="mt-3 bg-[#FFD700] text-[#2D1B3D] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-yellow-400 transition-all"
                        >
                          Verify Phone
                        </button>
                      )}

                      {/* OTP INPUT FIELD */}
                      {signupOtpSent && !signupOtpVerified && (
                        <div className="mt-3">
                          <label className="block text-xs font-medium text-white/90 mb-1">
                            Enter OTP
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            value={signupOtpInput}
                            onChange={e => setSignupOtpInput(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-white/40 text-white py-2 text-sm focus:border-white"
                          />

                          <button
                            onClick={verifySignupOtp}
                            className="mt-2 bg-green-400 text-[#2D1B3D] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-green-300 transition-all"
                          >
                            Verify OTP
                          </button>
                        </div>
                      )}

                      {/* SUCCESS BADGE */}
                      {signupOtpVerified && (
                        <p className="text-green-400 text-xs mt-2 font-semibold">
                          ✔ Phone Verified Successfully!
                        </p>
                      )}

                  </div>
                
           
                {/* >>> END conditional identifier <<< */}

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">PASSWORD</label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      disabled={!signupOtpVerified}
                      className={`w-full bg-transparent border-b-2 ${
                        signupOtpVerified ? "border-white/30" : "opacity-40 border-white/10"
                      } text-white pl-6 pr-10 py-3`}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 right-0 flex items-center text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                  {formData.password && <PasswordRequirements password={formData.password} />}
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">CONFIRM PASSWORD</label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-10 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-0 right-0 flex items-center text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>
{/* WhatsApp Consent Checkbox */}
<div className="flex items-start gap-2 mt-4">
  <input
    type="checkbox"
    checked={whatsappConsent}
    onChange={(e) => setWhatsappConsent(e.target.checked)}
    className="mt-1 accent-yellow-400"
  />
  <label className="text-xs text-white/80 leading-snug">
    I agree to receive transactional and promotional messages from Gronik via WhatsApp.
  </label>
</div>

{errors.whatsappConsent && (
  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
    <X className="w-3 h-3" />
    {errors.whatsappConsent}
  </p>
)}



                <button
                  onClick={handleSignup}
                  disabled={isLoading || !whatsappConsent}
                  className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-6 gold-glow-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>CREATING...</span>
                    </>
                  ) : (
                    <>
                      <span>SIGN UP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                
              </div>
            )}

            {currentStep === 'login' && (
              <div className="space-y-4">
                <div>
  <label className="block text-xs font-medium text-white/80 mb-2">PHONE NUMBER</label>

  <div className="flex items-center gap-2">
    <select
      value={formData.countryCode}
      onChange={(e) => handleInputChange('countryCode', e.target.value)}
      className="w-32 bg-transparent border-b-2 border-white/30 text-white py-3 focus:outline-none focus:border-white transition-all text-sm"
    >
      <option className="bg-[#2D1B3D]" value="+91">+91 (IN)</option>
      <option className="bg-[#2D1B3D]" value="+1">+1 (US)</option>
      <option className="bg-[#2D1B3D]" value="+44">+44 (UK)</option>
      <option className="bg-[#2D1B3D]" value="+61">+61 (AU)</option>
      <option className="bg-[#2D1B3D]" value="+971">+971 (UAE)</option>
      <option className="bg-[#2D1B3D]" value="other">Other</option>
    </select>

    {formData.countryCode === 'other' && (
      <input
        type="text"
        value={formData.customCountryCode}
        onChange={(e) => handleInputChange('customCountryCode', e.target.value)}
        className="w-24 bg-transparent border-b-2 border-white/30 text-white pl-2 pr-2 py-3 focus:outline-none focus:border-white transition-all text-sm"
        placeholder="+XX"
      />
    )}

    <input
      type="tel"
      value={formData.mobile}
      onChange={(e) => handleInputChange('mobile', e.target.value)}
      className="flex-1 bg-transparent border-b-2 border-white/30 text-white pl-2 pr-4 py-3 focus:outline-none focus:border-white placeholder-white/40 text-sm"
      placeholder="Enter your mobile number"
    />
  </div>

  {(errors.countryCode || errors.mobile) && (
    <p className="text-red-400 text-xs mt-1 flex items-center">
      <X className="w-3 h-3 mr-1" />
      {errors.countryCode || errors.mobile}
    </p>
  )}
</div>


                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder=""
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-10 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 -white/40 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 right-0 flex items-center text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-white/70 hover:text-[#9B7BB8] text-xs transition-colors duration-300 underline underline-offset-2"
                    onClick={() => setCurrentStep('forgot')}
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-6 gold-glow-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>SIGNING IN...</span>
                    </>
                  ) : (
                    <span>SUBMIT</span>
                  )}
                </button>

               
              </div>
            )}

          

            {currentStep === 'forgot' && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold text-white mb-1">Forgot Password?</h2>
                  <p className="text-white/70 text-sm">Enter your {loginMethod === 'email' ? 'email address' : 'mobile number'} to reset your password.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">
                    PHONE NUMBER
                  </label>
                  <div className="flex items-center gap-2">

  <select
    value={formData.countryCode}
    onChange={(e) => handleInputChange('countryCode', e.target.value)}
    className="w-32 bg-transparent border-b-2 border-white/30 text-white py-3"
  >
    <option className="bg-[#2D1B3D]" value="+91">+91</option>
    <option className="bg-[#2D1B3D]" value="+1">+1</option>
    <option className="bg-[#2D1B3D]" value="+44">+44</option>
  </select>

  <input
    type="tel"
    value={formData.mobile}
    onChange={(e) => handleInputChange('mobile', e.target.value)}
    className="flex-1 bg-transparent border-b-2 border-white/30 text-white py-3"
    placeholder="Enter mobile number"
  />

</div>

                  {errors[loginMethod] && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors[loginMethod]}</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleForgotSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-4 gold-glow-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>VERIFYING...</span>
                    </>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
             
              </div>
            )}

            {currentStep === 'forgot-otp' && (
  <div className="space-y-4">

    <h2 className="text-xl font-bold text-white text-center">
      Verify OTP
    </h2>

    <p className="text-white/70 text-sm text-center">
      OTP sent to +91 {forgotMobile}
    </p>

    <input
      type="number"
      value={forgotOtp}
      onChange={(e) => setForgotOtp(e.target.value)}
      placeholder="Enter 6 digit OTP"
      className="w-full bg-transparent border-b-2 border-white/30 text-white py-3"
    />

    <button
     onClick={async () => {

  if (forgotOtp.length !== 6) {
    setErrors({ api: "Enter valid OTP" });
    return;
  }

  try {
    setIsLoading(true);

  await api.post("/auth/verifyOtp", {
  mobile: forgotMobile,
  otp: forgotOtp
});

    setCurrentStep("reset");

  } catch (err) {
    setErrors({
      api: err.response?.data?.message || "OTP verification failed"
    });
  } finally {
    setIsLoading(false);
  }

}}

      className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 rounded-xl"
    >
      Verify OTP
    </button>

  </div>
)}


            {currentStep === 'reset' && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold text-white mb-1">Reset Password</h2>
                  <p className="text-white/70 text-sm">Enter your new password below.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">NEW PASSWORD</label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-10 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute top-0 right-0 flex items-center text-white/60 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors.newPassword}</span>
                    </p>
                  )}
                  {formData.newPassword && <PasswordRequirements password={formData.newPassword} />}
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">CONFIRM PASSWORD</label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-10 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-0 right-0 flex items-center text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={handleResetPassword}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-4 gold-glow-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>RESETTING...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </button>
          
                {resetSuccess && (
                  <div className="text-green-400 text-center mt-2 font-semibold">Password reset successful!</div>
                )}
              </div>
            )}

            {showAuthSuccess && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Authentication Successful!</h2>
                  <p className="text-white/70 text-sm">Redirecting to home page...</p>
                </div>
              </div>
            )}
            {errors.api && (
              <div className="text-red-400 text-xs text-center mb-2">{errors.api}</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
.login-gold-glow:hover, .login-gold-glow:focus {
  box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1 !important;
  border-color: #FFD700 !important;
}
.gold-glow-cta {
  box-shadow: 0 2px 12px 0 #FFD70033;
  position: relative;
  z-index: 1;
}
.gold-glow-cta:hover, .gold-glow-cta:focus {
  background: linear-gradient(90deg, #FFD700 0%, #ffe9b3 60%, #9B7BB8 100%) !important;
  color: #2D1B3D !important;
  box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1;
  border: none;
  outline: none;
  transition: box-shadow 0.18s cubic-bezier(.4,1.2,.6,1), background 0.18s cubic-bezier(.4,1.2,.6,1);
}
.modern-animated-btn {
  transition: all 0.18s cubic-bezier(.4,1.2,.6,1);
  box-shadow: 0 2px 12px 0 #2D1B3D33;
}
.modern-animated-btn:hover, .modern-animated-btn:focus {
  transform: scale(1.045);
  box-shadow: 0 4px 24px 0 #9B7BB8cc, 0 1.5px 8px 0 #8A6AA7;
  background: #8A6AA7 !important;
}
      `}</style>
    </div>
  );
};

export default LoginPage;
