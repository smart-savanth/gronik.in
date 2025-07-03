import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Star,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import AdminLayout from './Adminlayout';

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample data
  const stats = [
    {
      title: 'Total Books',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgGlow: 'shadow-blue-500/25'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgGlow: 'shadow-green-500/25'
    },
    {
      title: 'Total Sales',
      value: '$45,678',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgGlow: 'shadow-purple-500/25'
    },
    {
      title: 'Orders',
      value: '856',
      change: '-3%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      bgGlow: 'shadow-orange-500/25'
    }
  ];

  const recentBooks = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      author: 'John Doe',
      sales: 234,
      rating: 4.8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=100&h=150&fit=crop'
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      author: 'Jane Smith',
      sales: 189,
      rating: 4.6,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=150&fit=crop'
    },
    {
      id: 3,
      title: 'Digital Marketing 2024',
      author: 'Mike Johnson',
      sales: 156,
      rating: 4.9,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=150&fit=crop'
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      author: 'Sarah Wilson',
      sales: 298,
      rating: 4.7,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=150&fit=crop'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'Alice Johnson',
      book: 'Think and Grow Rich',
      amount: '$29.99',
      status: 'completed',
      date: '2024-06-08'
    },
    {
      id: '#ORD-002',
      customer: 'Bob Smith',
      book: 'Digital Marketing Mastery',
      amount: '$34.99',
      status: 'processing',
      date: '2024-06-08'
    },
    {
      id: '#ORD-003',
      customer: 'Carol Brown',
      book: 'Mysteries of Universe',
      amount: '$24.99',
      status: 'completed',
      date: '2024-06-07'
    },
    {
      id: '#ORD-004',
      customer: 'David Wilson',
      book: 'React Advanced Patterns',
      amount: '$39.99',
      status: 'shipped',
      date: '2024-06-07'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AdminLayout currentPage="Dashboard">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6" style={{ border: 'none', outline: 'none' }}>
        <div className="w-full h-full space-y-8">
          {/* Header Section */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-white/70">Welcome back! Here's what's happening with your store.</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`group relative bg-[#2D1B3D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:${stat.bgGlow} hover:-translate-y-1 cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  border: 'none'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white/60 text-sm font-medium mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-white mb-3">{stat.value}</p>
                    <div className="flex items-center space-x-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-white/40 text-xs">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Books - Takes 2 columns */}
            <div className={`xl:col-span-2 bg-[#2D1B3D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Books</h3>
                <button className="text-white/60 hover:text-white transition-colors duration-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div 
                    key={book.id} 
                    className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-14 h-20 object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate group-hover:text-purple-300 transition-colors duration-300">{book.title}</h4>
                      <p className="text-white/60 text-sm">by {book.author}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white/80 text-sm font-medium">{book.rating}</span>
                        </div>
                        <span className="text-white/40 text-xs">•</span>
                        <span className="text-white/60 text-sm">{book.sales} sales</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(book.status)}`}>
                        {book.status}
                      </span>
                      <Eye className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders - Takes 1 column */}
            <div className={`bg-[#2D1B3D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '700ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Orders</h3>
                <button className="text-white/60 hover:text-white transition-colors duration-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div 
                    key={order.id} 
                    className="group p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm truncate group-hover:text-purple-300 transition-colors duration-300">{order.book}</h4>
                        <p className="text-white/60 text-xs mt-1">{order.customer}</p>
                      </div>
                      <span className="text-white font-bold text-sm">{order.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="flex items-center space-x-1 text-white/40">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs">{order.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;