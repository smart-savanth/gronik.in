import React, { useState } from 'react';
import { User, Mail, Phone, Edit, Save, X, BookOpen, ShoppingCart, LogOut, Heart, Settings } from 'lucide-react';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const [editData, setEditData] = useState({...profileData});

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({...profileData});
  };

  const handleSave = () => {
    setProfileData({...editData});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-6 mt-20">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9B7BB8] to-[#7A5A97] flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
              </div>

              {/* Profile Title & Edit Button */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-1">My Profile</h1>
                    <p className="text-white/70 text-sm font-medium">Manage your account</p>
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
                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all duration-200 shadow-lg transform hover:scale-105"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg transform hover:scale-105"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-[#9B7BB8]/20 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-[#9B7BB8]/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-1">Email Address</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-[#9B7BB8]/20 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] transition-all duration-200 text-sm placeholder-white/50"
                    />
                  ) : (
                    <p className="text-white font-medium text-sm truncate">{profileData.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-[#9B7BB8]/20 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-[#9B7BB8]/30 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/60 uppercase tracking-wide font-medium mb-1">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-[#9B7BB8]/20 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8] transition-all duration-200 text-sm placeholder-white/50"
                    />
                  ) : (
                    <p className="text-white font-medium text-sm">{profileData.phone}</p>
                  )}
                </div>
              </div>
            </div>
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
              <button className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#9B7BB8]/20 transition-all duration-300 group border border-transparent hover:border-[#9B7BB8]/30">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B7BB8]/20 to-[#8A6AA7]/20 flex items-center justify-center group-hover:from-[#9B7BB8]/30 group-hover:to-[#8A6AA7]/30 transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-sm">My Library</p>
                  <p className="text-xs text-white/60">View your books</p>
                </div>
              </button>
              
              <button className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-[#9B7BB8]/20 transition-all duration-300 group border border-transparent hover:border-[#9B7BB8]/30">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9B7BB8]/20 to-[#8A6AA7]/20 flex items-center justify-center group-hover:from-[#9B7BB8]/30 group-hover:to-[#8A6AA7]/30 transition-all duration-300">
                  <ShoppingCart className="w-6 h-6 text-[#9B7BB8]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-sm">Order History</p>
                  <p className="text-xs text-white/60">Track your purchases</p>
                </div>
              </button>
            </div>
            
            <button className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white font-semibold mt-6 shadow-lg transform hover:scale-[1.02]">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSection;