import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Eye, Share2, Download, BookOpen, Clock, Award, Users, Zap, Check } from 'lucide-react';
import { centralizedBooksData } from './LibrarySection';

const ProductSection = ({ cart = [], wishlist = [], onAddToCart, onRemoveFromCart, onAddToWishlist, onRemoveFromWishlist }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Get product data from centralized books data
  const productData = centralizedBooksData.find(book => book.id === parseInt(productId));

  // If product not found, redirect to library
  useEffect(() => {
    if (!productData) {
      navigate('/library');
    }
  }, [productData, navigate]);

  // Scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no product data, show loading or redirect
  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#9B7BB8] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Create enhanced product data with default values for missing fields
  const enhancedProductData = {
    ...productData,
    // Add default values for missing fields
    totalSales: productData.totalSales || Math.floor(Math.random() * 20000) + 5000,
    pages: productData.pages || Math.floor(Math.random() * 400) + 200,
    readingTime: productData.readingTime || "6-8 hours",
    language: productData.language || "English",
    format: productData.format || "PDF, EPUB, MOBI",
    publishDate: productData.publishDate || "Digital Edition 2024",
    images: productData.images || [productData.image], // Use the main image as default
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
    tableOfContents: productData.tableOfContents || [
      "Chapter 1: Introduction and Overview",
      "Chapter 2: Understanding the Fundamentals",
      "Chapter 3: Core Principles and Concepts",
      "Chapter 4: Practical Applications",
      "Chapter 5: Advanced Techniques",
      "Chapter 6: Case Studies and Examples",
      "Chapter 7: Implementation Strategies",
      "Chapter 8: Conclusion and Next Steps"
    ]
  };

  // Helper functions to check if product is in cart/wishlist
  const isInCart = cart.some(item => item.id === enhancedProductData.id);
  const isInWishlist = wishlist.some(item => item.id === enhancedProductData.id);

  const handleAddToCart = () => {
    if (isInCart) {
      onRemoveFromCart && onRemoveFromCart(enhancedProductData.id);
    } else {
      onAddToCart && onAddToCart(enhancedProductData);
    }
  };

  const handleAddToWishlist = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#9B7BB8] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation - Moved down from navbar */}
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
        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
          {/* Left - Book Image (2 columns) */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              {/* Main Book Image */}
              <div className="relative mb-8">
                <div className="relative w-full max-w-md mx-auto main-book-image-mobile-fix">
                  {/* Shadow behind book */}
                  <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-2xl transform rotate-1"></div>
                  {/* Book container */}
                  <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={enhancedProductData.images[selectedImageIndex]}
                        alt={enhancedProductData.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Thumbnail Images (below main image) */}
              <div className="flex justify-center space-x-2 mt-2">
                {enhancedProductData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-14 h-16 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                      selectedImageIndex === index 
                        ? 'ring-4 ring-white shadow-xl scale-110' 
                        : 'ring-2 ring-white/30 hover:ring-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${enhancedProductData.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-white/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Product Info (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Category Badge */}
            <div className="inline-flex items-center bg-[#9B7BB8] rounded-full px-6 py-3 shadow-lg">
              <BookOpen className="w-5 h-5 text-[#2D1B3D] mr-3" />
              <span className="text-[#2D1B3D] text-sm font-semibold tracking-wide">{enhancedProductData.category}</span>
            </div>

            {/* Title & Author */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                {enhancedProductData.title}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-lg">by</span>
                <span className="text-xl text-white font-semibold">{enhancedProductData.author}</span>
              </div>
            </div>

            {/* Rating & Stats */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-8 text-white/90">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(enhancedProductData.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{enhancedProductData.rating}</span>
                <span className="text-white/60">•</span>
                <span className="font-medium">({enhancedProductData.reviews} reviews)</span>
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
                  Save ${enhancedProductData.originalPrice - enhancedProductData.price}
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="flex flex-row gap-2 w-full mb-4">
              <div className="bg-[#9B7BB8] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg w-[30%] min-w-[90px]">
                <BookOpen className="w-5 h-5 text-[#2D1B3D] mb-1" />
                <span className="text-xs text-[#2D1B3D] font-semibold">Pages</span>
                <span className="text-base text-[#2D1B3D] font-bold">{enhancedProductData.pages}</span>
              </div>
              <div className="bg-[#9B7BB8] rounded-xl p-4 flex flex-col items-center justify-center shadow-lg w-[70%] min-w-[120px]">
                <div className="flex items-center mb-1">
                  <Users className="w-5 h-5 text-[#2D1B3D] mr-2" />
                  <span className="text-xs text-[#2D1B3D] font-semibold">Join Our Community</span>
                </div>
                <span className="text-xs text-[#2D1B3D] text-center font-medium">Want to read, discuss, and get exclusive deals? <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 font-bold">Join our Telegram & Discord!</a></span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#9B7BB8] rounded-2xl p-8 shadow-xl about-section-mobile-fix">
              <p className="text-[#2D1B3D] text-lg leading-relaxed font-medium">
                {enhancedProductData.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2 w-full mb-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl ${
                  isInCart 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                    : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#2D1B3D] shadow-xl'
                }`}
              >
                {isInCart ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <ShoppingCart className="w-5 h-5" />
                )}
                <span>{isInCart ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>
              <button
                onClick={handleAddToWishlist}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                  isInWishlist 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7]'
                }`}
                style={{ minWidth: 0 }}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-[#9B7BB8] rounded-3xl p-8 lg:p-12 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'learning', label: "What You'll Learn", icon: BookOpen },
              { id: 'contents', label: 'Table of Contents', icon: Users }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D] shadow-xl'
                    : 'bg-[#2D1B3D] text-white hover:bg-[#3D2A54] shadow-lg hover:shadow-xl'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-[#2D1B3D]">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4">About This Book</h3>
                  <div className="w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
                </div>
                <div className="bg-[#2D1B3D]/10 rounded-2xl p-8 shadow-lg">
                  <p className="text-[#2D1B3D] text-lg leading-relaxed">
                    {enhancedProductData.fullDescription}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#2D1B3D]/10 rounded-2xl p-8 shadow-lg">
                    <h4 className="text-xl font-semibold mb-6 text-[#2D1B3D]">Book Details</h4>
                    <div className="space-y-4 text-[#2D1B3D]">
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Language:</span>
                        <span>{enhancedProductData.language}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Format:</span>
                        <span>{enhancedProductData.format}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Published:</span>
                        <span>{enhancedProductData.publishDate}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Pages:</span>
                        <span>{enhancedProductData.pages}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#2D1B3D]/10 rounded-2xl p-8 shadow-lg">
                    <h4 className="text-xl font-semibold mb-6 text-[#2D1B3D]">Community</h4>
                    <div className="space-y-4 text-[#2D1B3D]">
                      <div className="flex flex-col items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium text-center">Want to connect with other readers, get exclusive deals, and join book discussions?</span>
                        <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="underline text-blue-700 font-bold mt-2">Join our Telegram & Discord community!</a>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Category:</span>
                        <span>{enhancedProductData.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Rating:</span>
                        <span>{enhancedProductData.rating}/5 ({enhancedProductData.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4">What You'll Learn</h3>
                  <div className="w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
                </div>
                <div className="space-y-6">
                  {enhancedProductData.whatYoullLearn.map((item, index) => (
                    <div key={index} className="group bg-[#2D1B3D]/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#2D1B3D] text-lg leading-relaxed">{item}</span>
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
                <div className="space-y-4">
                  {enhancedProductData.tableOfContents.map((chapter, index) => (
                    <div key={index} className="group bg-[#2D1B3D]/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gradient-to-r from-white to-gray-100 text-[#2D1B3D] w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                        <span className="text-[#2D1B3D] text-lg leading-relaxed flex-1">{chapter}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Responsive Styles for 400px */}
      <style jsx>{`
        @media (max-width: 400px) {
          .pt-32 {
            padding-top: 1.5rem;
          }
          .pb-8 {
            padding-bottom: 1rem;
          }
          .w-40 {
            width: 120px !important;
          }
          .h-56 {
            height: 170px !important;
          }
          .w-10 {
            width: 40px !important;
          }
          .h-14 {
            height: 56px !important;
          }
          .w-[30%] {
            width: 30% !important;
          }
          .w-[70%] {
            width: 70% !important;
          }
          .p-4 {
            padding: 0.75rem !important;
          }
          .rounded-xl {
            border-radius: 0.75rem !important;
          }
          .gap-2 {
            gap: 0.5rem !important;
          }
          .mb-4 {
            margin-bottom: 1rem !important;
          }
          .flex-row {
            flex-direction: row !important;
          }
          .flex-col {
            flex-direction: column !important;
          }
          .items-center {
            align-items: center !important;
          }
          .justify-center {
            justify-content: center !important;
          }
          .text-xs {
            font-size: 0.75rem !important;
          }
          .text-base {
            font-size: 1rem !important;
          }
          .font-semibold {
            font-weight: 600 !important;
          }
          .font-bold {
            font-weight: 700 !important;
          }
          .back-to-library-mobile-fix {
            margin-top: 4rem;
          }
          .back-to-library-btn-mobile {
            margin-left: 0 !important;
            margin-right: auto !important;
            display: flex !important;
          }
          .main-book-image-mobile-fix {
            max-width: 230px !important;
          }
          .about-section-mobile-fix {
            font-size: 0.92rem !important;
            padding: 1rem !important;
            border-radius: 0.7rem !important;
          }
          .text-3xl {
            font-size: 1.15rem !important;
          }
          .text-lg {
            font-size: 0.98rem !important;
          }
          .p-8 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSection;







