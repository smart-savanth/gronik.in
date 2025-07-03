import React from 'react';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Star,
  Calendar
} from 'lucide-react';
import AdminLayout from './Adminlayout';

const AdminDashboard = () => {
  // Sample data
  const stats = [
    {
      title: 'Total Books',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Sales',
      value: '$45,678',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-gronik-accent to-gronik-secondary'
    },
    {
      title: 'Orders',
      value: '856',
      change: '-3%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600'
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
      image: '/api/placeholder/60/80'
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      author: 'Jane Smith',
      sales: 189,
      rating: 4.6,
      status: 'active',
      image: '/api/placeholder/60/80'
    },
    {
      id: 3,
      title: 'Digital Marketing 2024',
      author: 'Mike Johnson',
      sales: 156,
      rating: 4.9,
      status: 'pending',
      image: '/api/placeholder/60/80'
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
    }
  ];

  return (
    <AdminLayout currentPage="Dashboard">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#E9D8FD] via-[#F3E8FF] to-[#E9D8FD] py-10 px-2 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#2D1B3D]/90 backdrop-blur-md rounded-2xl p-6 border border-gronik-secondary/20 hover:border-gronik-accent/30 transition-all duration-300 group shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gronik-light/70 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gronik-light mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gronik-light/50 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Recent Books & Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Books */}
          <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl">
            <h3 className="text-lg font-semibold text-gronik-light mb-6">Recent Books</h3>
            <div className="space-y-4">
              {recentBooks.map(book => (
                <div key={book.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#9B7BB8]/10 transition-all duration-200">
                  <img src={book.image} alt={book.title} className="w-12 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-gronik-light font-semibold">{book.title}</p>
                    <p className="text-gronik-light/70 text-sm">by {book.author}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gronik-light/80 text-xs font-medium">{book.rating}</span>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">{book.status}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Recent Orders */}
          <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl">
            <h3 className="text-lg font-semibold text-gronik-light mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#9B7BB8]/10 transition-all duration-200">
                  <div>
                    <p className="text-gronik-light font-semibold">{order.book}</p>
                    <p className="text-gronik-light/70 text-sm">{order.customer}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">{order.status}</span>
                    <span className="text-gronik-light/70 text-xs">{order.date}</span>
                  </div>
                  <span className="text-gronik-light/80 font-semibold">{order.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;