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
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children, currentPage = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Books', icon: BookOpen, href: '/admin/books' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gronik-primary via-gronik-primary to-purple-900">
      {/* Admin Top Navbar */}
      <AdminNavbar currentPage={currentPage} />
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 mt-24">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;