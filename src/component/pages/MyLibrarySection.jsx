import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Bookmark, Share2, Star, XCircle, Download } from 'lucide-react';
import { useRef } from 'react';

const MyLibrarySection = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'purchase'
  const [reviewModal, setReviewModal] = useState({ open: false, book: null });
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const reviewInputRef = useRef();

  // Mock library data - in real app this would come from API
  const [libraryBooks] = useState([
    {
      id: 1,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      category: "Self Development",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      format: "E-Book",
      fileSize: "2.4 MB",
      pages: 320,
      rating: 4.8,
      reviews: 234,
      purchaseDate: "2024-01-15",
      lastRead: "2024-01-20",
      progress: 65, // percentage read
      isBookmarked: true,
      readUrl: "#",
      downloadUrl: "#",
      description: "Transform your mindset and unlock the secrets to wealth and success.",
      tags: ["Success", "Mindset", "Wealth", "Motivation"]
    },
    {
      id: 2,
      title: "48 Laws of Power",
      author: "Robert Greene",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      format: "E-Book",
      fileSize: "3.1 MB",
      pages: 452,
      rating: 4.6,
      reviews: 189,
      purchaseDate: "2024-01-15",
      lastRead: "2024-01-18",
      progress: 45,
      isBookmarked: false,
      readUrl: "#",
      // no downloadUrl for this one
      description: "Master the art of power and influence in every aspect of life.",
      tags: ["Power", "Influence", "Strategy", "Leadership"]
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      format: "E-Book",
      fileSize: "2.8 MB",
      pages: 320,
      rating: 4.9,
      reviews: 456,
      purchaseDate: "2024-01-15",
      lastRead: "2024-01-22",
      progress: 85,
      isBookmarked: true,
      readUrl: "#",
      downloadUrl: "#",
      description: "Build good habits, break bad ones, and get 1% better every day.",
      tags: ["Habits", "Productivity", "Self-Improvement", "Behavior"]
    },
    {
      id: 4,
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey",
      category: "Self Development",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
      format: "E-Book",
      fileSize: "2.9 MB",
      pages: 381,
      rating: 4.7,
      reviews: 312,
      purchaseDate: "2024-01-10",
      lastRead: "2024-01-12",
      progress: 30,
      isBookmarked: false,
      // no readUrl or downloadUrl
      description: "A powerful lesson in personal change and effectiveness.",
      tags: ["Effectiveness", "Leadership", "Personal Development", "Success"]
    },
    {
      id: 5,
      title: "Mindset: The New Psychology of Success",
      author: "Carol Dweck",
      category: "Psychology",
      image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop",
      format: "E-Book",
      fileSize: "2.2 MB",
      pages: 288,
      rating: 4.5,
      reviews: 278,
      purchaseDate: "2024-01-10",
      lastRead: "2024-01-15",
      progress: 55,
      isBookmarked: true,
      // only downloadUrl
      downloadUrl: "#",
      description: "Learn how to fulfill your potential with the right mindset.",
      tags: ["Mindset", "Psychology", "Growth", "Success"]
    }
  ]);

  // Sort logic
  const sortedBooks = [...libraryBooks].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.lastRead) - new Date(a.lastRead);
    } else {
      return new Date(b.purchaseDate) - new Date(a.purchaseDate);
    }
  });

  const handleReadBook = (book) => {
    alert(`Opening ${book.title} in e-reader...`);
  };

  const handleBookmarkToggle = (bookId) => {
    // In real app, this would update the bookmark status
    alert(`Toggling bookmark for book ${bookId}`);
  };

  const handleShareBook = (book) => {
    alert(`Sharing ${book.title}...`);
  };

  const handleViewBookDetails = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  function openReviewModal(book) {
    setReviewModal({ open: true, book });
    setReviewRating(0);
    setReviewText('');
    setReviewSuccess(false);
    setTimeout(() => {
      if (reviewInputRef.current) reviewInputRef.current.focus();
    }, 200);
  }
  function closeReviewModal() {
    setReviewModal({ open: false, book: null });
    setReviewSuccess(false);
  }
  function submitReview() {
    setReviewSuccess(true);
    setTimeout(() => {
      closeReviewModal();
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Desktop (sm+) header matches OrderHistorySection */}
          <div className="hidden sm:block p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Back to Profile</span>
                </button>
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-[#9B7BB8] mr-3" />
                  <h1 className="text-2xl font-bold text-white">My Library</h1>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Total Books</p>
                <p className="text-white font-bold text-xl">{libraryBooks.length}</p>
              </div>
            </div>
          </div>
          {/* Mobile (below sm) improved layout */}
          <div className="sm:hidden p-3">
            <div className="flex items-center justify-between w-full">
              {/* Left: Back arrow, icon, and My Library */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                </button>
                <BookOpen className="w-5 h-5 text-[#9B7BB8]" />
                <h1 className="text-base font-bold text-white">My Library</h1>
              </div>
              {/* Right: Total Books */}
              <div className="flex flex-col items-end justify-center">
                <span className="text-white/60 text-xs leading-tight">Total Books</span>
                <span className="text-white font-bold text-sm leading-tight">{libraryBooks.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex justify-end mt-2 mb-4 gap-2">
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] ${sortBy === 'recent' ? 'bg-[#9B7BB8] text-white' : 'bg-white text-[#9B7BB8]'}`}
            onClick={() => setSortBy('recent')}
          >
            Recently Accessed
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] ${sortBy === 'purchase' ? 'bg-[#9B7BB8] text-white' : 'bg-white text-[#9B7BB8]'}`}
            onClick={() => setSortBy('purchase')}
          >
            Purchase Date
          </button>
        </div>

        {/* Books List or Empty State */}
        {sortedBooks.length > 0 ? (
          <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden p-0">
            <div className="divide-y divide-[#9B7BB8]/30">
              {sortedBooks.map((book, idx) => (
                <div
                  key={book.id}
                  className={`flex flex-col sm:flex-row items-center px-2 sm:px-6 py-4 sm:py-6 transition-all duration-200 group hover:bg-[#9B7BB8]/10 rounded-2xl sm:rounded-3xl mb-2 sm:mb-4 w-full`}
                  style={{ position: 'relative', minHeight: 'unset' }}
                >
                  {/* Mobile: image left, content right, buttons below */}
                  <div className="flex sm:hidden w-full">
                    <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden shadow-md mr-3">
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-bold text-base leading-tight mb-0.5">{book.title}</h3>
                        <p className="text-white/60 text-xs mb-1">by {book.author}</p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                          <span className="text-white/50 text-xs">{book.format}</span>
                          <span className="text-white/50 text-xs">{book.fileSize}</span>
                          <span className="text-white/50 text-xs">{book.pages} pages</span>
                        </div>
                        <div className="text-white/50 text-xs mb-0.5">Purchased: {book.purchaseDate}</div>
                        <div className="text-white/50 text-xs mb-1">Last Accessed: {book.lastRead}</div>
                      </div>
                      <div className="flex gap-2 mt-2 justify-center">
                        {book.readUrl && (
                          <button
                            onClick={() => handleReadBook(book)}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#9B7BB8] text-white font-semibold hover:bg-[#8A6AA7] transition text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                          >
                            <Play className="w-4 h-4" /> View
                          </button>
                        )}
                        {book.purchaseDate && (
                          <button
                            onClick={() => openReviewModal(book)}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-[#9B7BB8] text-[#9B7BB8] bg-white font-semibold hover:bg-[#9B7BB8] hover:text-white transition text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                          >
                            <Star className="w-4 h-4" /> Add Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Desktop/tablet: existing layout */}
                  <div className="hidden sm:flex-1 sm:flex sm:flex-row sm:items-center sm:justify-between w-full ml-0">
                    <div className="flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden shadow-md mr-3">
                      <div className="relative w-full h-full">
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div 
                            className={`h-full ${getProgressColor(book.progress)}`}
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 ml-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#ffe9b3] transition-colors duration-200">{book.title}</h3>
                        <p className="text-white/60 text-sm">by {book.author}</p>
                        <div className="flex items-center space-x-4 mt-2 flex-wrap">
                          <span className="text-white/60 text-sm">{book.format}</span>
                          <span className="text-white/60 text-sm">{book.fileSize}</span>
                          <span className="text-white/60 text-sm">{book.pages} pages</span>
                          <span className="text-white/60 text-sm">Purchased: {book.purchaseDate}</span>
                          <span className="text-white/60 text-sm">Last Accessed: {book.lastRead}</span>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 mt-4 sm:mt-0 sm:ml-8 sm:justify-center sm:items-center w-full sm:w-auto justify-center">
                        {book.readUrl && (
                          <button
                            onClick={() => handleReadBook(book)}
                            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-[#9B7BB8] text-white font-semibold hover:bg-[#8A6AA7] transition text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                          >
                            <Play className="w-4 h-4" /> View
                          </button>
                        )}
                        {book.purchaseDate && (
                          <button
                            onClick={() => openReviewModal(book)}
                            className="flex items-center gap-1 px-5 py-2 rounded-lg border border-[#9B7BB8] text-[#9B7BB8] bg-white font-semibold hover:bg-[#9B7BB8] hover:text-white transition text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                          >
                            <Star className="w-5 h-5" /> Add Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <BookOpen className="w-16 h-16 text-[#9B7BB8] mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">No Books Yet</h2>
            <p className="text-white/70 mb-6">You haven’t purchased any books yet. Explore our library and start reading!</p>
            <button
              onClick={() => navigate('/library')}
              className="px-8 py-3 rounded-xl bg-[#9B7BB8] text-white font-bold hover:bg-[#8A6AA7] transition"
            >
              Browse Library
            </button>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full max-h-[calc(100%-2rem)] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Book Details</h2>
                <button
                  onClick={closeBookDetails}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Book Cover */}
                <div className="md:col-span-1">
                  <div className="relative">
                    <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                      <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-auto" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20">
                      <div 
                        className={`h-full ${getProgressColor(selectedBook.progress)} transition-all duration-300`}
                        style={{ width: `${selectedBook.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedBook.title}</h3>
                    <p className="text-white/60 text-lg mb-4">by {selectedBook.author}</p>
                    <p className="text-white/80">{selectedBook.description}</p>
                  </div>

                  {/* Book Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                      <p className="text-white/60 text-sm mb-1">Format</p>
                      <p className="text-white font-medium">{selectedBook.format}</p>
                    </div>
                    <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                      <p className="text-white/60 text-sm mb-1">File Size</p>
                      <p className="text-white font-medium">{selectedBook.fileSize}</p>
                    </div>
                    <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                      <p className="text-white/60 text-sm mb-1">Pages</p>
                      <p className="text-white font-medium">{selectedBook.pages}</p>
                    </div>
                    <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                      <p className="text-white/60 text-sm mb-1">Progress</p>
                      <p className="text-white font-medium">{selectedBook.progress}%</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <p className="text-white/60 text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.tags.map(tag => (
                        <span key={tag} className="bg-[#9B7BB8]/20 text-white px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      onClick={() => handleReadBook(selectedBook)}
                      className="flex-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Continue Reading</span>
                    </button>
                    <button
                      onClick={() => handleShareBook(selectedBook)}
                      className="bg-[#9B7BB8]/20 hover:bg-[#9B7BB8]/30 text-white p-3 rounded-xl transition-all duration-200"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openReviewModal(selectedBook)}
                      className="flex items-center gap-1 px-6 py-3 rounded-xl border border-[#9B7BB8] text-[#9B7BB8] bg-white font-medium hover:bg-[#9B7BB8] hover:text-white transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                    >
                      <Star className="w-5 h-5" /> Add Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {reviewModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button onClick={closeReviewModal} className="absolute top-4 right-4 text-[#9B7BB8] hover:text-[#2D1B3D]">
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-[#2D1B3D] mb-2">Add Review</h2>
            <p className="text-[#2D1B3D]/70 mb-4">for <span className="font-semibold">{reviewModal.book?.title}</span></p>
            <div className="flex items-center gap-2 mb-4">
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${reviewRating >= star ? 'fill-[#9B7BB8] text-[#9B7BB8]' : 'text-gray-300'}`}
                  onClick={() => setReviewRating(star)}
                />
              ))}
            </div>
            <textarea
              ref={reviewInputRef}
              className="w-full border border-[#9B7BB8]/30 rounded-lg p-3 text-[#2D1B3D] focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] mb-4 min-h-[80px]"
              placeholder="Write your review..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              maxLength={500}
            />
            <button
              onClick={submitReview}
              disabled={reviewRating === 0 || reviewText.trim() === ''}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] text-white font-bold hover:from-[#8A6AA7] hover:to-[#9B7BB8] transition-all duration-200 disabled:opacity-60"
            >
              Submit Review
            </button>
            {reviewSuccess && (
              <div className="mt-4 text-green-600 font-semibold text-center">Thank you for your review!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLibrarySection; 