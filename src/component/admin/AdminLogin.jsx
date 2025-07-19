import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../slices/adminAuthSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // TODO: Replace with real backend call
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@gronik.com' && password === 'admin123') {
        dispatch(adminLogin({ token: 'adminTokenValue', role: 'admin' }));
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1] px-4">
      <div className="w-full max-w-md bg-[#2D1B3D]/95 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <img src="/images/logo.png" alt="Gronik Admin" className="w-24 h-24 mb-6 object-contain" />
        <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
        <p className="text-white/60 mb-6 text-center">Sign in to manage Gronik</p>
        <form className="w-full space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B7BB8] w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#9B7BB8]/20 text-white border border-[#9B7BB8]/30 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] placeholder-white/60 text-sm"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B7BB8] w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#9B7BB8]/20 text-white border border-[#9B7BB8]/30 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] placeholder-white/60 text-sm"
              required
            />
          </div>
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] text-white font-bold hover:from-[#8A6AA7] hover:to-[#9B7BB8] transition-all duration-200 mt-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {/* TODO: Connect to backend authentication here */}
      </div>
    </div>
  );
};

export default AdminLogin; 