import React, { useState } from 'react';
import { ShoppingCart, Search, Check, X, Filter, Calendar, Download, Clock } from 'lucide-react';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Check className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'cancelled': return <X className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleExportOrders = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Order ID,Customer,Email,Book,Amount,Status,Date\n" +
      filteredOrders.map(order => 
        `${order.id},${order.customer},${order.email},${order.book},${order.amount},${order.status},${order.date}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout currentPage="Orders">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Orders Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Manage and track all your ebook orders</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-8 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 bg-[#2D1B3D]/80 text-white rounded-lg border border-white/10 placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-[#2D1B3D] text-white rounded-lg border border-white/10 focus:outline-none focus:border-white/20 text-sm appearance-none pr-8"
                style={{ minWidth: 120 }}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                ▼
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportOrders}
              className="flex items-center space-x-2 px-4 py-2 bg-[#2D1B3D] text-white rounded-lg hover:bg-[#9B7BB8] transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-[#2D1B3D]/80 border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Book</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredOrders.map((order, index) => (
                <tr 
                  key={order.id}
                  className="hover:bg-white/5 transition-all duration-300"
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
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                        disabled={order.status === 'completed' || order.status === 'cancelled'}
                        className={`p-2 rounded-lg transition-all duration-300 group ${
                          order.status === 'completed' || order.status === 'cancelled'
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-emerald-500/20'
                        }`}
                        title={order.status === 'completed' || order.status === 'cancelled' ? 'Already completed/cancelled' : 'Mark Complete'}
                      >
                        <Check className={`w-4 h-4 text-emerald-300 ${order.status !== 'completed' && order.status !== 'cancelled' ? 'group-hover:scale-110 transition-transform duration-300' : ''}`} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'processing')}
                        disabled={order.status === 'completed' || order.status === 'cancelled' || order.status === 'processing'}
                        className={`p-2 rounded-lg transition-all duration-300 group ${
                          order.status === 'completed' || order.status === 'cancelled' || order.status === 'processing'
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-amber-500/20'
                        }`}
                        title={order.status === 'completed' || order.status === 'cancelled' ? 'Already completed/cancelled' : order.status === 'processing' ? 'Already processing' : 'Mark Processing'}
                      >
                        <Clock className={`w-4 h-4 text-amber-300 ${order.status !== 'completed' && order.status !== 'cancelled' && order.status !== 'processing' ? 'group-hover:scale-110 transition-transform duration-300' : ''}`} />
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                        disabled={order.status === 'cancelled'}
                        className={`p-2 rounded-lg transition-all duration-300 group ${
                          order.status === 'cancelled'
                            ? 'opacity-30 cursor-not-allowed'
                            : 'hover:bg-red-500/20'
                        }`}
                        title={order.status === 'cancelled' ? 'Already cancelled' : 'Cancel Order'}
                      >
                        <X className={`w-4 h-4 text-red-300 ${order.status !== 'cancelled' ? 'group-hover:scale-110 transition-transform duration-300' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement;