import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, BookOpen, Heart, ShoppingCart, Settings, LogOut } from 'lucide-react';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Passionate reader and book enthusiast. Love exploring new worlds through literature.',
    joinDate: 'January 2024',
    profileImage: '/profile-avatar.png' // You can add a default avatar image
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

  const stats = [
    { label: 'Books Read', value: '24', icon: BookOpen, color: 'text-[#9B7BB8]' },
    { label: 'Wishlist', value: '12', icon: Heart, color: 'text-red-500' },
    { label: 'Purchases', value: '8', icon: ShoppingCart, color: 'text-[#2D1B3D]' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8]/20 to-[#2D1B3D]/20 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#9B7BB8] to-[#2D1B3D] h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
                <img 
                  src={profileData.profileImage} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=9B7BB8&color=fff&size=128`;
                  }}
                />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="bg-white/20 backdrop-blur-md text-white p-2 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSave}
                    className="bg-green-500/80 backdrop-blur-md text-white p-2 rounded-lg hover:bg-green-600/80 transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="bg-red-500/80 backdrop-blur-md text-white p-2 rounded-lg hover:bg-red-600/80 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-3xl font-bold text-[#2D1B3D] bg-transparent border-b-2 border-[#9B7BB8] focus:outline-none focus:border-[#2D1B3D] transition-colors duration-200 mb-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-[#2D1B3D] mb-2">{profileData.name}</h1>
                )}
                <p className="text-[#2D1B3D]/70 mb-2">Member since {profileData.joinDate}</p>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="w-full text-[#2D1B3D]/80 bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#9B7BB8] transition-colors duration-200 resize-none"
                    rows="2"
                  />
                ) : (
                  <p className="text-[#2D1B3D]/80 max-w-2xl">{profileData.bio}</p>
                )}
              </div>
              
              {/* Stats */}
              <div className="flex space-x-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`${stat.color} mb-2 flex justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-[#2D1B3D]">{stat.value}</div>
                    <div className="text-sm text-[#2D1B3D]/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Personal Information */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#2D1B3D] mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-[#9B7BB8]" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#2D1B3D]/70 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#9B7BB8] transition-colors duration-200"
                      />
                    ) : (
                      <p className="text-[#2D1B3D]">{profileData.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-[#9B7BB8]" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#2D1B3D]/70 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#9B7BB8] transition-colors duration-200"
                      />
                    ) : (
                      <p className="text-[#2D1B3D]">{profileData.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="w-5 h-5 text-[#9B7BB8]" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-[#2D1B3D]/70 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full bg-gray-50 p-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#9B7BB8] transition-colors duration-200"
                      />
                    ) : (
                      <p className="text-[#2D1B3D]">{profileData.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#2D1B3D] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#9B7BB8]/10 transition-colors duration-200 group">
                  <Heart className="w-5 h-5 text-[#9B7BB8] group-hover:text-[#2D1B3D]" />
                  <span className="text-[#2D1B3D] font-medium">View Wishlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#9B7BB8]/10 transition-colors duration-200 group">
                  <ShoppingCart className="w-5 h-5 text-[#9B7BB8] group-hover:text-[#2D1B3D]" />
                  <span className="text-[#2D1B3D] font-medium">Order History</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#9B7BB8]/10 transition-colors duration-200 group">
                  <BookOpen className="w-5 h-5 text-[#9B7BB8] group-hover:text-[#2D1B3D]" />
                  <span className="text-[#2D1B3D] font-medium">My Library</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#9B7BB8]/10 transition-colors duration-200 group">
                  <Settings className="w-5 h-5 text-[#9B7BB8] group-hover:text-[#2D1B3D]" />
                  <span className="text-[#2D1B3D] font-medium">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <button className="w-full flex items-center justify-center space-x-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white font-medium">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSection;