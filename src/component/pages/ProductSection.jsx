import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, ShoppingCart, Heart, Star, Eye, Users, Check, BookOpen, ChevronDown, Quote, Plus, X, Send, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetBookByIdQuery, useGetAllBooksQuery } from '../../utils/productServices';
import ProductReviews from '../layout/ProductReviews';


// Dummy suggested books (fallback)



const ProductSection = ({ cart = [], wishlist = [], onAddToCart, onRemoveFromCart, onAddToWishlist, onRemoveFromWishlist }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [cartButtonClicked, setCartButtonClicked] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [wishlistButtonClicked, setWishlistButtonClicked] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const reviewsSectionRef = useRef(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', name: '' });
  const [imageErrors, setImageErrors] = useState({});
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // Suggested books state
  const [suggestedCartClicked, setSuggestedCartClicked] = useState({});
  const [suggestedWishlistClicked, setSuggestedWishlistClicked] = useState({});
  const [animatingSuggestedCart, setAnimatingSuggestedCart] = useState({});
  const [animatingSuggestedWishlist, setAnimatingSuggestedWishlist] = useState({});
  const [hoveredSuggested, setHoveredSuggested] = useState(null);

 
  
  const scrollContainerRef = useRef(null);
  const currentTransformRef = useRef(0);

  const normalizeProduct = (raw = {}, fallbackId = null) => {
  if (!raw || typeof raw !== "object") return null;

  // -----------------------------
  // Helpers
  // -----------------------------
  const ensureArray = (val) => Array.isArray(val) ? val : [];






  const safeText = (v, def) => (v && typeof v === "string" ? v : def);

  const safeNumber = (v, def = 0) => {
    const num = Number(v);
    return Number.isFinite(num) ? num : def;
  };

  // -----------------------------
  // Extract Base Fields
  // -----------------------------
  const id =
    raw._id ||
    raw.id ||
    raw.productId ||
    raw.product_id ||
    fallbackId ||
    "unknown-product";

  const title = safeText(raw.title || raw.book_name, "Untitled Book");
  const author = safeText(raw.author || raw.author_name, "Unknown Author");

  const image =
    raw.coverImageUrl ||
    raw.image ||
    "/images/book-placeholder.jpg";
const images =
  ensureArray(raw.carousels).length
    ? raw.carousels
    : [image];

  const price = safeNumber(
    raw.final_price || raw.price || raw.sellingPrice,
    99
  );

  const originalPrice = safeNumber(
    raw.original_price || raw.originalPrice || raw.mrp,
    price + 100
  );

  const rating = safeNumber(
    raw.rating || raw.avgRating,
    5
  );

  const category = safeText(
    raw.category || raw.genre,
    "General"
  );

  const description = safeText(
  raw.one_line_description || raw.overview,
  "No description available."
);

const fullDescription = safeText(
  raw.overview,
  description
);

const pages = safeNumber(raw.totalPages, 200);




  const readingTime = raw.readingTime || "6–8 hours";
  const language = raw.language || "English";
  const publishDate = raw.publishDate || "Digital Edition 2024";
  const format = raw.format || "PDF, EPUB";

  // -----------------------------
  // Normalize Chapters
  // (from raw.chapters)
  // -----------------------------
  const chapters = ensureArray(raw.chapters).map((c, i) => ({
    chapterNumber: c.chapterNumber || i + 1,
    title: safeText(c.title, `Chapter ${i + 1}`),
    pdfUrl: c.pdfUrl || c.pdf || null,
    thumbnail: c.thumbnail || null,
    pages: Number(c.pages) || 0,   
  }));

  const defaultChapters = [
    {
      chapterNumber: 1,
      title: "Sample Chapter",
      pdfUrl: "/sample/sample1.pdf",
      thumbnail: null,
      pages: 5,
    },
  ];

  const normalizedChapters = chapters.length ? chapters : defaultChapters;

  // -----------------------------
  // Normalize Table of Contents
  // (sections → chapters)
  // -----------------------------
const tableOfContents = ensureArray(raw.sections).map((section, i) => ({
  sectionTitle: safeText(section.title, `Section ${i + 1}`),

  chapters: ensureArray(section.chapters).map((ch, j) => ({
    chapterNumber: j + 1,
    title: safeText(ch.title, `Chapter ${j + 1}`),
    pages: Number(ch.pages) || 0,          // ✅ THIS WAS MISSING
    pdfUrl: ch.pdfUrl || ch.pdf || null,
    thumbnail: ch.thumbnail || null,
  })),
}));


  const defaultToC = [
    {
      sectionTitle: "Sample Section",
      chapters: [
        {
          chapterNumber: 1,
          title: "Sample Chapter",
          pdfUrl: "/sample/sample1.pdf",
          thumbnail: null,
        },
      ],
    },
  ];

  const normalizedToC = tableOfContents.length ? tableOfContents : defaultToC;

  // -----------------------------
  // FINAL NORMALIZED OBJECT
  // -----------------------------

  return {
    id,
    title,
    author,
    image,
    images,
    price,
    originalPrice,
    rating,
    category,
    description,
    fullDescription,
    pages,
    readingTime,
    language,
    publishDate,
    format,
    chapters: normalizedChapters,
    tableOfContents: normalizedToC,

    // extra safe flags
    inStock: raw.inStock ?? true,
    totalSales: raw.totalSales || Math.floor(Math.random() * 20000) + 5000,
  };
};

  // Carousel data
 
    
const { data: booksResponse } = useGetAllBooksQuery({
  page: 1,
  pageSize: 10,
});


const { data: productData, isLoading } = useGetBookByIdQuery(productId);




  
  // Get product data from centralized books data
 
  const enhancedProductData = normalizeProduct(productData, productId);


const carouselImages = enhancedProductData?.images || [];


 const suggestedBooks =
  booksResponse?.data?.filter(book =>
    String(book._id) !== String(productId) &&
    (book.category === productData?.category || book.author === productData?.author)
  ).slice(0, 6) || [];

const finalSuggestedBooks = suggestedBooks.map(book =>
  normalizeProduct(book, book._id)
);





  // If product not found, redirect to library
useEffect(() => {
  if (!carouselImages.length) return;

  const interval = setInterval(() => {
    setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  }, 5000);

  return () => clearInterval(interval);
}, [carouselImages.length]);


  // Carousel navigation
  const nextSlide = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  // Smooth animation for reviews
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let intervalId;
    const speed = 1;

    if (!isPaused) {
      intervalId = setInterval(() => {
        currentTransformRef.current -= speed;
        const resetPoint = -(container.scrollWidth / 3);
        if (currentTransformRef.current <= resetPoint) {
          currentTransformRef.current = 0;
        }
        container.style.transform = `translateX(${currentTransformRef.current}px)`;
      }, 16);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused]);

useEffect(() => {
  if (!isLoading && !productData) {
    navigate('/library');
  }
}, [isLoading, productData, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading product...
    </div>
  );
}


const calculateDiscountPercentage = () => {
  if (enhancedProductData.originalPrice && enhancedProductData.price) {
    return Math.round(
      ((enhancedProductData.originalPrice - enhancedProductData.price) /
        enhancedProductData.originalPrice) * 100
    );
  }
  return 0;
};




  const isInCart = cart.some(item => item.id === enhancedProductData.id);
  const isInWishlist = wishlist.some(item => item.id === enhancedProductData.id);
  
  const isSuggestedInCart = (book) => cart.some(item => item.id === book.id);
  const isSuggestedInWishlist = (book) => wishlist.some(item => item.id === book.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      setCartButtonClicked(true);
      setTimeout(() => setCartButtonClicked(false), 1500);
      onAddToCart && onAddToCart(enhancedProductData);
    } else {
      navigate('/cart');
    }
  };

  const handleAddToWishlist = () => {
    setWishlistButtonClicked(true);
    setTimeout(() => setWishlistButtonClicked(false), 300);
    if (isInWishlist) {
      onRemoveFromWishlist && onRemoveFromWishlist(enhancedProductData.id);
    } else {
      onAddToWishlist && onAddToWishlist(enhancedProductData);
    }
  };

  const handleGoBack = () => {
    const from = location.state?.from;
    if (from === 'hero') {
      navigate('/', { state: { scrollTo: 'hero-section' } });
    } else if (from === 'featured') {
      navigate('/', { state: { scrollTo: 'featured-books' } });
    } else {
      navigate('/library');
    }
  };

  const toggleSection = (sectionIndex) => {
    setExpandedSections(prev => ({ ...prev, [sectionIndex]: !prev[sectionIndex] }));
  };

  const handleReviewsClick = () => {
    reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitReview = () => {
    if (newReview.text.trim()) {
      const review = {
        id: Date.now(),
        ...newReview,
        timestamp: new Date().toISOString()
      };
      dispatch({ type: 'reviews/addReview', payload: review });
      setNewReview({ rating: 5, text: '', name: '' });
      setShowReviewForm(false);
    }
  };

  const handleChapterView = (chapter) => {
    setSelectedChapter(chapter);
    setShowChapterModal(true);
  };

  const closeChapterModal = () => {
    setShowChapterModal(false);
    setSelectedChapter(null);
  };

  const handleSuggestedCartAction = (e, book) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (animatingSuggestedCart[book.id]) return;

    const inCart = isSuggestedInCart(book);
    
    if (inCart) {
      navigate('/cart');
      return;
    }

    setAnimatingSuggestedCart(prev => ({ ...prev, [book.id]: true }));
    setSuggestedCartClicked(prev => ({ ...prev, [book.id]: true }));
    
    setTimeout(() => {
      onAddToCart && onAddToCart(book);
      setAnimatingSuggestedCart(prev => ({ ...prev, [book.id]: false }));
      setSuggestedCartClicked(prev => ({ ...prev, [book.id]: false }));
    }, 1200);
  };

  const handleSuggestedToggleWishlist = (e, book) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (animatingSuggestedWishlist[book.id]) return;
    setAnimatingSuggestedWishlist(prev => ({ ...prev, [book.id]: true }));
    setSuggestedWishlistClicked(prev => ({ ...prev, [book.id]: true }));
    setTimeout(() => {
      if (isSuggestedInWishlist(book)) onRemoveFromWishlist && onRemoveFromWishlist(book.id);
      else onAddToWishlist && onAddToWishlist(book);
      setAnimatingSuggestedWishlist(prev => ({ ...prev, [book.id]: false }));
      setSuggestedWishlistClicked(prev => ({ ...prev, [book.id]: false }));
    }, 250);
  };

