import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  FileText
} from 'lucide-react';

// Redux Actions
const ADD_BOOK = 'ADD_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';

// Redux Action Creators
const addBook = (book) => ({ type: ADD_BOOK, payload: book });
const updateBook = (book) => ({ type: UPDATE_BOOK, payload: book });
const deleteBook = (id) => ({ type: DELETE_BOOK, payload: id });

// Redux Reducer
const initialBooksState = [
  {
    id: 1,
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    category: 'Self Development',
    price: 150,
    originalPrice: 200,
    pages: 211,
    status: 'active',
    publishedDate: '2024-01-15',
    image: '/api/placeholder/80/100',
    isFeatured: true,
    isHero: false,
    description: 'Transform your mindset and unlock the secrets to wealth and success.',
    overview: 'A classic book on personal development and wealth.',
    whatYouWillLearn: 'Mindset, habits, and strategies for success.',
    oneLiner: 'Unlock the secrets to wealth and success.',
    sections: [
      {
        title: 'Introduction',
        chapters: [
          { title: 'Welcome', thumbnail: null, pdf: null }
        ]
      }
    ]
  }
];

export const booksReducer = (state = initialBooksState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [...state, { ...action.payload, id: Date.now() }];
    case UPDATE_BOOK:
      return state.map(book =>
        book.id === action.payload.id ? action.payload : book
      );
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.payload);
    default:
      return state;
  }
};

const categories = ['All', 'Self Development', 'Technology', 'Business', 'Science', 'Health'];

