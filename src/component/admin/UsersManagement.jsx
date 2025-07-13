import React, { useState } from 'react';
import { Search, Edit, Trash2, Eye, X, Save, Plus, Download, Mail, Phone, Calendar, ChevronDown } from 'lucide-react';
import AdminLayout from './Adminlayout';

const sampleUsers = [
  { 
    id: 1, 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    phone: '+1 (555) 123-4567',
    role: 'User', 
    status: 'active', 
    joined: '2024-01-10',
    lastLogin: '2024-06-08',
    orders: 12,
    totalSpent: 348.99,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 2, 
    name: 'Bob Smith', 
    email: 'bob@example.com', 
    phone: '+1 (555) 987-6543',
    role: 'User', 
    status: 'blocked', 
    joined: '2024-02-15',
    lastLogin: '2024-06-05',
    orders: 8,
    totalSpent: 199.50,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 3, 
    name: 'Carol Brown', 
    email: 'carol@example.com', 
    phone: '+1 (555) 456-7890',
    role: 'Admin', 
    status: 'active', 
    joined: '2024-03-20',
    lastLogin: '2024-06-08',
    orders: 25,
    totalSpent: 750.25,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 4, 
    name: 'David Lee', 
    email: 'david@example.com', 
    phone: '+1 (555) 234-5678',
    role: 'User', 
    status: 'active', 
    joined: '2024-04-05',
    lastLogin: '2024-06-07',
    orders: 15,
    totalSpent: 425.75,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 5, 
    name: 'Emma Wilson', 
    email: 'emma@example.com', 
    phone: '+1 (555) 345-6789',
    role: 'User', 
    status: 'active', 
    joined: '2024-05-12',
    lastLogin: '2024-06-08',
    orders: 6,
    totalSpent: 189.99,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  },
];

