import React, { useState } from 'react';
import { TrendingUp, Target, Sparkles } from 'lucide-react';

const WhyEbooksButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Fixed Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Button */}
          <button className="group relative bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#2D1B3D] text-white rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border-2 border-white/20 backdrop-blur-sm overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            {/* Animated Background Particles */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
              <div className="absolute bottom-3 right-2 w-1 h-1 bg-white/40 rounded-full animate-ping animation-delay-1000"></div>
              <div className="absolute top-4 right-3 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse animation-delay-500"></div>
            </div>
            
            {/* Logo Container - Larger Size */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mb-1 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {/* Logo - Increased size */}
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-white font-bold text-xs">
                  <img src="/images/icon.png" alt="logo" className="w-full h-full object-contain"></img>
                </div>
              </div>
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-300 text-white/90">
                WHY
              </span>
            </div>
            
            {/* Sparkle Effect */}
            <Sparkles className="absolute top-1 right-1 w-3 h-3 text-yellow-300 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500" />
          </button>

          {/* Background Blur Overlay */}
          <div className={`fixed inset-0 bg-black/20 backdrop-blur-md transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ zIndex: -1 }}></div>

          {/* Hover Content Popup - Wider and Centered */}
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ zIndex: 100 }}>
            
            {/* Arrow pointing to button */}
            <div className="absolute bottom-8 right-12 w-4 h-4 bg-gradient-to-br from-[#2D1B3D] to-[#4A3B5C] rotate-45 border-r border-b border-white/20 shadow-lg transform translate-y-2"></div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsHovered(false)}
              className="absolute top-4 right-4 z-50 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content Container - Professional Design */}
            <div className="bg-gradient-to-br from-[#2D1B3D]/95 via-[#4A3B5C]/95 to-[#2D1B3D]/95 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 w-[90vw] md:w-[700px] lg:w-[800px] max-w-4xl relative overflow-hidden">
              
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-8 left-8 w-16 h-16 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-12 h-12 border border-white/15 rounded-lg rotate-45"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    {/* Logo in card - Significantly increased size */}
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-white font-bold">
                      <img src="/images/icon.png" alt="logo" className="w-full h-full object-contain"></img>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Why E-Books & Guides?
                  </h3>
                </div>
                
                {/* Main Description */}
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 font-medium text-center max-w-3xl mx-auto">
                  In a world addicted to quick hacks and 10-second reels, we're forgetting the one habit that built legends — <span className="text-yellow-300 font-semibold">reading</span>.
                </p>
                
                {/* Feature Points - Professional Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Point 1 */}
                  <div className="text-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl mx-auto flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">The Evergreen Weapon for Growth</h4>
                      <p className="text-white/75 text-sm leading-relaxed">
                        E-books aren't "old-school" — they're timeless tools for deep thinking, clarity, and life upgrades.
                      </p>
                    </div>
                  </div>
                  
                  {/* Point 2 */}
                  <div className="text-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl mx-auto flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Read or Regret</h4>
                      <p className="text-white/75 text-sm leading-relaxed">
                        The ones who read — <span className="text-yellow-300 font-semibold">lead</span>. The ones who don't? They follow the noise.
                      </p>
                    </div>
                  </div>
                  
                  {/* Point 3 */}
                  <div className="text-center space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Built for Action, Not Fluff</h4>
                      <p className="text-white/75 text-sm leading-relaxed">
                        Battle-tested blueprints for an unfair advantage in fitness, finance, mindset, and business.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Accent */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-base font-medium">
                      Start Your Reading Journey
                    </span>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-500"></div>
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
        }
        
        /* Ensure content doesn't overflow on mobile */
        @media (max-width: 640px) {
          .grid-cols-1 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default WhyEbooksButton;