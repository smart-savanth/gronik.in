import React, { useState } from 'react';
import AdminLayout from './Adminlayout';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Download,
  Users,
  X,
  Save,
  Heart,
  Zap
} from 'lucide-react';

const BooksManagement = () => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Sample books data
  const books = [
    {
      id: 1,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      category: 'Self Development',
      price: 29.99,
      originalPrice: 39.99,
      sales: 1420,
      rating: 4.8,
      reviews: 234,
      status: 'active',
      publishedDate: '2024-01-15',
      pages: 320,
      format: ['PDF', 'EPUB', 'MOBI'],
      image: '/api/placeholder/80/100',
      isFeatured: true,
      isHero: false
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      author: 'John Smith',
      category: 'Technology',
      price: 34.99,
      originalPrice: 44.99,
      sales: 856,
      rating: 4.6,
      reviews: 142,
      status: 'active',
      publishedDate: '2024-02-20',
      pages: 280,
      format: ['PDF', 'EPUB'],
      image: '/api/placeholder/80/100',
      isFeatured: false,
      isHero: true
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      author: 'Sarah Johnson',
      category: 'Business',
      price: 24.99,
      originalPrice: 34.99,
      sales: 692,
      rating: 4.9,
      reviews: 187,
      status: 'pending',
      publishedDate: '2024-03-10',
      pages: 245,
      format: ['PDF'],
      image: '/api/placeholder/80/100',
      isFeatured: true,
      isHero: false
    },
    {
      id: 4,
      title: 'Machine Learning Basics',
      author: 'Dr. Mike Wilson',
      category: 'Technology',
      price: 39.99,
      originalPrice: 49.99,
      sales: 423,
      rating: 4.7,
      reviews: 98,
      status: 'draft',
      publishedDate: '2024-04-05',
      pages: 350,
      format: ['PDF', 'EPUB', 'MOBI'],
      image: '/api/placeholder/80/100',
      isFeatured: false,
      isHero: false
    }
  ];

  const categories = ['All', 'Self Development', 'Technology', 'Business', 'Science', 'Health'];
  const statuses = ['all', 'active', 'pending', 'draft', 'archived'];

  const handleSelectBook = (bookId) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSelectAll = () => {
    setSelectedBooks(
      selectedBooks.length === books.length ? [] : books.map(book => book.id)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'draft': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'archived': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const AddBookModal = () => (
    showAddModal && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
        <div className="bg-gradient-to-br from-[#2D1B3D] to-[#1A0F2E] rounded-2xl p-8 w-full max-w-3xl border border-[#9B7BB8]/20 shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Add New Book</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-[#9B7BB8] hover:text-white transition-colors duration-200 p-2 hover:bg-[#9B7BB8]/20 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[#9B7BB8] text-sm font-medium">Title</label>
              <input
                type="text"
                className="w-full bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-lg px-4 py-3 text-white placeholder-[#9B7BB8] focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200"
                placeholder="Enter book title"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#9B7BB8] text-sm font-medium">Author</label>
              <input
                type="text"
                className="w-full bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-lg px-4 py-3 text-white placeholder-[#9B7BB8] focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200"
                placeholder="Enter author name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[#9B7BB8] text-sm font-medium">Category</label>
              <select className="w-full bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200">
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat} className="bg-[#2D1B3D] text-white">{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[#9B7BB8] text-sm font-medium">Price</label>
              <input
                type="number"
                className="w-full bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-lg px-4 py-3 text-white placeholder-[#9B7BB8] focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200"
                placeholder="0.00"
              />
            </div>
            
            {/* Featured and Hero toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#2D1B3D]/30 rounded-lg border border-[#9B7BB8]/20">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-[#9B7BB8]" />
                  <div>
                    <p className="text-white font-medium">Featured Book</p>
                    <p className="text-[#9B7BB8] text-sm">Show in featured section</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#2D1B3D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B7BB8]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#2D1B3D]/30 rounded-lg border border-[#9B7BB8]/20">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-[#9B7BB8]" />
                  <div>
                    <p className="text-white font-medium">Hero Book</p>
                    <p className="text-[#9B7BB8] text-sm">Show in hero section</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#2D1B3D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B7BB8]"></div>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[#9B7BB8] text-sm font-medium">Status</label>
              <select className="w-full bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200">
                {statuses.slice(1).map(status => (
                  <option key={status} value={status} className="bg-[#2D1B3D] text-white capitalize">{status}</option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-[#9B7BB8] text-sm font-medium">Description</label>
              <textarea
                rows={4}
                className="w-full bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-lg px-4 py-3 text-white placeholder-[#9B7BB8] focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200 resize-none"
                placeholder="Enter book description"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 text-[#9B7BB8] hover:text-white transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-[#9B7BB8] to-[#7B5B98] text-white rounded-lg hover:from-[#7B5B98] hover:to-[#5B3B78] transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
              <Save className="w-4 h-4" />
              <span>Save Book</span>
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <AdminLayout currentPage="Books">
      <div className="min-h-screen bg-[#9B7BB8] p-6">
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl p-8 border border-[#9B7BB8]/20 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Books Management</h1>
              <p className="text-[#9B7BB8] text-lg">Manage your e-book collection and inventory</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-3 bg-[#2D1B3D]/50 text-[#9B7BB8] rounded-xl border border-[#9B7BB8]/30 hover:bg-[#9B7BB8]/20 hover:text-white transition-all duration-200 flex items-center space-x-2 font-medium">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#9B7BB8] to-[#7B5B98] text-white rounded-xl hover:from-[#7B5B98] hover:to-[#5B3B78] transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add Book</span>
              </button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-gradient-to-r from-[#2D1B3D]/50 to-[#1A0F2E]/50 rounded-2xl p-6 border border-[#9B7BB8]/20 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9B7BB8] w-4 h-4 group-focus-within:text-white transition-colors duration-200" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#9B7BB8] focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200 w-full sm:w-80"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-[#2D1B3D]/50 border border-[#9B7BB8]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#9B7BB8] focus:ring-2 focus:ring-[#9B7BB8]/20 transition-all duration-200 capitalize"
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-[#2D1B3D] text-white capitalize">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-3 bg-[#2D1B3D]/50 text-[#9B7BB8] rounded-xl border border-[#9B7BB8]/30 hover:bg-[#9B7BB8]/20 hover:text-white transition-all duration-200 font-medium"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Books Table */}
          <div className="bg-gradient-to-r from-[#2D1B3D]/50 to-[#1A0F2E]/50 rounded-2xl border border-[#9B7BB8]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#2D1B3D]/80 border-b border-[#9B7BB8]/20">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedBooks.length === books.length}
                        onChange={handleSelectAll}
                        className="rounded border-[#9B7BB8] text-[#9B7BB8] focus:ring-[#9B7BB8] bg-[#2D1B3D]"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Book</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Category</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Price</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Sales</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Rating</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Tags</th>
                    <th className="px-6 py-4 text-left text-[#9B7BB8] font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#9B7BB8]/20">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-[#9B7BB8]/10 transition-colors duration-200 group">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedBooks.includes(book.id)}
                          onChange={() => handleSelectBook(book.id)}
                          className="rounded border-[#9B7BB8] text-[#9B7BB8] focus:ring-[#9B7BB8] bg-[#2D1B3D]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-14 h-18 object-cover rounded-lg shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                          </div>
                          <div>
                            <p className="text-white font-semibold text-lg">{book.title}</p>
                            <p className="text-[#9B7BB8] text-sm">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#9B7BB8]/20 text-[#9B7BB8] rounded-full text-sm font-medium">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-semibold">${book.price}</div>
                        {book.originalPrice > book.price && (
                          <div className="text-[#9B7BB8] text-sm line-through">${book.originalPrice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-[#9B7BB8]" />
                          <span className="text-white font-medium">{book.sales}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{book.rating}</span>
                          <span className="text-[#9B7BB8] text-sm">({book.reviews})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(book.status)}`}>
                          {book.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {book.isFeatured && (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>Featured</span>
                            </span>
                          )}
                          {book.isHero && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>Hero</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="p-2 text-[#9B7BB8] hover:text-white hover:bg-[#9B7BB8]/20 rounded-lg transition-all duration-200">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#9B7BB8] hover:text-white hover:bg-[#9B7BB8]/20 rounded-lg transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#9B7BB8]/20 flex items-center justify-between bg-[#2D1B3D]/30">
              <div className="text-[#9B7BB8] text-sm">
                Showing 1 to 4 of 1,234 results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-[#9B7BB8] hover:text-white transition-colors duration-200 font-medium">Previous</button>
                <button className="px-4 py-2 bg-[#9B7BB8] text-white rounded-lg font-medium">1</button>
                <button className="px-4 py-2 text-[#9B7BB8] hover:text-white transition-colors duration-200 font-medium">2</button>
                <button className="px-4 py-2 text-[#9B7BB8] hover:text-white transition-colors duration-200 font-medium">3</button>
                <button className="px-4 py-2 text-[#9B7BB8] hover:text-white transition-colors duration-200 font-medium">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddBookModal />
    </AdminLayout>
  );
};

export default BooksManagement;