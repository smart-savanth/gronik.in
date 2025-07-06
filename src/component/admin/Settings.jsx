import React, { useState } from 'react';
import { Settings, User, Save, LogOut, Edit, X } from 'lucide-react';
import AdminLayout from './Adminlayout';

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ 
    name: 'Admin User', 
    email: 'admin@gronik.com',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });
  
  const [editData, setEditData] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
    console.log('Profile settings saved');
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    // You can add navigation to login page or clear session here
  };

  return (
    <AdminLayout currentPage="Settings">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Settings</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage your profile and account settings</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Profile Settings */}
          <div className="bg-[#2D1B3D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Profile Settings</h3>
              </div>
              {!isEditing ? (
                <button 
                  onClick={handleEdit}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSave}
                    className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl transition-all duration-300"
                    title="Save Changes"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all duration-300"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-white font-medium">{profile.name}</p>
                  <p className="text-white/60 text-sm">{profile.role}</p>
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-white font-medium py-3">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-white font-medium py-3">{profile.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <button 
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 border border-red-500/40"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage; 