import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Star, Quote, Plus, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';

// Redux actions (add these to your reviews slice)
const addReview = (review) => ({
  type: 'reviews/addReview',
  payload: review
});

const setReviews = (reviews) => ({
  type: 'reviews/setReviews',
  payload: reviews
});

const ReviewsSection = () => {
  // Redux state
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews?.items || [
    { 
      id: 1,
      rating: 5, 
      text: "Books are easy to get and the quality is amazing! The reading experience is seamless and the collection is vast.",
      name: "Aarav Sharma"
    },
    { 
      id: 2,
      rating: 5, 
      text: "Great collection and smooth reading experience. Love the variety and user interface. Perfect for daily reading.",
      name: "Priya Patel"
    },
    { 
      id: 3,
      rating: 4, 
      text: "Love the variety of books available here. Perfect for my daily reading routine and the quality is top-notch.",
      name: "Rahul Verma"
    },
    { 
      id: 4,
      rating: 5, 
      text: "Outstanding platform with incredible book selection. The reading experience is smooth and enjoyable.",
      name: "Sneha Reddy"
    },
    { 
      id: 5,
      rating: 4, 
      text: "Fantastic digital library with great features. Love how easy it is to find and read books on any device.",
      name: "Vikram Singh"
    },
    { 
      id: 6,
      rating: 5, 
      text: "Best e-book platform I've used! Great selection, amazing quality, and the interface is beautifully designed.",
      name: "Ananya Iyer"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: '',
    name: ''
  });

  const scrollContainerRef = useRef(null);
  const currentTransformRef = useRef(0);
  
  // Touch/Swipe state
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastTouchXRef = useRef(0);
  const velocityRef = useRef(0);

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  // Smooth animation control
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId;
    const speed = 1; // pixels per interval

    if (!isPaused && !isDraggingRef.current) {
      intervalId = setInterval(() => {
        currentTransformRef.current -= speed;
        
        // Reset position when we've scrolled through one full set
        const resetPoint = -(container.scrollWidth / 3);
        if (currentTransformRef.current <= resetPoint) {
          currentTransformRef.current = 0;
        }
        
        container.style.transform = `translateX(${currentTransformRef.current}px)`;
      }, 16); // ~60fps
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused]);

  // Mouse handlers (desktop)
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Touch handlers (mobile)
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    touchStartRef.current = e.touches[0].clientX;
    lastTouchXRef.current = e.touches[0].clientX;
    velocityRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentTouch = e.touches[0].clientX;
    const diff = currentTouch - lastTouchXRef.current;
    
    // Calculate velocity for momentum
    velocityRef.current = diff;
    
    // Update position
    currentTransformRef.current += diff;
    
    // Handle infinite loop boundaries
    const resetPoint = -(container.scrollWidth / 3);
    const maxPoint = 0;
    
    if (currentTransformRef.current <= resetPoint) {
      currentTransformRef.current = 0;
    } else if (currentTransformRef.current >= maxPoint) {
      currentTransformRef.current = resetPoint + 50; // Small offset to prevent jarring
    }
    
    container.style.transform = `translateX(${currentTransformRef.current}px)`;
    lastTouchXRef.current = currentTouch;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    
    // Apply momentum/inertia effect
    const container = scrollContainerRef.current;
    if (!container || Math.abs(velocityRef.current) < 2) {
      setIsPaused(false);
      return;
    }

    let momentum = velocityRef.current * 10; // Amplify for smooth deceleration
    const deceleration = 0.95; // Friction factor

    const applyMomentum = () => {
      if (Math.abs(momentum) < 0.5) {
        setIsPaused(false);
        return;
      }

      currentTransformRef.current += momentum;
      momentum *= deceleration;

      // Handle boundaries during momentum
      const resetPoint = -(container.scrollWidth / 3);
      if (currentTransformRef.current <= resetPoint) {
        currentTransformRef.current = 0;
      } else if (currentTransformRef.current >= 0) {
        currentTransformRef.current = resetPoint;
      }

      container.style.transform = `translateX(${currentTransformRef.current}px)`;
      requestAnimationFrame(applyMomentum);
    };

    requestAnimationFrame(applyMomentum);
  };

  const handleSubmitReview = () => {
    if (newReview.text) {
      const review = {
        id: Date.now(),
        ...newReview,
        name: "Anonymous",
        timestamp: new Date().toISOString()
      };
      dispatch(addReview(review));
      setNewReview({ rating: 5, text: '', name: '' });
      setShowForm(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden bg-[#9B7BB8]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 bg-[#2D1B3D] rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-12 right-12 sm:bottom-20 sm:right-20 w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 bg-[#3D2A54] rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-60 md:h-60 bg-[#2D1B3D] rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#2D1B3D] px-2 sm:px-4">
            What Our Readers Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#2D1B3D]/80 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-6 font-medium px-2 sm:px-4 leading-relaxed">
            Join thousands of satisfied readers who have transformed their reading experience
          </p>
          
          {/* Add Review Button */}
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 bg-[#2D1B3D] text-white px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full hover:bg-[#3D2A54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-semibold text-xs sm:text-sm md:text-base lg:text-lg"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" />
            <span>Add Your Review</span>
          </button>
        </div>

        {/* Continuous Scrolling Reviews Container */}
        <div 
          className="relative overflow-hidden touch-pan-y" 
          style={{ height: '280px', paddingTop: '20px', paddingBottom: '20px' }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-8 w-max transition-all duration-500 ease-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: 'translateX(0px)',
              willChange: 'transform',
              cursor: isDraggingRef.current ? 'grabbing' : 'grab'
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <div 
                key={`${review.id}-${index}`}
                className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-4 sm:p-8 transition-all duration-300 relative group border w-64 sm:w-80 flex-shrink-0"
              >
                {/* Quote Icon */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-30 group-hover:opacity-50 text-white/80 transition-opacity duration-300">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                
                {/* Rating */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 sm:w-6 sm:h-6 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-white/40'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                {/* Review Text */}
                <p className="italic leading-relaxed text-sm sm:text-base text-white/90 text-center">
                  "{review.review || review.text}"
                </p>

                <div className="flex justify-center mt-3">
                  <span className="text-xs sm:text-sm text-[#FFD700] font-semibold opacity-80 rounded-full px-2 py-0.5 bg-[#2D1B3D]/30" style={{fontFamily: 'cursive'}}>
                    {review.name || review.user_name || "Anonymous"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl relative max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-2rem)] overflow-y-auto w-full max-w-sm sm:max-w-md lg:max-w-lg mx-2 sm:mx-4
            p-4 sm:p-6 lg:p-8">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
            
            <h3 className="font-bold text-[#2D1B3D] mb-4 sm:mb-6 pr-8
              text-lg sm:text-xl lg:text-2xl">
              Share Your Experience
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Rating</label>
                <div className="flex space-x-1 sm:space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <Star 
                        className={`transition-colors duration-200
                          w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8
                          ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Your Review</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all duration-300 resize-none
                    px-3 py-2 text-sm
                    sm:px-4 sm:py-3 sm:text-base
                    lg:px-4 lg:py-3 lg:text-base"
                  placeholder="Share your experience with our platform..."
                  maxLength={200}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {newReview.text.length}/200
                </div>
              </div>
              
              <button
                onClick={handleSubmitReview}
                disabled={!newReview.text.trim()}
                className="w-full bg-[#2D1B3D] text-white rounded-lg hover:bg-[#3D2A54] transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95
                  py-2 text-sm
                  sm:py-3 sm:text-base
                  lg:py-4 lg:text-lg"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Submit Review</span>
              </button>
            </div>
          </div>
        </div> 
      )}

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Smooth scrolling for all devices */
        @media (max-width: 640px) {
          .group:hover {
            transform: scale(1.02) translateY(-4px) !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .group:hover {
            transform: scale(1.03) translateY(-6px) !important;
          }
        }
        
        @media (min-width: 1025px) {
          .group:hover {
            transform: scale(1.05) translateY(-8px) !important;
          }
        }
        
        /* Performance optimizations */
        .group {
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        /* Touch-friendly cursor */
        .touch-pan-y {
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(45, 27, 61, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(45, 27, 61, 0.3);
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 27, 61, 0.5);
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;