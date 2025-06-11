import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className=" bg-[#2D1B3D] backdrop-blur-md border-t border-gronik-secondary/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gronik-accent to-gronik-secondary rounded-lg flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-gronik-accent to-white bg-clip-text text-transparent">
                Gronik
              </span>
            </div>
            <p className="text-gronik-light/80 mb-6 max-w-md text-lg leading-relaxed">
              Elysium Ebooks - Read more. Learn more. Achieve more. 
            </p>
            <p className="text-gronik-light/60 mb-6 max-w-md">
              Transform your mind with our premium collection of digital books and unlock your potential.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gronik-secondary/20 hover:bg-gronik-accent/20 text-gronik-light hover:text-gronik-accent transition-all duration-200 p-3 rounded-lg border border-gronik-secondary/30 hover:border-gronik-accent/50">
                YouTube
              </a>
              <a href="#" className="bg-gronik-secondary/20 hover:bg-gronik-accent/20 text-gronik-light hover:text-gronik-accent transition-all duration-200 p-3 rounded-lg border border-gronik-secondary/30 hover:border-gronik-accent/50">
                Instagram
              </a>
              <a href="#" className="bg-gronik-secondary/20 hover:bg-gronik-accent/20 text-gronik-light hover:text-gronik-accent transition-all duration-200 p-3 rounded-lg border border-gronik-secondary/30 hover:border-gronik-accent/50">
                Twitter
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gronik-light mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200 flex items-center space-x-2 group">
                <span className="w-2 h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>Home</span>
              </a></li>
              <li><a href="#" className="text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200 flex items-center space-x-2 group">
                <span className="w-2 h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>Library</span>
              </a></li>
              <li><a href="#" className="text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200 flex items-center space-x-2 group">
                <span className="w-2 h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>About</span>
              </a></li>
              <li><a href="#" className="text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200 flex items-center space-x-2 group">
                <span className="w-2 h-2 bg-gronik-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span>Contact</span>
              </a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gronik-light mb-6 text-lg">Connect With Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200 group">
                <div className="w-10 h-10 bg-gronik-secondary/20 group-hover:bg-gronik-accent/20 rounded-lg flex items-center justify-center border border-gronik-secondary/30 group-hover:border-gronik-accent/50 transition-all duration-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">Connect@elysium.online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200 group">
                <div className="w-10 h-10 bg-gronik-secondary/20 group-hover:bg-gronik-accent/20 rounded-lg flex items-center justify-center border border-gronik-secondary/30 group-hover:border-gronik-accent/50 transition-all duration-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">On Telegram</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gronik-secondary/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gronik-light/60 text-center md:text-left mb-4 md:mb-0">
              &copy; 2024 Gronik. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gronik-light/60">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>for book lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;