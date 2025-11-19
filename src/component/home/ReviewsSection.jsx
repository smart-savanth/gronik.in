import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Star, Quote, Plus, X, Send } from "lucide-react";
import { saveReview, getAllReviews } from "../../utils/reviewservice";

const FALLBACK_REVIEWS = [
  { id: "fallback-1", rating: 5, review: "Hands down the most immersive reading experience I have ever had online. The curation is on point!", name: "Sahana Devi" },
  { id: "fallback-2", rating: 4, review: "The library loads instantly and purchasing was seamless. Looking forward to more regional titles.", name: "Rahul N." },
  { id: "fallback-3", rating: 5, review: "I moved all my study material to Gronik. The annotations and downloads make learning super easy.", name: "Aanya P." },
];

const ReviewsSection = () => {
  const user = useSelector((state) => state.userAuth?.user);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: "", name: "" });

  const scrollRef = useRef(null);
  const transformRef = useRef(0);
  const rafRef = useRef(null);
  const lastTSRef = useRef(0);

  // drag + momentum refs
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastDeltaRef = useRef(0);

  // show fallback when real reviews empty so the loop always has nodes
  const sourceReviews = (reviews && reviews.length) ? reviews : FALLBACK_REVIEWS;
  const duplicatedReviews = [...sourceReviews, ...sourceReviews, ...sourceReviews];
  const hasReviews = sourceReviews.length > 0;

  // fetch
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      setNotice(null);
      try {
        const params = { page: 1, pageSize: 100 };
        const res = await getAllReviews(params);
        const list = res?.data?.data?.list || res?.data?.data || [];
        const normalized = (list || []).map((r) => ({
          id: r._id || r.id || r.guid || `${r.user_id}-${r.created_at}`,
          rating: Number(r.rating) || 5,
          review: r.review || r.text || "",
          name: r.user_name || r.name || r.full_name || "Anonymous",
        }));
        setReviews(normalized);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        const status = err?.response?.status;
        if (status === 503) {
          setNotice("Live reviews are temporarily unavailable. Showing a few community highlights meanwhile.");
          // keep reviews empty -> fallback will be used
        } else {
          setError("Unable to load reviews right now. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // measure and center in the middle copy when reviews (or fallback) are present
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !hasReviews) return;

    // Allow layout to settle then compute
    requestAnimationFrame(() => {
      const totalWidth = container.scrollWidth; // width of 3 copies
      const chunk = totalWidth / 3 || 0;
      // set transform so we're looking at the middle copy
      transformRef.current = -chunk;
      container.style.transform = `translateX(${transformRef.current}px)`;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceReviews.length]);

  // animation loop (continuous leftward movement)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !hasReviews) return;

    const speedPxPerSecond = 36; // tune this for pacing
    lastTSRef.current = 0;

    const tick = (ts) => {
      if (!lastTSRef.current) lastTSRef.current = ts;
      const dt = ts - lastTSRef.current;
      lastTSRef.current = ts;

      if (!isPaused && !draggingRef.current) {
        // move left
        transformRef.current -= (dt / 1000) * speedPxPerSecond;

        // loop correction using 3-copy math
        const totalWidth = container.scrollWidth;
        const chunk = totalWidth / 3 || 0;

        // if we've moved into the 3rd copy leftwards, shift back into middle copy seamlessly
        if (transformRef.current <= -(chunk * 1)) {
          transformRef.current += chunk;
        } else if (transformRef.current >= 0) {
          // if moved too far right, bring into middle
          transformRef.current -= chunk;
        }

        container.style.transform = `translateX(${transformRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTSRef.current = 0;
    };
  }, [isPaused, hasReviews]);

  // pointer / touch handlers (drag + momentum)
  const onPointerDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    draggingRef.current = true;
    lastXRef.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    lastDeltaRef.current = 0;
    setIsPaused(true);

    // prevent native drag
    if (e.pointerId && container.setPointerCapture) {
      try { container.setPointerCapture(e.pointerId); } catch (_) {}
    }
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;

    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? lastXRef.current;
    const delta = clientX - lastXRef.current;

    // pointer right => content moves right (increase translateX)
    transformRef.current += delta;
    lastXRef.current = clientX;
    lastDeltaRef.current = delta;

    // boundary loop correction (3-copy math)
    const totalWidth = container.scrollWidth;
    const chunk = totalWidth / 3 || 0;
    if (transformRef.current <= -(chunk * 1)) {
      transformRef.current += chunk;
    } else if (transformRef.current >= 0) {
      transformRef.current -= chunk;
    }

    container.style.transform = `translateX(${transformRef.current}px)`;
  };

  const onPointerUp = (e) => {
    const container = scrollRef.current;
    if (!container) {
      setIsPaused(false);
      draggingRef.current = false;
      return;
    }

    // release pointer capture if applied
    if (e?.pointerId && container.releasePointerCapture) {
      try { container.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    if (!draggingRef.current) {
      setIsPaused(false);
      return;
    }

    draggingRef.current = false;

    // momentum based on lastDeltaRef
    let velocity = lastDeltaRef.current * 35; // multiplier to taste
    const friction = 0.92;

    const step = () => {
      if (Math.abs(velocity) < 0.5) {
        setIsPaused(false);
        return;
      }

      transformRef.current += velocity;
      velocity *= friction;

      // loop correction (3-copy math)
      const totalWidth = container.scrollWidth;
      const chunk = totalWidth / 3 || 0;
      if (transformRef.current <= -(chunk * 2)) transformRef.current += chunk;
      else if (transformRef.current >= 0) transformRef.current -= chunk;

      container.style.transform = `translateX(${transformRef.current}px)`;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // convenience wrappers for touch (older browsers)
  const handleTouchStart = (e) => onPointerDown(e);
  const handleTouchMove = (e) => onPointerMove(e);
  const handleTouchEnd = (e) => onPointerUp({ pointerId: 1 });

  // submit review (unchanged)
  const handleSubmitReview = async () => {
    if (!newReview.text.trim()) return;
    if (!user?.guid) {
      alert("Please log in to submit a review.");
      return;
    }

    try {
      const payload = { type: "site", product: null, user_id: user.guid, rating: newReview.rating, review: newReview.text.trim() };
      const res = await saveReview(payload);
      const saved = res?.data?.data;
      if (saved) {
        const formatted = {
          id: saved._id || saved.id || saved.guid || Date.now().toString(),
          rating: Number(saved.rating) || newReview.rating,
          review: saved.review || newReview.text,
          name: saved.user_name || saved.name || saved.full_name || user?.full_name || "You",
        };
        setReviews((prev) => [formatted, ...prev]);
      }
      setShowForm(false);
      setNewReview({ rating: 5, text: "", name: "" });
    } catch (err) {
      console.log("Error saving review:", err);
      alert("Something went wrong while submitting your review. Please try again.");
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

      <div className="max-w-7xl mx-auto  relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#2D1B3D] px-2 sm:px-4">
            What Our Readers Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#2D1B3D]/80 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto mb-3 sm:mb-4 md:mb-6 font-medium px-2 sm:px-4 leading-relaxed">
            Join thousands of satisfied readers who have transformed their reading experience
          </p>
          {notice && (
            <div className="bg-white/70 border border-white rounded-full px-4 py-2 text-sm text-[#2D1B3D] font-medium inline-flex items-center justify-center shadow-md">
              {notice}
            </div>
          )}
          
          {/* Add Review Button */}
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center space-x-2 bg-[#2D1B3D] text-white px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full hover:bg-[#3D2A54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-semibold text-xs sm:text-sm md:text-base lg:text-lg"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" />
            <span>Add Your Review</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-[#2D1B3D]/20 border-t-[#2D1B3D] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center bg-white/30 border border-white/60 rounded-2xl py-8 px-6 text-[#2D1B3D] font-medium">
            {error}
          </div>
        ) : !hasReviews ? (
          <div className="text-center bg-white/40 border border-white/70 rounded-2xl py-8 px-6 text-[#2D1B3D]">
            <p className="text-lg font-semibold mb-2">Be the first to share your experience!</p>
            <p className="text-sm mb-4">Your review helps other readers discover Gronik.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 bg-[#2D1B3D] text-white px-4 py-2 rounded-full hover:bg-[#3D2A54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-semibold text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your Review</span>
            </button>
          </div>
        ) : (
          <div 
            className="relative overflow-hidden touch-pan-y" 
            style={{ height: '280px', paddingTop: '20px', paddingBottom: '20px' }}
          >
            <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-8 w-max"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          willChange: "transform",
          userSelect: "none",
          WebkitUserSelect: "none",
          cursor: draggingRef.current ? "grabbing" : "grab",
        }}
      >

              {duplicatedReviews.map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-4 sm:p-8 transition-all duration-300 relative group border w-64 sm:w-80 flex-shrink-0"
                >
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-30 group-hover:opacity-50 text-white/80 transition-opacity duration-300">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  
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
        )}
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
