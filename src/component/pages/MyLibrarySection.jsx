import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Play, Bookmark, Share2, Star, XCircle, Download } from 'lucide-react';
import { useRef } from 'react';


const sectionChapters = {
  s1: [
    {
      id: 'c1',
      title: 'Overview',
      pages: 12,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300'
    },
    {
      id: 'c2',
      title: 'Background',
      pages: 18,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300'
    },
  ],

  s2: [
    {
      id: 'c1',
      title: 'Desire Defined',
      pages: 10,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300'
    },
  ],
};


const ViewToggle = ({ value, onChange }) => {
  return (
    <div
      className="
        flex items-center
        bg-white/70
        rounded-full
        p-[2px]
        shadow
        sm:p-1 sm:shadow-md
      "
    >
      {/* List */}
      <button
        onClick={() => onChange('list')}
        className={`
          flex items-center justify-center
          w-7 h-6 sm:w-10 sm:h-8
          rounded-full transition
          ${value === 'list'
            ? 'bg-[#9B7BB8] text-white'
            : 'text-[#2D1B3D]'
          }
        `}
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="4" y="6" width="16" height="2" />
          <rect x="4" y="11" width="16" height="2" />
          <rect x="4" y="16" width="16" height="2" />
        </svg>
      </button>

      {/* Grid */}
      <button
        onClick={() => onChange('grid')}
        className={`
          flex items-center justify-center
          w-7 h-6 sm:w-10 sm:h-8
          rounded-full transition
          ${value === 'grid'
            ? 'bg-[#9B7BB8] text-white'
            : 'text-[#2D1B3D]'
          }
        `}
      >
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <rect x="14" y="14" width="6" height="6" />
        </svg>
      </button>
    </div>
  );
};


const MyLibrarySection = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
const [currentBook, setCurrentBook] = useState(null); // null = library view

  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviewModal, setReviewModal] = useState({ open: false, book: null });
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const reviewInputRef = useRef();


