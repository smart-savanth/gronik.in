import React, { useState } from 'react';
import { Receipt, Search, Check, X, Filter, Calendar, Download, Clock, CreditCard, Eye } from 'lucide-react';
import AdminLayout from './Adminlayout';

const sampleTransactions = [
  { id: 'TXN-001', orderId: '#ORD-001', customer: 'Alice Johnson', amount: '$29.99', method: 'Credit Card', cardLast4: '4242', status: 'completed', date: '2024-06-08', email: 'alice@example.com' },
  { id: 'TXN-002', orderId: '#ORD-002', customer: 'Bob Smith', amount: '$34.99', method: 'PayPal', cardLast4: null, status: 'pending', date: '2024-06-08', email: 'bob@example.com' },
  { id: 'TXN-003', orderId: '#ORD-003', customer: 'Carol Brown', amount: '$24.99', method: 'Credit Card', cardLast4: '5555', status: 'completed', date: '2024-06-07', email: 'carol@example.com' },
  { id: 'TXN-004', orderId: '#ORD-004', customer: 'David Wilson', amount: '$39.99', method: 'Debit Card', cardLast4: '1234', status: 'failed', date: '2024-06-06', email: 'david@example.com' },
  { id: 'TXN-005', orderId: '#ORD-005', customer: 'Emma Davis', amount: '$44.99', method: 'Credit Card', cardLast4: '9876', status: 'completed', date: '2024-06-05', email: 'emma@example.com' },
];

const statusColors = {
  completed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20',
  pending: 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-blue-500/20',
  failed: 'bg-red-500/20 text-red-300 border-red-500/40 shadow-red-500/20',
};

const Transactions = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [transactions, setTransactions] = useState(sampleTransactions);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(search.toLowerCase()) ||
      transaction.id.toLowerCase().includes(search.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Check className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'failed': return <X className="w-3 h-3" />;
      default: return null;
    }
  };

  const handleViewTransaction = (transaction) => {
    alert(`Transaction Details:\n\nID: ${transaction.id}\nOrder: ${transaction.orderId}\nCustomer: ${transaction.customer}\nEmail: ${transaction.email}\nAmount: ${transaction.amount}\nMethod: ${transaction.method}${transaction.cardLast4 ? `\nCard: •••• ${transaction.cardLast4}` : ''}\nStatus: ${transaction.status}\nDate: ${transaction.date}`);
  };

  return (
    <AdminLayout currentPage="Transactions">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#9B7BB8] via-[#9B7BB8] to-purple-900 -m-6 p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2D1B3D] mb-3">Transactions Management</h1>
          <p className="text-[#2D1B3D]/80 text-lg">Track and manage all payment transactions</p>
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
                placeholder="Search transactions..."
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
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-[#2D1B3D]/80 border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredTransactions.map((transaction, index) => (
                <tr 
                  key={transaction.id}
                  className="hover:bg-white/5 transition-all duration-300"
                >
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="text-white font-medium block">{transaction.id}</span>
                      <span className="text-white/60 text-sm">{transaction.orderId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-white font-medium">{transaction.customer}</div>
                      <div className="text-white/60 text-sm">{transaction.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold">{transaction.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-white/60" />
                      <div>
                        <div className="text-white/90 text-sm">{transaction.method}</div>
                        {transaction.cardLast4 && (
                          <div className="text-white/50 text-xs">•••• {transaction.cardLast4}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${statusColors[transaction.status]} shadow-lg`}>
                      {getStatusIcon(transaction.status)}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      {transaction.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => handleViewTransaction(transaction)}
                        className="p-2 rounded-lg transition-all duration-300 hover:bg-blue-500/20 group"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
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

export default Transactions;