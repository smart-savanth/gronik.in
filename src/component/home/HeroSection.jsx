import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Star, Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToFeaturedBooks = () => {
    const featuredSection = document.getElementById('featured-books');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Main Background - Light Purple (exactly matching Figma) */}
      <div className="absolute inset-0 bg-[#9B7BB8]"></div>
      
      {/* Diagonal Split - Dark Purple Section (matching Figma exactly) */}
      <div 
        className="absolute inset-0 bg-[#2D1B3D]"
        style={{
          clipPath: 'polygon(0 70%, 100% 35%, 100% 100%, 0% 100%)'
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Main Content Area - Added padding-top for navbar spacing */}
        <div className="flex-1 flex items-center pt-24 pb-32">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Content - Updated text layout with different styling for "a new world" */}
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D1B3D]">
                      Where every page<br />
                      opens <span className="italic font-light relative inline-block">
                        a new world
                       
                      </span>
                    </h1>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-[#2D1B3D]/80 leading-relaxed font-medium">
                    Discover endless knowledge and imagination in our curated digital library.
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#3D2A54] rounded-full"></div>
                      <span className="text-[#2D1B3D] font-semibold">Premium Quality</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#3D2A54] rounded-full"></div>
                      <span className="text-[#2D1B3D] font-semibold">Instant Access</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="pt-4">
                    <button 
                      onClick={scrollToFeaturedBooks}
                      className="bg-[#2D1B3D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#3D2A54] transition-all duration-300 flex items-center space-x-3 group shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span>Start Reading Today</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Larger book image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  
                  {/* Circle with thin border like original */}
                  <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full bg-[#9B7BB8] border border-white/20 flex items-center justify-center relative">
                    
                    {/* Book Image - Made larger */}
                    <div className="relative z-20">
                      <img 
                        src="/book.png" 
                        alt="Featured Book"
                        className="w-64 h-80 object-cover rounded-lg"
                        style={{
                          filter: 'drop-shadow(8px 12px 16px rgba(0,0,0,0.35)) drop-shadow(4px 6px 8px rgba(0,0,0,0.25))',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Section - Bottom (exact styling from Figma) */}
        <div className="pb-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-center items-center gap-12 lg:gap-20">
              
              {/* Books */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 min-w-[160px] shadow-lg hover:scale-105 transform">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                    50+
                  </div>
                  <div className="text-white/80 text-base font-medium border-b border-white/30 pb-2">
                    Books
                  </div>
                </div>
              </div>
              
              {/* Authors */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 min-w-[160px] shadow-lg hover:scale-105 transform">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                    10+
                  </div>
                  <div className="text-white/80 text-base font-medium border-b border-white/30 pb-2">
                    Authors
                  </div>
                </div>
              </div>
              
              {/* Buyers */}
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 min-w-[160px] shadow-lg hover:scale-105 transform">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                    15+
                  </div>
                  <div className="text-white/80 text-base font-medium border-b border-white/30 pb-2">
                    buyers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and mobile responsiveness */}
      <style jsx>{`
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotateY-12 {
          transform: rotateY(-12deg);
        }
        
        .hover\\:rotateY-0:hover {
          transform: rotateY(0deg);
        }

        /* Mobile Responsive Styles for 400px */
        @media (max-width: 400px) {
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .px-8 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .gap-16 {
            gap: 2rem;
          }
          
          .text-5xl {
            font-size: 2rem;
          }
          
          .text-4xl {
            font-size: 1.75rem;
          }
          
          .lg\\:text-6xl {
            font-size: 2.25rem;
          }
          
          .xl\\:text-7xl {
            font-size: 2.5rem;
          }
          
          .lg\\:text-5xl {
            font-size: 2rem;
          }
          
          .xl\\:text-6xl {
            font-size: 2.25rem;
          }
          
          .w-72 {
            width: 16rem;
          }
          
          .h-72 {
            height: 16rem;
          }
          
          .lg\\:w-80 {
            width: 16rem;
          }
          
          .lg\\:h-80 {
            height: 16rem;
          }
          
          .p-8 {
            padding: 1rem;
          }
          
          .gap-12 {
            gap: 1rem;
          }
          
          .lg\\:gap-20 {
            gap: 1.5rem;
          }
          
          .min-w-\\[160px\\] {
            min-width: 120px;
          }
          
          .text-lg {
            font-size: 1rem;
          }
          
          .px-8 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          
          .space-x-6 > * + * {
            margin-left: 1rem;
          }
          
          .grid {
            display: block;
          }
          
          .space-y-8 > * + * {
            margin-top: 1.5rem;
          }

          .w-64 {
            width: 14rem;
          }
          
          .h-80 {
            height: 18rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;