const handleSuggestedBookClick = (book) => {
    if (isMobile) {
        setHoveredSuggested(null);  // <-- FIX HERE
    }
    navigate(`/product/${book._id || book.id}`, { state: { from: 'suggested' } });

};

  const isMobile = typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;




  return (
    <div className="-mt-16 min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#9B7BB8] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Styles */}
      <style >{`
      
      @media (hover: none) and (pointer: coarse) {
  .card-hover-gold:hover {
    box-shadow: none !important;
  }
}
        .cart-button-animated { position: relative; overflow: hidden; }
        .cart-button-animated .cart-icon { position: absolute; z-index: 2; top: 50%; left: -10%; transform: translate(-50%, -50%); opacity: 0; }
        .cart-button-animated .box-icon { position: absolute; z-index: 3; top: -20%; left: 52%; transform: translate(-50%, -50%); opacity: 0; }
        .cart-button-animated .cart-text { position: relative; z-index: 3; transition: opacity 0.3s ease; }
        .cart-button-animated .added-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; opacity: 0; }
        .cart-button-animated.clicked .cart-icon { animation: cartAnimation 1.5s ease-in-out forwards; }
        .cart-button-animated.clicked .box-icon { animation: boxAnimation 1.5s ease-in-out forwards; }
        .cart-button-animated.clicked .cart-text { animation: textOut 1.5s ease-in-out forwards; }
        .cart-button-animated.clicked .added-text { animation: textIn 1.5s ease-in-out forwards; }
        @keyframes cartAnimation { 0% { left: -10%; opacity: 1; } 40%, 60% { left: 50%; opacity: 1; } 100% { left: 110%; opacity: 0; } }
        @keyframes boxAnimation { 0%, 40% { top: -20%; opacity: 1; } 60% { top: 40%; left: 52%; opacity: 1; } 100% { top: 40%; left: 112%; opacity: 0; } }
        @keyframes textOut { 0% { opacity: 1; } 20%, 100% { opacity: 0; } }
        @keyframes textIn { 0%, 80% { opacity: 0; } 100% { opacity: 1; } }

        .wishlist-button-animated { position: relative; }
        .wishlist-button-animated .heart-static { transition: transform 0.2s ease; }
        .wishlist-button-animated.clicked { animation: pop 0.3s ease-out; }
        .wishlist-button-animated.clicked .heart-static { transform: scale(1.2); }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }

        .card-hover-gold:hover, .card-hover-gold.gold-glow {
          box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1;
        }
        @media (hover: none) and (pointer: coarse) {
          .card-hover-gold:active {
            box-shadow: 0 0 0 2px #ffe9b3, 0 4px 24px 0 #ffe9b3cc, 0 1.5px 8px 0 #fff7c1;
          }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-100px); }
        }

        .carousel-slide-enter {
          animation: slideIn 0.6s ease-out;
        }

        @media (max-width: 640px) { 
          .group:hover { transform: none !important; z-index: initial !important; }
          .mobile-overview-text { font-size: 0.875rem !important; line-height: 1.4 !important; }
          .mobile-suggested-card { padding: 0.75rem !important; }
          .mobile-suggested-image { width: 120px !important; height: 160px !important; }
          .mobile-suggested-title { font-size: 0.875rem !important; }
          .mobile-suggested-price { font-size: 1.125rem !important; }
        }
        
        @media (max-width: 400px) {
          .pt-32 { padding-top: 1.5rem; }
          .pb-8 { padding-bottom: 1rem; }
          .w-40 { width: 120px !important; }
          .h-56 { height: 170px !important; }
          .w-10 { width: 40px !important; }
          .h-14 { height: 56px !important; }
          .w-[30%] { width: 30% !important; }
          .w-[70%] { width: 70% !important; }
          .p-4 { padding: 0.75rem !important; }
          .rounded-xl { border-radius: 0.75rem !important; }
          .gap-2 { gap: 0.5rem !important; }
          .mb-4 { margin-bottom: 1rem !important; }
          .flex-row { flex-direction: row !important; }
          .flex-col { flex-direction: column !important; }
          .items-center { align-items: center !important; }
          .justify-center { justify-content: center !important; }
          .text-xs { font-size: 0.75rem !important; }
          .text-base { font-size: 1rem !important; }
          .font-semibold { font-weight: 600 !important; }
          .font-bold { font-weight: 700 !important; }
          .back-to-library-mobile-fix { margin-top: 4rem; }
          .back-to-library-btn-mobile { margin-left: 0 !important; margin-right: auto !important; display: flex !important; }
          .main-book-image-mobile-fix { max-width: 230px !important; }
          .about-section-mobile-fix { font-size: 0.92rem !important; padding: 1rem !important; border-radius: 0.7rem !important; }
          .text-3xl { font-size: 1.15rem !important; }
          .text-lg { font-size: 0.98rem !important; }
          .p-8 { padding: 1rem !important; }
        }
          @media (hover: none), (pointer: coarse) {
  .card-hover-gold:hover,
  .gold-glow {
    box-shadow: none !important;
    transform: none !important;
  }
}
  @media (hover: none), (pointer: coarse) {
  .suggested-card:hover {
    box-shadow: none !important;
    transform: none !important;
  }
  .card-hover-gold:hover {
    box-shadow: none !important;
    transform: none !important;
  }
}

      `}</style>

      {/* Back button */}
      <div className="pt-32 pb-8 relative z-10 back-to-library-mobile-fix">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleGoBack}
            className="flex items-center bg-[#9B7BB8] hover:bg-[#8A6AA7] text-[#2D1B3D] px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-base gap-2 min-w-[0] back-to-library-btn-mobile"
            style={{ minWidth: 0 }}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="font-semibold whitespace-nowrap">Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
          {/* Left - Book Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="relative mb-8">
                <div className="relative w-full max-w-md mx-auto main-book-image-mobile-fix">
                  <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-2xl transform rotate-1"></div>
                  <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                    <div className="aspect-[3/4] relative">
                      <img src={enhancedProductData.images[selectedImageIndex]} alt={enhancedProductData.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbs */}
              <div className="flex justify-center space-x-2 mt-2">
                {enhancedProductData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-14 h-16 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                      selectedImageIndex === index ? 'ring-4 ring-white shadow-xl scale-110' : 'ring-2 ring-white/30 hover:ring-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`${enhancedProductData.title} ${index + 1}`} className="w-full h-full object-cover" />
                    {selectedImageIndex === index && <div className="absolute inset-0 bg-white/20"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Info */}
          <div className="lg:col-span-3 space-y-8">
            <div className="inline-flex items-center bg-[#9B7BB8] rounded-full px-6 py-3 shadow-lg">
              <BookOpen className="w-5 h-5 text-[#2D1B3B] mr-3" />
              <span className="text-[#2D1B3D] text-sm font-semibold tracking-wide">{enhancedProductData.category}</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">{enhancedProductData.title}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-lg">by</span>
                <span className="text-xl text-white font-semibold">{enhancedProductData.author}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-8 text-white/90">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(enhancedProductData.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} />
                  ))}
                </div>
                <span className="font-semibold text-lg">{enhancedProductData.rating}</span>
                <span className="text-white/60">•</span>
                <button onClick={handleReviewsClick} className="font-medium hover:text-yellow-400 transition-colors duration-300 cursor-pointer underline decoration-dotted">
                  ({enhancedProductData?.ratingCount || 0} reviews)
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#9B7BB8] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-[#2D1B3D]">₹{enhancedProductData.price}</span>
                  <span className="text-xl text-[#2D1B3D]/60 line-through">₹{enhancedProductData.originalPrice}</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Save {calculateDiscountPercentage()}% (₹{enhancedProductData.originalPrice - enhancedProductData.price})
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-row gap-2 w-full mb-4">
              <div className="bg-[#9B7BB8] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg w-[30%] min-w-[90px]">
                <Eye className="w-5 h-5 text-[#2D1B3D] mb-1" />
                <span className="text-xs text-[#2D1B3D] font-semibold">Overview</span>
                <span className="text-base text-[#2D1B3D] font-bold">{enhancedProductData.pages}</span>
              </div>
              <div className="bg-[#9B7BB8] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg w-[70%] min-w-[120px]">
                <div className="flex items-center mb-1">
                  <Users className="w-5 h-5 text-[#2D1B3D] mr-2" />
                  <span className="text-xs text-[#2D1B3D] font-semibold">Join Our Community</span>
                </div>
                <span className="text-xs text-[#2D1B3D] text-center font-medium">
                  Want to read, discuss, and get exclusive deals?{' '}
                  <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 font-bold">
                    Join our Telegram & Discord!
                  </a>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#9B7BB8] rounded-2xl p-8 shadow-xl about-section-mobile-fix">
              <p className="text-[#2D1B3D] text-lg leading-relaxed font-medium">{enhancedProductData.description}</p>
            </div>

            {/* Actions - Fixed Hover Issue */}
            <div className="flex flex-row gap-3 w-full mb-4">
              <button
                onClick={handleAddToCart}
                className={`cart-button-animated ${cartButtonClicked ? 'clicked' : ''} flex-1 py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                 isInCart
  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-[0_0_18px_4px_rgba(255,215,0,0.6)] transition-shadow duration-300'
  : 'bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D] hover:shadow-[0_0_18px_4px_rgba(255,215,0,0.75)] transition-shadow duration-300'


                }`}
              >
                <ShoppingCart className="cart-icon w-5 h-5" />
                <div className="box-icon w-3 h-3 bg-current rounded-sm"></div>
                <span className="cart-text">
                  {isInCart ? <Check className="w-5 h-5 mr-2 inline" /> : <ShoppingCart className="w-5 h-5 mr-2 inline" />}
                  {isInCart ? 'Go to Cart' : 'Add to Cart'}
                </span>
                <span className="added-text">
                  <Check className="w-5 h-5 mr-2 inline" />
                  Added!
                </span>
              </button>

              <button
                onClick={handleAddToWishlist}
                className={`wishlist-button-animated ${wishlistButtonClicked ? 'clicked' : ''} p-3 rounded-xl transition-all duration-200 shadow-lg ${
                  isInWishlist
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl'
                    : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7] hover:shadow-xl'
                }`}
                style={{ minWidth: 0 }}
              >
                <Heart className={`heart-static w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#9B7BB8] rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'what-you-learn', label: "What You'll Learn", icon: BookOpen },
              { id: 'contents', label: 'Table of Contents', icon: BookOpen }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === id ? 'bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D] shadow-xl' : 'bg-[#2D1B3D] text-white hover:bg-[#3D2A54] shadow-lg hover:shadow-xl'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="text-[#2D1B3D]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Product Description - Mobile Optimized with Read More */}
                <div className="px-4 sm:px-6 lg:px-12 mb-6">
                  <p className={`text-[#2D1B3D] text-sm sm:text-base lg:text-lg leading-relaxed text-center font-medium max-w-5xl mx-auto mobile-overview-text ${
                    expandedDescription ? '' : 'line-clamp-3 sm:line-clamp-none'
                  }`}>
                    {enhancedProductData.fullDescription}
                  </p>
                  
                  {/* Read More Button - Only on Mobile */}
                  <div className="block sm:hidden text-center mt-3">
                    <button
                      onClick={() => setExpandedDescription(!expandedDescription)}
                      className="text-[#2D1B3D] font-bold text-sm underline hover:text-[#9B7BB8] transition-colors"
                    >
                      {expandedDescription ? 'Read Less' : 'Read More'}
                    </button>
                  </div>
                </div>

                {/* Stunning Carousel with Enhanced Golden Glow */}
                <div className="relative bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl overflow-hidden border">
                  <div className="carousel-slide-enter px-12 sm:px-16 lg:px-20 py-8 sm:py-10 lg:py-12">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
                      {/* 3D Book Image with Enhanced Golden Glow - No Left Border */}
                      <div className="flex-shrink-0">
                        <div className="relative w-44 h-60 sm:w-52 sm:h-72 lg:w-60 lg:h-80">
                          {/* 3D Shadow Effect */}
                          <div className="absolute inset-0 bg-black/50 rounded-xl blur-xl transform translate-x-3 translate-y-3"></div>
                          
                          {/* Book with Enhanced Golden Glow */}
                          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500"
                               style={{
                                 boxShadow: '0 6px 24px rgba(255, 233, 179, 0.4), 0 10px 48px rgba(255, 233, 179, 0.3), 0 3px 12px rgba(255, 247, 193, 0.35)'
                               }}>
                            <img 
                             src={enhancedProductData.images[currentCarouselIndex]}
                              alt="Book"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Book Description - Right Side */}
                      <div className="flex-1 text-center lg:text-left max-w-2xl">
                        <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed font-medium">
                          {enhancedProductData.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white p-2.5 sm:p-3 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-20 border-2 border-white/20"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white p-2.5 sm:p-3 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 z-20 border-2 border-white/20"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Dots Indicator - Hidden on Mobile */}
                  <div className="hidden sm:flex justify-center space-x-2 py-4">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCarouselIndex(index)}
                        className={`transition-all duration-300 rounded-full ${
                          currentCarouselIndex === index 
                            ? 'bg-[#9B7BB8] w-8 h-2.5 shadow-lg' 
                            : 'bg-white/50 hover:bg-white/70 w-2.5 h-2.5'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'what-you-learn' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#2D1B3D] mb-3 sm:mb-4">What You Will Learn</h3>
                <div className="w-20 sm:w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
              </div>
              <div className="space-y-3 sm:space-y-6">
                {(enhancedProductData.learningObjectives || [
                  "Master modern web development frameworks and tools",
                  "Learn responsive design principles and best practices",
                  "Understand advanced JavaScript concepts and ES6+ features",
                  "Build scalable and maintainable applications",
                  "Implement security best practices in web applications",
                  "Deploy applications to production environments"
                ]).map((objective, index) => (
                  <div key={index} className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="bg-[#9B7BB8] text-[#2D1B3D] w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">{index + 1}</div>
                      <p className="text-white/90 leading-relaxed text-sm sm:text-base line-clamp-2">{objective}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

    {activeTab === "contents" && (
  <div className="max-w-5xl mx-auto">
    {/* Header */}
    <div className="flex justify-between items-center mb-4 text-sm text-[#2D1B3D]/80">
      <span>
        {enhancedProductData.tableOfContents.length||0} sections •{" "}
        {enhancedProductData.totalPages} pages
      </span>

      <button
        onClick={() => {
          const allExpanded = {};
          enhancedProductData.tableOfContents.forEach((_, i) => {
            allExpanded[i] = true;
          });
          setExpandedSections(allExpanded);
        }}
        className="text-purple-700 font-semibold hover:underline"
      >
        Expand all sections
      </button>
    </div>

    {/* Sections Container */}
    <div className=" rounded-md overflow-hidden bg-white">
  {enhancedProductData.tableOfContents.map((section, sectionIndex) => {
    const chapterPages = Array.isArray(section.chapters)
      ? section.chapters.reduce(
          (sum, ch) => sum + Number(ch.pages || 0),
          0
        )
      : 0;

    const totalPages =
      chapterPages > 0
        ? chapterPages
        : Number(section.pages || 0);


    return (
      <div key={sectionIndex} className="">
        {/* Section Header */}
        <button
          onClick={() => toggleSection(sectionIndex)}
          className="w-full flex items-center justify-between px-4 py-4 bg-[#2D1B3D] hover:bg-[#2D1B3D]/95 transition"
        >
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl flex items-center gap-3">
            <ChevronDown
              className={`w-7 h-7 text-white transition-transform ${
                expandedSections[sectionIndex] ? "rotate-180" : ""
              }`}
            />
            <span className="font-semibold text-white">
              {section.sectionTitle}
            </span>
          </div>

          <span className="text-sm text-white">
            {section.chapters?.length || 0} Chapters • {totalPages} pages
          </span>
        </button>

        {/* Chapters */}
        {expandedSections[sectionIndex] && (
          <div className="p-2 bg-[#2D1B3D] ">
            {section.chapters?.map((chapter, chapterIndex) => (
              <div
                key={chapterIndex}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-[#9B7BB8] ml-10 mb-2 flex items-center rounded-lg justify-between px-10 py-3  text-sm "
              >
                <div className="flex items-center gap-3 text-white">
                  <BookOpen className="w-4 h-4 text-gray-100" />
                  <span>{chapter.title}</span>
                </div>

                <span className="text-gray-100">
                  {chapter.pages || 0} pages
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  })}
</div>

  </div>
)}


          </div>
        </div>

 <ProductReviews productId={enhancedProductData.id} />




    {/* Suggested Books - Cute & Compact for All Devices */}
    {finalSuggestedBooks.length > 0 && (
      <div className="mt-12 md:mt-16 lg:mt-20 py-8 md:py-12 relative">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 border border-white/20 shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2" />
            <span className="text-white font-bold text-sm sm:text-base">You Might Also Like</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4 px-4">Suggested Books</h3>
          <p className="text-white/60 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Handpicked recommendations from our featured collection
          </p>
        </div>

    <div className="
    grid
    grid-cols-2    /* ALWAYS 2 COLUMNS ON MOBILE */
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-2 
    sm:gap-2
    md:gap-4
    lg:gap-6
    max-w-6xl
    mx-auto 

">


 {finalSuggestedBooks.map((book, index) => {
  const isInCartLocal = isSuggestedInCart(book);
  const isInWishlistLocal = isSuggestedInWishlist(book);
  const cartClicked = suggestedCartClicked[book.id];
  const wishlistClicked = suggestedWishlistClicked[book.id];
  const animCart = animatingSuggestedCart[book.id];
  const animWish = animatingSuggestedWishlist[book.id];
  const bookId = book.id; // normalized ID


  return (
<div
  key={bookId}
  className="group relative cursor-pointer suggested-card"
  onMouseEnter={() => {
    if (!isMobile) setHoveredSuggested(bookId);
  }}
  onMouseLeave={() => {
    if (!isMobile) setHoveredSuggested(null);
  }}
  onTouchStart={() => {
    // 🔥 THE FIX: reset hover when touch begins
    setHoveredSuggested(null);
  }}
  onClick={() => handleSuggestedBookClick(book)}
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
          ${!isMobile && hoveredSuggested === bookId ? "gold-glow" : ""}
        `}
      >
        {/* Category Badge */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-[#2D1B3D] to-[#3D2A54] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 whitespace-nowrap">
            {book.category}
          </div>
        </div>

        {/* IMAGE (EXACTLY LIKE LIBRARY) */}
        <div className="mb-2 sm:mb-3 lg:mb-4 flex justify-center mt-4">
          <div className="relative w-20 h-28 sm:w-24 sm:h-32 lg:w-48 lg:h-64 rounded-lg lg:rounded-xl overflow-hidden shadow-2xl">
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* TITLE + AUTHOR */}
        <div className="text-center flex-1 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="font-bold text-white group-hover:text-white/90 transition-colors duration-300 leading-tight 
              text-xs sm:text-sm lg:text-lg  line-clamp-2 
              min-h-[2.5rem] sm:min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center justify-center">
              {book.title}
            </h3>

            <p className="text-white/70 font-medium text-[10px] sm:text-xs lg:text-sm">
              by {book.author}
            </p>
          </div>

          {/* RATING */}
          <div className="mb-2">
            <div className="flex items-center justify-center space-x-1 ">
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
              <span className="text-white/80 text-xs sm:text-sm font-medium ml-1">{book.rating}</span>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-center mb-1">
            <div className="flex items-center justify-center space-x-1 ">
              <span className="text-sm sm:text-base lg:text-xl font-bold text-white">₹{book.price}</span>
              <span className="text-xs sm:text-sm lg:text-sm text-white/50 line-through">₹{book.originalPrice}</span>
            </div>
          </div>

          {/* ACTION BUTTONS — SAME STYLE AS LIBRARY */}
          <div className="flex flex-row gap-2 w-full mb-2">
            {/* Add to Cart */}
            <button
  onClick={(e) => handleSuggestedCartAction(e, book)}
  disabled={animCart}
  className={`
    cart-button-animated ${cartClicked ? "clicked" : ""}
    flex-1 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 
    transition-all duration-300 hover:scale-105 shadow-xl
    ${
      isInCartLocal
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        : "bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D]"
    }
  `}
>
  {/* animated cart icon */}
  <ShoppingCart className="cart-icon w-4 h-4" />

  {/* animated box icon */}
  <div className="box-icon w-2 h-2 bg-current rounded-sm"></div>

  {/* default text */}
  <span className="cart-text">
    {isInCartLocal ? "Go to Cart" : "Add to Cart"}
  </span>

  {/* animated “Added!” text */}
  <span className="added-text">
    <Check className="w-4 h-4 inline mr-1" /> Added!
  </span>
</button>


            {/* Wishlist */}
            <button
              onClick={(e) => handleSuggestedToggleWishlist(e, book)}
              disabled={animWish}
              className={`
                wishlist-button-animated ${wishlistClicked ? "clicked" : ""}
                p-2 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg
                ${
                  isInWishlistLocal
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-[#9B7BB8] text-[#2D1B3D]"
                }
              `}
              style={{ minWidth: 0 }}
            >
              <Heart className={`w-4 h-4 ${isInWishlistLocal ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})}


</div>



      </div>
    )}

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative max-h-[calc(100%-2rem)] overflow-y-auto">
              <button onClick={() => setShowReviewForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2D1B3D] mb-4 sm:mb-6 pr-8">Share Your Experience</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className="text-2xl transition-colors">
                        <Star className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1B3D] mb-2">Your Review</label>
                  <textarea
                    value={newReview.text}
                    onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9B7BB8] focus:border-transparent transition-all resize-none text-sm sm:text-base"
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
                  className="w-full bg-[#2D1B3D] text-white py-2 sm:py-3 rounded-lg hover:bg-[#3D2A54] transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chapter Modal */}
        {showChapterModal && selectedChapter && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative max-h-[calc(100%-2rem)] overflow-y-auto">
              <button onClick={closeChapterModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2D1B3D] mb-4 sm:mb-6 pr-8">Chapter Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-white to-gray-100 shadow-md flex-shrink-0 flex items-center justify-center">
                    {!imageErrors[`chapter-${selectedChapter.pdf}`] && selectedChapter.thumbnail ? (
                      <img
                        src={selectedChapter.thumbnail}
                        alt={selectedChapter.title}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '3/4' }}
                        onError={() => setImageErrors(prev => ({ ...prev, [`chapter-${selectedChapter.pdf}`]: true }))}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] flex items-center justify-center text-white font-bold text-lg">
                        {selectedChapter.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#2D1B3D] text-lg font-semibold leading-relaxed">{selectedChapter.title}</h4>
                    <p className="text-[#2D1B3D]/60 text-sm">PDF available</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      window.open(selectedChapter.pdf, '_blank');
                      closeChapterModal();
                    }}
                    className="bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg"
                  >
                    Download PDF
                  </button>
                  <button onClick={closeChapterModal} className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;