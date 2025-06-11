import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Eye, Share2, Download, BookOpen, Clock, Award, Users, Zap, Check } from 'lucide-react';

const ProductSection = ({ onGoBack, onAddToCart, onAddToWishlist }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Static product data
  const productData = {
    id: 1,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Self Development",
    price: 150,
    originalPrice: 200,
    rating: 4.8,
    reviews: 234,
    totalSales: 15420,
    pages: 320,
    readingTime: "8-10 hours",
    language: "English",
    format: "PDF, EPUB, MOBI",
    publishDate: "Originally 1937, Digital Edition 2024",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop"
    ],
    description: "Transform your mindset and unlock the secrets to wealth and success with this timeless masterpiece that has inspired millions of readers worldwide.",
    fullDescription: `"Think and Grow Rich" is one of the most influential personal development books ever written. Based on Napoleon Hill's study of over 500 successful individuals, including Andrew Carnegie, Henry Ford, and Thomas Edison, this book reveals the 13 principles that lead to wealth and success.

This isn't just about money - it's about developing the mindset, habits, and strategies that successful people use to achieve their goals in any area of life. Hill spent 20 years researching and interviewing the most successful people of his time to uncover the secrets behind their achievements.

The book teaches you how to harness the power of your thoughts, develop burning desire, create detailed plans, and persist through challenges. It's a complete guide to personal achievement that has stood the test of time.`,
    keyFeatures: [
      "13 proven principles for success",
      "Real-life examples from successful individuals",
      "Practical exercises and action steps",
      "Timeless wisdom applicable to any era",
      "Clear, easy-to-understand language",
      "Comprehensive success methodology"
    ],
    whatYoullLearn: [
      "How to develop a success-oriented mindset",
      "The importance of definite purpose and burning desire",
      "How to create and execute effective plans",
      "The power of persistence and determination",
      "How to harness the power of your subconscious mind",
      "Building successful relationships and networks"
    ],
    tableOfContents: [
      "Chapter 1: Introduction - The Man Who \"Thought\" His Way into Partnership with Thomas A. Edison",
      "Chapter 2: Desire - The Turning Point of All Achievement",
      "Chapter 3: Faith - Visualization of, and Belief in Attainment of Desire",
      "Chapter 4: Auto-Suggestion - The Medium for Influencing the Subconscious Mind",
      "Chapter 5: Specialized Knowledge - Personal Experiences or Observations",
      "Chapter 6: Imagination - The Workshop of the Mind",
      "Chapter 7: Organized Planning - The Crystallization of Desire into Action",
      "Chapter 8: Decision - The Mastery of Procrastination"
    ],
    discount: "25% OFF",
    badge: "BESTSELLER"
  };

  const handleAddToCart = () => {
    onAddToCart && onAddToCart(productData);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    onAddToWishlist && onAddToWishlist(productData);
    setAddedToWishlist(true);
    setTimeout(() => setAddedToWishlist(false), 2000);
  };

  const handleGoBack = () => {
    const featuredSection = document.getElementById('featured-books');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    } else if (onGoBack) {
      onGoBack();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1B3D] via-[#4A3B5C] to-[#9B7BB8] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation - Moved down from navbar */}
      <div className="pt-24 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleGoBack}
            className="group flex items-center space-x-3 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-[#2D1B3D] px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-semibold">Back to Library</span>
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
                <div className="relative w-full max-w-md mx-auto">
                  {/* Shadow behind book */}
                  <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-2xl transform rotate-1"></div>
                  
                  {/* Book container */}
                  <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={productData.images[selectedImageIndex]}
                        alt={productData.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-gradient-to-r from-[#2D1B3D] to-[#4A3B5C] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                          {productData.badge}
                        </span>
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                          {productData.discount}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex justify-center space-x-4">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                      selectedImageIndex === index 
                        ? 'ring-4 ring-white shadow-xl scale-110' 
                        : 'ring-2 ring-white/30 hover:ring-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData.title} ${index + 1}`}
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
              <span className="text-[#2D1B3D] text-sm font-semibold tracking-wide">{productData.category}</span>
            </div>

            {/* Title & Author */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                {productData.title}
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-lg">by</span>
                <span className="text-xl text-white font-semibold">{productData.author}</span>
              </div>
            </div>

            {/* Rating & Stats */}
            <div className="flex flex-wrap items-center gap-8 text-white/90">
              <div className="flex items-center space-x-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(productData.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{productData.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/60">•</span>
                <span className="font-medium">({productData.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/60">•</span>
                <span className="font-medium">{productData.totalSales.toLocaleString()} sold</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#9B7BB8] rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-[#2D1B3D]">${productData.price}</span>
                  <span className="text-xl text-[#2D1B3D]/60 line-through">${productData.originalPrice}</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Save ${productData.originalPrice - productData.price}
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#9B7BB8] rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-[#2D1B3D]/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#2D1B3D]" />
                  </div>
                  <span className="text-[#2D1B3D] text-sm font-semibold">Pages</span>
                </div>
                <span className="text-[#2D1B3D] text-xl font-bold">{productData.pages}</span>
              </div>
              <div className="bg-[#9B7BB8] rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-[#2D1B3D]/20 rounded-lg">
                    <Clock className="w-5 h-5 text-[#2D1B3D]" />
                  </div>
                  <span className="text-[#2D1B3D] text-sm font-semibold">Reading Time</span>
                </div>
                <span className="text-[#2D1B3D] text-xl font-bold">{productData.readingTime}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#9B7BB8] rounded-2xl p-8 shadow-xl">
              <p className="text-[#2D1B3D] text-lg leading-relaxed font-medium">
                {productData.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
                  addedToCart 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                    : 'bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#2D1B3D] shadow-xl'
                }`}
              >
                {addedToCart ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <ShoppingCart className="w-6 h-6" />
                )}
                <span>{addedToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={handleAddToWishlist}
                  className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    addedToWishlist 
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                      : 'bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7]'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${addedToWishlist ? 'fill-current' : ''}`} />
                </button>

                <button className="p-4 bg-[#9B7BB8] text-[#2D1B3D] hover:bg-[#8A6AA7] rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#9B7BB8] rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-[#2D1B3D]/20 rounded-lg w-fit mx-auto mb-3">
                  <Download className="w-6 h-6 text-[#2D1B3D]" />
                </div>
                <div className="text-[#2D1B3D] text-sm font-semibold">Instant Download</div>
              </div>
              <div className="bg-[#9B7BB8] rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-[#2D1B3D]/20 rounded-lg w-fit mx-auto mb-3">
                  <Award className="w-6 h-6 text-[#2D1B3D]" />
                </div>
                <div className="text-[#2D1B3D] text-sm font-semibold">Premium Quality</div>
              </div>
              <div className="bg-[#9B7BB8] rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-[#2D1B3D]/20 rounded-lg w-fit mx-auto mb-3">
                  <Zap className="w-6 h-6 text-[#2D1B3D]" />
                </div>
                <div className="text-[#2D1B3D] text-sm font-semibold">Life-Changing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-[#9B7BB8] rounded-3xl p-8 lg:p-12 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'features', label: 'Key Features', icon: Check },
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
                    {productData.fullDescription}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#2D1B3D]/10 rounded-2xl p-8 shadow-lg">
                    <h4 className="text-xl font-semibold mb-6 text-[#2D1B3D]">Book Details</h4>
                    <div className="space-y-4 text-[#2D1B3D]">
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Language:</span>
                        <span>{productData.language}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Format:</span>
                        <span>{productData.format}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Published:</span>
                        <span>{productData.publishDate}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Pages:</span>
                        <span>{productData.pages}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#2D1B3D]/10 rounded-2xl p-8 shadow-lg">
                    <h4 className="text-xl font-semibold mb-6 text-[#2D1B3D]">Reading Info</h4>
                    <div className="space-y-4 text-[#2D1B3D]">
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Reading Time:</span>
                        <span>{productData.readingTime}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Category:</span>
                        <span>{productData.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-[#2D1B3D]/20">
                        <span className="font-medium">Rating:</span>
                        <span>{productData.rating}/5 ({productData.reviews} reviews)</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium">Total Sales:</span>
                        <span>{productData.totalSales.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4">Key Features</h3>
                  <div className="w-24 h-1 bg-[#2D1B3D]/60 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {productData.keyFeatures.map((feature, index) => (
                    <div key={index} className="group bg-[#2D1B3D]/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300">
                          <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-[#2D1B3D] text-lg leading-relaxed">{feature}</span>
                      </div>
                    </div>
                  ))}
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
                  {productData.whatYoullLearn.map((item, index) => (
                    <div key={index} className="group bg-[#2D1B3D]/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-colors duration-300">
                          <Zap className="w-6 h-6 text-yellow-600" />
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
                  {productData.tableOfContents.map((chapter, index) => (
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
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .gap-8 {
            gap: 1.5rem;
          }
          
          .lg\\:gap-12 {
            gap: 2rem;
          }
          
          .text-4xl {
            font-size: 1.875rem;
          }
          
          .lg\\:text-5xl {
            font-size: 2.25rem;
          }
          
          .p-6 {
            padding: 1rem;
          }
          
          .p-8 {
            padding: 1.5rem;
          }
          
          .lg\\:p-12 {
            padding: 2rem;
          }
          
          .gap-4 {
            gap: 0.75rem;
          }
          
          .space-y-8 > * + * {
            margin-top: 1.5rem;
          }

          .grid-cols-3 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .grid-cols-2 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .sm\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .md\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .flex-wrap {
            flex-direction: column;
            align-items: stretch;
          }
          
          .gap-8 {
            gap: 1rem;
          }
          
          .space-x-3 {
            flex-direction: column;
            space: 0;
          }
          
          .space-x-3 > * + * {
            margin-left: 0;
            margin-top: 0.75rem;
          }
          
          .flex-col {
            flex-direction: column;
          }
          
          .sm\\:flex-row {
            flex-direction: column;
          }
          
          .justify-center {
            justify-content: center;
          }
          
          .text-center {
            text-align: center;
          }
          
          .mb-12 {
            margin-bottom: 2rem;
          }
          
          .mb-8 {
            margin-bottom: 1.5rem;
          }
          
          .mb-6 {
            margin-bottom: 1rem;
          }
          
          .mb-4 {
            margin-bottom: 0.75rem;
          }
          
          .mb-3 {
            margin-bottom: 0.5rem;
          }
          
          .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          
          .px-8 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .px-6 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
          
          .text-xl {
            font-size: 1.125rem;
          }
          
          .text-2xl {
            font-size: 1.25rem;
          }
          
          .text-3xl {
            font-size: 1.5rem;
          }
          
          .rounded-3xl {
            border-radius: 1rem;
          }
          
          .rounded-2xl {
            border-radius: 0.75rem;
          }
          
          .rounded-xl {
            border-radius: 0.5rem;
          }
          
          .shadow-2xl {
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          }
          
          .shadow-xl {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .transform {
            transform: none;
          }
          
          .hover\\:scale-105:hover {
            transform: none;
          }
          
          .hover\\:scale-110:hover {
            transform: none;
          }
          
          .scale-110 {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSection;







