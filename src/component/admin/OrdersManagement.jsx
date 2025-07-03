import React, { useState } from 'react';
import { ShoppingCart, Search, Eye, Check, X, Filter, Calendar, Download, RefreshCw, Clock } from 'lucide-react';
import AdminLayout from './Adminlayout';

const sampleOrders = [
  { id: '#ORD-001', customer: 'Alice Johnson', book: 'Think and Grow Rich', amount: '$29.99', status: 'completed', date: '2024-06-08', email: 'alice@example.com' },
  { id: '#ORD-002', customer: 'Bob Smith', book: 'Digital Marketing Mastery', amount: '$34.99', status: 'processing', date: '2024-06-08', email: 'bob@example.com' },
  { id: '#ORD-003', customer: 'Carol Brown', book: 'Mysteries of Universe', amount: '$24.99', status: 'completed', date: '2024-06-07', email: 'carol@example.com' },
  { id: '#ORD-004', customer: 'David Wilson', book: 'JavaScript Complete Guide', amount: '$39.99', status: 'pending', date: '2024-06-06', email: 'david@example.com' },
  { id: '#ORD-005', customer: 'Emma Davis', book: 'AI Revolution', amount: '$44.99', status: 'cancelled', date: '2024-06-05', email: 'emma@example.com' },
];

const statusColors = {
  completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20',
  processing: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20',
  pending: 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-blue-500/20',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/40 shadow-red-500/20',
};

const OrdersManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.book.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Check className="w-3 h-3" />;
      case 'processing': return <RefreshCw className="w-3 h-3 animate-spin" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'cancelled': return <X className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <AdminLayout currentPage="Orders">
      <div className="min-h-screen bg-[#9B7BB8] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                Orders Management
              </h1>
              <p className="text-white/70">Manage and track all your ebook orders</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white transition-all duration-300 flex items-center gap-2 group"
              >
                <RefreshCw className={`w-4 h-4 transition-transform duration-300 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                Refresh
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-[#2D1B3D] rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search orders by ID, customer, or book..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-[#2D1B3D] border border-white/20 rounded-xl pl-12 pr-8 py-3 text-white focus:outline-none focus:border-white/40 transition-all duration-300 appearance-none"
                  >
                    <option value="all" className="bg-[#2D1B3D] text-white">All Statuses</option>
                    <option value="completed" className="bg-[#2D1B3D] text-white">Completed</option>
                    <option value="processing" className="bg-[#2D1B3D] text-white">Processing</option>
                    <option value="pending" className="bg-[#2D1B3D] text-white">Pending</option>
                    <option value="cancelled" className="bg-[#2D1B3D] text-white">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-[#2D1B3D] rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-white/70 font-medium">Order ID</th>
                    <th className="text-left px-6 py-4 text-white/70 font-medium">Customer</th>
                    <th className="text-left px-6 py-4 text-white/70 font-medium">Book</th>
                    <th className="text-left px-6 py-4 text-white/70 font-medium">Amount</th>
                    <th className="text-left px-6 py-4 text-white/70 font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-white/70 font-medium">Date</th>
                    <th className="text-center px-6 py-4 text-white/70 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredOrders.map((order, index) => (
                    <tr 
                      key={order.id}
                      className="hover:bg-white/5 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-white font-medium">{order.customer}</div>
                          <div className="text-white/60 text-sm">{order.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/90">{order.book}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">{order.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${statusColors[order.status]} shadow-lg`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-300 group-hover:scale-110"
                          >
                            <Eye className="w-4 h-4 text-blue-300" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(order.id, 'completed')}
                            className="p-2 rounded-lg hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110"
                          >
                            <Check className="w-4 h-4 text-emerald-300" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            className="p-2 rounded-lg hover:bg-red-500/20 transition-all duration-300 group-hover:scale-110"
                          >
                            <X className="w-4 h-4 text-red-300" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-[#2D1B3D] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Order Details</h2>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Order ID</p>
                      <p className="text-white font-medium">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Status</p>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${statusColors[selectedOrder.status]} shadow-lg`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Customer</p>
                    <p className="text-white font-medium">{selectedOrder.customer}</p>
                    <p className="text-white/60 text-sm">{selectedOrder.email}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Book</p>
                    <p className="text-white font-medium">{selectedOrder.book}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Amount</p>
                      <p className="text-white font-bold text-lg">{selectedOrder.amount}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Date</p>
                      <p className="text-white font-medium">{selectedOrder.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => handleStatusUpdate(selectedOrder.id, 'completed')}
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-2 rounded-lg transition-all duration-300"
                    >
                      Mark Complete
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
                      className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 rounded-lg transition-all duration-300"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement;