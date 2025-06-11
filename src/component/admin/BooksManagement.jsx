import React, { useState } from 'react';
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
  DollarSign,
  Users,
  X,
  Save
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
      image: '/api/placeholder/80/100'
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
      image: '/api/placeholder/80/100'
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
      image: '/api/placeholder/80/100'
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
      image: '/api/placeholder/80/100'
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
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'archived': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const AddBookModal = () => (
    showAddModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 w-full max-w-2xl border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Add New Book</h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-purple-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-purple-800/30 border border-purple-600/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                placeholder="Enter book title"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">Author</label>
              <input
                type="text"
                className="w-full bg-purple-800/30 border border-purple-600/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                placeholder="Enter author name"
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">Category</label>
              <select className="w-full bg-purple-800/30 border border-purple-600/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400">
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                className="w-full bg-purple-800/30 border border-purple-600/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                placeholder="0.00"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-purple-200 text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full bg-purple-800/30 border border-purple-600/30 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                placeholder="Enter book description"
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-purple-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 flex items-center space-x-2">
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-white">Books Management</h2>
            <p className="text-purple-200 mt-1">Manage your e-book collection and inventory</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-purple-700/30 text-purple-200 rounded-lg border border-purple-600/30 hover:bg-purple-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-xl p-6 border border-purple-600/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total Books</p>
                <p className="text-2xl font-bold text-white">1,234</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-800/50 to-emerald-800/50 rounded-xl p-6 border border-green-600/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm">Active Books</p>
                <p className="text-2xl font-bold text-white">987</p>
              </div>
              <Eye className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-800/50 to-cyan-800/50 rounded-xl p-6 border border-blue-600/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">Total Sales</p>
                <p className="text-2xl font-bold text-white">$45,678</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-800/50 to-red-800/50 rounded-xl p-6 border border-orange-600/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm">Top Rated</p>
                <p className="text-2xl font-bold text-white">4.8★</p>
              </div>
              <Star className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-xl p-6 border border-purple-600/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-purple-700/30 border border-purple-600/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 w-full sm:w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-purple-700/30 border border-purple-600/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-700/30 text-purple-200 rounded-lg border border-purple-600/30 hover:bg-purple-700/50 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-gradient-to-r from-purple-800/30 to-indigo-800/30 rounded-xl border border-purple-600/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-700/50 border-b border-purple-600/20">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedBooks.length === books.length}
                      onChange={handleSelectAll}
                      className="rounded border-purple-500 text-purple-500 focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Book</th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Category</th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Price</th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Sales</th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Rating</th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-purple-200 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-600/20">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-purple-700/20 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedBooks.includes(book.id)}
                        onChange={() => handleSelectBook(book.id)}
                        className="rounded border-purple-500 text-purple-500 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-white font-medium">{book.title}</p>
                          <p className="text-purple-300 text-sm">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">${book.price}</div>
                      {book.originalPrice > book.price && (
                        <div className="text-purple-300 text-sm line-through">${book.originalPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-white">{book.sales}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white">{book.rating}</span>
                        <span className="text-purple-300 text-sm">({book.reviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(book.status)}`}>
                        {book.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-purple-300 hover:text-purple-100 hover:bg-purple-700/30 rounded-lg transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-purple-300 hover:text-purple-100 hover:bg-purple-700/30 rounded-lg transition-all duration-200">
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
          <div className="px-6 py-4 border-t border-purple-600/20 flex items-center justify-between">
            <div className="text-purple-200 text-sm">
              Showing 1 to 4 of 1,234 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-purple-300 hover:text-white transition-colors">Previous</button>
              <button className="px-3 py-1 bg-purple-500 text-white rounded">1</button>
              <button className="px-3 py-1 text-purple-300 hover:text-white transition-colors">2</button>
              <button className="px-3 py-1 text-purple-300 hover:text-white transition-colors">3</button>
              <button className="px-3 py-1 text-purple-300 hover:text-white transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      <AddBookModal />
    </AdminLayout>
  );
};

export default BooksManagement;