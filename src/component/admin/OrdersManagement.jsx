import React, { useState } from 'react';
import { ShoppingCart, Search, Eye, Check, X, Filter } from 'lucide-react';
import AdminLayout from './Adminlayout';

const sampleOrders = [
  { id: '#ORD-001', customer: 'Alice Johnson', book: 'Think and Grow Rich', amount: '$29.99', status: 'completed', date: '2024-06-08' },
  { id: '#ORD-002', customer: 'Bob Smith', book: 'Digital Marketing Mastery', amount: '$34.99', status: 'processing', date: '2024-06-08' },
  { id: '#ORD-003', customer: 'Carol Brown', book: 'Mysteries of Universe', amount: '$24.99', status: 'completed', date: '2024-06-07' },
];

const statusColors = {
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const OrdersManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState(sampleOrders);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.book.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout currentPage="Orders">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#E9D8FD] via-[#F3E8FF] to-[#E9D8FD] py-10 px-2 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Orders Management</h2>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gronik-light/50 w-4 h-4" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search orders..."
                    className="bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg pl-10 pr-4 py-2 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200 w-full"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg px-4 py-2 text-gronik-light focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-lg bg-gronik-primary/50 border border-gronik-secondary/20">
              <table className="min-w-full divide-y divide-gronik-secondary/20">
                <thead className="bg-gronik-primary/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gronik-primary/60 divide-y divide-gronik-secondary/20">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gronik-secondary/10 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light font-medium">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/90">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/80">{order.book}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/80">{order.amount}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-xs font-semibold border rounded-full text-center ${statusColors[order.status]}`}>{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/70">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 rounded-lg hover:bg-gronik-accent/20 transition-colors"><Eye className="w-4 h-4 text-gronik-accent" /></button>
                          <button className="p-2 rounded-lg hover:bg-green-500/20 transition-colors"><Check className="w-4 h-4 text-green-400" /></button>
                          <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"><X className="w-4 h-4 text-red-400" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement; 