import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  Check,
  ExternalLink,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useGetAllBooksQuery } from "../../utils/booksService";
import { useSelector } from "react-redux";

/**
 * Sub-component: BookCard
 * Replicates the exact styling, size, and animations from LibraryPage
 */

/**
 * Sub-component: BookCard
 * Replicates the exact styling, size, and animations from LibraryPage
 * * CHANGE: Adjusted lg:w-48 lg:h-64 to lg:w-32 lg:h-44 for smaller card size
 */

/**
 * Main Component: FeaturedBooksSection
 */


const FeaturedBooksSection = ({
  cart = [],
  wishlist = [],
  onAddToCart,
  onRemoveFromCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const navigate = useNavigate();
  const [hoveredBook, setHoveredBook] = useState(null);
  const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

  // Animation States
  const [cartButtonClicked, setCartButtonClicked] = useState({});
  const [wishlistButtonClicked, setWishlistButtonClicked] = useState({});
  const [animatingCart, setAnimatingCart] = useState({});
  const [animatingWishlist, setAnimatingWishlist] = useState({});
  const [activeCartId, setActiveCartId] = useState(null);
  const { user } = useSelector((state) => state.userAuth);

  // Fetch Data
  const { data: booksResponse, isLoading } = useGetAllBooksQuery(
    user?.guid
      ? { page: 1, pageSize: 1000, user_id: user.guid }
      : { page: 1, pageSize: 1000 },
  );

  // Filter only Featured books
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const featuredBooks = useMemo(() => {
    return (
      booksResponse?.data
        ?.filter((book) => book.featured)
        ?.map((book) => {
          // IMAGE URL FIX
          const imagePath = book.coverImageUrl || book.image;

          const fullImageUrl = imagePath
            ? imagePath.startsWith("http")
              ? imagePath
              : `${BASE_URL}/${imagePath}`
            : "https://via.placeholder.com/300x400?text=No+Image";

          return {
            id: book._id||book.id,
           
            inStock: book.inStock ?? true,

            title: book.title,
            author: book.author,
            category: book.category,

            price: Number(book.final_price),
            originalPrice: Number(book.original_price),

            final_price: book.final_price,
            original_price: book.original_price,

            rating: book.rating || 4.5,
            isPurchased: Boolean(book.isPurchased),
            image: fullImageUrl,
            coverImageUrl: fullImageUrl,

            description: book.description,
            featured: book.featured,

            discount:
              book.discount ||
              (book.original_price > book.final_price
                ? `${Math.round(
                    ((book.original_price - book.final_price) /
                      book.original_price) *
                      100,
                  )}% OFF`
                : null),
          };
        }) || []
    );
  }, [booksResponse?.data]);

  console.log("FEATURED BOOKS:", featuredBooks);
  // Helpers
  const isInCart = (book) =>
    cart.some((item) => item.id === book.id);

  const isInWishlist = (book) =>
    wishlist.some((item) => item.id === book.id);

  // --- Handlers (Replicating LibraryPage / Suggested Logic) ---
  const handleCartAction = (e, book) => {
    e.stopPropagation();
    e.preventDefault();

    if (animatingCart[book.id]) return;

    const inCart = isInCart(book);

    if (inCart) {
      navigate("/cart");
      return;
    }

    setAnimatingCart((prev) => ({ ...prev, [book.id]: true }));
    setCartButtonClicked((prev) => ({
      ...prev,
      [book.id]: true,
    }));

    setTimeout(() => {
      onAddToCart && onAddToCart(book);
      setAnimatingCart((prev) => ({ ...prev, [book.id]: false }));
      setCartButtonClicked((prev) => ({
        ...prev,
        [book.id]: false,
      }));
    }, 1200);
  };

  const handleToggleWishlist = useCallback(
    (e, book) => {
      e.stopPropagation();
      if (animatingWishlist[book.id]) return;

      setAnimatingWishlist((prev) => ({ ...prev, [book.id]: true }));
      setWishlistButtonClicked((prev) => ({ ...prev, [book.id]: true }));

      setTimeout(() => {
        if (isInWishlist(book)) {
          onRemoveFromWishlist && onRemoveFromWishlist(book.id);
        } else {
          onAddToWishlist && onAddToWishlist(book);
        }
        setAnimatingWishlist((prev) => ({ ...prev, [book.id]: false }));
        setWishlistButtonClicked((prev) => ({ ...prev, [book.id]: false }));
      }, 250);
    },
    [animatingWishlist, isInWishlist, onAddToWishlist, onRemoveFromWishlist],
  );

  const handleCardClick = (book) => {
    navigate(`/product/${book.id}`, { state: { from: "featured" } });
  };

  return (
    <section id="featured-books" className="py-20 relative">
      {/* Background - kept consistent with Featured vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9B7BB8] via-[#8A6BA3] to-[#2D1B3D]" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#9B7BB8]/20 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 border border-white/20">
            <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-[#2D1B3D] mr-1 sm:mr-2" />
            <span className="text-[#2D1B3D] font-medium text-xs sm:text-base">
              Featured Collection
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#2D1B3D] mb-6 sm:mb-8 leading-tight">
            Premium E-Books
          </h2>
        </div>

        {/* Grid - Using the alignment from the previous FeaturedBooks request */}
        <div className="flex justify-center mb-16">
          <div
            className="
   grid 
      grid-cols-2        
      sm:grid-cols-2     
      lg:grid-cols-3     
      gap-6        

      w-full            /* <-- FORCE FULL WIDTH */
      max-w-4xl         /* <-- NICE RESPONSIVE WIDTH */
      mx-2           /* <-- CENTER THE GRID */

      place-items-stretch  /* <-- FIX NARROW CARDS */
  "
          >
       {featuredBooks.map((book, index) => {
  const isInCartLocal = isInCart(book);
  const isInWishlistLocal = isInWishlist(book);
  const cartClicked = cartButtonClicked[book.id];
  const animCart = animatingCart[book.id];

  return (
    <div
      key={book.id}
      className="group relative cursor-pointer suggested-card"
      onMouseEnter={() => {
        if (!isMobile) setHoveredBook(book.id);
      }}
      onMouseLeave={() => {
        if (!isMobile) setHoveredBook(null);
      }}
      onTouchStart={() => {
        setHoveredBook(null);
      }}
      onClick={() =>
        navigate(`/product/${book.id}`, {
          state: { from: "featured" },
        })
      }
      style={{
        animationDelay: `${index * 100}ms`,
        width: "100%",
        height: isMobile ? "360px" : "auto",
      }}
    >
      <div
         className={`
          bg-[#1A0F2E]/80 backdrop-blur-md 
          rounded-xl lg:rounded-3xl border border-white/10 
          transition-all duration-500 transform 
          hover:scale-105 hover:-translate-y-2 shadow-2xl 
          p-3 sm:p-4 lg:p-6 flex flex-col card-hover-gold mb-4
          ${!isMobile && hoveredBook === book.id ? "gold-glow" : ""}
        `}
      >
        {/* Category Badge */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 whitespace-nowrap">
            {book.category}
          </div>
        </div>

        {/* IMAGE */}
        <div className="mb-2 sm:mb-3 lg:mb-4 flex justify-center mt-4">
          <div
            className="
              relative
              w-20 h-28
              sm:w-24 sm:h-32
              lg:w-48 lg:h-64
              rounded-lg lg:rounded-xl
              overflow-hidden
              shadow-2xl
              bg-black
              isolate
            "
          >
            <img
              src={book.image}
              alt={book.title}
              loading="lazy"
              draggable="false"
              className="
                absolute inset-0
                w-full h-full
                object-cover
                scale-[1.03]
              "
            />
          </div>
        </div>

        {/* TITLE + AUTHOR */}
        <div className="text-center flex-1 flex flex-col justify-between">
          <div className="mb-2">
            <h3
              className="
              font-bold text-white group-hover:text-white/90 
              transition-colors duration-300 leading-tight 
              text-xs sm:text-sm lg:text-lg line-clamp-2 
              min-h-[2.5rem] sm:min-h-[2.5rem] lg:min-h-[3.5rem] 
              flex items-center justify-center
            "
            >
              {book.title}
            </h3>

            <p className="text-white/70 font-medium text-[10px] sm:text-xs lg:text-sm">
              by {book.author}
            </p>
          </div>

          {/* RATING */}
          <div className="mb-2">
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 lg:w-4 lg:h-4 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-white/30"
                  }`}
                />
              ))}
              <span className="text-white/80 text-xs sm:text-sm font-medium ml-1">
                {book.rating}
              </span>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-center mb-1">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-sm sm:text-base lg:text-xl font-bold text-white">
                ₹{book.price}
              </span>
              <span className="text-xs sm:text-sm lg:text-sm text-white/50 line-through">
                ₹{book.originalPrice}
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-row gap-2 w-full mb-2 min-h-[44px]">
            {book.isPurchased ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate("/my-library");
                  }}
                  className="flex-1 py-2 rounded-xl font-semibold text-xs sm:text-sm 
                  bg-gradient-to-r from-purple-500 to-purple-600 
                  text-white shadow-xl hover:scale-105 transition-all"
                >
                  View in Library
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/product/${book.id}`);
                  }}
                  className="p-2 rounded-xl bg-[#9B7BB8] text-[#2D1B3D] 
                  hover:scale-105 transition-all shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => handleCartAction(e, book)}
                  disabled={animCart}
                  className={`
                    cart-button-animated ${cartClicked ? "clicked" : ""}
                    flex-1 py-2 rounded-xl font-semibold text-xs sm:text-sm 
                    flex items-center justify-center gap-2 
                    transition-all duration-300 hover:scale-105 shadow-xl
                    ${
                      isInCartLocal
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                        : "bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D]"
                    }
                  `}
                >
                  <ShoppingCart className="cart-icon w-4 h-4" />
                  <div className="box-icon w-2 h-2 bg-current rounded-sm"></div>

                  <span className="cart-text">
                    {isInCartLocal ? "Go to Cart" : "Add to Cart"}
                  </span>

                  <span className="added-text">
                    <Check className="w-4 h-4 inline mr-1" /> Added!
                  </span>
                </button>

                <button
                  onClick={(e) => handleToggleWishlist(e, book)}
                  className={`
                    p-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg
                    ${
                      isInWishlistLocal
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : "bg-[#9B7BB8] text-[#2D1B3D]"
                    }
                  `}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlistLocal ? "fill-current" : ""
                    }`}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
})}
          </div>
        </div>

        {/* View All Button */}
        {featuredBooks.length > 0 && (
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <button
              onClick={() => navigate("/library")}
              className="group inline-flex items-center justify-center bg-[#2D1B3D]/90 backdrop-blur-md hover:bg-[#2D1B3D] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl font-semibold transition-transform duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-white/20 hover:border-white/40 w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-lg">View All Books</span>
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {featuredBooks.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-8 border border-[#3D2A54]/50 max-w-md mx-auto shadow-xl">
              <BookOpen className="w-16 h-16 text-white/60 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No Featured Books
              </h3>
              <p className="text-white/80 mb-6">
                Check back later for our premium selection.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Copying the EXACT styles from LibraryPage */}
      <style jsx>{`
        .card-hover-gold:hover,
        .card-hover-gold.gold-glow {
          box-shadow:
            0 0 0 2px #ffe9b3,
            0 4px 24px 0 #ffe9b3cc,
            0 1.5px 8px 0 #fff7c1;
        }
        @media (hover: none) and (pointer: coarse) {
          .card-hover-gold:active {
            box-shadow:
              0 0 0 2px #ffe9b3,
              0 4px 24px 0 #ffe9b3cc,
              0 1.5px 8px 0 #fff7c1;
          }
        }
        .cart-button-animated {
          position: relative;
          overflow: hidden;
        }
        .cart-button-animated .cart-icon {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: -10%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        .cart-button-animated .box-icon {
          position: absolute;
          z-index: 3;
          top: -20%;
          left: 52%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }
        .cart-button-animated .cart-text {
          position: relative;
          z-index: 3;
          transition: opacity 0.3s ease;
        }
        .cart-button-animated .added-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 3;
          opacity: 0;
        }
        .cart-button-animated.clicked .cart-icon {
          animation: cartAnimation 1.5s ease-in-out forwards;
        }
        .cart-button-animated.clicked .box-icon {
          animation: boxAnimation 1.5s ease-in-out forwards;
        }
        .cart-button-animated.clicked .cart-text {
          animation: textOut 1.5s ease-in-out forwards;
        }
        .cart-button-animated.clicked .added-text {
          animation: textIn 1.5s ease-in-out forwards;
        }
        @keyframes cartAnimation {
          0% {
            left: -10%;
            opacity: 1;
          }
          40%,
          60% {
            left: 50%;
            opacity: 1;
          }
          100% {
            left: 110%;
            opacity: 0;
          }
        }
        @keyframes boxAnimation {
          0%,
          40% {
            top: -20%;
            opacity: 1;
          }
          60% {
            top: 40%;
            left: 52%;
            opacity: 1;
          }
          100% {
            top: 40%;
            left: 112%;
            opacity: 0;
          }
        }
        @keyframes textOut {
          0% {
            opacity: 1;
          }
          20%,
          100% {
            opacity: 0;
          }
        }
        @keyframes textIn {
          0%,
          80% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .wishlist-button-animated {
          position: relative;
        }
        .wishlist-button-animated .heart-static {
          transition: transform 0.2s ease;
        }
        .wishlist-button-animated.clicked {
          animation: pop 0.3s ease-out;
        }
        .wishlist-button-animated.clicked .heart-static {
          transform: scale(1.2);
        }
        @keyframes pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedBooksSection;
