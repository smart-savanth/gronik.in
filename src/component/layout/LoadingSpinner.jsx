import React from 'react';

const LoadingSpinner = ({ size = 48 }) => (
  <div className="flex items-center justify-center w-full h-full min-h-[120px]">
    <div
      className="animate-spin rounded-full border-4 border-t-[#9B7BB8] border-b-[#8A6AA7] border-l-[#B894D1] border-r-white/20 shadow-lg"
      style={{ width: size, height: size }}
    />
  </div>
);

export default LoadingSpinner; 