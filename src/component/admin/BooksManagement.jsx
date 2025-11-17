import React, { useState, useRef } from 'react';
import AdminLayout from './Adminlayout';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  Download,
  Upload,
  Zap,
  X,
  Save,
  FileText
} from 'lucide-react';

const initialBooks = [
  {
    id: 1,
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    category: 'Self Development',
    price: 150,
    pages: 211,
    status: 'active',
    publishedDate: '2024-01-15',
    coverImages: [
      { url: '/api/placeholder/80/100', isMain: true },
      { url: '/api/placeholder/80/101', isMain: false }
    ],
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
          { title: 'Welcome', pdf: null }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    author: 'John Smith',
    category: 'Technology',
    price: 200,
    pages: 320,
    status: 'active',
    publishedDate: '2024-02-20',
    coverImages: [
      { url: '/api/placeholder/80/200', isMain: true },
      { url: '/api/placeholder/80/201', isMain: false }
    ],
    isFeatured: false,
    isHero: true,
    description: 'Master advanced React patterns for scalable applications.',
    overview: 'Deep dive into React best practices.',
    whatYouWillLearn: 'Hooks, context, and scalable architecture.',
    oneLiner: 'Master React for production.',
    sections: [
      {
        title: 'Hooks',
        chapters: [
          { title: 'useEffect Deep Dive', pdf: null }
        ]
      }
    ]
  }
];

// Use the same categories array for both filter and add book modal
const categories = ['All', 'Self Development', 'Technology', 'Business', 'Science', 'Health'];

const BooksManagement = () => {
  const [books, setBooks] = useState(initialBooks);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef();
  const imageInputRef = useRef();
  const [pdfFileName, setPdfFileName] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [sections, setSections] = useState([]);
  const [bookCover, setBookCover] = useState(null);
  const [overview, setOverview] = useState('');
  const [whatYouWillLearn, setWhatYouWillLearn] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [bookCovers, setBookCovers] = useState([]); // [{file, isMain}]

  // Filtered books
  const filteredBooks = books.filter(book => {
    const matchesCategory = filterCategory === 'All' || book.category === filterCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Import handler
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        let importedBooks;
        if (file.name.endsWith('.json')) {
          importedBooks = JSON.parse(event.target.result);
        } else if (file.name.endsWith('.csv')) {
          const lines = event.target.result.split('\n');
          const headers = lines[0].split(',');
          importedBooks = lines.slice(1).filter(Boolean).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((header, i) => {
              obj[header.trim()] = values[i]?.trim();
            });
            return obj;
          });
        }
        setBooks(prev => [...prev, ...importedBooks]);
        alert('Books imported successfully!');
      } catch {
        alert('Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  // Export handler
  const handleExport = (type = 'json') => {
    let dataStr;
    let fileName;
    if (type === 'json') {
      dataStr = JSON.stringify(books, null, 2);
      fileName = 'books.json';
    } else {
      const headers = Object.keys(books[0] || {}).join(',');
      const rows = books.map(book => Object.values(book).join(','));
      dataStr = [headers, ...rows].join('\n');
      fileName = 'books.csv';
    }
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add/Edit Modal handlers
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
      description: '',
      pdf: ''
    });
    setImagePreview('');
    setIsEdit(false);
    setShowAddEditModal(true);
    setPdfFileName('');
    setFormErrors({}); // Clear previous errors
    setSections([]); // Clear previous sections
    setBookCover(null);
    setOverview('');
    setWhatYouWillLearn('');
    setOneLiner('');
    setBookCovers([]); // Clear previous cover images
  };
  const openEditModal = (book) => {
    setModalBook({ ...book });
    setImagePreview(book.image || '');
    setIsEdit(true);
    setShowAddEditModal(true);
    setPdfFileName(book.pdf || '');
    setFormErrors({}); // Clear previous errors
    // For now, we'll just set the initial sections to the book's sections
    // In a real app, you'd fetch the book's sections from the API
    setSections(book.sections || []);
    setBookCover(null); // Clear previous cover
    setOverview(book.overview || '');
    setWhatYouWillLearn(book.whatYouWillLearn || '');
    setOneLiner(book.oneLiner || '');
    setBookCovers(book.coverImages || []); // Set cover images for editing
  };
  const closeAddEditModal = () => {
    setShowAddEditModal(false);
    setModalBook(null);
    setImagePreview('');
    setPdfFileName('');
    setFormErrors({}); // Clear errors on close
  };
  const handleAddEditChange = (field, value) => {
    setModalBook(prev => ({ ...prev, [field]: value }));
    // Inline validation for negative values
    if (["price", "originalPrice", "pages"].includes(field)) {
      if (Number(value) < 0) {
        setFormErrors(prev => ({ ...prev, [field]: 'No negative values allowed.' }));
      } else {
        setFormErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
  };
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      setPdfFileName('');
      setModalBook(prev => ({ ...prev, pdf: '' }));
      return;
    }
    setPdfFileName(file.name);
    setModalBook(prev => ({ ...prev, pdf: file.name }));
  };
  const handleBookCoverChange = (e) => {
    setBookCover(e.target.files[0]);
  };
  const handleBookCoversChange = (e) => {
    const files = Array.from(e.target.files);
    setBookCovers(prev => [
      ...prev,
      ...files.filter(f => !prev.some(p => p.file.name === f.name)).map((file, idx) => ({ file, isMain: prev.length === 0 && idx === 0 }))
    ]);
  };
  const setMainCover = (idx) => {
    setBookCovers(prev => prev.map((img, i) => ({ ...img, isMain: i === idx })));
  };
  const removeCover = (idx) => {
    setBookCovers(prev => prev.filter((_, i) => i !== idx));
  };
  const handleSectionChange = (idx, field, value) => {
    setSections(prev => prev.map((sec, i) => i === idx ? { ...sec, [field]: value } : sec));
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
      i === secIdx ? { ...sec, chapters: [...sec.chapters, { title: '', cover: null, pdf: null }] } : sec
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
    // Validate book fields, sections, chapters, etc.
    // Prepare data for API integration
    const bookData = {
      ...modalBook,
      cover: bookCover,
      coverImages: bookCovers.map(img => ({ url: URL.createObjectURL(img.file), isMain: img.isMain })), // Convert File objects to URLs for API
      overview,
      whatYouWillLearn,
      oneLiner,
      sections
    };
    // For now, just log the structure
    console.log('Book to submit:', bookData);
    closeAddEditModal();
  };

  // View Modal
  const openViewModal = (book) => {
    setModalBook(book);
    setShowViewModal(true);
  };
  const closeViewModal = () => {
    setShowViewModal(false);
    setModalBook(null);
  };

  // Delete
  const handleDelete = (book) => {
    if(window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      setBooks(prev => prev.filter(b => b.id !== book.id));
    }
  };

  return (
    <AdminLayout currentPage="Books">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Books Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage your ebook collection</p>
        </div>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2D1B3D]/80 text-white rounded-lg border border-white/10 placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
              />
            </div>
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm"
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
              <input
                type="file"
                accept=".json,.csv"
                ref={fileInputRef}
                onChange={handleImport}
                className="hidden"
              />
            </button>
            <button
              onClick={() => handleExport('json')}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-[#2D1B3D] text-white rounded-lg border border-white/10 focus:outline-none focus:border-white/20 text-sm appearance-none pr-8"
                style={{ minWidth: 120 }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                ▼
              </span>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </button>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-[#2D1B3D]/80 border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Author</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Pages</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Published</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Featured</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Hero</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-white/60 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-white/60">No books found.</td>
                </tr>
              ) : (
                filteredBooks.map(book => (
                  <tr key={book.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      {book.pdf ? (
                        <div className="flex items-center justify-center h-14">
                          <FileText className="w-8 h-8 text-[#9B7BB8]" title="PDF Book" />
                        </div>
                      ) : (
                        <img src={book.image} alt={book.title} className="w-10 h-14 object-cover rounded-lg border border-white/10" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{book.title}</td>
                    <td className="px-4 py-3 text-white/80">{book.author}</td>
                    <td className="px-4 py-3 text-white/80">{book.category}</td>
                    <td className="px-4 py-3 text-white/80">₹{book.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-white/80">{book.pages}</td>
                    <td className="px-4 py-3 text-white/80">{book.publishedDate}</td>
                    <td className="px-4 py-3">{book.isFeatured ? <Star className="w-4 h-4 text-yellow-400" title="Featured" /> : '-'}</td>
                    <td className="px-4 py-3">{book.isHero ? <Zap className="w-4 h-4 text-blue-400" title="Hero" /> : '-'}</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <button onClick={() => openViewModal(book)} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEditModal(book)} className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(book)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
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
              <div className="flex flex-col md:flex-row gap-8">
                <img src={modalBook.image} alt={modalBook.title} className="w-32 h-44 object-cover rounded-lg border border-white/10" />
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-bold text-white mb-2">{modalBook.title}</h2>
                  <p className="text-white/80">by {modalBook.author}</p>
                  <p className="text-white/60">Category: {modalBook.category}</p>
                  <p className="text-white/60">Price: ${modalBook.price}</p>
                  <p className="text-white/60">Original Price: ${modalBook.originalPrice}</p>
                  <p className="text-white/60">Pages: {modalBook.pages}</p>
                  <p className="text-white/60">Published: {modalBook.publishedDate}</p>
                  <p className="text-white/60">Description: {modalBook.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {modalBook.isFeatured && <span className="inline-flex items-center px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs font-semibold"><Star className="w-4 h-4 mr-1" /> Featured</span>}
                    {modalBook.isHero && <span className="inline-flex items-center px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-xs font-semibold"><Zap className="w-4 h-4 mr-1" /> Hero</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Add/Edit Modal */}
        {showAddEditModal && modalBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backdropFilter: 'blur(10px)', background: 'rgba(30, 18, 46, 0.55)'}}>
            <div className="bg-[#2D1B3D]/95 rounded-2xl shadow-2xl w-full p-4 md:p-8 relative overflow-y-auto" style={{fontSize: '0.89rem', minWidth: 0, maxWidth: 600, maxHeight: 'calc(100vh - 2rem)'}}>
              <button onClick={closeAddEditModal} className="absolute top-3 right-3 text-white/60 hover:text-white z-10"><X className="w-5 h-5" /></button>
              <form onSubmit={handleAddEditSubmit} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-white/70 mb-0.5 text-xs">Title</label>
                    <input type="text" value={modalBook.title} onChange={e => handleAddEditChange('title', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-0.5 text-xs">Author</label>
                    <input type="text" value={modalBook.author} onChange={e => handleAddEditChange('author', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-0.5 text-xs">Category</label>
                    <select
                      value={modalBook.category}
                      onChange={e => handleAddEditChange('category', e.target.value)}
                      className="w-full bg-[#2D1B3D] text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs appearance-none"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat} style={{ background: '#2D1B3D', color: '#fff' }}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-0.5 text-xs">Price</label>
                    <input type="number" value={modalBook.price} onChange={e => handleAddEditChange('price', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                    {formErrors.price && <span className="text-xs text-red-400 mt-1 block">{formErrors.price}</span>}
                  </div>
                  <div>
                    <label className="block text-white/70 mb-0.5 text-xs">Published Date</label>
                    <input type="date" value={modalBook.publishedDate} onChange={e => handleAddEditChange('publishedDate', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/70 mb-0.5 text-xs">Description</label>
                    <textarea value={modalBook.description} onChange={e => handleAddEditChange('description', e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" rows={2} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/70 mb-0.5 text-xs">Book Cover PDFs</label>
                    <input type="file" accept="application/pdf" multiple onChange={handleBookCoversChange} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" />
                    {bookCovers.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {bookCovers.map((img, idx) => (
                          <div key={idx} className="relative flex flex-col items-center">
                            <div className={`w-16 h-20 flex items-center justify-center border-2 rounded-lg ${img.isMain ? 'border-yellow-400' : 'border-white/20'} bg-[#2D1B3D]/30 text-white text-xs`}>PDF</div>
                            <span className="text-xs text-white/70 mt-1 truncate w-16 text-center">{img.file.name}</span>
                            {!img.isMain && (
                              <button type="button" onClick={() => setMainCover(idx)} className="absolute top-0 right-0 bg-yellow-400 text-xs px-1 py-0.5 rounded-bl-lg">Set Main</button>
                            )}
                            {img.isMain && <span className="absolute top-0 left-0 bg-yellow-400 text-xs px-1 py-0.5 rounded-br-lg font-bold">Main</span>}
                            <button type="button" onClick={() => removeCover(idx)} className="absolute bottom-0 right-0 text-red-400 hover:text-red-600 text-xs">✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/70 mb-0.5 text-xs">Overview</label>
                    <textarea value={overview} onChange={e => setOverview(e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" rows={1} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/70 mb-0.5 text-xs">What you will learn</label>
                    <textarea value={whatYouWillLearn} onChange={e => setWhatYouWillLearn(e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" rows={1} required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/70 mb-0.5 text-xs">One-liner</label>
                    <input type="text" value={oneLiner} onChange={e => setOneLiner(e.target.value)} className="w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                  </div>
                </div>
                {/* Dynamic Sections and Chapters */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white/80 text-sm font-semibold">Sections</h3>
                    <button type="button" onClick={handleAddSection} className="px-4 py-2 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg font-semibold text-xs md:text-sm shadow transition-all duration-150 flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Add Section
                    </button>
                  </div>
                  {sections.map((section, secIdx) => (
                    <div key={secIdx} className="bg-[#9B7BB8]/10 rounded-lg p-3 mb-3">
                      <div className="flex flex-col md:flex-row items-center gap-2 mb-2 flex-wrap">
                        <input type="text" value={section.title} onChange={e => handleSectionTitleChange(secIdx, e.target.value)} placeholder={`Section ${secIdx + 1} Title`} className="flex-1 min-w-0 bg-[#2D1B3D]/30 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                        <label className="text-white/70 text-xs w-full md:w-auto">Section Image
                          <input type="file" accept="image/*" onChange={e => handleSectionChange(secIdx, 'image', e.target.files[0])} className="block w-full md:w-auto bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs mt-1 md:mt-0" required />
                        </label>
                        <button type="button" onClick={() => handleRemoveSection(secIdx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      {/* Chapters */}
                      <div className="ml-0 md:ml-4">
                        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                          <span className="text-white/70 text-xs font-semibold">Chapters</span>
                          <button type="button" onClick={() => handleAddChapter(secIdx)} className="px-3 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg font-semibold text-xs shadow flex items-center gap-1">
                            <Plus className="w-4 h-4" /> Add Chapter
                          </button>
                        </div>
                        {section.chapters.map((chapter, chapIdx) => (
                          <div key={chapIdx} className="flex flex-col md:flex-row md:items-center gap-2 gap-y-2 mb-2 bg-[#2D1B3D]/20 p-2 rounded-lg w-full min-w-0">
                            <input type="text" value={chapter.title} onChange={e => handleChapterChange(secIdx, chapIdx, 'title', e.target.value)} placeholder={`Chapter ${chapIdx + 1} Title`} className="w-full md:w-1/3 min-w-0 bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs" required />
                            <label className="text-white/70 text-xs w-full md:w-1/3 min-w-0">Thumbnail
                              <input type="file" accept="image/*" onChange={e => handleChapterChange(secIdx, chapIdx, 'cover', e.target.files[0])} className="block w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs mt-1 md:mt-0" required />
                            </label>
                            <label className="text-white/70 text-xs w-full md:w-1/3 min-w-0">Chapter PDF
                              <input type="file" accept="application/pdf" onChange={e => handleChapterChange(secIdx, chapIdx, 'pdf', e.target.files[0])} className="block w-full bg-[#9B7BB8]/10 text-white p-1.5 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-xs mt-1 md:mt-0" required />
                            </label>
                            <button type="button" onClick={() => handleRemoveChapter(secIdx, chapIdx)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 mt-1">
                  <label className="flex items-center gap-2 text-white/80 text-xs">
                    <input type="checkbox" checked={modalBook.isFeatured} onChange={e => handleAddEditChange('isFeatured', e.target.checked)} />
                    <Star className="w-4 h-4 text-yellow-400" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-white/80 text-xs">
                    <input type="checkbox" checked={modalBook.isHero} onChange={e => handleAddEditChange('isHero', e.target.checked)} />
                    <Zap className="w-4 h-4 text-blue-400" /> Hero
                  </label>
                </div>
                <div className="flex justify-end mt-2">
                  <button type="submit" className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold">
                    <Save className="w-5 h-5" />
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