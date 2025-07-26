import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ className = '', to = -1, label = 'Back', textOnly = false }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center gap-2 font-semibold transition-all duration-150 ${textOnly ? 'bg-transparent shadow-none border-none px-0 py-0 text-[#2D1B3D] hover:text-[#2D1B3D]/80' : 'px-4 py-2 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg shadow'} ${className}`}
      style={{ minWidth: 0 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export default BackButton; 