const statusColors = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const roleColors = {
  Admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  User: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const UsersManagement = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(sampleUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Admin',
    status: 'active',
    avatar: '',
    joined: '',
    lastLogin: '',
  });
  const [addImagePreview, setAddImagePreview] = useState('');
  const addImageInputRef = React.useRef();

  React.useEffect(() => {
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleExportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Phone,Role,Status,Joined,Orders,Total Spent\n" +
      filteredUsers.map(user => 
        `${user.name},${user.email},${user.phone},${user.role},${user.status},${user.joined},${user.orders},$${user.totalSpent}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusSelect = (status) => {
    setFilterStatus(status);
    setStatusDropdownOpen(false);
  };

  const getStatusLabel = () => {
    switch(filterStatus) {
      case 'active': return 'Active';
      case 'blocked': return 'Blocked';
      default: return 'All Status';
    }
  };

  // Add User button handler
  const openAddModal = () => {
    setNewUser({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'Admin',
      status: 'active',
      avatar: '',
      joined: '',
      lastLogin: '',
    });
    setAddImagePreview('');
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddImagePreview('');
  };
  const handleAddChange = (field, value) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };
  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddImagePreview(reader.result);
        setNewUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Name, email, and password are required.');
      return;
    }
    if (newUser.password.length < 8 || !/[A-Z]/.test(newUser.password) || !/[0-9]/.test(newUser.password)) {
      alert('Password must be at least 8 characters, include a number and an uppercase letter.');
      return;
    }
    setUsers(prev => [
      ...prev,
      {
        ...newUser,
        id: Date.now(),
        avatar: addImagePreview,
        joined: new Date().toISOString().slice(0, 10),
        lastLogin: new Date().toISOString().slice(0, 10),
      }
    ]);
    closeAddModal();
  };

  return (
    <AdminLayout currentPage="Users">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Users Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage your platform users and their access.</p>
        </div>
        {/* Controls Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-[#2D1B3D]/80 text-white rounded-lg border border-white/10 placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
              />
            </div>
            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg border border-white/10 focus:outline-none focus:border-white/20 text-sm min-w-[120px]"
              >
                <span>{getStatusLabel()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${statusDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-[#2D1B3D] border border-white/10 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleStatusSelect('all')}
                    className="w-full px-4 py-2 text-left text-white hover:bg-[#9B7BB8]/20 transition-colors duration-200 first:rounded-t-lg"
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => handleStatusSelect('active')}
                    className="w-full px-4 py-2 text-left text-white hover:bg-[#9B7BB8]/20 transition-colors duration-200"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleStatusSelect('blocked')}
                    className="w-full px-4 py-2 text-left text-white hover:bg-[#9B7BB8]/20 transition-colors duration-200 last:rounded-b-lg"
                  >
                    Blocked
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportUsers}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Admin</span>
            </button>
          </div>
        </div>
        {/* Users Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-[#2D1B3D]/80 border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-white/5 transition-all duration-300">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                        />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2D1B3D] ${user.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{user.name}</p>
                        <p className="text-white/60 text-sm">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-3 h-3 text-white/40" />
                        <span className="text-white/80 text-sm">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-white/40" />
                        <span className="text-white/60 text-sm">{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 text-white/40" />
                        <span className="text-white/60 text-sm">Joined: {user.joined}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3 text-white/40" />
                        <span className="text-white/60 text-sm">Last: {user.lastLogin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-300 group"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 rounded-lg hover:bg-green-500/20 transition-all duration-300 group"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition-all duration-300 group"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Click outside handler for dropdowns */}
        {(statusDropdownOpen || roleDropdownOpen) && (
          <div 
            className="fixed inset-0 z-5" 
            onClick={() => {
              setStatusDropdownOpen(false);
              setRoleDropdownOpen(false);
            }}
          />
        )}

        {/* View User Modal */}
        {isViewModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#2D1B3D]/95 backdrop-blur-md rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#2D1B3D]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">User Details</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-[#2D1B3D] ${selectedUser.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{selectedUser.name}</h4>
                    <p className="text-white/70">User ID: {selectedUser.id}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColors[selectedUser.role]}`}>
                        {selectedUser.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[selectedUser.status]}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Contact Information</h5>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-white/40" />
                        <span className="text-white/80">{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-white/40" />
                        <span className="text-white/80">{selectedUser.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="text-lg font-semibold text-white border-b border-white/20 pb-2">Account Activity</h5>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-white/40" />
                        <span className="text-white/80">Joined: {selectedUser.joined}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Eye className="w-5 h-5 text-white/40" />
                        <span className="text-white/80">Last Login: {selectedUser.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <h5 className="text-lg font-semibold text-white mb-3">Purchase Statistics</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{selectedUser.orders}</p>
                      <p className="text-white/60 text-sm">Total Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">${selectedUser.totalSpent}</p>
                      <p className="text-white/60 text-sm">Total Spent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backdropFilter: 'blur(10px)', background: 'rgba(30, 18, 46, 0.55)'}}>
            <div className="bg-[#2D1B3D]/95 rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative" style={{fontSize: '0.95rem', minWidth: 340}}>
              <button onClick={() => setIsEditModalOpen(false)} className="absolute top-3 right-3 text-white/60 hover:text-white z-10"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-bold text-white mb-4">Edit User</h2>
              <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1 text-xs">Name</label>
                    <input type="text" value={editingUser.name} onChange={e => setEditingUser(prev => ({ ...prev, name: e.target.value }))} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-xs">Email</label>
                    <input type="email" value={editingUser.email} onChange={e => setEditingUser(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-xs">Phone</label>
                    <input type="text" value={editingUser.phone} onChange={e => setEditingUser(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm" required />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-xs">Role</label>
                    <select value={editingUser.role} onChange={e => setEditingUser(prev => ({ ...prev, role: e.target.value }))} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm">
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1 text-xs">Status</label>
                    <select value={editingUser.status} onChange={e => setEditingUser(prev => ({ ...prev, status: e.target.value }))} className="w-full bg-[#9B7BB8]/10 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none text-sm">
                      <option value="active" className="bg-[#2D1B3D] text-white">Active</option>
                      <option value="blocked" className="bg-[#2D1B3D] text-white">Blocked</option>
                      <option value="pending" className="bg-[#2D1B3D] text-white">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 bg-[#9B7BB8]/20 text-white rounded-lg hover:bg-[#9B7BB8]/40 transition-colors text-sm font-semibold">Cancel</button>
                  <button type="submit" className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Add User Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <form onSubmit={handleAddSubmit} className="bg-[#2D1B3D] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/10 relative">
              <button type="button" onClick={closeAddModal} className="absolute top-4 right-4 text-white/60 hover:text-white"><X className="w-6 h-6" /></button>
              <h2 className="text-2xl font-bold text-white mb-6">Add Admin</h2>
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-2">
                  <img
                    src={addImagePreview || '/images/icon.png'}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={addImageInputRef}
                    onChange={handleAddImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    title="Upload profile picture"
                  />
                </div>
                <button type="button" onClick={() => addImageInputRef.current && addImageInputRef.current.click()} className="text-xs text-white/70 hover:underline">Change Photo</button>
              </div>
              <div className="mb-4">
                <label className="block text-white/70 mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={e => handleAddChange('name', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A0F26] text-white border border-white/10 focus:outline-none focus:border-white/20"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white/70 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={e => handleAddChange('email', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A0F26] text-white border border-white/10 focus:outline-none focus:border-white/20"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white/70 mb-1">Phone</label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={e => handleAddChange('phone', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A0F26] text-white border border-white/10 focus:outline-none focus:border-white/20"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white/70 mb-1">Password</label>
                <input
                  type="password"
                  value={newUser.password || ''}
                  onChange={e => handleAddChange('password', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-[#1A0F26] text-white border border-white/10 focus:outline-none focus:border-white/20"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 chars, 1 number, 1 uppercase"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#9B7BB8] to-[#A67FC4] text-white px-6 py-2 rounded-lg font-semibold hover:from-[#A67FC4] hover:to-[#9B7BB8] transition-all"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;