import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  // Fixed Home navigation
  const handleHomeClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fixed About navigation
  const handleAboutClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#2D1B3D] backdrop-blur-md border-t border-gronik-secondary/20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="w-20 h-8 xs:w-22 xs:h-9 sm:w-24 sm:h-10 md:w-28 md:h-11 lg:w-32 lg:h-12 flex items-center justify-center mb-6 sm:mb-8">
              <img 
                src="/images/logo.png" 
                alt="Gronik Logo"
                className="w-full h-full object-contain max-w-full max-h-full"
              />
            </div>
            <p className="text-gronik-light/80 mb-4 sm:mb-6 max-w-md text-base sm:text-lg leading-relaxed">
              Elysium Ebooks - Read more. Learn more. Achieve more. 
            </p>
            <p className="text-gronik-light/60 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              Transform your mind with our premium collection of digital books and unlock your potential.
            </p>
            <div className="flex flex-wrap gap-3 sm:space-x-4 sm:gap-0">
              <a href="#" className="bg-gronik-secondary/20 text-gronik-light border border-gronik-secondary/30 rounded-lg px-4 py-2 sm:p-3 text-sm sm:text-base font-medium footer-social-btn youtube-btn">YouTube</a>
              <a href="#" className="bg-gronik-secondary/20 text-gronik-light border border-gronik-secondary/30 rounded-lg px-4 py-2 sm:p-3 text-sm sm:text-base font-medium footer-social-btn instagram-btn">Instagram</a>
              <a href="#" className="bg-gronik-secondary/20 text-gronik-light border border-gronik-secondary/30 rounded-lg px-4 py-2 sm:p-3 text-sm sm:text-base font-medium footer-social-btn twitter-btn">Twitter</a>
            </div>
          </div>
          
          {/* Mobile: Quick Links and Connect With Us side by side */}
          <div className="col-span-1 grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-2 md:gap-8">
            <div>
              <h4 className="font-bold text-gronik-light mb-4 sm:mb-6 text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <button 
                    onClick={handleHomeClick} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/library')} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">Library</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleAboutClick} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">About</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')} 
                    className="text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out flex items-center space-x-2 group text-sm sm:text-base bg-transparent border-0 outline-none cursor-pointer w-full text-left p-0"
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-110"></span>
                    <span className="transition-all duration-300 ease-in-out">Contact</span>
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gronik-light mb-4 sm:mb-6 text-base sm:text-lg">Connect With Us</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3 text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out group cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gronik-secondary/20 group-hover:bg-gronik-accent/20 rounded-lg flex items-center justify-center border border-gronik-secondary/30 group-hover:border-gronik-accent/50 transition-all duration-300 ease-in-out transform group-hover:scale-105">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm transition-all duration-300 ease-in-out">Connect@elysium.online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gronik-light/70 hover:text-gronik-accent transition-all duration-300 ease-in-out group cursor-pointer">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gronik-secondary/20 group-hover:bg-gronik-accent/20 rounded-lg flex items-center justify-center border border-gronik-secondary/30 group-hover:border-gronik-accent/50 transition-all duration-300 ease-in-out transform group-hover:scale-105">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ease-in-out" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm transition-all duration-300 ease-in-out">On Telegram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gronik-secondary/20 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gronik-light/60 text-center md:text-left text-sm sm:text-base">
              &copy; 2024 Gronik. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gronik-light/60 text-sm sm:text-base">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current animate-pulse" />
              <span>for book lovers</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-social-btn {
          background: rgba(155, 123, 184, 0.12);
          color: #e0d7f7;
          border: 1.5px solid rgba(155, 123, 184, 0.3);
          border-radius: 0.5rem;
          padding: 0.5rem 1.25rem;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
          display: inline-block;
          margin-right: 0.5rem;
        }
        .footer-social-btn:last-child { 
          margin-right: 0; 
        }
        .footer-social-btn.youtube-btn:hover, 
        .footer-social-btn.youtube-btn:focus {
          color: #ff4d4f;
          transform: translateY(-2px);
        }
        .footer-social-btn.instagram-btn:hover, 
        .footer-social-btn.instagram-btn:focus {
          color: #e1306c;
          transform: translateY(-2px);
        }
        .footer-social-btn.twitter-btn:hover, 
        .footer-social-btn.twitter-btn:focus {
          color: #1da1f2;
          transform: translateY(-2px);
        }
        
        @media (max-width: 640px) {
          .footer-social-btn {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;