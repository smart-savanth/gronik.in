import React, { useState } from 'react';
import { Settings, User, Lock, Bell, Save } from 'lucide-react';
import AdminLayout from './Adminlayout';

const SettingsPage = () => {
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@gronik.com' });
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState({ email: true, sms: false });

  return (
    <AdminLayout currentPage="Settings">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#E9D8FD] via-[#F3E8FF] to-[#E9D8FD] py-10 px-2 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl mb-8">
            <h3 className="text-lg font-semibold text-gronik-light mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-gronik-accent" />Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gronik-light/70 text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg px-4 py-2 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-gronik-light/70 text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg px-4 py-2 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200"
                />
              </div>
              <button className="mt-2 px-6 py-2 bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white rounded-lg hover:from-gronik-secondary hover:to-gronik-accent transition-all duration-200 font-medium flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
          <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl mb-8">
            <h3 className="text-lg font-semibold text-gronik-light mb-4 flex items-center"><Lock className="w-5 h-5 mr-2 text-gronik-accent" />Change Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="New password"
                className="w-full bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg px-4 py-2 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white rounded-lg hover:from-gronik-secondary hover:to-gronik-accent transition-all duration-200 font-medium flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </div>
          </div>
          <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl">
            <h3 className="text-lg font-semibold text-gronik-light mb-4 flex items-center"><Bell className="w-5 h-5 mr-2 text-gronik-accent" />Notification Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={e => setNotifications({ ...notifications, email: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-gronik-accent rounded focus:ring-gronik-accent border-gronik-secondary/30"
                />
                <span className="text-gronik-light">Email Notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={e => setNotifications({ ...notifications, sms: e.target.checked })}
                  className="form-checkbox h-5 w-5 text-gronik-accent rounded focus:ring-gronik-accent border-gronik-secondary/30"
                />
                <span className="text-gronik-light">SMS Notifications</span>
              </label>
              <button className="mt-2 px-6 py-2 bg-gradient-to-r from-gronik-accent to-gronik-secondary text-white rounded-lg hover:from-gronik-secondary hover:to-gronik-accent transition-all duration-200 font-medium flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage; 