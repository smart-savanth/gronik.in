import React from 'react';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Download,
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
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gronik-primary/50 backdrop-blur-md rounded-lg p-6 border border-gronik-secondary/20 hover:border-gronik-accent/30 transition-all duration-300 group">
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

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-gronik-primary/50 backdrop-blur-md rounded-lg p-6 border border-gronik-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gronik-light">Sales Overview</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-gronik-accent/20 text-gronik-accent rounded-lg border border-gronik-accent/30">
                  7 Days
                </button>
                <button className="px-3 py-1 text-sm text-gronik-light/70 hover:text-gronik-accent transition-colors duration-200">
                  30 Days
                </button>
              </div>
            </div>
            
            {/* Simple chart representation */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {[40, 65, 45, 80, 35, 70, 85].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-gronik-accent to-gronik-secondary rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gronik-light/50 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-gronik-primary/50 backdrop-blur-md rounded-lg p-6 border border-gronik-secondary/20">
            <h3 className="text-lg font-semibold text-gronik-light mb-6">Top Categories</h3>
            <div className="space-y-4">
              {[
                { name: 'Self Development', value: 45, color: 'bg-gronik-accent' },
                { name: 'Technology', value: 32, color: 'bg-blue-500' },
                { name: 'Business', value: 28, color: 'bg-green-500' },
                { name: 'Science', value: 18, color: 'bg-purple-500' },
                { name: 'Health', value: 12, color: 'bg-orange-500' }
              ].map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="text-gronik-light font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gronik-secondary/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                        style={{ width: `${category.value}%` }}
                      ></div>
                    </div>
                    <span className="text-gronik-light/70 text-sm w-8">{category.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Books */}
          <div className="bg-gronik-primary/50 backdrop-blur-md rounded-lg p-6 border border-gronik-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gronik-light">Recent Books</h3>
              <button className="text-gronik-accent hover:text-gronik-light transition-colors duration-200 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentBooks.map((book) => (
                <div key={book.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gronik-secondary/10 transition-colors duration-200">
                  <div className="w-12 h-16 bg-gronik-secondary/30 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gronik-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gronik-light font-medium text-sm">{book.title}</h4>
                    <p className="text-gronik-light/70 text-xs">by {book.author}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gronik-light/70 ml-1">{book.rating}</span>
                      </div>
                      <span className="text-gronik-light/50">•</span>
                      <span className="text-xs text-gronik-light/70">{book.sales} sales</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    book.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {book.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gronik-primary/50 backdrop-blur-md rounded-lg p-6 border border-gronik-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gronik-light">Recent Orders</h3>
              <button className="text-gronik-accent hover:text-gronik-light transition-colors duration-200 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gronik-secondary/10 transition-colors duration-200">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gronik-light font-medium text-sm">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gronik-light/70 text-xs mt-1">{order.customer}</p>
                    <p className="text-gronik-light/50 text-xs">{order.book}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gronik-light font-medium text-sm">{order.amount}</p>
                    <p className="text-gronik-light/50 text-xs">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gronik-primary/50 backdrop-blur-md rounded-lg p-6 border border-gronik-secondary/20">
          <h3 className="text-lg font-semibold text-gronik-light mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Add New Book', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
              { name: 'View Reports', icon: BarChart3, color: 'from-green-500 to-green-600' },
              { name: 'Export Data', icon: Download, color: 'from-gronik-accent to-gronik-secondary' },
              { name: 'User Analytics', icon: Eye, color: 'from-purple-500 to-purple-600' }
            ].map((action, index) => (
              <button key={index} className="p-4 rounded-lg bg-gronik-secondary/10 hover:bg-gronik-secondary/20 border border-gronik-secondary/20 hover:border-gronik-accent/30 transition-all duration-300 group">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-gronik-light text-sm font-medium">{action.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;