import React from 'react';

const SkeletonLoader = ({ type = 'rect', width = '100%', height = 24, className = '' }) => {
  const baseClass = 'bg-gradient-to-r from-[#9B7BB8]/20 via-[#A67FC4]/20 to-[#B894D1]/20 animate-pulse';
  if (type === 'text') {
    return <div className={`rounded-full h-4 w-3/4 mb-2 ${baseClass} ${className}`} style={{ width }} />;
  }
  // Default: rectangle
  return <div className={`rounded-lg ${baseClass} ${className}`} style={{ width, height }} />;
};

export default SkeletonLoader; 