const BooksManagement = () => {
  const books = useSelector(state => state.books?.books || []);
  const dispatch = useDispatch();
  
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [sections, setSections] = useState([]);
  const [bookCovers, setBookCovers] = useState([]);
  const [overview, setOverview] = useState('');
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('');
  const [oneLiner, setOneLiner] = useState('');

  // Enhanced search - searches by title, author, and category
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
    setModalBook({
      title: '',
      author: '',
      category: '',
      price: '',
      originalPrice: '',
      pages: '',
      status: 'active',
      publishedDate: '',
      image: '',
      isFeatured: false,
      isHero: false,
      description: ''
    });
    setIsEdit(false);
    setShowAddEditModal(true);
    setSections([]);
    setBookCovers([]);
    setOverview('');
    setWhatYouWillLearn('');
    setOneLiner('');
  };

  const openEditModal = (book) => {
    setModalBook({ ...book });
    setIsEdit(true);
    setShowAddEditModal(true);
    setSections(book.sections || []);
    setBookCovers([]);
    setOverview(book.overview || '');
    setWhatYouWillLearn(book.whatYouWillLearn || '');
    setOneLiner(book.oneLiner || '');
  };

  const closeAddEditModal = () => {
    setShowAddEditModal(false);
    setModalBook(null);
  };

  const handleAddEditChange = (field, value) => {
    setModalBook(prev => ({ ...prev, [field]: value }));
  };

  const handleBookCoversChange = (e) => {
    const files = Array.from(e.target.files);
    setBookCovers(prev => [
      ...prev,
      ...files.map((file, idx) => ({ file, isMain: prev.length === 0 && idx === 0 }))
    ]);
  };

  const setMainCover = (idx) => {
    setBookCovers(prev => prev.map((img, i) => ({ ...img, isMain: i === idx })));
  };

  const removeCover = (idx) => {
    setBookCovers(prev => prev.filter((_, i) => i !== idx));
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
      i === secIdx ? { ...sec, chapters: [...sec.chapters, { title: '', thumbnail: null, pdf: null }] } : sec
    ));
  };

  const handleChapterChange = (secIdx, chapIdx, field, value) => {
    setSections(prev => prev.map((sec, i) =>
      i === secIdx ? {
        ...sec,
        chapters: sec.chapters.map((ch, j) => j === chapIdx ? { ...ch, [field]: value } : ch)
      } : sec
    ));
  };

  const handleRemoveChapter = (secIdx, chapIdx) => {
    setSections(prev => prev.map((sec, i) =>
      i === secIdx ? { ...sec, chapters: sec.chapters.filter((_, j) => j !== chapIdx) } : sec
    ));
  };

  const handleAddEditSubmit = (e) => {
    e.preventDefault();
    const bookData = {
      ...modalBook,
      overview,
      whatYouWillLearn,
      oneLiner,
      sections
    };
    
    if (isEdit) {
      dispatch(updateBook(bookData));
    } else {
      dispatch(addBook(bookData));
    }
    closeAddEditModal();
  };

  const openViewModal = (book) => {
    setModalBook(book);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setModalBook(null);
  };

  const handleDelete = (book) => {
    if(window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      dispatch(deleteBook(book.id));
    }
  };

  return (
    <AdminLayout currentPage="Books">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Books Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage your ebook collection</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title, author, category..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2D1B3D]/80 text-white rounded-lg border border-white/10 placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
              />
            </div>
          </div>
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
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm font-semibold"
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Featured</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Hero</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-white/60">No books found.</td>
                </tr>
              ) : (
                filteredBooks.map(book => (
                  <tr key={book.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded-lg border border-white/10" />
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{book.title}</td>
                    <td className="px-4 py-3 text-white/80">{book.author}</td>
                    <td className="px-4 py-3 text-white/80">{book.category}</td>
                    <td className="px-4 py-3 text-white/80">${book.price}</td>
                    <td className="px-4 py-3">{book.isFeatured ? <Star className="w-4 h-4 text-yellow-400" /> : '-'}</td>
                    <td className="px-4 py-3">{book.isHero ? <Zap className="w-4 h-4 text-blue-400" /> : '-'}</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <button onClick={() => openViewModal(book)} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEditModal(book)} className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(book)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {showViewModal && modalBook && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#2D1B3D] rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
              <button onClick={closeViewModal} className="absolute top-4 right-4 text-white/60 hover:text-white"><X className="w-6 h-6" /></button>
              <div className="flex gap-8">
                <img src={modalBook.image} alt={modalBook.title} className="w-32 h-44 object-cover rounded-lg" />
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-bold text-white">{modalBook.title}</h2>
                  <p className="text-white/80">by {modalBook.author}</p>
                  <p className="text-white/60">Category: {modalBook.category}</p>
                  <p className="text-white/60">Price: ${modalBook.price}</p>
                  <p className="text-white/60">{modalBook.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddEditModal && modalBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backdropFilter: 'blur(10px)', background: 'rgba(30, 18, 46, 0.55)'}}>
            <div className="bg-[#2D1B3D]/95 rounded-2xl shadow-2xl w-full p-6 relative overflow-y-auto" style={{maxWidth: 600, maxHeight: 'calc(100vh - 2rem)'}}>
              <button onClick={closeAddEditModal} className="absolute top-3 right-3 text-white/60 hover:text-white z-10"><X className="w-5 h-5" /></button>
              <form onSubmit={handleAddEditSubmit} className="space-y-3">
                <h2 className="text-2xl font-bold text-white mb-4">{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1 text-sm">Title</label>
                    <input type="text" value={modalBook.title} onChange={e => handleAddEditChange('title', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-sm">Author</label>
                    <input type="text" value={modalBook.author} onChange={e => handleAddEditChange('author', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-sm">Category</label>
                    <select value={modalBook.category} onChange={e => handleAddEditChange('category', e.target.value)} className="w-full bg-[#2D1B3D] text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required>
                      <option value="">Select Category</option>
                      {categories.slice(1).map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-sm">Price</label>
                    <input type="number" value={modalBook.price} onChange={e => handleAddEditChange('price', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1 text-sm">Description</label>
                  <textarea value={modalBook.description} onChange={e => handleAddEditChange('description', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" rows={2} required />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 text-sm">Book Cover PDFs</label>
                  <input type="file" accept="application/pdf" multiple onChange={handleBookCoversChange} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 text-sm" />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 text-sm">Overview</label>
                  <textarea value={overview} onChange={e => setOverview(e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" rows={2} />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 text-sm">What you will learn</label>
                  <textarea value={whatYouWillLearn} onChange={e => setWhatYouWillLearn(e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" rows={2} />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 text-sm">One-liner</label>
                  <input type="text" value={oneLiner} onChange={e => setOneLiner(e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" />
                </div>

                {/* Sections */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-white text-sm font-semibold">Sections</h3>
                    <button type="button" onClick={handleAddSection} className="px-3 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg text-xs flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add Section
                    </button>
                  </div>
                  {sections.map((section, secIdx) => (
                    <div key={secIdx} className="bg-[#9B7BB8]/10 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input type="text" value={section.title} onChange={e => handleSectionTitleChange(secIdx, e.target.value)} placeholder="Section Title" className="flex-1 bg-[#2D1B3D]/30 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                        <button type="button" onClick={() => handleRemoveSection(secIdx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      
                      <div className="ml-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/70 text-xs font-semibold">Chapters</span>
                          <button type="button" onClick={() => handleAddChapter(secIdx)} className="px-2 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg text-xs flex items-center gap-1">
                            <Plus className="w-3 h-3" /> Add Chapter
                          </button>
                        </div>
                        {section.chapters.map((chapter, chapIdx) => (
                          <div key={chapIdx} className="flex items-center gap-2 mb-2 bg-[#2D1B3D]/20 p-2 rounded-lg">
                            <input type="text" value={chapter.title} onChange={e => handleChapterChange(secIdx, chapIdx, 'title', e.target.value)} placeholder="Chapter Title" className="flex-1 bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                            <label className="text-white/70 text-xs">Thumbnail
                              <input type="file" accept="image/*" onChange={e => handleChapterChange(secIdx, chapIdx, 'thumbnail', e.target.files[0])} className="block w-full bg-[#9B7BB8]/10 text-white p-1 rounded-lg text-xs mt-1" />
                            </label>
                            <label className="text-white/70 text-xs">PDF
                              <input type="file" accept="application/pdf" onChange={e => handleChapterChange(secIdx, chapIdx, 'pdf', e.target.files[0])} className="block w-full bg-[#9B7BB8]/10 text-white p-1 rounded-lg text-xs mt-1" />
                            </label>
                            <button type="button" onClick={() => handleRemoveChapter(secIdx, chapIdx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input type="checkbox" checked={modalBook.isFeatured} onChange={e => handleAddEditChange('isFeatured', e.target.checked)} />
                    <Star className="w-4 h-4 text-yellow-400" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input type="checkbox" checked={modalBook.isHero} onChange={e => handleAddEditChange('isHero', e.target.checked)} />
                    <Zap className="w-4 h-4 text-blue-400" /> Hero
                  </label>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="submit" className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold">
                    <Save className="w-4 h-4" />
                    <span>{isEdit ? 'Save Changes' : 'Add Book'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BooksManagement;