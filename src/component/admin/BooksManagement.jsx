import React, { useState } from 'react';
import AdminLayout from './Adminlayout';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  Zap,
  X,
  Save,
  Upload,
  ArrowRight,
  ArrowLeft,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

const categories = ['All', 'Self Development', 'Technology', 'Business', 'Science', 'Health'];

// DUMMY DATA
const initialBooks = [
  {
    id: 1,
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    category: 'Self Development',
    price: 150,
    originalPrice: 200,
    pages: 211,
    rating: 4.8,
    mainImagePdf: null,
    mainImagePdfName: 'book-cover.pdf',
    isFeatured: true,
    isHero: false,
    overviewDescription: 'Transform your mindset and unlock the secrets to wealth and success.',
    carouselItems: [
      { imagePdf: null, imagePdfName: 'carousel1.pdf', description: 'Master the art of power and influence.' }
    ],
    learningPoints: ['Master modern development', 'Learn responsive design'],
    sections: [
      {
        title: 'Introduction',
        chapters: [
          { title: 'Chapter 1', thumbnailPdf: null, thumbnailPdfName: 'thumb1.pdf', chapterPdf: null, chapterPdfName: 'chapter1.pdf' }
        ]
      }
    ]
  }
];

const BooksManagement = () => {
  const [books, setBooks] = useState(initialBooks);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  
  const [currentPhase, setCurrentPhase] = useState(1);
  
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    originalPrice: '',
    pages: 200,
    rating: 4.5,
    mainImagePdf: null,
    mainImagePdfName: '',
    isFeatured: false,
    isHero: false
  });
  
  const [overviewDescription, setOverviewDescription] = useState('');
  const [carouselItems, setCarouselItems] = useState([
    { imagePdf: null, imagePdfName: '', description: '' },
    { imagePdf: null, imagePdfName: '', description: '' },
    { imagePdf: null, imagePdfName: '', description: '' },
    { imagePdf: null, imagePdfName: '', description: '' },
    { imagePdf: null, imagePdfName: '', description: '' }
  ]);

  const [learningPoints, setLearningPoints] = useState(['']);
  const [sections, setSections] = useState([]);

  const filteredBooks = books.filter(book => {
    const matchesCategory = filterCategory === 'All' || book.category === filterCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.category.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  const openAddModal = () => {
    setBasicInfo({
      title: '',
      author: '',
      category: '',
      price: '',
      originalPrice: '',
      pages: 200,
      rating: 4.5,
      mainImagePdf: null,
      mainImagePdfName: '',
      isFeatured: false,
      isHero: false
    });
    setOverviewDescription('');
    setCarouselItems([
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' }
    ]);
    setLearningPoints(['']);
    setSections([]);
    setCurrentPhase(1);
    setIsEdit(false);
    setShowAddEditModal(true);
  };

  const openEditModal = (book) => {
    setBasicInfo({
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      originalPrice: book.originalPrice,
      pages: book.pages,
      rating: book.rating,
      mainImagePdf: book.mainImagePdf,
      mainImagePdfName: book.mainImagePdfName || '',
      isFeatured: book.isFeatured,
      isHero: book.isHero
    });
    setOverviewDescription(book.overviewDescription || '');
    setCarouselItems(book.carouselItems || [
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' },
      { imagePdf: null, imagePdfName: '', description: '' }
    ]);
    setLearningPoints(book.learningPoints || ['']);
    setSections(book.sections || []);
    setCurrentPhase(1);
    setModalBook(book);
    setIsEdit(true);
    setShowAddEditModal(true);
  };

  const closeAddEditModal = () => {
    setShowAddEditModal(false);
    setModalBook(null);
    setCurrentPhase(1);
  };

  const openViewModal = (book) => {
    setModalBook(book);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setModalBook(null);
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setBasicInfo(prev => ({
        ...prev,
        mainImagePdf: file,
        mainImagePdfName: file.name
      }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const goToPhase2 = (e) => {
    e.preventDefault();
    if (!basicInfo.title || !basicInfo.author || !basicInfo.category || !basicInfo.price) {
      alert('Please fill in all required fields (Title, Author, Category, Price)');
      return;
    }
    setCurrentPhase(2);
  };

  const goToPhase3 = (e) => {
    e.preventDefault();
    setCurrentPhase(3);
  };

  const goBackToPhase1 = () => {
    setCurrentPhase(1);
  };

  const goBackToPhase2 = () => {
    setCurrentPhase(2);
  };

  const handleCarouselImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setCarouselItems(prev => prev.map((item, i) => 
        i === index ? { ...item, imagePdf: file, imagePdfName: file.name } : item
      ));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleCarouselDescriptionChange = (index, value) => {
    setCarouselItems(prev => prev.map((item, i) => 
      i === index ? { ...item, description: value } : item
    ));
  };

  const handleAddLearningPoint = () => {
    setLearningPoints(prev => [...prev, '']);
  };

  const handleLearningPointChange = (index, value) => {
    setLearningPoints(prev => prev.map((point, i) => i === index ? value : point));
  };

  const handleRemoveLearningPoint = (index) => {
    if (learningPoints.length > 1) {
      setLearningPoints(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddSection = () => {
    setSections(prev => [...prev, { title: '', chapters: [] }]);
  };

  const handleSectionTitleChange = (idx, value) => {
    setSections(prev => prev.map((sec, i) => i === idx ? { ...sec, title: value } : sec));
  };

  const handleRemoveSection = (idx) => {
    setSections(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddChapter = (secIdx) => {
    setSections(prev => prev.map((sec, i) =>
      i === secIdx ? { 
        ...sec, 
        chapters: [...sec.chapters, { title: '', thumbnailPdf: null, thumbnailPdfName: '', chapterPdf: null, chapterPdfName: '' }] 
      } : sec
    ));
  };

  const handleChapterTitleChange = (secIdx, chapIdx, value) => {
    setSections(prev => prev.map((sec, i) =>
      i === secIdx ? {
        ...sec,
        chapters: sec.chapters.map((ch, j) => j === chapIdx ? { ...ch, title: value } : ch)
      } : sec
    ));
  };

  const handleChapterThumbnailChange = (secIdx, chapIdx, e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSections(prev => prev.map((sec, i) =>
        i === secIdx ? {
          ...sec,
          chapters: sec.chapters.map((ch, j) => 
            j === chapIdx ? { ...ch, thumbnailPdf: file, thumbnailPdfName: file.name } : ch
          )
        } : sec
      ));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleChapterPDFChange = (secIdx, chapIdx, e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSections(prev => prev.map((sec, i) =>
        i === secIdx ? {
          ...sec,
          chapters: sec.chapters.map((ch, j) => 
            j === chapIdx ? { ...ch, chapterPdf: file, chapterPdfName: file.name } : ch
          )
        } : sec
      ));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleRemoveChapter = (secIdx, chapIdx) => {
    setSections(prev => prev.map((sec, i) =>
      i === secIdx ? { ...sec, chapters: sec.chapters.filter((_, j) => j !== chapIdx) } : sec
    ));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    
    const bookData = {
      ...basicInfo,
      overviewDescription,
      carouselItems,
      learningPoints: learningPoints.filter(point => point.trim() !== ''),
      sections
    };
    
    if (isEdit) {
      setBooks(books.map(book => book.id === modalBook.id ? { ...bookData, id: modalBook.id } : book));
    } else {
      setBooks([...books, { ...bookData, id: Date.now() }]);
    }
    
    closeAddEditModal();
  };

  const handleDelete = (book) => {
    if(window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      setBooks(books.filter(b => b.id !== book.id));
    }
  };

  return (
    <AdminLayout currentPage="Books">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Books Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage your ebook collection</p>
        </div>

        {/* Controls - DON'T CHANGE ANYTHING ELSE, JUST FIX THIS PART */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, author, category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2D1B3D]/80 text-white rounded-lg border border-white/10 placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
              />
            </div>
            
            {/* Filter & Button */}
            <div className="flex items-center gap-3">
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-[#2D1B3D] text-white rounded-lg border border-white/10 focus:outline-none focus:border-white/20 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={openAddModal}
                className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm font-semibold whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Add Book</span>
              </button>
            </div>
          </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg bg-[#2D1B3D]/80 border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Author</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Featured</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Hero</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-white/60">No books found.</td>
                </tr>
              ) : (
                filteredBooks.map(book => (
                  <tr key={book.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-10 h-14 bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] rounded-lg flex items-center justify-center text-white font-bold">
                        {book.mainImagePdfName ? 'PDF' : book.title.charAt(0)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{book.title}</td>
                    <td className="px-4 py-3 text-white/80">{book.author}</td>
                    <td className="px-4 py-3 text-white/80">{book.category}</td>
                    <td className="px-4 py-3 text-white/80">${book.price}</td>
                    <td className="px-4 py-3 text-white/80">{book.rating}</td>
                    <td className="px-4 py-3">{book.isFeatured ? <Star className="w-4 h-4 text-yellow-400 fill-current" /> : '-'}</td>
                    <td className="px-4 py-3">{book.isHero ? <Zap className="w-4 h-4 text-blue-400" /> : '-'}</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <button onClick={() => openViewModal(book)} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEditModal(book)} className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(book)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* VIEW MODAL - COMPLETE WITH ALL DETAILS */}
        {showViewModal && modalBook && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2D1B3D] rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
              <button onClick={closeViewModal} className="absolute top-4 right-4 text-white/60 hover:text-white z-10">
                <X className="w-6 h-6" />
              </button>
              
              {/* Book Header */}
              <div className="flex gap-6 mb-6 pb-6 border-b border-white/10">
                <div className="w-32 h-44 bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {modalBook.mainImagePdfName ? 'PDF' : modalBook.title.charAt(0)}
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-3xl font-bold text-white">{modalBook.title}</h2>
                  <p className="text-white/80 text-lg">by {modalBook.author}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="px-3 py-1 bg-[#9B7BB8] text-white rounded-full text-sm font-semibold">
                      {modalBook.category}
                    </span>
                    {modalBook.isFeatured && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                      </span>
                    )}
                    {modalBook.isHero && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                        <Zap className="w-4 h-4" />
                        Hero
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <p className="text-white/50 text-xs">Price</p>
                      <p className="text-white font-bold text-xl">
                        ${modalBook.price} 
                        {modalBook.originalPrice && (
                          <span className="line-through text-white/40 text-sm ml-2">${modalBook.originalPrice}</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Rating</p>
                      <p className="text-white font-semibold text-lg">{modalBook.rating} ⭐</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Pages</p>
                      <p className="text-white font-semibold">{modalBook.pages}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Main Cover</p>
                      {modalBook.mainImagePdfName ? (
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {modalBook.mainImagePdfName}
                        </p>
                      ) : (
                        <p className="text-white/50 text-sm">No file</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-6">
                
                {/* Overview Description */}
                {modalBook.overviewDescription && (
                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Overview:
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">{modalBook.overviewDescription}</p>
                  </div>
                )}

                {/* Carousel Items */}
                {modalBook.carouselItems && modalBook.carouselItems.some(item => item.imagePdfName || item.description) && (
                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Carousel Items:
                    </h3>
                    <div className="space-y-3">
                      {modalBook.carouselItems.map((item, idx) => (
                        (item.imagePdfName || item.description) && (
                          <div key={idx} className="bg-[#2D1B3D]/50 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-white/70 font-semibold text-sm">Item {idx + 1}</span>
                              {item.imagePdfName && (
                                <span className="text-green-400 text-xs flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {item.imagePdfName}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-white/80 text-sm">{item.description}</p>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* What You'll Learn */}
                {modalBook.learningPoints && modalBook.learningPoints.length > 0 && (
                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      What You'll Learn:
                    </h3>
                    <ul className="space-y-2">
                      {modalBook.learningPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                          <span className="text-[#9B7BB8] font-bold mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Table of Contents */}
                {modalBook.sections && modalBook.sections.length > 0 && (
                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Table of Contents: ({modalBook.sections.length} Section{modalBook.sections.length !== 1 ? 's' : ''})
                    </h3>
                    <div className="space-y-3">
                      {modalBook.sections.map((section, secIdx) => (
                        <div key={secIdx} className="bg-[#2D1B3D]/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-white font-bold text-base">{section.title || `Section ${secIdx + 1}`}</h4>
                            <span className="text-white/60 text-xs">{section.chapters.length} chapter{section.chapters.length !== 1 ? 's' : ''}</span>
                          </div>
                          
                          {section.chapters && section.chapters.length > 0 && (
                            <div className="ml-4 space-y-2">
                              {section.chapters.map((chapter, chapIdx) => (
                                <div key={chapIdx} className="bg-[#9B7BB8]/10 rounded-lg p-3">
                                  <p className="text-white font-medium text-sm mb-2">{chapter.title || `Chapter ${chapIdx + 1}`}</p>
                                  <div className="flex items-center gap-3 text-xs">
                                    {chapter.thumbnailPdfName && (
                                      <span className="text-green-400 flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        Thumb: {chapter.thumbnailPdfName}
                                      </span>
                                    )}
                                    {chapter.chapterPdfName && (
                                      <span className="text-blue-400 flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        PDF: {chapter.chapterPdfName}
                                      </span>
                                    )}
                                    {!chapter.thumbnailPdfName && !chapter.chapterPdfName && (
                                      <span className="text-white/40">No files uploaded</span>
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

                {/* Empty State */}
                {!modalBook.overviewDescription && 
                (!modalBook.carouselItems || !modalBook.carouselItems.some(item => item.imagePdfName || item.description)) &&
                (!modalBook.learningPoints || modalBook.learningPoints.length === 0) &&
                (!modalBook.sections || modalBook.sections.length === 0) && (
                  <div className="text-center py-8 text-white/40">
                    <p>No additional content added yet.</p>
                  </div>
                )}

              </div>

              {/* Close Button */}
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button 
                  onClick={closeViewModal}
                  className="px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backdropFilter: 'blur(10px)', background: 'rgba(30, 18, 46, 0.55)'}}>
            <div className="bg-[#2D1B3D]/95 rounded-2xl shadow-2xl w-full p-6 relative overflow-y-auto" style={{maxWidth: 800, maxHeight: 'calc(100vh - 2rem)'}}>
              <button onClick={closeAddEditModal} className="absolute top-3 right-3 text-white/60 hover:text-white z-10">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center mb-6 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap ${currentPhase === 1 ? 'bg-[#9B7BB8] text-white' : 'bg-white/10 text-white/60'}`}>
                    <span className="font-bold">1</span>
                    <span className="text-xs">Basic Info</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap ${currentPhase === 2 ? 'bg-[#9B7BB8] text-white' : 'bg-white/10 text-white/60'}`}>
                    <span className="font-bold">2</span>
                    <span className="text-xs">Overview</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap ${currentPhase === 3 ? 'bg-[#9B7BB8] text-white' : 'bg-white/10 text-white/60'}`}>
                    <span className="font-bold">3</span>
                    <span className="text-xs">Content</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {isEdit ? 'Edit Book' : 'Add New Book'}
              </h2>

              {currentPhase === 1 && (
                <form onSubmit={goToPhase2} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Title *</label>
                      <input 
                        type="text" 
                        value={basicInfo.title} 
                        onChange={e => handleBasicInfoChange('title', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Author *</label>
                      <input 
                        type="text" 
                        value={basicInfo.author} 
                        onChange={e => handleBasicInfoChange('author', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Category *</label>
                      <select 
                        value={basicInfo.category} 
                        onChange={e => handleBasicInfoChange('category', e.target.value)} 
                        className="w-full bg-[#2D1B3D] text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.slice(1).map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Price *</label>
                      <input 
                        type="number" 
                        value={basicInfo.price} 
                        onChange={e => handleBasicInfoChange('price', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Original Price</label>
                      <input 
                        type="number" 
                        value={basicInfo.originalPrice} 
                        onChange={e => handleBasicInfoChange('originalPrice', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Pages</label>
                      <input 
                        type="number" 
                        value={basicInfo.pages} 
                        onChange={e => handleBasicInfoChange('pages', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-white/70 mb-1 text-sm">Rating (0-5)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        min="0"
                        max="5"
                        value={basicInfo.rating} 
                        onChange={e => handleBasicInfoChange('rating', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-2 text-sm flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Main Book Cover (PDF)
                    </label>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={handleMainImageUpload} 
                      className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#9B7BB8] file:text-white hover:file:bg-[#8A6AA7] file:cursor-pointer" 
                    />
                    {basicInfo.mainImagePdfName && (
                      <p className="text-green-400 text-xs mt-2">✓ {basicInfo.mainImagePdfName}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={basicInfo.isFeatured} 
                        onChange={e => handleBasicInfoChange('isFeatured', e.target.checked)} 
                        className="w-4 h-4"
                      />
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Featured</span>
                    </label>
                    <label className="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={basicInfo.isHero} 
                        onChange={e => handleBasicInfoChange('isHero', e.target.checked)} 
                        className="w-4 h-4"
                      />
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span>Hero</span>
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold"
                    >
                      <span>Next: Overview & Carousel</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {currentPhase === 2 && (
                <form onSubmit={goToPhase3} className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm">
                      <strong>Book:</strong> {basicInfo.title} by {basicInfo.author}
                    </p>
                  </div>

                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Overview Description
                    </h3>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Main Description</label>
                      <textarea 
                        value={overviewDescription} 
                        onChange={e => setOverviewDescription(e.target.value)} 
                        className="w-full bg-[#2D1B3D]/30 text-white p-3 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        rows={3}
                        placeholder="Transform your mindset and unlock the secrets to wealth and success..."
                      />
                    </div>
                  </div>

                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Carousel Items (5 Fixed)
                    </h3>
                    <div className="space-y-4">
                      {carouselItems.map((item, index) => (
                        <div key={index} className="bg-[#2D1B3D]/30 rounded-lg p-3">
                          <p className="text-white/70 text-xs font-semibold mb-2">Carousel Item {index + 1}</p>
                          
                          <div className="mb-3">
                            <label className="block text-white/60 text-xs mb-1 flex items-center gap-1">
                              <Upload className="w-3 h-3" />
                              Book Image (PDF)
                            </label>
                            <input 
                              type="file" 
                              accept="application/pdf" 
                              onChange={e => handleCarouselImageChange(index, e)} 
                              className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg text-xs file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-[#9B7BB8] file:text-white hover:file:bg-[#8A6AA7] file:cursor-pointer" 
                            />
                            {item.imagePdfName && (
                              <p className="text-green-400 text-[10px] mt-1">✓ {item.imagePdfName}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-white/60 text-xs mb-1">Description</label>
                            <textarea 
                              value={item.description} 
                              onChange={e => handleCarouselDescriptionChange(index, e.target.value)} 
                              className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" 
                              rows={2}
                              placeholder="Master the art of power and influence..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button"
                      onClick={goBackToPhase1}
                      className="flex items-center space-x-2 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button 
                      type="submit" 
                      className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold"
                    >
                      <span>Next: Content</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {currentPhase === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm">
                      <strong>Book:</strong> {basicInfo.title} by {basicInfo.author}
                    </p>
                  </div>

                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        What You'll Learn
                      </h3>
                      <button 
                        type="button" 
                        onClick={handleAddLearningPoint} 
                        className="px-3 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Point
                      </button>
                    </div>

                    <div className="space-y-2">
                      {learningPoints.map((point, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input 
                            type="text" 
                            value={point} 
                            onChange={e => handleLearningPointChange(index, e.target.value)} 
                            className="flex-1 bg-[#2D1B3D]/30 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                            placeholder={`Learning point ${index + 1}`}
                          />
                          {learningPoints.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => handleRemoveLearningPoint(index)} 
                              className="text-red-400 hover:text-red-600 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Table of Contents
                      </h3>
                      <button 
                        type="button" 
                        onClick={handleAddSection} 
                        className="px-3 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg text-xs flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Section
                      </button>
                    </div>

                    {sections.length === 0 && (
                      <div className="text-center py-6 text-white/60 bg-[#2D1B3D]/30 rounded-lg">
                        <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No sections yet. Click "Add Section".</p>
                      </div>
                    )}

                    {sections.map((section, secIdx) => (
                      <div key={secIdx} className="bg-[#2D1B3D]/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <input 
                            type="text" 
                            value={section.title} 
                            onChange={e => handleSectionTitleChange(secIdx, e.target.value)} 
                            placeholder={`Section ${secIdx + 1} Title (e.g., "Introduction")`}
                            className="flex-1 bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm font-medium" 
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSection(secIdx)} 
                            className="text-red-400 hover:text-red-600 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="ml-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/70 text-xs font-semibold">Chapters</span>
                            <button 
                              type="button" 
                              onClick={() => handleAddChapter(secIdx)} 
                              className="px-2 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg text-xs flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              Add Chapter
                            </button>
                          </div>

                          {section.chapters.length === 0 && (
                            <div className="text-center py-3 text-white/50 bg-[#9B7BB8]/10 rounded-lg text-xs">
                              No chapters. Click "Add Chapter".
                            </div>
                          )}

                          {section.chapters.map((chapter, chapIdx) => (
                            <div key={chapIdx} className="bg-[#9B7BB8]/10 p-3 rounded-lg mb-2">
                              <div className="flex items-center gap-2 mb-2">
                                <input 
                                  type="text" 
                                  value={chapter.title} 
                                  onChange={e => handleChapterTitleChange(secIdx, chapIdx, e.target.value)} 
                                  placeholder={`Chapter ${chapIdx + 1} Title`}
                                  className="flex-1 bg-[#2D1B3D]/30 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" 
                                />
                                <button 
                                  type="button" 
                                  onClick={() => handleRemoveChapter(secIdx, chapIdx)} 
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-white/60 text-xs block mb-1 flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    Thumbnail (PDF)
                                  </label>
                                  <input 
                                    type="file" 
                                    accept="application/pdf" 
                                    onChange={e => handleChapterThumbnailChange(secIdx, chapIdx, e)} 
                                    className="w-full bg-[#2D1B3D]/30 text-white p-1.5 rounded-lg text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-[#9B7BB8] file:text-white hover:file:bg-[#8A6AA7] file:cursor-pointer" 
                                  />
                                  {chapter.thumbnailPdfName && (
                                    <p className="text-green-400 text-[9px] mt-1">✓ {chapter.thumbnailPdfName}</p>
                                  )}
                                </div>

                                <div>
                                  <label className="text-white/60 text-xs block mb-1 flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    Chapter PDF
                                  </label>
                                  <input 
                                    type="file" 
                                    accept="application/pdf" 
                                    onChange={e => handleChapterPDFChange(secIdx, chapIdx, e)} 
                                    className="w-full bg-[#2D1B3D]/30 text-white p-1.5 rounded-lg text-[10px] file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-[#9B7BB8] file:text-white hover:file:bg-[#8A6AA7] file:cursor-pointer" 
                                  />
                                  {chapter.chapterPdfName && (
                                    <p className="text-green-400 text-[9px] mt-1">✓ {chapter.chapterPdfName}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button 
                      type="button"
                      onClick={goBackToPhase2}
                      className="flex items-center space-x-2 px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-semibold"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button 
                      type="submit" 
                      className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isEdit ? 'Save Changes' : 'Create Book'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BooksManagement;