import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Users, ShoppingCart, BarChart3, Settings } from 'lucide-react';

const adminMenu = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Books', icon: BookOpen, path: '/admin/books' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

const AdminNavbar = ({ currentPage }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-gronik-primary/95 backdrop-blur-md shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex items-center justify-between h-20 px-2">
        <Link to="/admin" className="flex items-center">
          <div className="w-32 h-12 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Gronik Admin Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        <div className="flex items-center space-x-8 ml-10">
          {adminMenu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:text-gronik-accent hover:bg-gronik-secondary/10 ${
                currentPage === item.name ? 'bg-gradient-to-r from-gronik-accent/20 to-gronik-secondary/20 text-gronik-accent border border-gronik-accent/30' : 'text-gronik-light'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentPage === item.name ? 'text-gronik-accent' : 'text-gronik-light'}`} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

export default AdminNavbar;