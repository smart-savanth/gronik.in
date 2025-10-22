import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Target, Sparkles } from 'lucide-react';

const WhyEbooksButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRectangle, setIsRectangle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef(null);

  // Load stylish font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Add Google Fonts for Quicksand/Nunito
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@700&family=Nunito:wght@800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Check if mobile device (more precise detection)
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Mobile: screens smaller than 13" laptops (typically under 1024px width)
      // OR touch-only devices
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = width < 1024;
      
      setIsMobile(isTouchDevice && isSmallScreen);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Responsive shape effect
  useEffect(() => {
    function checkWidth() {
      if (buttonRef.current) {
        setIsRectangle(buttonRef.current.offsetWidth < 200);
      }
    }
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleButtonClick = () => {
    // For mobile devices, toggle on click
    if (isMobile) {
      setIsHovered(!isHovered);
    }
  };

  const handleMouseEnter = () => {
    // Only work on desktop/laptop
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // Only work on desktop/laptop
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  // Close modal when clicking outside (mobile only)
  useEffect(() => {
    if (!isMobile || !isHovered) return;

    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Check if click is outside the modal content
        const modalContent = document.querySelector('[data-modal-content]');
        if (modalContent && !modalContent.contains(event.target)) {
          setIsHovered(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isHovered]);

  return (
    <>
      {/* Main Button - Bottom right corner - BIGGER ON MOBILE */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`group relative 
            ${isMobile ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20'}
            bg-gradient-to-br from-[#2D1B3D] to-[#4A3B5C] 
            ${isRectangle ? 'rounded-xl' : 'rounded-full'} 
            shadow-2xl hover:shadow-3xl transition-all duration-100 transform hover:scale-105 hover:-translate-y-1 
            border-2 border-white/20 backdrop-blur-sm cursor-pointer active:scale-95`}
          style={{
            boxShadow: '0 8px 32px rgba(45, 27, 61, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
            outline: 'none'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>

          {/* Animated Background Particles */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
            <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute top-4 right-3 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse animation-delay-500"></div>
          </div>

          {/* Logo Container - 2 LINES: "Why" and "E-Books?" */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-0.5">
            <span 
              className={`block font-extrabold leading-tight text-white ${
                isMobile ? 'text-sm sm:text-base' : 'text-[9px] xs:text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[17px] 2xl:text-[19px]'
              }`}
              style={{
                fontFamily: 'Quicksand, Nunito, Playfair Display, serif',
                letterSpacing: '0.08em',
                textShadow: '0 2px 8px rgba(0,0,0,0.13)'
              }}
            >
              Why
            </span>
            <span 
              className={`block font-extrabold leading-tight text-white ${
                isMobile ? 'text-xs sm:text-sm' : 'text-[6px] xs:text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]'
              }`}
              style={{
                fontFamily: 'Quicksand, Nunito, Playfair Display, serif',
                letterSpacing: '0.10em',
                textShadow: '0 2px 8px rgba(0,0,0,0.13)'
              }}
            >
              E-Books<span className="text-yellow-300 font-bold">?</span>
            </span>
          </div>

          {/* Sparkle Effect */}
          <Sparkles className={`absolute top-1 right-1 text-yellow-300 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-300 ${
            isMobile ? 'w-4 h-4' : 'w-2 h-2 sm:w-3 sm:h-3'
          }`} />
        </button>

        {/* Background Blur Overlay - Only shows when hovered */}
        <div 
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ zIndex: 98 }}
        ></div>

        {/* Hover Content Popup - FULLY MOBILE RESPONSIVE */}
        <div 
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          style={{ zIndex: 99 }}
          data-modal-content
        >
          {/* Arrow pointing to button - HIDDEN ON MOBILE */}
          <div className="hidden md:block absolute bottom-6 right-8 w-4 h-4 bg-gradient-to-br from-[#2D1B3D] to-[#4A3B5C] rotate-45 border-r border-b border-white/20 shadow-lg transform translate-y-2"></div>

          {/* Content Container - PERFECT RESPONSIVENESS */}
          <div className="bg-gradient-to-br from-[#2D1B3D]/95 via-[#4A3B5C]/95 to-[#2D1B3D]/95 backdrop-blur-xl rounded-2xl 
            p-3 
            xs:p-4 
            sm:p-5 
            md:p-6 
            lg:p-7 
            xl:p-8 
            2xl:p-10 
            shadow-2xl border border-white/10 
            w-[95vw] 
            xs:w-[90vw] 
            sm:w-[85vw] 
            md:w-[80vw] 
            lg:w-[75vw] 
            xl:w-[70vw] 
            2xl:w-[65vw] 
            max-w-4xl relative overflow-hidden mx-2">

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-6 left-6 w-12 h-12 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-8 h-8 border border-white/15 rounded-lg rotate-45"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header - PERFECTLY RESPONSIVE */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 
                mb-3 
                xs:mb-4 
                sm:mb-5 
                md:mb-6 
                lg:mb-7 
                xl:mb-8">
                <div className="w-6 h-6 
                  xs:w-7 xs:h-7 
                  sm:w-8 sm:h-8 
                  md:w-10 md:h-10 
                  lg:w-12 lg:h-12 
                  xl:w-14 xl:h-14 
                  2xl:w-16 2xl:h-16 
                  flex items-center justify-center">
                  <img src="/images/icon.png" alt="logo" className="w-full h-full object-contain"></img>
                </div>
                <h3 className="text-xs 
                  xs:text-sm 
                  sm:text-base 
                  md:text-lg 
                  lg:text-xl 
                  xl:text-2xl 
                  2xl:text-3xl 
                  font-bold text-white text-center sm:text-left">
                  Why E-Books & Guides?
                </h3>
              </div>

              {/* Main Description - RESPONSIVE */}
              <p className="text-white/90 
                text-xs 
                xs:text-xs 
                sm:text-sm 
                md:text-base 
                lg:text-lg 
                xl:text-xl 
                leading-relaxed 
                mb-3 
                xs:mb-4 
                sm:mb-5 
                md:mb-6 
                lg:mb-7 
                xl:mb-8 
                font-medium text-center max-w-3xl mx-auto px-1 sm:px-2">
                In a world addicted to quick hacks and 10-second reels, we're forgetting the one habit that built legends — <span className="text-yellow-300 font-semibold">reading</span>.
              </p>

              {/* Feature Points - RESPONSIVE GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                gap-2 
                xs:gap-3 
                sm:gap-4 
                md:gap-5 
                lg:gap-6 
                mb-3 
                xs:mb-4 
                sm:mb-5 
                md:mb-6 
                lg:mb-7 
                xl:mb-8">
                {/* Point 1 */}
                <div className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mx-auto flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">The Evergreen Weapon for Growth</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                      E-books aren't "old-school" — they're timeless tools for deep thinking, clarity, and life upgrades.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl mx-auto flex items-center justify-center">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">Read or Regret</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                      The ones who read — <span className="text-yellow-300 font-semibold">lead</span>. The ones who don't? They follow the noise.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">Built for Action, Not Fluff</h4>
                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                      Battle-tested blueprints for an unfair advantage in fitness, finance, mindset, and business.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Accent - RESPONSIVE */}
              <div className="pt-3 sm:pt-4 lg:pt-6 border-t border-white/10">
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-xs sm:text-sm lg:text-base font-medium">
                    Start Your Reading Journey
                  </span>
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-pink-400 rounded-full animate-pulse animation-delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse {
          50% {
            opacity: .5;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        /* Touch improvements for mobile */
        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none;
          }
          .group:active {
            transform: scale(0.95);
          }
        }
        /* Ensure proper touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 64px;
            min-width: 64px;
          }
        }
        /* Prevent text selection in modal */
        [data-modal-content] {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </>
  );
};

export default WhyEbooksButton;