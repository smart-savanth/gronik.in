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
  ChevronDown,
  Home,
  ArrowLeft
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import BackButton from '../layout/BackButton';

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

  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/dashboard';
  const isAdminPage = location.pathname.startsWith('/admin') && !isDashboard;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gronik-primary via-gronik-primary to-purple-900">
      {/* Admin Top Navbar */}
      <AdminNavbar currentPage={currentPage} />
      <main className="flex-1 overflow-auto p-6 mt-24" style={{ position: 'relative', background: 'linear-gradient(135deg, #B894D1 0%, #9B7BB8 100%)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 30, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isDashboard && (
            <button onClick={() => navigate('/')} className="flex items-center justify-center text-white text-xl font-bold gap-1 p-0 m-0 bg-transparent shadow-none rounded-none border-none hover:bg-transparent focus:bg-transparent mt-4" style={{boxShadow: 'none'}} title="Go to Home">
              <ArrowLeft className="w-8 h-8 stroke-[2.5]" />
              <Home className="w-8 h-8 stroke-[2.5]" />
            </button>
          )}
          {isAdminPage && (
            <button onClick={() => navigate('/admin')} className="p-4 w-16 h-16 flex items-center justify-center bg-[#9B7BB8] hover:bg-[#8A6AA7] rounded-full text-white text-xl font-bold" title="Back to Dashboard">
              <ArrowLeft className="w-9 h-9" />
            </button>
          )}
          {/* No button on Settings page */}
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;