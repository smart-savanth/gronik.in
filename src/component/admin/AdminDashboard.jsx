import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import AdminLayout from './Adminlayout';

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedStat, setSelectedStat] = useState('sales'); 

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
        { month: 'Jun', value: 280 },
        { month: 'Jul', value: 300 },
        { month: 'Aug', value: 320 },
        { month: 'Sep', value: 340 },
        { month: 'Oct', value: 360 },
        { month: 'Nov', value: 380 },
        { month: 'Dec', value: 400 }
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
        { month: 'Jun', value: 1234 },
        { month: 'Jul', value: 1300 },
        { month: 'Aug', value: 1350 },
        { month: 'Sep', value: 1400 },
        { month: 'Oct', value: 1450 },
        { month: 'Nov', value: 1500 },
        { month: 'Dec', value: 1550 }
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
        { month: 'Jun', value: 45678 },
        { month: 'Jul', value: 47000 },
        { month: 'Aug', value: 48000 },
        { month: 'Sep', value: 49000 },
        { month: 'Oct', value: 50000 },
        { month: 'Nov', value: 51000 },
        { month: 'Dec', value: 52000 }
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
        { month: 'Jun', value: 856 },
        { month: 'Jul', value: 900 },
        { month: 'Aug', value: 950 },
        { month: 'Sep', value: 1000 },
        { month: 'Oct', value: 1100 },
        { month: 'Nov', value: 1200 },
        { month: 'Dec', value: 1300 }
      ],
      color: 'from-orange-500 to-orange-600'
    }
  };

  // Handle stat card click
  const handleStatClick = (statId) => {
    setSelectedStat(statId);
  };

  // Responsive full-width chart: use ref and resize observer
  const useContainerWidth = () => {
    const ref = React.useRef(null);
    const [width, setWidth] = React.useState(900);
    React.useEffect(() => {
      if (!ref.current) return;
      const handleResize = () => {
        if (ref.current) setWidth(ref.current.offsetWidth);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return [ref, width];
  };

  // Custom SVG/React chart for React 19 compatibility
  const AnalyticsChart = ({ data, type, statId }) => {
    // Color mapping for Gronik palette
    const colorMap = {
      sales: '#a67fc4',
      users: '#4ade80',
      books: '#60a5fa',
      orders: '#f59e42',
    };
    const mainColor = colorMap[statId] || '#a67fc4';
    const [containerRef, width] = useContainerWidth();
    const height = 260;
    const labelPadding = 72; // For Y labels
    const chartPadding = 16; // For chart area (small margin)
    const barWidth = 40;
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const yRange = maxValue - minValue || 1;
    const getX = (i) => chartPadding + labelPadding + i * ((width - 2 * chartPadding - labelPadding) / (data.length - 1));
    const getY = (v) => height - chartPadding - ((v - minValue) / yRange) * (height - 2 * chartPadding);
    const [hovered, setHovered] = React.useState(null);

    // Smooth animation: animate line/points from previous to new positions
    const prevStat = React.useRef(statId);
    const prevValues = React.useRef(data.map(d => d.value));
    const [animValues, setAnimValues] = React.useState(data.map(d => d.value));
    const [isAnimating, setIsAnimating] = React.useState(false);
    const lerp = (a, b, t) => a + (b - a) * t;
    React.useEffect(() => {
      let frame;
      let start;
      const duration = 900;
      const from = prevValues.current;
      const to = data.map(d => d.value);
      // Only animate if statId changed
      if (prevStat.current !== statId) {
        setIsAnimating(true);
        function animate(ts) {
          if (!start) start = ts;
          const t = Math.min(1, (ts - start) / duration);
          setAnimValues(from.map((v, i) => lerp(v, to[i], t)));
          if (t < 1) {
            frame = requestAnimationFrame(animate);
          } else {
            setAnimValues(to);
            setIsAnimating(false);
            prevValues.current = to;
          }
        }
        frame = requestAnimationFrame(animate);
        prevStat.current = statId;
        return () => frame && cancelAnimationFrame(frame);
      } else {
        setAnimValues(to);
        setIsAnimating(false);
        prevValues.current = to;
      }
    }, [data, statId]);
    return (
      <div className="w-full flex justify-center items-center" ref={containerRef} style={{width: '100%'}}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{width: '100%'}}>
          {/* Y axis grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = getY(minValue + t * yRange);
            return <line key={i} x1={labelPadding} x2={width-chartPadding} y1={y} y2={y} stroke="#fff2" strokeDasharray="4 4" />;
          })}
          {/* X axis labels */}
          {data.map((d, i) => (
            <text key={i} x={getX(i)} y={height-chartPadding+24} textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="16">{d.month}</text>
          ))}
          {/* Y axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const v = minValue + t * yRange;
            const y = getY(v);
            return <text key={i} x={labelPadding-18} y={y+6} textAnchor="end" fill="#fff" fontWeight="bold" fontSize="16">{v > 1000 ? `$${(v/1000).toFixed(1)}k` : Math.round(v)}</text>;
          })}
          {/* Chart */}
          {type === 'line' ? (
            <>
              {/* Line path with animation on first load */}
              <polyline
                fill="none"
                stroke={mainColor}
                strokeWidth="5"
                points={animValues.map((v, i) => `${getX(i)},${getY(v)}`).join(' ')}
                style={{ filter: 'drop-shadow(0 2px 8px #0004)', transition: isAnimating ? 'none' : 'all 0.7s cubic-bezier(.4,2,.6,1)' }}
              />
              {/* Dots */}
              {animValues.map((v, i) => (
                <g key={i}>
                  <circle
                    cx={getX(i)}
                    cy={getY(v)}
                    r={hovered === i ? 12 : 8}
                    fill={mainColor}
                    stroke="#fff"
                    strokeWidth={hovered === i ? 4 : 2}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {/* Tooltip */}
                  {hovered === i && (
                    <g>
                      <rect x={getX(i)-48} y={getY(v)-54} width="96" height="38" rx="10" fill="#2D1B3D" stroke={mainColor} strokeWidth="2" />
                      <text x={getX(i)} y={getY(v)-34} textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="16">{data[i].month}</text>
                      <text x={getX(i)} y={getY(v)-16} textAnchor="middle" fill={mainColor} fontWeight="bold" fontSize="18">{data[i].value > 1000 ? `$${(data[i].value/1000).toFixed(1)}k` : data[i].value}</text>
                    </g>
                  )}
                </g>
              ))}
            </>
          ) : (
            <>
              {/* Bars */}
              {data.map((d, i) => (
                <g key={i}>
                  <rect
                    x={getX(i) - barWidth/2}
                    y={getY(d.value)}
                    width={barWidth}
                    height={height-chartPadding-getY(d.value)}
                    fill={mainColor}
                    rx="8"
                    style={{ cursor: 'pointer', filter: hovered === i ? `drop-shadow(0 0 16px ${mainColor}88)` : 'none', transition: 'all 0.2s' }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {/* Tooltip */}
                  {hovered === i && (
                    <g>
                      <rect x={getX(i)-48} y={getY(d.value)-54} width="96" height="38" rx="10" fill="#2D1B3D" stroke={mainColor} strokeWidth="2" />
                      <text x={getX(i)} y={getY(d.value)-34} textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="16">{d.month}</text>
                      <text x={getX(i)} y={getY(d.value)-16} textAnchor="middle" fill={mainColor} fontWeight="bold" fontSize="18">{d.value > 1000 ? `$${(d.value/1000).toFixed(1)}k` : d.value}</text>
                    </g>
                  )}
                </g>
              ))}
            </>
          )}
        </svg>
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
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{analyticsData[selectedStat].title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">Last 6 months</span>
              </div>
            </div>

            <AnalyticsChart
              data={analyticsData[selectedStat].data}
              type={analyticsData[selectedStat].type}
              statId={selectedStat}
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