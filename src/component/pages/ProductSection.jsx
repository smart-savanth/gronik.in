import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Eye, Users, Check, BookOpen, ChevronDown, Quote, Plus, X, Send } from 'lucide-react';
import { centralizedBooksData } from './LibrarySection';

const ProductSection = ({ cart = [], wishlist = [], onAddToCart, onRemoveFromCart, onAddToWishlist, onRemoveFromWishlist }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [cartButtonClicked, setCartButtonClicked] = useState(false);
  const [wishlistButtonClicked, setWishlistButtonClicked] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const reviewsSectionRef = useRef(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', name: '' });

  const [imageErrors, setImageErrors] = useState({});
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showChapterModal, setShowChapterModal] = useState(false);

  const [reviews] = useState([
    { id: 1, rating: 5, text: "Books are easy to get and the quality is amazing! The reading experience is seamless and the collection is vast.", name: "Aarav Sharma" },
    { id: 2, rating: 5, text: "Great collection and smooth reading experience. Love the variety and user interface. Perfect for daily reading.", name: "Priya Patel" },
    { id: 3, rating: 4, text: "Love the variety of books available here. Perfect for my daily reading routine and the quality is top-notch.", name: "Rahul Verma" },
    { id: 4, rating: 5, text: "Outstanding platform with incredible book selection. The reading experience is smooth and enjoyable.", name: "Sneha Reddy" },
    { id: 5, rating: 4, text: "Fantastic digital library with great features. Love how easy it is to find and read books on any device.", name: "Vikram Singh" },
    { id: 6, rating: 5, text: "Best e-book platform I've used! Great selection, amazing quality, and the interface is beautifully designed.", name: "Ananya Iyer" }
  ]);

  const duplicatedReviews = [...reviews, ...reviews];

  const productData = centralizedBooksData.find(book => book.id === parseInt(productId));

  useEffect(() => {
    if (!productData) navigate('/library');
  }, [productData, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#9B7BB8] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const calculateDiscountPercentage = () => {
    if (productData.originalPrice && productData.price) {
      return Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100);
    }
    return 0;
  };

  const enhancedProductData = {
    ...productData,
    totalSales: productData.totalSales || Math.floor(Math.random() * 20000) + 5000,
    pages: productData.pages || Math.floor(Math.random() * 400) + 200,
    readingTime: productData.readingTime || "6-8 hours",
    language: productData.language || "English",
    format: productData.format || "PDF, EPUB, MOBI",
    publishDate: productData.publishDate || "Digital Edition 2024",
    images: productData.images || [productData.image],
    fullDescription: productData.fullDescription || `${productData.description}\n\nThis comprehensive guide offers deep insights and practical strategies that will transform your approach to ${productData.category.toLowerCase()}. Whether you're a beginner or an experienced practitioner, this book provides valuable knowledge and actionable steps to help you achieve your goals.`,
    keyFeatures: productData.keyFeatures || [
      "Comprehensive coverage of essential topics",
      "Practical examples and case studies",
      "Easy-to-follow step-by-step guidance",
      "Proven strategies and techniques",
      "Actionable insights for immediate application",
      "Expert insights from industry leaders"
    ],
    whatYoullLearn: productData.whatYoullLearn || [
      "Core principles and fundamentals",
      "Advanced techniques and strategies",
      "Real-world applications and examples",
      "Common pitfalls and how to avoid them",
      "Best practices and industry standards",
      "Tools and resources for continued learning"
    ],
    tableOfContents: Array.isArray(productData.tableOfContents) && productData.tableOfContents.length > 0 && typeof productData.tableOfContents[0] === 'object'
      ? productData.tableOfContents
      : [
          {
            title: "Getting Started",
            image: "/images/section1.jpg",
            chapters: [
              { title: "Introduction to the Course", thumbnail: "/images/chapter1-thumb.jpg", pdf: "/pdfs/chapter1.pdf" },
              { title: "Setting Up Your Environment", thumbnail: "/images/chapter2-thumb.jpg", pdf: "/pdfs/chapter2.pdf" },
              { title: "Understanding the Basics", thumbnail: "/images/chapter3-thumb.jpg", pdf: "/pdfs/chapter3.pdf" },
              { title: "Your First Project", thumbnail: "/images/chapter4-thumb.jpg", pdf: "/pdfs/chapter4.pdf" }
            ]
          },
          {
            title: "Core Concepts",
            image: "/images/section2.jpg",
            chapters: [
              { title: "Fundamental Principles", thumbnail: "/images/chapter5-thumb.jpg", pdf: "/pdfs/chapter5.pdf" },
              { title: "Key Theories and Models", thumbnail: "/images/chapter6-thumb.jpg", pdf: "/pdfs/chapter6.pdf" },
              { title: "Essential Techniques", thumbnail: "/images/chapter7-thumb.jpg", pdf: "/pdfs/chapter7.pdf" },
              { title: "Best Practices", thumbnail: "/images/chapter8-thumb.jpg", pdf: "/pdfs/chapter8.pdf" }
            ]
          },
          {
            title: "Advanced Topics",
            image: "/images/section3.jpg",
            chapters: [
              { title: "Complex Scenarios", thumbnail: "/images/chapter9-thumb.jpg", pdf: "/pdfs/chapter9.pdf" },
              { title: "Advanced Strategies", thumbnail: "/images/chapter10-thumb.jpg", pdf: "/pdfs/chapter10.pdf" },
              { title: "Optimization Techniques", thumbnail: "/images/chapter11-thumb.jpg", pdf: "/pdfs/chapter11.pdf" },
              { title: "Troubleshooting", thumbnail: "/images/chapter12-thumb.jpg", pdf: "/pdfs/chapter12.pdf" }
            ]
          },
          {
            title: "Practical Applications",
            image: "/images/section4.jpg",
            chapters: [
              { title: "Real-World Examples", thumbnail: "/images/chapter13-thumb.jpg", pdf: "/pdfs/chapter13.pdf" },
              { title: "Case Studies", thumbnail: "/images/chapter14-thumb.jpg", pdf: "/pdfs/chapter14.pdf" },
              { title: "Implementation Guide", thumbnail: "/images/chapter15-thumb.jpg", pdf: "/pdfs/chapter15.pdf" },
              { title: "Performance Tips", thumbnail: "/images/chapter16-thumb.jpg", pdf: "/pdfs/chapter16.pdf" }
            ]
          },
          {
            title: "Conclusion",
            image: "/images/section5.jpg",
            chapters: [
              { title: "Summary and Review", thumbnail: "/images/chapter17-thumb.jpg", pdf: "/pdfs/chapter17.pdf" },
              { title: "Next Steps", thumbnail: "/images/chapter18-thumb.jpg", pdf: "/pdfs/chapter18.pdf" },
              { title: "Additional Resources", thumbnail: "/images/chapter19-thumb.jpg", pdf: "/pdfs/chapter19.pdf" },
              { title: "Final Thoughts", thumbnail: "/images/chapter20-thumb.jpg", pdf: "/pdfs/chapter20.pdf" }
            ]
          }
        ]
  };

  const isInCart = cart.some(item => item.id === enhancedProductData.id);
  const isInWishlist = wishlist.some(item => item.id === enhancedProductData.id);

  const handleAddToCart = () => {
    if (!enhancedProductData.inStock) return;
    if (!isInCart) {
      setCartButtonClicked(true);
      setTimeout(() => setCartButtonClicked(false), 1500);
      onAddToCart && onAddToCart(enhancedProductData);
    } else {
      setCartButtonClicked(true);
      setTimeout(() => setCartButtonClicked(false), 1000);
      onRemoveFromCart && onRemoveFromCart(enhancedProductData.id);
    }
  };

  // ✅ Wishlist should work even when out of stock
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
    if (newReview.text && newReview.name) {
      console.log('New review submitted:', newReview);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#9B7BB8] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Button Animation Styles */}
      <style jsx>{`
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
                  ({reviews.length} reviews)
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#9B7BB8] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-[#2D1B3D]">${enhancedProductData.price}</span>
                  <span className="text-xl text-[#2D1B3D]/60 line-through">${enhancedProductData.originalPrice}</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Save {calculateDiscountPercentage()}% (${enhancedProductData.originalPrice - enhancedProductData.price})
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

            {/* Actions */}
            <div className="flex flex-row gap-2 w-full mb-4">
              {/* Cart / Out of Stock */}
              <button
                onClick={handleAddToCart}
                disabled={!enhancedProductData.inStock}
                className={`cart-button-animated ${cartButtonClicked ? 'clicked' : ''} flex-1 py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl ${
                  isInCart
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                    : !enhancedProductData.inStock
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#2D1B3D] shadow-xl'
                }`}
              >
                <ShoppingCart className="cart-icon w-5 h-5" />
                <div className="box-icon w-3 h-3 bg-current rounded-sm"></div>
                <span className="cart-text">
                  {isInCart ? <Check className="w-5 h-5 mr-2 inline" /> : <ShoppingCart className="w-5 h-5 mr-2 inline" />}
                  {isInCart ? 'Remove from Cart' : !enhancedProductData.inStock ? 'Out of Stock' : 'Add to Cart'}
                </span>
                <span className="added-text">
                  <Check className="w-5 h-5 mr-2 inline" />
                  Added!
                </span>
              </button>

              {/* ✅ Wishlist always enabled (even if out of stock) */}
              <button
                onClick={handleAddToWishlist}
                className={`wishlist-button-animated ${wishlistButtonClicked ? 'clicked' : ''} p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl ${
                  isInWishlist
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7]'
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
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4">Overview</h3>
                  <div className="w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
                </div>
                <div className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-6 sm:p-8 border">
                  <p className="text-white/90 leading-relaxed text-lg">{enhancedProductData.fullDescription}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-8 border">
                    <h4 className="text-xl font-semibold mb-6 text-white/90">Book Details</h4>
                    <div className="space-y-4 text-white/90">
                      <div className="flex justify-between items-center py-2 border-b border-white/20"><span className="font-medium">Language:</span><span>{enhancedProductData.language}</span></div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20"><span className="font-medium">Format:</span><span>{enhancedProductData.format}</span></div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20"><span className="font-medium">File Size:</span><span>{enhancedProductData.fileSize}</span></div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20"><span className="font-medium">Published:</span><span>{enhancedProductData.publishDate}</span></div>
                      <div className="flex justify-between items-center py-2"><span className="font-medium">Pages:</span><span>{enhancedProductData.pages}</span></div>
                    </div>
                  </div>
                  <div className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-8 border">
                    <h4 className="text-xl font-semibold mb-6 text-white/90">Community</h4>
                    <div className="space-y-4 text-white/90">
                      <div className="flex flex-col items-center py-2 border-b border-white/20">
                        <span className="font-medium text-center">Want to connect with other readers, get exclusive deals, and join book discussions?</span>
                        <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="underline text-[#FFD700] font-bold mt-2">Join our Telegram & Discord community!</a>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20"><span className="font-medium">Category:</span><span>{enhancedProductData.category}</span></div>
                      <div className="flex justify-between items-center py-2 border-b border-white/20"><span className="font-medium">Rating:</span><span>{enhancedProductData.rating}/5 ({reviews.length} reviews)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'what-you-learn' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4">What You Will Learn</h3>
                  <div className="w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
                </div>
                <div className="space-y-6">
                  {(enhancedProductData.learningObjectives || [
                    "Master modern web development frameworks and tools",
                    "Learn responsive design principles and best practices",
                    "Understand advanced JavaScript concepts and ES6+ features",
                    "Build scalable and maintainable applications",
                    "Implement security best practices in web applications",
                    "Deploy applications to production environments"
                  ]).map((objective, index) => (
                    <div key={index} className="bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-6 border transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-[#9B7BB8] text-[#2D1B3D] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{index + 1}</div>
                        <p className="text-white/90 leading-relaxed">{objective}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contents' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4">Table of Contents</h3>
                  <div className="w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
                </div>
                <div className="space-y-6">
                  {enhancedProductData.tableOfContents.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="group bg-[#2D1B3D]/70 backdrop-blur-md border-[#2D1B3D]/30 shadow-xl rounded-2xl p-6 border transition-all duration-300">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection(sectionIndex)}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-18 sm:w-16 sm:h-24 rounded-lg overflow-hidden bg-gradient-to-br from-white to-gray-100 shadow-lg flex items-center justify-center">
                            {!imageErrors[`section-${sectionIndex}`] && section.image ? (
                              <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-cover"
                                style={{ aspectRatio: '3/4' }}
                                onError={() => setImageErrors(prev => ({ ...prev, [`section-${sectionIndex}`]: true }))}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] flex items-center justify-center text-white font-bold text-2xl">
                                {section.title.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-white/90 text-lg font-semibold">{section.title}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 text-white/70 ${expandedSections[sectionIndex] ? 'rotate-180' : ''}`} />
                      </div>

                      {expandedSections[sectionIndex] && (
                        <div className="pl-4 sm:pl-20 mt-6 space-y-4">
                          {section.chapters.map((chapter, chapterIndex) => (
                            <div key={chapterIndex} className="group bg-[#2D1B3D]/50 backdrop-blur-md border-[#2D1B3D]/20 shadow-lg rounded-2xl p-4 border transition-all duration-300">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                                <div className="w-10 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-white to-gray-100 shadow-md flex-shrink-0 flex items-center justify-center">
                                  {!imageErrors[`chapter-${sectionIndex}-${chapterIndex}`] && chapter.thumbnail ? (
                                    <img
                                      src={chapter.thumbnail}
                                      alt={chapter.title}
                                      className="w-full h-full object-cover"
                                      style={{ aspectRatio: '3/4' }}
                                      onError={() => setImageErrors(prev => ({ ...prev, [`chapter-${sectionIndex}-${chapterIndex}`]: true }))}
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] flex items-center justify-center text-white font-bold text-lg">
                                      {chapter.title.charAt(0)}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0 w-full">
                                  <h4 className="text-white/90 text-base sm:text-lg font-semibold leading-snug break-words">{chapter.title}</h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-white/60 text-sm">PDF available</span>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  </div>
                                </div>

                                {chapter.pdf ? (
                                  <button
                                    onClick={() => handleChapterView(chapter)}
                                    className="bg-[#9B7BB8] hover:bg-[#8A6AA7] text-[#2D1B3D] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-1 w-full sm:w-auto sm:self-auto"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                  </button>
                                ) : (
                                  <button
                                    className="bg-gray-400 text-white px-3 py-2 rounded-lg text-sm font-semibold cursor-not-allowed flex items-center justify-center space-x-1 w-full sm:w-auto sm:self-auto"
                                    disabled
                                    title="PDF not available"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div ref={reviewsSectionRef} className="bg-[#9B7BB8] rounded-3xl p-8 lg:p-12 shadow-2xl mt-20">
          <div className="text-center mb-8 sm:mb-16">
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#2D1B3D] px-4">What Our Readers Say</h3>
            <p className="text-sm sm:text-xl text-[#2D1B3D]/80 max-w-2xl mx-auto mb-6 sm:mb-8 font-medium px-4">
              Join thousands of satisfied readers who have transformed their reading experience
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="inline-flex items-center space-x-2 bg-[#2D1B3D] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#3D2A54] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Your Review</span>
            </button>
          </div>

          <div className="relative overflow-hidden" style={{ height: '280px', paddingTop: '20px', paddingBottom: '20px' }}>
            <div
              className="flex gap-4 sm:gap-8 w-max"
              style={{ animation: isPaused ? 'none' : 'scroll 80s linear infinite', transform: 'translateX(0)' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
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
                        <Star key={i} className={`w-4 h-4 sm:w-6 sm:h-6 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-white/40'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="italic leading-relaxed text-sm sm:text-base text-white/90 text-center">"{review.text}"</p>
                  <div className="flex justify-center mt-3">
                    <span className="text-xs sm:text-sm text-[#FFD700] font-semibold opacity-80 rounded-full px-2 py-0.5 bg-[#2D1B3D]/30" style={{ fontFamily: 'cursive' }}>
                      {review.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl relative max-h-[calc(100%-2rem)] overflow-y-auto">
              <button onClick={() => setShowReviewForm(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
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

      {/* Mobile 400px tweaks */}
      <style jsx>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (max-width: 640px) { .group:hover { transform: none !important; z-index: initial !important; } }
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
      `}</style>
    </div>
  );
};

export default ProductSection;
