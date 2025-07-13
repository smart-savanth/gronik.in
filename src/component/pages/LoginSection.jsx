import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock, ArrowRight, Check, X, RefreshCw } from 'lucide-react';

const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState('choice'); // 'choice', 'signup', 'login', 'otp', 'forgot', 'reset'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    otp: ['', '', '', '', '', ''], // 6-digit OTP
    jwtToken: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // OTP and JWT related states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock existing users database
  const existingUsers = [
    { email: 'user@example.com', mobile: '9876543210', password: 'Password123!' },
    { email: 'test@gronik.com', mobile: '9123456789', password: 'Test@123' }
  ];

  // Validation functions
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

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Mock OTP generation (in real app, this would come from backend)
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Mock JWT token generation
  const generateJWT = (userData) => {
    // In real app, this would be a proper JWT token from backend
    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.${btoa(JSON.stringify(userData))}`;
  };

  // OTP input handling
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData(prev => ({ ...prev, otp: newOtp }));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }

    // Clear error when user starts typing
    if (otpError) setOtpError('');
  };

  // Handle OTP key events
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  // Send OTP function
  const sendOTP = async (emailOrMobile) => {
    setIsLoading(true);
    setOtpError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const otp = generateOTP();
    console.log(`OTP sent to ${emailOrMobile}: ${otp}`); // For testing purposes
    
    setOtpSent(true);
    setIsLoading(false);
    setResendCooldown(60); // 60 seconds cooldown
    
    // Start cooldown timer
    const timer = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Verify OTP function
  const verifyOTP = async () => {
    const enteredOtp = formData.otp.join('');
    if (enteredOtp.length !== 6) {
      setOtpError('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, accept any 6-digit OTP
    if (enteredOtp.length === 6) {
      setOtpVerified(true);
      setIsLoading(false);
      
      // Generate JWT token
      const userData = {
        email: formData.email || formData.mobile,
        loginMethod: loginMethod,
        timestamp: new Date().toISOString()
      };
      
      const jwtToken = generateJWT(userData);
      setFormData(prev => ({ ...prev, jwtToken }));
      
      // Store in localStorage (in real app, use secure storage)
      localStorage.setItem('gronik_jwt', jwtToken);
      localStorage.setItem('gronik_user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      setOtpError('Invalid OTP. Please try again.');
      setIsLoading(false);
    }
  };

  // Resend OTP function
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    
    await sendOTP(loginMethod === 'email' ? formData.email : formData.mobile);
  };

  // Handle signup
  const handleSignup = () => {
    const newErrors = {};
    
    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (existingUsers.find(user => user.email === formData.email)) {
        newErrors.email = 'Email already exists. Please login to continue.';
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!validateMobile(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      } else if (existingUsers.find(user => user.mobile === formData.mobile)) {
        newErrors.mobile = 'Mobile number already exists. Please login to continue.';
      }
    }

    const passwordValidation = validatePassword(formData.password);
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordValidation.isValid) {
      newErrors.password = 'Password does not meet requirements';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Send OTP for verification
      sendOTP(loginMethod === 'email' ? formData.email : formData.mobile);
      setCurrentStep('otp');
    }
  };

  // Handle login
  const handleLogin = () => {
    const newErrors = {};
    
    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!validateMobile(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    const user = existingUsers.find(u => 
      (loginMethod === 'email' ? u.email === formData.email : u.mobile === formData.mobile) &&
      u.password === formData.password
    );

    if (!user && Object.keys(newErrors).length === 0) {
      if (loginMethod === 'email') {
        const emailExists = existingUsers.find(u => u.email === formData.email);
        newErrors.password = emailExists ? 'Incorrect password' : 'Email not found. Please signup first.';
      } else {
        const mobileExists = existingUsers.find(u => u.mobile === formData.mobile);
        newErrors.password = mobileExists ? 'Incorrect password' : 'Mobile number not found. Please signup first.';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && user) {
      // Send OTP for verification
      sendOTP(loginMethod === 'email' ? formData.email : formData.mobile);
      setCurrentStep('otp');
    }
  };

  // Handle forgot password submit (step 1)
  const handleForgotSubmit = () => {
    const newErrors = {};
    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else {
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!validateMobile(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('reset');
      }, 1000);
    }
  };

  // Handle password reset (step 2)
  const handleResetPassword = () => {
    const newErrors = {};
    const passwordValidation = validatePassword(formData.newPassword);
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!passwordValidation.isValid) {
      newErrors.newPassword = 'Password does not meet requirements';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setResetSuccess(true);
        setTimeout(() => {
          setResetSuccess(false);
          setCurrentStep('login');
          setFormData(prev => ({ ...prev, password: '', newPassword: '', confirmPassword: '' }));
        }, 1500);
      }, 1200);
    }
  };

  // Password requirements component
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gronik-primary via-gronik-bg to-gronik-secondary relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background elements with glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#2D1B3D]/20 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#2D1B3D]/30"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#2D1B3D]/15 rounded-full blur-3xl animate-pulse delay-1000 shadow-2xl shadow-[#2D1B3D]/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#2D1B3D]/10 rounded-full blur-3xl animate-pulse delay-500 shadow-2xl shadow-[#2D1B3D]/20"></div>
        <div className="absolute top-20 right-1/4 w-36 h-36 bg-[#2D1B3D]/25 rounded-full blur-3xl animate-pulse delay-700 shadow-2xl shadow-[#2D1B3D]/30"></div>
        <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-[#2D1B3D]/20 rounded-full blur-3xl animate-pulse delay-300 shadow-2xl shadow-[#2D1B3D]/25"></div>
      </div>

      {/* Centered Login Container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-lg">
        {/* Form Container */}
        <div className="bg-[#2D1B3D]/90 backdrop-blur-xl rounded-3xl border border-[#2D1B3D]/50 shadow-2xl shadow-[#2D1B3D]/20 overflow-hidden">
          <div className="p-6 sm:p-10">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {currentStep === 'choice' ? 'Login' : 
                 currentStep === 'signup' ? 'Sign Up' : 'Login'}
              </h1>
              <p className="text-white/70 text-sm">
                {currentStep === 'choice' ? 'Choose your preferred method' :
                 currentStep === 'signup' ? 'Create your account' : 'Welcome back!'}
              </p>
            </div>

            {/* Step 1: Choose Login Method */}
            {currentStep === 'choice' && (
              <div className="space-y-6">
                <div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => setLoginMethod('email')}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 login-gold-glow ${
                        loginMethod === 'email'
                          ? 'border-white bg-white/10 text-white shadow-lg shadow-white/20'
                          : 'border-white/30 bg-white/5 text-white/70 hover:border-white/50 hover:shadow-lg hover:shadow-white/10'
                      }`}
                    >
                      <Mail className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">Email</span>
                    </button>
                    <button
                      onClick={() => setLoginMethod('mobile')}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 login-gold-glow ${
                        loginMethod === 'mobile'
                          ? 'border-white bg-white/10 text-white shadow-lg shadow-white/20'
                          : 'border-white/30 bg-white/5 text-white/70 hover:border-white/50 hover:shadow-lg hover:shadow-white/10'
                      }`}
                    >
                      <Phone className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">Mobile</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentStep('signup')}
                    className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 gold-glow-cta"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentStep('login')}
                    className="w-full bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 border border-white/20 hover:border-white/40 login-gold-glow"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Signup Form */}
            {currentStep === 'signup' && (
              <div className="space-y-4">
                {/* Email/Mobile Input */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">
                    {loginMethod === 'email' ? 'EMAIL' : 'MOBILE'}
                  </label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      {loginMethod === 'email' ? 
                        <Mail className="w-4 h-4 text-white/60" /> : 
                        <Phone className="w-4 h-4 text-white/60" />
                      }
                    </div>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      value={loginMethod === 'email' ? formData.email : formData.mobile}
                      onChange={(e) => handleInputChange(loginMethod, e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-4 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                    />
                  </div>
                  {errors[loginMethod] && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors[loginMethod]}</span>
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">PASSWORD</label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      <Lock className="w-4 h-4 text-white/60" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-10 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
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

                {/* Submit Button */}
                <button
                  onClick={handleSignup}
                  disabled={isLoading}
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

                <button
                  onClick={() => setCurrentStep('choice')}
                  className="w-full text-white/70 hover:text-white py-2 transition-colors duration-300 text-xs"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step 3: Login Form */}
            {currentStep === 'login' && (
              <div className="space-y-4">
                {/* Email/Mobile Input */}
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">
                    {loginMethod === 'email' ? 'Email' : 'Mobile'}
                  </label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      {loginMethod === 'email' ? 
                        <Mail className="w-4 h-4 text-white/60" /> : 
                        <Phone className="w-4 h-4 text-white/60" />
                      }
                    </div>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      value={loginMethod === 'email' ? formData.email : formData.mobile}
                      onChange={(e) => handleInputChange(loginMethod, e.target.value)}
                      placeholder=""
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-4 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
                    />
                  </div>
                  {errors[loginMethod] && (
                    <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{errors[loginMethod]}</span>
                    </p>
                  )}
                </div>

                {/* Password Input */}
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
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-10 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
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

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-white/70 hover:text-[#9B7BB8] text-xs transition-colors duration-300 underline underline-offset-2"
                    onClick={() => setCurrentStep('forgot')}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
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

                <button
                  onClick={() => setCurrentStep('choice')}
                  className="w-full text-white/70 hover:text-orange-400 py-2 transition-colors duration-300 text-xs"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step 4: OTP Verification */}
            {currentStep === 'otp' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">Verify Your Account</h2>
                  <p className="text-white/70 text-sm">
                    We've sent a 6-digit verification code to your {loginMethod === 'email' ? 'email' : 'mobile'}
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    {loginMethod === 'email' ? formData.email : formData.mobile}
                  </p>
                </div>

                {/* OTP Input */}
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-white/80 mb-3 text-center">
                    ENTER VERIFICATION CODE
                  </label>
                  <div className="flex justify-center space-x-2 mb-4">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        data-otp-index={index}
                        className="w-12 h-12 text-center text-white bg-transparent border-2 border-white/30 rounded-lg focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 text-lg font-semibold"
                        style={{ caretColor: 'transparent' }}
                      />
                    ))}
                  </div>
                  
                  {otpError && (
                    <div className="text-red-400 text-xs text-center flex items-center justify-center space-x-1">
                      <X className="w-3 h-3" />
                      <span>{otpError}</span>
                    </div>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  onClick={verifyOTP}
                  disabled={isLoading || formData.otp.join('').length !== 6}
                  className="w-full bg-gradient-to-r from-[#FFD700]/90 to-[#9B7BB8]/80 text-[#2D1B3D] font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-6 gold-glow-cta disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>VERIFYING...</span>
                    </>
                  ) : (
                    <>
                      <span>VERIFY OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Resend OTP */}
                <div className="text-center">
                  <p className="text-white/60 text-xs mb-2">Didn't receive the code?</p>
                  <button
                    onClick={handleResendOTP}
                    disabled={resendCooldown > 0 || isLoading}
                    className="text-white/70 hover:text-[#9B7BB8] text-xs transition-colors duration-300 flex items-center justify-center space-x-1 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-3 h-3 ${resendCooldown > 0 ? 'animate-spin' : ''}`} />
                    <span>
                      {resendCooldown > 0 
                        ? `Resend in ${resendCooldown}s` 
                        : 'Resend OTP'
                      }
                    </span>
                  </button>
                </div>

                {/* Back Button */}
                <button
                  onClick={() => {
                    setCurrentStep('choice');
                    setFormData(prev => ({ ...prev, otp: ['', '', '', '', '', ''] }));
                    setOtpError('');
                  }}
                  className="w-full text-white/70 hover:text-white py-2 transition-colors duration-300 text-xs"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Step 5: Forgot Password - Enter Email/Mobile */}
            {currentStep === 'forgot' && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold text-white mb-1">Forgot Password?</h2>
                  <p className="text-white/70 text-sm">Enter your {loginMethod === 'email' ? 'email address' : 'mobile number'} to reset your password.</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/80 mb-2">
                    {loginMethod === 'email' ? 'EMAIL' : 'MOBILE'}
                  </label>
                  <div className="relative">
                    <div className="absolute top-0 left-0 flex items-center">
                      {loginMethod === 'email' ?
                        <Mail className="w-4 h-4 text-white/60" /> :
                        <Phone className="w-4 h-4 text-white/60" />
                      }
                    </div>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      value={loginMethod === 'email' ? formData.email : formData.mobile}
                      onChange={(e) => handleInputChange(loginMethod, e.target.value)}
                      className="w-full bg-transparent border-b-2 border-white/30 text-white pl-6 pr-4 py-3 focus:outline-none focus:border-white focus:shadow-lg focus:shadow-white/20 transition-all duration-300 placeholder-white/40 text-sm"
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
                <button
                  onClick={() => setCurrentStep('login')}
                  className="w-full text-white/70 hover:text-white py-2 transition-colors duration-300 text-xs"
                >
                  ← Back to Login
                </button>
              </div>
            )}

            {/* Step 6: Reset Password - Enter New Password */}
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
                <button
                  onClick={() => setCurrentStep('login')}
                  className="w-full text-white/70 hover:text-white py-2 transition-colors duration-300 text-xs"
                >
                  ← Back to Login
                </button>
                {resetSuccess && (
                  <div className="text-green-400 text-center mt-2 font-semibold">Password reset successful!</div>
                )}
              </div>
            )}

            {/* Authentication Success Message */}
            {isAuthenticated && (
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
/* Modern button animation: scale and soft shadow, purple palette */
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