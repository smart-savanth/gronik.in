import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock, ArrowRight, Check, X } from 'lucide-react';

const LoginPage = () => {
  const [currentStep, setCurrentStep] = useState('choice'); // 'choice', 'signup', 'login'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Signup successful! Please login to continue.');
        setCurrentStep('login');
        setFormData(prev => ({ ...prev, password: '' }));
      }, 1500);
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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('Login successful! Redirecting to home page...');
      }, 1500);
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
                      className={`p-3 rounded-xl border-2 transition-all duration-300 hover-gold-border ${
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
                      className={`p-3 rounded-xl border-2 transition-all duration-300 hover-gold-border ${
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
                    className="w-full bg-[#1A0F2E]/80 backdrop-blur-md text-white hover:bg-[#1A0F2E] font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40 flex items-center justify-center space-x-2 primary-button-animated"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentStep('login')}
                    className="w-full bg-white/10 hover:bg-white/15 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/20 hover-gold-border"
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
                  className="w-full bg-[#1A0F2E]/80 backdrop-blur-md text-white hover:bg-[#1A0F2E] font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 mt-6 primary-button-animated"
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
                  <button className="text-white/70 hover:text-white text-xs transition-colors duration-300">
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-[#1A0F2E]/80 backdrop-blur-md text-white hover:bg-[#1A0F2E] font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 mt-6 primary-button-animated"
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
          </div>
        </div>
      </div>

      <style jsx>{`
          /* Primary buttons (white buttons) with animated border circulation */
.primary-button-animated {
  position: relative;
  overflow: hidden;
  background: rgba(26, 15, 46, 0.8) !important;
}

.primary-button-animated::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(
    45deg,
    #FFD700,
    #1A0F2E,
    #FFD700,
    #1A0F2E,
    #FFD700,
    #1A0F2E,
    #FFD700,
    #1A0F2E
  );
  background-size: 400% 400%;
  animation: borderCirculation 3s linear infinite;
  border-radius: 0.75rem;
  z-index: -1;
}

.primary-button-animated:hover {
  border-color: #FFD700 !important;
  box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1 !important;
}

.primary-button-animated:hover::before {
  animation: none;
  background: transparent;
}

@keyframes borderCirculation {
  0% { 
    background-position: 0% 0%;
  }
  25% { 
    background-position: 100% 0%;
  }
  50% { 
    background-position: 100% 100%;
  }
  75% { 
    background-position: 0% 100%;
  }
  100% { 
    background-position: 0% 0%;
  }
}

/* Hover gold border effect for other buttons */
.hover-gold-border:hover {
  border-color: #FFD700 !important;
  box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1 !important;
}

@media (max-width: 640px) {
  .primary-button-animated, .hover-gold-border {
    font-size: 1rem;
    border-radius: 0.9rem;
  }
  
  .primary-button-animated::before {
    border-radius: 0.9rem;
  }
  
  .primary-button-animated::after {
    border-radius: 0.8rem;
  }
}
      `}</style>
    </div>
  );
};

export default LoginPage;