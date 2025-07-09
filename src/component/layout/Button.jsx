import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Sparkles } from 'lucide-react';

const WhyEbooksButton = () => {
  const [isHovered, setIsHovered] = useState(false);

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

  const handleButtonClick = () => {
    // For mobile devices, toggle on click instead of hover
    if (window.innerWidth <= 768) {
      setIsHovered(!isHovered);
    }
  };

  return (
    <>
      {/* Fixed Floating Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div 
          className="relative"
          onMouseEnter={() => window.innerWidth > 768 && setIsHovered(true)}
          onMouseLeave={() => window.innerWidth > 768 && setIsHovered(false)}
        >
          {/* Main Button - IMPROVED MOBILE RESPONSIVENESS */}
          <button 
            onClick={handleButtonClick}
            className="group relative bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#2D1B3D] text-white rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 active:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 backdrop-blur-sm overflow-hidden touch-manipulation"
          >
            
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            {/* Animated Background Particles */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
              <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-1000"></div>
              <div className="absolute top-4 right-3 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse animation-delay-500"></div>
            </div>
            
            {/* Logo Container - CENTERED LAYOUT */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <span className="block text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] xl:text-[23px] font-extrabold leading-tight mb-1 text-white" style={{ fontFamily: 'Quicksand, Nunito, Playfair Display, serif', letterSpacing: '0.08em', textShadow: '0 2px 8px rgba(0,0,0,0.13)' }}>
                Why
              </span>
              <span className="block text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-extrabold leading-tight text-white" style={{ fontFamily: 'Quicksand, Nunito, Playfair Display, serif', letterSpacing: '0.10em', textShadow: '0 2px 8px rgba(0,0,0,0.13)' }}>
                E-Books<span className="text-yellow-300 font-bold">?</span>
              </span>
            </div>
            
            {/* Sparkle Effect */}
            <Sparkles className="absolute top-1 right-1 w-2 h-2 sm:w-3 sm:h-3 text-yellow-300 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500" />
          </button>

          {/* Background Blur Overlay - IMPROVED MOBILE */}
          <div className={`fixed inset-0 bg-black/20 backdrop-blur-md transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ zIndex: -1 }}></div>

          {/* Hover Content Popup - FULLY MOBILE RESPONSIVE */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ zIndex: 100 }}>
            
            {/* Arrow pointing to button - HIDDEN ON MOBILE */}
            <div className="hidden md:block absolute bottom-8 right-12 w-4 h-4 bg-gradient-to-br from-[#2D1B3D] to-[#4A3B5C] rotate-45 border-r border-b border-white/20 shadow-lg transform translate-y-2"></div>
            
            {/* Close Button - IMPROVED MOBILE */}
            <button 
              onClick={() => setIsHovered(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full flex items-center justify-center text-white/80 hover:text-white active:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 touch-manipulation"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content Container - SMALLER FOR MOBILE */}
            <div className="bg-gradient-to-br from-[#2D1B3D]/95 via-[#4A3B5C]/95 to-[#2D1B3D]/95 backdrop-blur-xl rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 shadow-2xl border border-white/10 w-[85vw] sm:w-[80vw] md:w-[600px] lg:w-[700px] xl:w-[800px] max-w-4xl relative overflow-hidden mx-2 sm:mx-4">
              
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-8 left-8 w-16 h-16 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border border-white/15 rounded-lg rotate-45"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header - SMALLER FOR MOBILE */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                    {/* Logo in card - Responsive sizing */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center text-white font-bold">
                      <img src="/images/icon.png" alt="logo" className="w-full h-full object-contain"></img>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white text-center sm:text-left">
                    Why E-Books & Guides?
                  </h3>
                </div>
                
                {/* Main Description - SMALLER FOR MOBILE */}
                <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 font-medium text-center max-w-3xl mx-auto px-2">
                  In a world addicted to quick hacks and 10-second reels, we're forgetting the one habit that built legends — <span className="text-yellow-300 font-semibold">reading</span>.
                </p>
                
                {/* Feature Points - SMALLER FOR MOBILE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                  {/* Point 1 */}
                  <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 p-3 sm:p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mx-auto flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">The Evergreen Weapon for Growth</h4>
                      <p className="text-white/75 text-xs sm:text-xs md:text-sm leading-relaxed">
                        E-books aren't "old-school" — they're timeless tools for deep thinking, clarity, and life upgrades.
                      </p>
                    </div>
                  </div>
                  
                  {/* Point 2 */}
                  <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 p-3 sm:p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl mx-auto flex items-center justify-center">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">Read or Regret</h4>
                      <p className="text-white/75 text-xs sm:text-xs md:text-sm leading-relaxed">
                        The ones who read — <span className="text-yellow-300 font-semibold">lead</span>. The ones who don't? They follow the noise.
                      </p>
                    </div>
                  </div>
                  
                  {/* Point 3 */}
                  <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 p-3 sm:p-4 md:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto flex items-center justify-center">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">Built for Action, Not Fluff</h4>
                      <p className="text-white/75 text-xs sm:text-xs md:text-sm leading-relaxed">
                        Battle-tested blueprints for an unfair advantage in fitness, finance, mindset, and business.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Accent - SMALLER FOR MOBILE */}
                <div className="pt-3 sm:pt-4 md:pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-xs sm:text-sm md:text-base font-medium">
                      Start Your Reading Journey
                    </span>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-pink-400 rounded-full animate-pulse animation-delay-500"></div>
                  </div>
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
        
        /* Stylish font for WHY text */
        .font-stylish {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 400px) {
          .w-16 {
            width: 4rem;
          }
          .h-16 {
            height: 4rem;
          }
        }
        
        /* Touch improvements for mobile */
        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none;
          }
        }
        
        /* Ensure proper touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </>
  );
};

export default WhyEbooksButton;