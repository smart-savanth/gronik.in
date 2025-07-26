import React, { useState, useEffect, useRef } from 'react';
import { User, Star, Quote, Plus, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([
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

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  const handleSubmitReview = () => {
    if (newReview.text && newReview.name) {
      const review = {
        id: reviews.length + 1,
        ...newReview
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, text: '', name: '' });
      setShowForm(false);
    }
  };

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-[#9B7BB8]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#2D1B3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 sm:w-40 sm:h-40 bg-[#3D2A54] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-60 sm:h-60 bg-[#2D1B3D] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#2D1B3D] px-4">
            What Our Readers Say
          </h2>
          <p className="text-sm sm:text-xl text-[#2D1B3D]/80 max-w-2xl mx-auto mb-6 sm:mb-8 font-medium px-4">
            Join thousands of satisfied readers who have transformed their reading experience
          </p>
          
          {/* Add Review Button */}
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 bg-[#2D1B3D] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#3D2A54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Your Review</span>
          </button>
        </div>

        {/* Continuous Scrolling Reviews Container */}
        <div className="relative overflow-hidden" style={{ height: '280px', paddingTop: '20px', paddingBottom: '20px' }}>
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-8 w-max"
            style={{
              animation: isPaused ? 'none' : 'scroll 80s linear infinite',
              transform: 'translateX(0)'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
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
                  "{review.text}"
                </p>

                <div className="flex justify-center mt-3">
                  <span className="text-xs sm:text-sm text-[#FFD700] font-semibold opacity-80 rounded-full px-2 py-0.5 bg-[#2D1B3D]/30" style={{fontFamily: 'cursive'}}>
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative max-h-[calc(100%-2rem)] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D1B3D] mb-4 sm:mb-6 pr-8">Share Your Experience</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all text-sm sm:text-base mb-2"
                  placeholder="Enter your name..."
                  maxLength={32}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="text-2xl transition-colors"
                    >
                      <Star 
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder="Share your experience with our platform..."
                />
              </div>
              
              <button
                onClick={handleSubmitReview}
                className="w-full bg-[#2D1B3D] text-white py-2 sm:py-3 rounded-lg hover:bg-[#3D2A54] transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Submit Review</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 640px) {
          .group:hover {
            transform: none !important;
            z-index: initial !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;