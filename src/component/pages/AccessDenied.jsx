import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#9B7BB8] via-[#A67FC4] to-[#B894D1] px-4">
      <Lock className="w-20 h-20 text-white mb-6 drop-shadow" />
      <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
      <p className="text-white/70 mb-6 text-center max-w-md">You do not have permission to view this page. Please log in with the correct account or contact support.</p>
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition shadow-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default AccessDenied; 