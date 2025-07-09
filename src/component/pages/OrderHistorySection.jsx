import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Eye, Calendar, CreditCard, Truck, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';

const OrderHistorySection = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock order data - in real app this would come from API
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 450,
      items: [
        {
          id: 1,
          title: "Think and Grow Rich",
          author: "Napoleon Hill",
          price: 150,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
          format: "E-Book"
        },
        {
          id: 2,
          title: "48 Laws of Power",
          author: "Robert Greene",
          price: 200,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
          format: "E-Book"
        },
        {
          id: 3,
          title: "Atomic Habits",
          author: "James Clear",
          price: 175,
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
          format: "E-Book"
        }
      ],
      tracking: {
        number: 'TRK-123456789',
        status: 'Delivered',
        updates: [
          { date: '2024-01-15 10:30', status: 'Order Placed', description: 'Your order has been confirmed' },
          { date: '2024-01-15 14:20', status: 'Processing', description: 'Your books are being prepared' },
          { date: '2024-01-15 16:45', status: 'Ready for Download', description: 'Your e-books are ready to download' },
          { date: '2024-01-15 17:00', status: 'Delivered', description: 'All files have been delivered to your library' }
        ]
      }
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'Processing',
      total: 325,
      items: [
        {
          id: 4,
          title: "The 7 Habits of Highly Effective People",
          author: "Stephen Covey",
          price: 180,
          image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
          format: "E-Book"
        },
        {
          id: 5,
          title: "Mindset: The New Psychology of Success",
          author: "Carol Dweck",
          price: 160,
          image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=400&fit=crop",
          format: "E-Book"
        }
      ],
      tracking: {
        number: 'TRK-987654321',
        status: 'Processing',
        updates: [
          { date: '2024-01-10 09:15', status: 'Order Placed', description: 'Your order has been confirmed' },
          { date: '2024-01-10 11:30', status: 'Processing', description: 'Your books are being prepared' }
        ]
      }
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'Cancelled',
      total: 200,
      items: [
        {
          id: 6,
          title: "Getting Things Done",
          author: "David Allen",
          price: 200,
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
          format: "E-Book"
        }
      ],
      tracking: {
        number: 'TRK-456789123',
        status: 'Cancelled',
        updates: [
          { date: '2024-01-05 15:20', status: 'Order Placed', description: 'Your order has been confirmed' },
          { date: '2024-01-05 16:45', status: 'Cancelled', description: 'Order was cancelled by customer' }
        ]
      }
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-400 bg-green-400/20';
      case 'Processing': return 'text-yellow-400 bg-yellow-400/20';
      case 'Cancelled': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Processing': return <ClockIcon className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-6 mt-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">Back to Profile</span>
                </button>
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-[#9B7BB8] mr-3" />
                  <h1 className="text-2xl font-bold text-white">Order History</h1>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Total Orders</p>
                <p className="text-white font-bold text-xl">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden p-0">
          <div className="divide-y divide-[#9B7BB8]/30">
            {orders.map((order, idx) => (
              <div
                key={order.id}
                className={`px-6 py-6 transition-all duration-200 group hover:bg-[#9B7BB8]/10 ${idx === 0 ? '' : ''}`}
                style={{ position: 'relative' }}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-[#9B7BB8]" />
                      <span className="text-white font-medium group-hover:text-[#ffe9b3] transition-colors duration-200">{order.id}</span>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}> 
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Order Date</p>
                      <p className="text-white font-medium">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Total</p>
                      <p className="text-[#9B7BB8] font-bold">${order.total}</p>
                    </div>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-[#9B7BB8]/20 hover:bg-[#9B7BB8]/30 text-white p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-[#9B7BB8]/10 rounded-2xl">
                      <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{item.title}</h4>
                        <p className="text-white/60 text-xs">by {item.author}</p>
                        <p className="text-[#9B7BB8] font-medium text-sm">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center p-3 bg-[#9B7BB8]/10 rounded-2xl">
                      <span className="text-white/60 text-sm">+{order.items.length - 3} more items</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16 bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl">
              <Package className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
              <p className="text-white/60 mb-6">You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/library')}
                className="bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7] text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 text-[#9B7BB8]" />
                  <h2 className="text-xl font-bold text-white">Order Details</h2>
                </div>
                <button
                  onClick={closeOrderDetails}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#9B7BB8]" />
                    <span className="text-white/60 text-sm">Order Date</span>
                  </div>
                  <p className="text-white font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="w-4 h-4 text-[#9B7BB8]" />
                    <span className="text-white/60 text-sm">Tracking Number</span>
                  </div>
                  <p className="text-white font-medium">{selectedOrder.tracking.number}</p>
                </div>
                <div className="bg-[#9B7BB8]/10 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="w-4 h-4 text-[#9B7BB8]" />
                    <span className="text-white/60 text-sm">Total Amount</span>
                  </div>
                  <p className="text-[#9B7BB8] font-bold text-lg">${selectedOrder.total}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-[#9B7BB8]/10 rounded-2xl">
                      <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{item.title}</h4>
                        <p className="text-white/60 text-sm">by {item.author}</p>
                        <p className="text-[#9B7BB8] font-medium">${item.price}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-white/60 text-sm">{item.format}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Updates */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  {selectedOrder.tracking.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${index === selectedOrder.tracking.updates.length - 1 ? 'bg-[#9B7BB8]' : 'bg-white/30'}`}></div>
                        {index < selectedOrder.tracking.updates.length - 1 && (
                          <div className="w-0.5 h-8 bg-white/30 mx-auto mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium">{update.status}</span>
                          <span className="text-white/60 text-sm">{update.date}</span>
                        </div>
                        <p className="text-white/80 text-sm">{update.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistorySection; 