const bookSections = {
  1: [
    { id: 's1', title: 'Introduction', pages: 30 },
    { id: 's2', title: 'Desire', pages: 22 },
    { id: 's3', title: 'Faith', pages: 28 },
  ],
};



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

  // Sort by purchase date (most recent first)
  const sortedBooks = [...libraryBooks].sort((a, b) => {
    return new Date(b.purchaseDate) - new Date(a.purchaseDate);
  });

  // const handleReadBook = (book) => {
  //   // Navigate to a reading interface or open book viewer
  //   navigate(`/read/${book.id}`, { 
  //     state: { 
  //       book: book,
  //       returnTo: '/my-library' 
  //     } 
  //   });
  // };

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
    if (progress >= 80) return 'text-green-500';
    if (progress >= 50) return 'text-yellow-500';
    return 'text-blue-500';
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

  const openBook = (book) => {
  setCurrentBook(book);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-semibold text-[#2D1B3D]">
    My Library
  </h1>

  {/* Drive-style view toggle */}
<ViewToggle
  value={viewMode}
  onChange={setViewMode}
/>



</div>


        {/* Books List or Empty State */}
      {!currentBook ? (
  <div className="bg-[#2D1B3D]/95 rounded-3xl shadow-2xl overflow-hidden">
    {viewMode === 'grid'
      ? <GridView books={sortedBooks} onSelect={openBook} />
      : <ListView books={sortedBooks} onSelect={openBook} />
    }
  </div>
) : (
  <>
    {/* Breadcrumb */}
    <div className="flex items-center justify-between mb-4">
  {/* Breadcrumb */}
<div className="flex items-center gap-2 text-white/70 text-sm">
  <button
  onClick={() => {
    setCurrentBook(null);
    setCurrentSection(null);
  }}
  className="hover:text-white"
>
  My Library
</button>

  <span>/</span>

  <button onClick={() => setCurrentSection(null)} className="hover:text-white">
    {currentBook.title}
  </button>

  {currentSection && (
    <>
      <span>/</span>
      <span className="text-white font-medium">
        {currentSection.title}
      </span>
    </>
  )}
</div>


  {/* Section view toggle */}
 

</div>


    {/* Sections */}
{/* Sections or Chapters */}
{!currentSection ? (
  viewMode === 'grid' ? (
    <SectionGrid
      sections={bookSections[currentBook.id] || []}
      setCurrentSection={setCurrentSection}
    />
  ) : (
    <SectionList
      sections={bookSections[currentBook.id] || []}
      setCurrentSection={setCurrentSection}
    />
  )
) : (
  viewMode === 'grid' ? (
    <ChapterGrid chapters={sectionChapters[currentSection.id] || []} />
  ) : (
    <ChapterList chapters={sectionChapters[currentSection.id] || []} />
  )
)}


  </>
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
                    {/* Progress Percentage */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-2 rounded-lg">
                      <span className={`font-bold ${getProgressColor(selectedBook.progress)}`}>
                        {selectedBook.progress}% Complete
                      </span>
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
                      <p className={`font-medium ${getProgressColor(selectedBook.progress)}`}>{selectedBook.progress}%</p>
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
                      onClick={() => setCurrentBook(selectedBook)}
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

const GridView = ({ books, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
      {books.map(book => (
        <button
          key={book.id}
          onClick={() => onSelect(book)}
          className="bg-[#3A2450] rounded-xl p-3 text-left hover:bg-[#4A2F66] transition"
        >
          <div className="relative">
            <div className="w-full aspect-[210/297] rounded-lg bg-black/20 overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
              {book.progress}%
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-white font-semibold text-sm line-clamp-2">
              {book.title}
            </h3>
            <p className="text-white/60 text-xs mt-1">
              {book.author}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};


const ListView = ({ books, onSelect }) => {
  return (
    <div className="p-6 space-y-2">
      <div className="grid grid-cols-[2.5fr_1.5fr_1fr_1fr] px-4 pb-3 text-white/60 text-sm border-b border-white/20">
        <div>Title</div>
        <div>Author</div>
        <div className="text-center">Pages</div>
        <div className="text-center">Progress</div>
      </div>

      {books.map(book => (
        <button
          key={book.id}
          onClick={() => onSelect(book)}
          className="w-full grid grid-cols-[2.5fr_1.5fr_1fr_1fr]
           gap-x-6
           items-center px-4 py-4 rounded-xl
           bg-[#3A2450]/70 hover:bg-[#4A2F66]
           transition text-left"
        >
          <div className="text-white font-medium">{book.title}</div>
          <div className="text-white/80">{book.author}</div>
          <div className="text-center text-white/80">{book.pages}</div>
          <div className="text-center font-semibold text-white">
            {book.progress}%
          </div>
        </button>
      ))}
    </div>
  );
};

const SectionGrid = ({ sections, setCurrentSection }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,150px)] gap-6">
      {sections.map((section, index) => (
        <div
  key={section.id}
  onClick={() => setCurrentSection(section)}
  className="border-2 border-white bg-[#3A2450] rounded-xl hover:bg-[#4A2F66] transition cursor-pointer"
>
         <div className="w-[150px] aspect-[210/297] rounded-lg bg-[#9B7BB8]/20
                flex flex-col items-center justify-center gap-2 px-3 text-center">

  {/* Section number */}
  <span className="text-white/60 text-xs tracking-wide">
    Section {index + 1}
  </span>

  {/* Section title */}
  <span className="text-white font-semibold text-sm leading-snug">
    {section.title}
  </span>
</div>

        </div>
      ))}
    </div>
  );
};
const SectionList = ({ sections, setCurrentSection }) => {
  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => setCurrentSection(section)}
          className="w-full flex items-center
                     px-4 py-4 rounded-xl
                     bg-[#3A2450]/70 hover:bg-[#4A2F66]
                     transition text-left"
        >
          {/* Section number */}
          <div className="w-10 text-white/60 text-sm font-medium">
            {index + 1}.
          </div>

          {/* Section title */}
          <div className="flex-1 text-white font-medium">
            {section.title}
          </div>

          {/* Pages (right corner) */}
          <div className="text-white/70 text-sm whitespace-nowrap">
            {section.pages ?? '--'} pages
          </div>
        </button>
      ))}
    </div>
  );
};


const ChapterGrid = ({ chapters }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,150px)] gap-6">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className="bg-[#3A2450] rounded-xl hover:bg-[#4A2F66]
                     transition cursor-pointer"
        >
          <div className="w-[150px] aspect-[210/297] rounded-lg overflow-hidden relative">

            {/* Image */}
            <img
              src={chapter.image}
              alt={chapter.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col
                            items-center justify-center gap-2 px-3 text-center">

              <span className="text-white/70 text-xs">
                Chapter {index + 1}
              </span>

              <span className="text-white font-semibold text-sm leading-snug">
                {chapter.title}
              </span>

              <span className="text-white/80 text-xs">
                {chapter.pages} pages
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ChapterList = ({ chapters }) => {
  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className="w-full flex items-center gap-4
                     px-4 py-4 rounded-xl
                     bg-[#3A2450]/70 hover:bg-[#4A2F66]
                     transition"
        >
          {/* Thumbnail */}
          <img
            src={chapter.image}
            alt={chapter.title}
            className="w-12 aspect-[210/297] rounded object-cover"
          />

          {/* Title + chapter number */}
          <div className="flex-1">
            <div className="text-white/60 text-xs">
              Chapter {index + 1}
            </div>
            <div className="text-white font-medium">
              {chapter.title}
            </div>
          </div>

          {/* Pages (right aligned) */}
          <div className="text-white/70 text-sm whitespace-nowrap">
            {chapter.pages} pages
          </div>

          {/* Read button (right-most) */}
          <button
            className="ml-4 px-4 py-1.5 rounded-lg
                       bg-[#9B7BB8] text-white text-sm font-medium
                       hover:bg-[#8A6AA7] transition"
          >
            Read
          </button>
        </div>
      ))}
    </div>
  );
};


export default MyLibrarySection;