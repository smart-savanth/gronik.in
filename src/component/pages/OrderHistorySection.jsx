import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Eye, Calendar, CreditCard, Truck, CheckCircle, XCircle, Clock as ClockIcon } from 'lucide-react';
import { useSelector } from "react-redux";
import api from "../../utils/api";


const OrderHistorySection = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock order data - in real app this would come from API
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const user = useSelector(state => state.userAuth.user);
const userId = user?.guid;

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

useEffect(() => {
if (!userId) return;

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/order/getorderItemsByUser/${userId}`);
console.log("ORDER API DATA:", res.data.data);

const rawOrders = (res?.data?.data || []).filter(item =>
  item.product_id &&
  item.product_name
);

const grouped = {};

rawOrders.forEach(item => {

  const orderId = item.order_id;

  if (!grouped[orderId]) {
    grouped[orderId] = {
      orderId: orderId,
      date: item.created_at,
      total: 0,
      status: "Delivered",

      tracking: {
        number: orderId,
        updates: [
          {
            status: "Order Placed",
            date: item.created_at,
            description: "Order created successfully"
          }
        ]
      },

      items: []
    };
  }

grouped[orderId].items.push({
  id: item.product_id,
  title: item.product_name,
  author: item.author,
  price: Number(item.final_price),
  originalPrice: Number(item.original_price),
  image: item.product_image
    ? `${BASE_URL}/${item.product_image}`
    : null,
  format: "E-Book"
});


  grouped[orderId].total += Number(item.final_price || 0);
});

setOrders(Object.values(grouped));



    } catch (err) {
      console.error(err);
      setError("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();

}, [userId]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9B7BB8] to-[#8A6AA7] px-3 py-6 mt-20">
      {loading && (
  <div className="text-center py-20 text-white">
    Loading your orders...
  </div>
)}

{error && (
  <div className="text-center py-20 text-red-400">
    {error}
  </div>
)}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Desktop (sm+) original layout */}
          <div className="hidden sm:block p-6">
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
          {/* Mobile (below sm) improved layout */}
          <div className="block sm:hidden px-3 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate('/profile')}
                className="flex items-center text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline text-xs">Back</span>
              </button>
              <Package className="w-6 h-6 text-[#9B7BB8]" />
              <h1 className="text-lg font-bold text-white">Order History</h1>
            </div>
            <div className="flex flex-col items-end justify-center">
              <span className="text-white/60 text-xs">Total Orders</span>
              <span className="text-white font-bold text-base">{orders.length}</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden p-0">
          <div className="divide-y divide-[#9B7BB8]/30">
            {!loading && orders.map((order, idx) => (
              <div
                key={order.orderId}
                className={`sm:px-6 px-2 sm:py-6 py-3 transition-all duration-200 group hover:bg-[#9B7BB8]/10 ${idx === 0 ? '' : ''} ${'rounded-2xl mb-2 sm:mb-4'}`}
                style={{ position: 'relative' }}
              >
                {/* Order Header */}
                {/* Desktop (sm+) original layout */}
                <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-5 h-5 text-[#9B7BB8]" />
                      <span className="text-white font-medium group-hover:text-[#ffe9b3] transition-colors duration-200">{order.orderId}</span>
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
                      <p className="text-[#9B7BB8] font-bold">₹{order.total}</p>
                    </div>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-[#9B7BB8]/20 hover:bg-[#9B7BB8]/30 text-white p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Mobile (below sm) improved layout */}
                <div className="flex sm:hidden flex-col justify-between mb-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-[#9B7BB8]" />
                    <span className="text-white font-medium group-hover:text-[#ffe9b3] transition-colors duration-200 text-xs">{order.orderId}</span>
                    <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}> 
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/60 text-xs">{new Date(order.date).toLocaleDateString()}</span>
                    <span className="text-[#9B7BB8] font-bold text-xs">₹{order.total}</span>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="w-9 h-9 flex items-center justify-center bg-[#9B7BB8]/20 hover:bg-[#9B7BB8]/30 text-white rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9B7BB8]"
                      style={{ minWidth: '2.25rem', minHeight: '2.25rem' }}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Order Items Preview */}
                {/* Desktop (sm+) original layout */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-[#9B7BB8]/10 rounded-2xl">
                      <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{item.title}</h4>
                        <p className="text-white/60 text-xs">by {item.author}</p>
                        <p className="text-[#9B7BB8] font-medium text-sm">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center p-3 bg-[#9B7BB8]/10 rounded-2xl">
                      <span className="text-white/60 text-sm">+{Math.max(order.items.length - 3, 0)} more items</span>
                    </div>
                  )}
                </div>
                {/* Mobile (below sm) improved layout */}
                <div className="flex sm:hidden flex-row space-x-2 overflow-x-auto pb-1">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.id} className="flex flex-col items-center min-w-[70px] bg-[#9B7BB8]/10 rounded-xl p-2">
                      <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 mb-1">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-white font-medium text-xs truncate w-14 text-center">{item.title}</h4>
                      <span className="text-[#9B7BB8] font-medium text-xs">₹{item.price}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center min-w-[70px] bg-[#9B7BB8]/10 rounded-xl p-2">
                      <span className="text-white/60 text-xs">+{order.items.length - 3} more</span>
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#2D1B3D]/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full max-h-[calc(100%-2rem)] overflow-y-auto">
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
                  <p className="text-[#9B7BB8] font-bold text-lg">₹{selectedOrder.total}</p>
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
                        <p className="text-[#9B7BB8] font-medium">₹{item.price}</p>
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