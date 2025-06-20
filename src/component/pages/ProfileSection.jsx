import React, { useState } from 'react';
import { User, Mail, Phone, Edit, Save, X, BookOpen, ShoppingCart, LogOut } from 'lucide-react';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2024'
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
    <div className="min-h-screen bg-[#9B7BB8] pt-24 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header Card */}
        <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              
              {/* Profile Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#9B7BB8] flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Profile</h1>
                    <p className="text-white/70 text-sm">Member since {profileData.joinDate}</p>
                  </div>
                  
                  {/* Edit Button */}
                  <div className="mt-3 sm:mt-0">
                    {!isEditing ? (
                      <button 
                        onClick={handleEdit}
                        className="bg-[#9B7BB8] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-[#9B7BB8]/80 transition-all duration-200 flex items-center space-x-2 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSave}
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-all duration-200"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleCancel}
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2 sm:w-20">
                      <Mail className="w-4 h-4 text-[#9B7BB8]" />
                      <span className="text-white/70 text-sm font-medium">Email:</span>
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-[#9B7BB8]/20 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none focus:border-[#9B7BB8] transition-colors duration-200 text-sm"
                        />
                      ) : (
                        <p className="text-white text-sm">{profileData.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-2 sm:w-20">
                      <Phone className="w-4 h-4 text-[#9B7BB8]" />
                      <span className="text-white/70 text-sm font-medium">Phone:</span>
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full bg-[#9B7BB8]/20 text-white p-2 rounded-lg border border-[#9B7BB8]/30 focus:outline-none focus:border-[#9B7BB8] transition-colors duration-200 text-sm"
                        />
                      ) : (
                        <p className="text-white text-sm">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-[#9B7BB8]/20 transition-colors duration-200 group">
              <BookOpen className="w-5 h-5 text-[#9B7BB8] group-hover:text-white transition-colors duration-200" />
              <span className="text-white font-medium text-sm sm:text-base">My Library</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 sm:p-4 rounded-lg hover:bg-[#9B7BB8]/20 transition-colors duration-200 group">
              <ShoppingCart className="w-5 h-5 text-[#9B7BB8] group-hover:text-white transition-colors duration-200" />
              <span className="text-white font-medium text-sm sm:text-base">Order History</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-3 p-3 sm:p-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-medium mt-6 text-sm sm:text-base">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSection;