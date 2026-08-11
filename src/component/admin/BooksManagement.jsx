import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminLayout from './Adminlayout';
import { useUpdateBookWithCarousalMutation } from '../../utils/productServices';
import {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useSaveBookMutation,
  useUploadCoverMutation,
   useUploadCarouselMutation,
   useUploadAssetsMutation,
   useDeleteBookMutation,
}  from '../../utils/booksService'
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

const logFormData = (label, formData) => {
  console.group(`🧾 ${label}`);
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  console.groupEnd();
};

const categories = ['All', 'Self Development', 'Technology', 'Business', 'Science', 'Health'];


  

// DUMMY DATA

const BooksManagement = () => {


   const user = useSelector(state => state.userAuth.user);
const ADMIN_ID = user?.guid;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  // Already full URL (cloudinary, s3 etc)
  if (path.startsWith("http")) return path;

  // Ensure slash between base and path
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
};

  const { data, isLoading } = useGetAllBooksQuery({ page: 1, pageSize: 50 });
const [updateBook] = useUpdateBookMutation();
const [deleteBook] = useDeleteBookMutation();

const books = data?.data || [];
console.log(books);


  const [uploadAssets] = useUploadAssetsMutation();
  const [uploadCarousel] = useUploadCarouselMutation();
  const [createdBook, setCreatedBook] = useState({
  id: null,
  slug: null,
});
  const [saveBook] = useSaveBookMutation();
const [uploadCover] = useUploadCoverMutation();

  // NEW – required for saveBook API
const [oneLineDescription, setOneLineDescription] = useState('');

  const [updateBookWithCarousal] = useUpdateBookWithCarousalMutation();

  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
const [customCategory, setCustomCategory] = useState('');

  const [currentPhase, setCurrentPhase] = useState(1);
  const [priceError, setPriceError] = useState(''); // NEW: For price validation error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingBookId, setDeletingBookId] = useState(null);
  const [isUploadingSection, setIsUploadingSection] = useState({});
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [editLoaded, setEditLoaded] = useState(false);

  
const [basicInfo, setBasicInfo] = useState({
  title: '',
  author: '',
  category: '',
  price: '',
  originalPrice: '',
  pages: 200,
  isFeatured: false,
  isHero: false,
  coverImageFile: null,
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
      (book.author && book.author.toLowerCase().includes(searchLower)) ||
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
  isFeatured: false,
  isHero: false,
  coverImageFile: null,
});


  setOverviewDescription('');
  setOneLineDescription('');     // ✅ NEW
     // ✅ NEW

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
  setPriceError('');
  setIsEdit(false);
  setShowAddEditModal(true);
};


const openEditModal = async (bookId) => {

  setIsEdit(true);
  setShowAddEditModal(true);
  setCurrentPhase(1);

  setEditLoaded(false); // IMPORTANT
  setIsLoadingEdit(true);

  try {

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/product/getBookById/${bookId}`
    );

    const json = await res.json();
    const book = json.data;

    if (!book) throw new Error("Book not found");

    setCreatedBook({
      id: book._id,
      slug: book.slug,
    });

    // Fill form
    setBasicInfo({
      title: book.title ?? '',
      author: book.author ?? '',
      category: book.category ?? '',
      price: book.final_price ?? '',
      originalPrice: book.original_price ?? '',
      pages: book.totalPages ?? 0,
      isFeatured: !!book.featured,
      isHero: !!book.hero,
      coverImageFile: null,
    });

    setOverviewDescription(book.description ?? '');
    setOneLineDescription(book.one_line_description ?? '');
    setLearningPoints(book.what_you_will_learn?.length ? book.what_you_will_learn : ['']);
    setSections(book.sections ?? []);
    setModalBook(book);

    setEditLoaded(true); // ✅ MARK READY

  } catch (err) {
    console.error(err);
    alert("Failed to load book");
    closeAddEditModal();
  } finally {
    setIsLoadingEdit(false);
  }
};




  const closeAddEditModal = () => {
  setShowAddEditModal(false);
  setModalBook(null);
  setCurrentPhase(1);
  setPriceError('');
  setIsSubmitting(false);
  setIsEdit(false);

  setCreatedBook({   // ✅ ADD THIS
    id: null,
    slug: null
  });
};


  const openViewModal = (book) => {
    setModalBook(book);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setModalBook(null);
  };

  // FIX 1 & 2: Validate prices - no negatives, original > discounted
  const handleBasicInfoChange = (field, value) => {
    if (field === 'price' || field === 'originalPrice') {
      // Prevent negative values
      if (value < 0) {
        return;
      }
      
      // Real-time validation
      if (field === 'originalPrice' && value && basicInfo.price) {
        if (parseFloat(value) <= parseFloat(basicInfo.price)) {
          setPriceError('Original price must be greater than discounted price');
        } else {
          setPriceError('');
        }
      }
      
      if (field === 'price' && value && basicInfo.originalPrice) {
        if (parseFloat(basicInfo.originalPrice) <= parseFloat(value)) {
          setPriceError('Original price must be greater than discounted price');
        } else {
          setPriceError('');
        }
      }
    }
    
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };
const handleCoverImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }

  setBasicInfo(prev => ({
    ...prev,
    coverImageFile: file
  }));
};

  const goToPhase2 = (e) => {
    e.preventDefault();
    
    // ONLY validate description when going FROM phase 2 TO phase 3
   if (!isEdit && overviewDescription.length < 50) {

      alert('Description must be at least 50 characters');
      return;
    }
    if (overviewDescription.length > 200) {
      alert('Description cannot exceed 200 characters');
      return;
    }
    
    setPriceError('');
    setCurrentPhase(2); // Go to Phase 3
  };

const goToPhase3 = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  const { id: bookId, slug } = createdBook;
  if (!bookId || !slug) {
    alert("Book not ready");
    return;
  }

  setIsSubmitting(true);
  try {
    const uploadedUrls = [];

    // 1️⃣ Upload images
    for (const item of carouselItems) {
      if (!item.imagePdf) continue;

      const formData = new FormData();
      formData.append("carouselImage", item.imagePdf);

      const res = await uploadCarousel({
        bookId,
        slug,
        data: formData,
      }).unwrap();

      uploadedUrls.push(res.data);
    }

    console.log("🖼️ Uploaded carousel URLs:", uploadedUrls);

    if (uploadedUrls.length === 0) {
      alert("No carousel images uploaded");
      return;
    }

    // 2️⃣ Build payload USING uploadedUrls (not state)
    const carouselsPayload = uploadedUrls.map((url, index) => ({
      courselImageUrl: url, // backend spelling
      description: carouselItems[index]?.description || '',
    }));

    console.log("📦 Carousel payload:", carouselsPayload);

    // 3️⃣ Save carousel data
    await updateBookWithCarousal({
      id: bookId,
      carousels: carouselsPayload,
    }).unwrap();

    setCurrentPhase(3);

  } catch (err) {
    console.error("❌ Carousel flow failed:", err);
    alert("Carousel upload/save failed");
  } finally {
    setIsSubmitting(false);
  }
};





  const goBackToPhase1 = () => {
    setCurrentPhase(1);
  };
  const goBackToPhase2 = () => {
 setCurrentPhase(2);
  };

  

  const handleCarouselImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCarouselItems(prev => prev.map((item, i) => 
        i === index ? { ...item, imagePdf: file, imagePdfName: file.name } : item
      ));
    } else {
    alert('Please upload an image file');
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
  setSections(prev =>
    prev.map((sec, i) =>
      i === secIdx
        ? {
            ...sec,
            chapters: [
              ...sec.chapters,
              {
                title: '',
                pages: '',
                thumbnailImage: null,
                thumbnailImageName: '',
                chapterPdf: null,
                chapterPdfName: '',
              },
            ],
          }
        : sec
    )
  );
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

  if (!file || !file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }

  console.log('🖼️ Chapter thumbnail selected:', file);

  setSections(prev =>
    prev.map((sec, i) =>
      i === secIdx
        ? {
            ...sec,
            chapters: sec.chapters.map((ch, j) =>
              j === chapIdx
                ? {
                    ...ch,
                    thumbnailImage: file,
                    thumbnailImageName: file.name,
                  }
                : ch
            ),
          }
        : sec
    )
  );
};

const uploadSingleSection = async (secIdx) => {
  console.log("📘 Section debug:", sections[secIdx]);

  const { id: bookId, slug } = createdBook;
  const section = sections[secIdx];

  if (isUploadingSection[secIdx]) return;

  if (!section.title) {
    alert("Section title is required");
    return;
  }

  if (section.chapters.length === 0) {
    alert("Add at least one chapter");
    return;
  }

  setIsUploadingSection(prev => ({ ...prev, [secIdx]: true }));

  const formData = new FormData();

  // ✅ Section title
  formData.append("sectionsTitle", section.title);

  // ✅ Files (arrays)
  section.chapters.forEach((chapter, index) => {
    if (!chapter.chapterPdf || !chapter.thumbnailImage) {
      throw new Error(`Missing PDF or thumbnail in chapter ${index + 1}`);
    }

    formData.append("chapters", chapter.chapterPdf);
    formData.append("chapterCover", chapter.thumbnailImage);
  });

  // ✅ Pages hardcoded to 0 (ONCE)
  formData.append("sectionsPages", 0);

  logFormData("SECTION UPLOAD PAYLOAD", formData);

  try {
    await uploadAssets({
      bookId,
      slug,
      data: formData,
    }).unwrap();

    alert(`✅ Section "${section.title}" uploaded successfully`);
  } catch (err) {
    console.error("❌ Section upload failed:", err);
    alert("❌ Section upload failed");
  } finally {
    setIsUploadingSection(prev => ({ ...prev, [secIdx]: false }));
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

const handleFinalSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  const { id: bookId, slug } = createdBook;

  if (!bookId || !slug) {
    alert("Book not initialized");
    return;
  }

  setIsSubmitting(true);
  try {
    

    alert("🎉 Book created completely!");
    closeAddEditModal();

  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("Failed to upload sections/chapters");
  } finally {
    setIsSubmitting(false);
  }
};



  const handleDelete = async (book) => {
    if(window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      setDeletingBookId(book._id || book.id);
      try {
        await deleteBook(book._id || book.id).unwrap();
        alert('Book deleted successfully');
        // The query will automatically refetch due to invalidatesTags
      } catch (error) {
        console.error('Error deleting book:', error);
        alert(error?.data?.msg || 'Failed to delete book. Please try again.');
      } finally {
        setDeletingBookId(null);
      }
    }
  };

  return (
    <AdminLayout currentPage="Books">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Books Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage your ebook collection</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
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
                  <tr key={book._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      {book.pdf ? (
                        <div className="flex items-center justify-center h-14">
                          <FileText className="w-8 h-8 text-[#9B7BB8]" title="PDF Book" />
                        </div>
                      ) : (
   <img
  src={getImageUrl(book.coverImageUrl)}
  alt={book.title}
  className="w-10 h-14 object-cover rounded-lg border border-white/10"
/>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{book.title}</td>
                    <td className="px-4 py-3 text-white/80">{book.author}</td>
                    <td className="px-4 py-3 text-white/80">{book.category}</td>
                    <td className="px-4 py-3 text-white/80">₹{Number(book.final_price || 0).toFixed(2)}</td>
   <td className="px-4 py-3 text-white/80">
  {Number(book.rating) > 0 ? `${Number(book.rating)} ⭐` : '—'}
</td>

<td className="px-4 py-3">
  {(book.featured === true || book.featured === "true" || book.featured === 1) ? (
    <Star className="w-4 h-4 text-yellow-400" />
  ) : (
    '-'
  )}
</td>

<td className="px-4 py-3">
  {(book.hero === true || book.hero === "true" || book.hero === 1) ? (
    <Zap className="w-4 h-4 text-blue-400" />
  ) : (
    '-'
  )}
</td>
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <button onClick={() => openViewModal(book)} className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      {/* <button onClick={() => openEditModal(book._id)} className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(book)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* VIEW MODAL */}
        {showViewModal && modalBook && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2D1B3D] rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
              <button onClick={closeViewModal} className="absolute top-4 right-4 text-white/60 hover:text-white z-10">
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex gap-6 mb-6 pb-6 border-b border-white/10">
{isEdit && modalBook?.coverImageUrl && !basicInfo.coverImageFile && (
  <img
    src={getImageUrl(modalBook.coverImageUrl)}
    className="w-20 h-28 object-cover rounded mt-2 border"
    alt="Current cover"
  />
)}

                <div className="flex-1 space-y-2">
                  <h2 className="text-3xl font-bold text-white">{modalBook.title}</h2>
                  <p className="text-white/80 text-lg">by {modalBook.author || 'Auto-generated'}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="px-3 py-1 bg-[#9B7BB8] text-white rounded-full text-sm font-semibold">
                      {modalBook.category}
                    </span>
                    {modalBook.featured && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                      </span>
                    )}
                    {modalBook.hero && (
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
                        ₹{modalBook.final_price}
                        {modalBook.original_price && (
                          <span className="line-through text-white/40 text-sm ml-2">${modalBook.original_price}</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Rating</p>
                      <p className="text-white font-semibold text-lg">{modalBook.rating} ⭐</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Pages</p>
                      <p className="text-white font-semibold">{modalBook.totalPages}</p>
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

              <div className="space-y-6">
                {modalBook.overviewDescription && (
                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Overview:
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">{modalBook.overviewDescription}</p>
                  </div>
                )}

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

                {modalBook.what_you_will_learn && modalBook.what_you_will_learn.length > 0 && (
                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4 mt-2">
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      What You'll Learn:
                    </h3>
                    <ul className="space-y-2">
                      {modalBook.what_you_will_learn.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                          <span className="text-[#9B7BB8] font-bold mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
              </div>

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

        {/* ADD/EDIT MODAL */}
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

              {/* PHASE 1 - BASIC INFO */}
             {currentPhase === 1 && (!isEdit || editLoaded) && (
                <form
  onSubmit={async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!basicInfo.title || !basicInfo.price) {
      alert('Please fill required fields');
      return;
    }

   if (!isEdit && !basicInfo.coverImageFile) {
  alert('Cover image is required');
  return;
}

    setIsSubmitting(true);
    try {
  // 1️⃣ SAVE BASIC BOOK INFO
  const payload = {
    title: basicInfo.title,
    author: basicInfo.author,
    overview: overviewDescription,
    description: overviewDescription,
    what_you_will_learn: learningPoints.filter(p => p.trim()),
    one_line_description: oneLineDescription,
    original_price: Number(basicInfo.originalPrice) || 0,
    final_price: Number(basicInfo.price),
    category: basicInfo.category,
    featured: basicInfo.isFeatured,
    hero: basicInfo.isHero,
    belongs_to: ADMIN_ID,
    totalPages: Number(basicInfo.pages) || 0,
    isActive: true,
  };

// ---------- EDIT MODE ----------
if (modalBook) {

  await updateBook({
    id: modalBook._id,
    body: {
      title: basicInfo.title,
      author: basicInfo.author,
      description: overviewDescription,
      one_line_description: oneLineDescription,
      what_you_will_learn: learningPoints.filter(p => p.trim()),
      final_price: Number(basicInfo.price),
      original_price: Number(basicInfo.originalPrice) || 0,
      category: basicInfo.category,
      featured: basicInfo.isFeatured,
      hero: basicInfo.isHero,
      totalPages: Number(basicInfo.pages),
      isActive: true,
      belongs_to: modalBook.belongs_to
    },
  }).unwrap();

  alert('✅ Book updated successfully');
  closeAddEditModal();
  return;
}

// ---------- CREATE MODE ----------
const res = await saveBook(payload).unwrap();




const bookId = res?.data?._id || res?.data?.id;
const slug =
  res?.data?.slug ||
  basicInfo.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');  

console.log('🆔 bookId:', bookId);
console.log('🔗 slug:', slug);

 

if (!bookId || !slug) {
  throw new Error("Backend did not return bookId or slug");
}


// Upload cover ONLY if new image selected
if (basicInfo.coverImageFile) {

  const formData = new FormData();
  formData.append('coverImage', basicInfo.coverImageFile);

  await uploadCover({
    bookId,
    slug,
    data: formData,
  }).unwrap();

}



  // 3️⃣ STORE BOOK INFO
  setCreatedBook({ id: bookId, slug });
  console.log('📌 Created book stored in state:', { id: bookId, slug });

  console.log('➡️ moving to Phase 2');
  setCurrentPhase(2);

} catch (err) {
  console.error('❌ ERROR OCCURRED:', err);

  if (err?.data) {
    console.error('❌ Backend error data:', err.data);
  }

  alert('Failed to save basic info — check console');
} finally {
  setIsSubmitting(false);
}

  }}
  className="space-y-4"
>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-white/70 mb-1 text-sm">Title *</label>
                      <input 
                        type="text" 
                        value={basicInfo.title} 
                        onChange={e => handleBasicInfoChange('title', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        placeholder="Enter book title"
                        required 
                      />

                      <div>
  <label className="block text-white/70 mb-1 text-sm">
    Author *
  </label>
  <input
    type="text"
    value={basicInfo.author}
    onChange={(e) => handleBasicInfoChange('author', e.target.value)}
    className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm"
    placeholder="e.g. Robert Greene"
    required
  />
</div>


                      <div>
  <label className="block text-white/70 mb-1 text-sm">
    One-line Description *
  </label>
  <input
    type="text"
    value={oneLineDescription}
    onChange={(e) => setOneLineDescription(e.target.value)}
    className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm"
    placeholder="Learn React from beginner to expert"
    maxLength={120}
    required={!isEdit}
  />
</div>


                      <div className="mt-2">
                    <h3 className="text-white text-lg font-semibold mb-3 flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Overview Description *
                    </h3>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm">Main Description (50-200 characters)</label>
                  <textarea 
  value={overviewDescription}
  onChange={e => setOverviewDescription(e.target.value)}
  className="w-full bg-[#2D1B3D]/30 text-white p-3 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm"
  rows={4}
  placeholder="Transform your mindset and unlock the secrets to wealth and success..."
  minLength={isEdit ? undefined : 50}
  maxLength={isEdit ? undefined : 200}
  required={!isEdit}
/>

                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs ${
                          overviewDescription.length < 50 ? 'text-red-400' : 
                          overviewDescription.length > 200 ? 'text-red-400' : 
                          'text-green-400'
                        }`}>
                          {overviewDescription.length < 50 ? `Need ${50 - overviewDescription.length} more characters` : 
                           overviewDescription.length > 200 ? `${overviewDescription.length - 200} characters over limit` :
                           '✓ Valid length'}
                        </span>
                        <span className={`text-xs ${
                          overviewDescription.length < 50 || overviewDescription.length > 200 ? 'text-red-400' : 'text-white/60'
                        }`}>
                          {overviewDescription.length}/200
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#9B7BB8]/10 rounded-lg p-4 mt-2">
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
                    </div>

                    
                    
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Category *</label>
                      {!isCustomCategory ? (
  <select
    value={basicInfo.category}
    onChange={(e) => {
      if (e.target.value === '__custom__') {
        setIsCustomCategory(true);
        handleBasicInfoChange('category', '');
      } else {
        handleBasicInfoChange('category', e.target.value);
      }
    }}
    className="w-full bg-[#2D1B3D] text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm"
    required={!isEdit}
  >
    <option value="">Select Category</option>

    {categories.slice(1).map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}

    {/* ADD CATEGORY OPTION */}
    <option value="__custom__">➕ Add new category</option>
  </select>
) : (
  <div className="flex gap-2">
    <input
      type="text"
      value={customCategory}
      onChange={(e) => {
        setCustomCategory(e.target.value);
        handleBasicInfoChange('category', e.target.value);
      }}
      placeholder="Enter new category"
      className="flex-1 bg-[#2D1B3D] text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm"
      autoFocus
      required={!isEdit}
    />

    <button
      type="button"
      onClick={() => {
        setIsCustomCategory(false);
        setCustomCategory('');
         if (!isEdit) handleBasicInfoChange('category', '');
      }}
      className="px-3 rounded-lg bg-[#9B7BB8]/20 text-white hover:bg-[#9B7BB8]/40 transition"
      title="Cancel"
    >
      ✕
    </button>
  </div>
)}

                    </div>
                    
                    {/* FIX 1: Removed up/down arrows, added min="0" to prevent negatives */}
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Discounted Price * ($)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        value={basicInfo.price} 
                        onChange={e => handleBasicInfoChange('price', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        placeholder="0.00"
                        required 
                      />
                      {/* FIX 2: Show error if negative attempted */}
                      {basicInfo.price < 0 && (
                        <p className="text-red-400 text-xs mt-1">❌ No negative pricing allowed</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Original Price ($)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        min="0"
                        value={basicInfo.originalPrice} 
                        onChange={e => handleBasicInfoChange('originalPrice', e.target.value)} 
                        className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" 
                        placeholder="0.00"
                      />
                      {/* FIX 2: Show error for negative */}
                      {basicInfo.originalPrice < 0 && (
                        <p className="text-red-400 text-xs mt-1">❌ No negative pricing allowed</p>
                      )}
                      {/* FIX 2 & 3: Show price validation error below the field */}
                      {priceError && (
                        <p className="text-red-400 text-xs mt-1">❌ {priceError}</p>
                      )}
                    </div>
                  
                  </div>

                  <div>
                    
                   
                    <label className="block text-white/70 mb-2 text-sm">
  Cover Image *
</label>
<input
  type="file"
  accept="image/png, image/jpeg, image/webp"
  onChange={handleCoverImageChange}
  className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg"
/>

{basicInfo.coverImageFile && (
  <p className="text-green-400 text-xs mt-1">
    ✓ {basicInfo.coverImageFile.name}
  </p>
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

                  {/* FIX 3: REMOVED the blue info box about rating */}

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                     <span>
 {isSubmitting 
   ? 'Saving...' 
   : isEdit ? 'Save Changes' : 'Next: Overview & Carousel'}
</span>
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              )}

              {/* PHASE 2 - OVERVIEW */}
              {currentPhase === 2 && (
                <form onSubmit={goToPhase3} className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm">
                      <strong>Book:</strong> {basicInfo.title} by {basicInfo.author}
                    </p>
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
                              Book Image (png)
                            </label>
                            <input 
                              type="file" 
                              accept="image/png, image/jpeg, image/webp"
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
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Uploading...' : 'Next: Content'}</span>
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              )}

              {/* PHASE 3 - CONTENT */}
              {currentPhase === 3 && (
                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm">
                      <strong>Book:</strong> {basicInfo.title} by {basicInfo.title.split(' ').slice(0, 2).join(' ')} (Auto)
                    </p>
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
    <ImageIcon className="w-3 h-3" />
    Thumbnail Image
  </label>

  <input 
    type="file"
    accept="image/png, image/jpeg, image/webp"
    onChange={e => handleChapterThumbnailChange(secIdx, chapIdx, e)}
    className="w-full bg-[#2D1B3D]/30 text-white p-1.5 rounded-lg text-[10px]
      file:mr-2 file:py-1 file:px-2 file:rounded
      file:border-0 file:text-[10px]
      file:bg-[#9B7BB8] file:text-white
      hover:file:bg-[#8A6AA7]
      file:cursor-pointer"
  />

  {chapter.thumbnailImageName && (
    <p className="text-green-400 text-[9px] mt-1">
      ✓ {chapter.thumbnailImageName}
    </p>
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
                                <div>
  
</div>
                              </div>
                              
                            </div>
                            
                          ))}
                          <button
                        type="button"
                        onClick={() => uploadSingleSection(secIdx)}
                        disabled={isUploadingSection[secIdx]}
                        className="ml-auto px-3 py-1 bg-[#9B7BB8] hover:bg-[#8A6AA7] text-white rounded-lg text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploadingSection[secIdx] ? 'Uploading...' : 'Upload This Section'}
                      </button>
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
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 py-2 bg-[#9B7BB8] text-white rounded-lg hover:bg-[#8A6AA7] transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSubmitting ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Book')}</span>
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

