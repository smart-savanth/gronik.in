import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Edit, Save, X, BookOpen, ShoppingCart, LogOut, Heart, Settings, Camera, Trash2, Lock } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slices/userAuthSlice';

const DEFAULT_AVATAR = '';

const ProfileSection = () => {
  const navigate = useNavigate();
  // Simulate login method: 'email' or 'mobile'
  const [loginMethod] = useState('email'); // Change to 'mobile' to test mobile login
  const user = useSelector(state => state.userAuth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});
  const [imagePreview, setImagePreview] = useState(user?.profileImage || '');
  const fileInputRef = useRef(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(user || {});
    setImagePreview(user?.profileImage || '');
  };

  const handleSave = () => {
    // Only update name and profile image, keep email and mobile unchanged
    const updatedUser = { 
      ...user, // Keep original user data
      fullName: editData.fullName, // Update only name
      profileImage: imagePreview // Update only profile image
    };
    dispatch(setUser(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user || {});
    setImagePreview(user?.profileImage || '');
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleLogout = () => {
    // Dummy logout: clear user, redirect to login
    alert('Logged out!');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    setShowDeleteConfirm(false);
    alert('Account deleted! (dummy handler)');
    // Here you would call your backend to delete the account
    navigate('/login');
  };

  const cancelDeleteAccount = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-6 mt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-6 space-y-4 sm:space-y-0">
              {/* Profile Avatar */}
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9B7BB8] to-[#7A5A97] flex items-center justify-center shadow-lg overflow-hidden cursor-pointer group" onClick={isEditing ? openFilePicker : undefined}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Camera className="w-7 h-7 text-white" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                )}
              </div>
              {/* Profile Title & Edit Button */}
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">{isEditing ? 'Edit Profile' : 'My Profile'}</h1>
                  </div>
                  {!isEditing ? (
                    <button 
                      onClick={handleEdit}
                      className="bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm font-medium transform hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleSave}
                        className="bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center justify-center w-10 h-10"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center justify-center w-10 h-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {/* Name Field - EDITABLE */}
                <div className="mt-4">
                  <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-1">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fullName || ''}
                      onChange={e => handleInputChange('fullName', e.target.value)}
                      className="w-full bg-[#9B7BB8]/20 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] transition-all duration-200 text-sm placeholder-white/50"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-white font-medium text-sm truncate">{user?.fullName || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Contact Information - READ ONLY */}
            <div className="space-y-4 mt-4">
              {/* Email Field - NON-EDITABLE */}
              <div className="flex items-center space-x-3 p-3 bg-[#9B7BB8]/20 rounded-2xl relative">
                <div className="w-10 h-10 rounded-full bg-[#9B7BB8]/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-white/60 uppercase tracking-wide font-medium">Email Address</p>
                    {isEditing && (
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-white/50" />
                        <span className="text-xs text-white/50">Protected</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white font-medium text-sm truncate">{user?.email || 'Not provided'}</p>
                  {isEditing && (
                    <p className="text-xs text-white/40 mt-1">Email cannot be changed for security reasons</p>
                  )}
                </div>
              </div>

              {/* Mobile Field - NON-EDITABLE */}
              <div className="flex items-center space-x-3 p-3 bg-[#9B7BB8]/20 rounded-2xl relative">
                <div className="w-10 h-10 rounded-full bg-[#9B7BB8]/30 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-white/60 uppercase tracking-wide font-medium">Mobile Number</p>
                    {isEditing && (
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-white/50" />
                        <span className="text-xs text-white/50">Protected</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white font-medium text-sm truncate">
                    {user?.countryCode && user?.mobile ? `${user.countryCode} ${user.mobile}` : 'Not provided'}
                  </p>
                  {isEditing && (
                    <p className="text-xs text-white/40 mt-1">Mobile number cannot be changed for security reasons</p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Mode Info Message */}
            {isEditing && (
              <div className="mt-4 p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-400">ℹ</span>
                  </div>
                  <div>
                    <p className="text-sm text-blue-400 font-medium">Security Note</p>
                    <p className="text-xs text-blue-300/80 mt-1">
                      Only your name and profile picture can be updated. Email and mobile number are protected for account security.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 text-white" />
              </div>
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => navigate('/my-library')}
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#9B7BB8]/20 transition-all duration-300 group border border-transparent hover:border-[#9B7BB8]/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B7BB8]/20 to-[#8A6AA7]/20 flex items-center justify-center group-hover:from-[#9B7BB8]/30 group-hover:to-[#8A6AA7]/30 transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-sm">My Library</p>
                  <p className="text-xs text-white/60">View your books</p>
                </div>
              </button>
              <button 
                onClick={() => navigate('/order-history')}
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#9B7BB8]/20 transition-all duration-300 group border border-transparent hover:border-[#9B7BB8]/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B7BB8]/20 to-[#8A6AA7]/20 flex items-center justify-center group-hover:from-[#9B7BB8]/30 group-hover:to-[#8A6AA7]/30 transition-all duration-300">
                  <ShoppingCart className="w-6 h-6 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-sm">Order History</p>
                  <p className="text-xs text-white/60">Track your purchases</p>
                </div>
              </button>
            </div>
            <button 
              className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white font-semibold mt-6 shadow-lg transform hover:scale-[1.02]" 
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
            <button
              className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 border-red-500 text-red-500 font-semibold bg-transparent hover:bg-red-500 hover:text-white transition-all duration-300 shadow-none mt-3"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-8 max-w-xs w-full text-center shadow-2xl">
              <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#2D1B3D] mb-2">Delete Account?</h2>
              <p className="text-[#2D1B3D]/80 mb-6">This action cannot be undone. Are you sure you want to delete your account?</p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={confirmDeleteAccount} 
                  className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
                <button 
                  onClick={cancelDeleteAccount} 
                  className="px-6 py-2 rounded-lg bg-gray-200 text-[#2D1B3D] font-bold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;