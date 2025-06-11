import React, { useState, useEffect, useRef } from 'react';
import { User, Star, Quote, Plus, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([
    { 
      id: 1,
      name: "Sarah Johnson", 
      rating: 5, 
      text: "Books are easy to get and the quality is amazing! The reading experience is seamless and the collection is vast.",
      avatar: "SJ",
      position: "Digital Marketing Specialist",
      date: "2 days ago"
    },
    { 
      id: 2,
      name: "Mike Chen", 
      rating: 5, 
      text: "Great collection and smooth reading experience. Love the variety and user interface. Perfect for daily reading.",
      avatar: "MC",
      position: "Software Developer",
      date: "1 week ago"
    },
    { 
      id: 3,
      name: "Emma Davis", 
      rating: 4, 
      text: "Love the variety of books available here. Perfect for my daily reading routine and the quality is top-notch.",
      avatar: "ED",
      position: "Content Writer",
      date: "2 weeks ago"
    },
    { 
      id: 4,
      name: "Alex Kumar", 
      rating: 5, 
      text: "Outstanding platform with incredible book selection. The reading experience is smooth and enjoyable.",
      avatar: "AK",
      position: "Student",
      date: "3 weeks ago"
    },
    { 
      id: 5,
      name: "Lisa Wang", 
      rating: 4, 
      text: "Fantastic digital library with great features. Love how easy it is to find and read books on any device.",
      avatar: "LW",
      position: "Teacher",
      date: "1 month ago"
    },
    { 
      id: 6,
      name: "David Smith", 
      rating: 5, 
      text: "Best e-book platform I've used! Great selection, amazing quality, and the interface is beautifully designed.",
      avatar: "DS",
      position: "Designer",
      date: "1 month ago"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({
    name: '',
    position: '',
    rating: 5,
    text: ''
  });

  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling && reviews.length > 3) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % (reviews.length - 2));
      }, 3000);
    }
    return () => clearInterval(autoScrollRef.current);
  }, [isAutoScrolling, reviews.length]);

  const handleSubmitReview = () => {
    if (newReview.name && newReview.text) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        avatar: newReview.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        date: 'Just now'
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: '', position: '', rating: 5, text: '' });
      setShowForm(false);
      setCurrentIndex(0);
      // Scroll to the new review
      setTimeout(() => {
        const element = document.getElementById(`review-${review.id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const nextReview = () => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => (prev + 1) % (reviews.length - 2));
  };

  const prevReview = () => {
    setIsAutoScrolling(false);
    setCurrentIndex(prev => prev === 0 ? reviews.length - 3 : prev - 1);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 relative overflow-hidden bg-[#9B7BB8]">
      {/* Background Pattern - Updated to match hero section */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2D1B3D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#3D2A54] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#2D1B3D] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#2D1B3D]">
            What Our Readers Say
          </h2>
          <p className="text-xl text-[#2D1B3D]/80 max-w-2xl mx-auto mb-8 font-medium">
            Join thousands of satisfied readers who have transformed their reading experience
          </p>
          
          {/* Add Review Button - Updated colors */}
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 bg-[#2D1B3D] text-white px-6 py-3 rounded-full hover:bg-[#3D2A54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your Review</span>
          </button>
        </div>

        {/* Reviews Container */}
        <div className="relative">
          {/* Navigation Buttons - Updated styling */}
          {reviews.length > 3 && (
            <>
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white border border-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-[#2D1B3D]" />
              </button>
              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white border border-white/20"
              >
                <ChevronRight className="w-6 h-6 text-[#2D1B3D]" />
              </button>
            </>
          )}

          {/* Reviews Grid - Updated card styling with middle card darker */}
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out"
          >
            {visibleReviews.map((review, index) => (
              <div 
                key={review.id}
                id={`review-${review.id}`}
                className={`${
                  index === 1 
                    ? 'bg-[#2D1B3D]/90 backdrop-blur-md border-[#3D2A54]/50 hover:bg-[#2D1B3D] shadow-2xl' 
                    : 'bg-[#2D1B3D]/60 backdrop-blur-md border-[#2D1B3D]/30 hover:bg-[#2D1B3D]/70 shadow-xl'
                } rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 relative group border hover:border-[#3D2A54]/70`}
                style={{ 
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Quote Icon */}
                <div className={`absolute top-4 right-4 transition-opacity duration-300 ${
                  index === 1 
                    ? 'opacity-40 group-hover:opacity-60 text-white' 
                    : 'opacity-30 group-hover:opacity-50 text-white/80'
                }`}>
                  <Quote className="w-8 h-8" />
                </div>
                
                {/* Avatar and User Info */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 ${
                    index === 1 
                      ? 'bg-[#3D2A54] border-white/30' 
                      : 'bg-[#2D1B3D] border-white/20'
                  }`}>
                    {review.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className={`font-bold text-lg ${
                      index === 1 ? 'text-white' : 'text-white/95'
                    }`}>{review.name}</h4>
                    <p className={`text-sm ${
                      index === 1 ? 'text-white/90' : 'text-white/80'
                    }`}>{review.position}</p>
                    <p className={`text-xs mt-1 ${
                      index === 1 ? 'text-white/70' : 'text-white/60'
                    }`}>{review.date}</p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-white/40'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Review Text */}
                <p className={`italic leading-relaxed text-base ${
                  index === 1 ? 'text-white/95' : 'text-white/90'
                }`}>
                  "{review.text}"
                </p>
                
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                  index === 1 
                    ? 'bg-gradient-to-r from-[#3D2A54]/30 to-[#2D1B3D]/30' 
                    : 'bg-gradient-to-r from-[#2D1B3D]/20 to-[#3D2A54]/20'
                }`}></div>
              </div>
            ))}
          </div>

          {/* Auto-scroll Indicator - Updated colors */}
          {reviews.length > 3 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: reviews.length - 2 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoScrolling(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#2D1B3D] w-8' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal - Updated styling */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-[#2D1B3D] mb-6">Share Your Experience</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Position/Title</label>
                <input
                  type="text"
                  value={newReview.position}
                  onChange={(e) => setNewReview({...newReview, position: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all"
                  placeholder="Your position or title"
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
                        className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all resize-none"
                  placeholder="Share your experience with our platform..."
                />
              </div>
              
              <button
                onClick={handleSubmitReview}
                className="w-full bg-[#2D1B3D] text-white py-3 rounded-lg hover:bg-[#3D2A54] transition-all duration-300 font-medium flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;