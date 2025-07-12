import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1] px-4">
      <img src="/images/logo.png" alt="Gronik Logo" className="w-24 h-24 mb-6 object-contain" />
      <h1 className="text-7xl font-extrabold text-white drop-shadow mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-white/70 mb-6 text-center max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition shadow-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound; 