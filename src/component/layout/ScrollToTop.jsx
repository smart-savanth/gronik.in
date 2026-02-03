import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Immediate scroll to top (instant, no animation)
    window.scrollTo(0, 0);
    
    // Force document body scroll reset (handles edge cases)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Additional timeout to ensure page renders first, then scroll
    const timeoutId = setTimeout(() => {
      // Check if there's a hash in URL (like #section-id)
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // If hash element exists, scroll to it smoothly
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          return;
        }
      }
      
      // Otherwise, ensure we're at absolute top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Instant scroll, no animation
      });
      
      // Double-check for stubborn scroll positions
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50); // Small delay to let React render

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
    
  }, [pathname, search, hash]); // Trigger on any URL change

  // Additional effect to handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      // Force scroll to top when using browser navigation
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle initial page load
  useEffect(() => {
    // On component mount, ensure we start at top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return null;
}