import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Bookmark, Share2, Star, XCircle } from 'lucide-react';

const MyLibrarySection = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);

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
      readUrl: "#",
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
      readUrl: "#",
      description: "Learn how to fulfill your potential with the right mindset.",
      tags: ["Mindset", "Psychology", "Growth", "Success"]
    }
  ]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 flex items-center justify-between">
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

        {/* Books List Only */}
        {libraryBooks.length > 0 ? (
          <div className="space-y-6">
            {libraryBooks.map(book => (
              <div key={book.id} className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex items-center space-x-4 p-6">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden shadow-lg">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div 
                        className={`h-full ${getProgressColor(book.progress)}`}
                        style={{ width: `${book.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg mb-1">{book.title}</h3>
                      <p className="text-white/60 text-sm">by {book.author}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-white/60 text-sm">{book.format}</span>
                        <span className="text-white/60 text-sm">{book.fileSize}</span>
                        <span className="text-white/60 text-sm">{book.pages} pages</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleBookmarkToggle(book.id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          book.isBookmarked 
                            ? 'bg-[#9B7BB8] text-white' 
                            : 'bg-[#9B7BB8]/20 text-white/60 hover:bg-[#9B7BB8]/30'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${book.isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleViewBookDetails(book)}
                        className="p-2 bg-[#9B7BB8]/20 hover:bg-[#9B7BB8]/30 text-white rounded-lg transition-all duration-200"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                        />
                      ))}
                      <span className="text-white/60 text-sm ml-2">({book.rating})</span>
                    </div>
                    <span className="text-white font-medium">Progress: {book.progress}%</span>
                    <button
                      onClick={() => handleReadBook(book)}
                      className="bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Read</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl">
            <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No books found</h3>
            <p className="text-white/60 mb-6">Your library is empty. Start building your collection!</p>
            <button 
              onClick={() => navigate('/library')}
              className="bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Browse Books
            </button>
          </div>
        )}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLibrarySection; 