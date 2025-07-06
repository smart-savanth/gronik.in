import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  LineChart
} from 'lucide-react';
import AdminLayout from './Adminlayout';

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedStat, setSelectedStat] = useState('sales'); // Default to sales

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Sample data
  const stats = [
    {
      id: 'books',
      title: 'Total Books',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgGlow: 'shadow-blue-500/25'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgGlow: 'shadow-green-500/25'
    },
    {
      id: 'sales',
      title: 'Total Sales',
      value: '$45,678',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgGlow: 'shadow-purple-500/25'
    },
    {
      id: 'orders',
      title: 'Orders',
      value: '856',
      change: '-3%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      bgGlow: 'shadow-orange-500/25'
    }
  ];

  // Analytics data for each stat
  const analyticsData = {
    books: {
      title: 'Books Analytics',
      type: 'bar',
      data: [
        { month: 'Jan', value: 120 },
        { month: 'Feb', value: 150 },
        { month: 'Mar', value: 180 },
        { month: 'Apr', value: 200 },
        { month: 'May', value: 250 },
        { month: 'Jun', value: 280 }
      ],
      color: 'from-blue-500 to-blue-600'
    },
    users: {
      title: 'Users Analytics',
      type: 'line',
      data: [
        { month: 'Jan', value: 800 },
        { month: 'Feb', value: 950 },
        { month: 'Mar', value: 1100 },
        { month: 'Apr', value: 1150 },
        { month: 'May', value: 1200 },
        { month: 'Jun', value: 1234 }
      ],
      color: 'from-green-500 to-green-600'
    },
    sales: {
      title: 'Sales Analytics',
      type: 'line',
      data: [
        { month: 'Jan', value: 35000 },
        { month: 'Feb', value: 38000 },
        { month: 'Mar', value: 42000 },
        { month: 'Apr', value: 41000 },
        { month: 'May', value: 44000 },
        { month: 'Jun', value: 45678 }
      ],
      color: 'from-purple-500 to-purple-600'
    },
    orders: {
      title: 'Orders Analytics',
      type: 'bar',
      data: [
        { month: 'Jan', value: 150 },
        { month: 'Feb', value: 180 },
        { month: 'Mar', value: 200 },
        { month: 'Apr', value: 190 },
        { month: 'May', value: 220 },
        { month: 'Jun', value: 856 }
      ],
      color: 'from-orange-500 to-orange-600'
    }
  };

  // Handle stat card click
  const handleStatClick = (statId) => {
    setSelectedStat(statId);
  };

  // Simple chart component
  const SimpleChart = ({ data, type, color }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;

    return (
      <div className="w-full h-64 bg-[#2D1B3D]/40 rounded-xl p-4">
        <div className="flex items-end justify-between h-48 space-x-2">
          {data.map((item, index) => {
            const height = range > 0 ? ((item.value - minValue) / range) * 100 : 50;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full bg-gradient-to-t ${color} rounded-t-lg transition-all duration-500`}
                  style={{ 
                    height: `${height}%`,
                    minHeight: '20px'
                  }}
                />
                <span className="text-white/60 text-xs mt-2">{item.month}</span>
                <span className="text-white/80 text-xs font-medium">
                  {typeof item.value === 'number' && item.value > 1000 
                    ? `$${(item.value / 1000).toFixed(1)}k` 
                    : item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <AdminLayout currentPage="Dashboard">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6" style={{ border: 'none', outline: 'none' }}>
        <div className="w-full h-full space-y-8">
          {/* Header Section - Centered with darker colors */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Dashboard Overview</h1>
              <p className="text-[#2D1B3D]/80 text-lg">Welcome back! Here's what's happening with your store.</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                onClick={() => handleStatClick(stat.id)}
                className={`group relative bg-[#2D1B3D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:${stat.bgGlow} hover:-translate-y-1 cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${selectedStat === stat.id ? 'ring-2 ring-white/30' : ''}`}
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

          {/* Analytics Section */}
          <div className={`bg-[#2D1B3D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '800ms' }}>
              <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${analyticsData[selectedStat].color} flex items-center justify-center`}>
                  {analyticsData[selectedStat].type === 'line' ? (
                    <LineChart className="w-4 h-4 text-white" />
                  ) : (
                    <BarChart3 className="w-4 h-4 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{analyticsData[selectedStat].title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">Last 6 months</span>
              </div>
            </div>

            <SimpleChart 
              data={analyticsData[selectedStat].data} 
              type={analyticsData[selectedStat].type}
              color={analyticsData[selectedStat].color}
            />
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Average</p>
                <p className="text-white font-bold text-lg">
                  {typeof analyticsData[selectedStat].data[0].value === 'number' && analyticsData[selectedStat].data[0].value > 1000 
                    ? `$${(analyticsData[selectedStat].data.reduce((sum, d) => sum + d.value, 0) / analyticsData[selectedStat].data.length / 1000).toFixed(1)}k`
                    : Math.round(analyticsData[selectedStat].data.reduce((sum, d) => sum + d.value, 0) / analyticsData[selectedStat].data.length)
                  }
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Highest</p>
                <p className="text-white font-bold text-lg">
                  {typeof analyticsData[selectedStat].data[0].value === 'number' && analyticsData[selectedStat].data[0].value > 1000 
                    ? `$${(Math.max(...analyticsData[selectedStat].data.map(d => d.value)) / 1000).toFixed(1)}k`
                    : Math.max(...analyticsData[selectedStat].data.map(d => d.value))
                  }
                </p>
                      </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm">Growth</p>
                <p className="text-white font-bold text-lg">
                  {(() => {
                    const first = analyticsData[selectedStat].data[0].value;
                    const last = analyticsData[selectedStat].data[analyticsData[selectedStat].data.length - 1].value;
                    const growth = ((last - first) / first * 100).toFixed(1);
                    return `${growth}%`;
                  })()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;