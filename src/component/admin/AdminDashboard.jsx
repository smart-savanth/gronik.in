import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import AdminLayout from './Adminlayout';

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    {
      id: 'books',
      title: 'Total Books',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      description: 'Books in library'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600',
      lightColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      description: 'Registered users'
    },
    {
      id: 'sales',
      title: 'Total Sales',
      value: '$45,678',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      lightColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      description: 'Revenue generated'
    },
    {
      id: 'orders',
      title: 'Orders',
      value: '856',
      change: '-3%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      lightColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
      description: 'Total orders'
    }
  ];

  return (
    <AdminLayout currentPage="Dashboard">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header Section */}
          <div className={`text-center mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h1 className="text-5xl font-bold text-[#2D1B3D] mb-4">Dashboard Overview</h1>
            <p className="text-[#2D1B3D]/80 text-xl">Welcome back! Here's your store performance at a glance.</p>
          </div>

          {/* Stats Grid - Centered with max width */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.id}
                    className={`group relative bg-[#2D1B3D]/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    {/* Background gradient glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">{stat.title}</p>
                      <p className="text-4xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-300">{stat.value}</p>
                      
                      {/* Trend indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {stat.trend === 'up' ? (
                            <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1.5 rounded-full">
                              <TrendingUp className="w-4 h-4 text-green-400" />
                              <span className="text-sm font-bold text-green-400">{stat.change}</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 bg-red-500/20 px-3 py-1.5 rounded-full">
                              <TrendingDown className="w-4 h-4 text-red-400" />
                              <span className="text-sm font-bold text-red-400">{stat.change}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-white/40 text-xs mt-3">{stat.description}</p>
                    </div>

                    {/* Decorative corner accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full rounded-tr-3xl`} />
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className={`mt-12 bg-[#2D1B3D]/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Monthly Growth</div>
                    <div className="text-3xl font-bold text-white mb-1">+15.3%</div>
                    <div className="flex items-center justify-center space-x-1 text-green-400 text-sm">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>vs last month</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Conversion Rate</div>
                    <div className="text-3xl font-bold text-white mb-1">3.2%</div>
                    <div className="flex items-center justify-center space-x-1 text-green-400 text-sm">
                      <ArrowUpRight className="w-4 h-4" />
                      <span>+0.8% increase</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Avg Order Value</div>
                    <div className="text-3xl font-bold text-white mb-1">$53.40</div>
                    <div className="flex items-center justify-center space-x-1 text-orange-400 text-sm">
                      <ArrowDownRight className="w-4 h-4" />
                      <span>-2.1% decrease</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;