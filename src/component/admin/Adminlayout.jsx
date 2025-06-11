import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

const AdminLayout = ({ children, currentPage = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Books', icon: BookOpen, href: '/admin/books' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gronik-primary via-gronik-primary to-purple-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gronik-primary/95 backdrop-blur-md border-r border-gronik-secondary/20 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gronik-secondary/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gronik-accent to-gronik-secondary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gronik-light">Gronik Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gronik-light hover:text-gronik-accent transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 group ${
                currentPage === item.name 
                  ? 'bg-gradient-to-r from-gronik-accent/20 to-gronik-secondary/20 text-gronik-accent border border-gronik-accent/30' 
                  : 'text-gronik-light hover:bg-gronik-secondary/10 hover:text-gronik-accent'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                currentPage === item.name ? 'text-gronik-accent' : 'text-gronik-light group-hover:text-gronik-accent'
              }`} />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Admin Profile Card */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-gronik-secondary/20 to-gronik-accent/20 rounded-lg p-4 border border-gronik-secondary/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gronik-accent to-gronik-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gronik-light font-medium text-sm">Admin User</p>
                <p className="text-gronik-light/70 text-xs">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <header className="bg-gronik-primary/95 backdrop-blur-md border-b border-gronik-secondary/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gronik-light hover:text-gronik-accent transition-colors duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gronik-light">{currentPage}</h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gronik-light/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg pl-10 pr-4 py-2 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gronik-light hover:text-gronik-accent transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gronik-secondary/20 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gronik-accent to-gronik-secondary flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gronik-light" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gronik-primary/95 backdrop-blur-md rounded-lg border border-gronik-secondary/20 shadow-lg">
                    <div className="p-2">
                      <button className="w-full flex items-center px-3 py-2 text-gronik-light hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-gronik-light hover:bg-gronik-secondary/20 rounded-lg transition-colors duration-200">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </button>
                      <hr className="my-2 border-gronik-secondary/20" />
                      <button className="w-full flex items-center px-3 py-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors duration-200">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;