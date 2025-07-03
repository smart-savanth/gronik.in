import React, { useState } from 'react';
import { User, Search, Edit, Trash2, Eye, X, Save, Ban } from 'lucide-react';
import AdminLayout from './Adminlayout';

const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'active', joined: '2024-01-10' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'blocked', joined: '2024-02-15' },
  { id: 3, name: 'Carol Brown', email: 'carol@example.com', role: 'Admin', status: 'active', joined: '2024-03-20' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'User', status: 'active', joined: '2024-04-05' },
];

const statusColors = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  blocked: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const UsersManagement = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(sampleUsers);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout currentPage="Users">
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-[#E9D8FD] via-[#F3E8FF] to-[#E9D8FD] py-10 px-2 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B3D]/90 rounded-2xl p-6 border border-gronik-secondary/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Users Management</h2>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gronik-light/50 w-4 h-4" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="bg-gronik-secondary/20 border border-gronik-secondary/30 rounded-lg pl-10 pr-4 py-2 text-gronik-light placeholder-gronik-light/50 focus:outline-none focus:border-gronik-accent focus:ring-1 focus:ring-gronik-accent transition-all duration-200 w-full"
                />
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-lg bg-gronik-primary/50 border border-gronik-secondary/20">
              <table className="min-w-full divide-y divide-gronik-secondary/20">
                <thead className="bg-gronik-primary/80">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gronik-light/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gronik-primary/60 divide-y divide-gronik-secondary/20">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gronik-secondary/10 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gronik-accent to-gronik-secondary flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gronik-light font-medium">{user.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/90">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/80">{user.role}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-xs font-semibold border rounded-full text-center ${statusColors[user.status]}`}>{user.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gronik-light/70">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 rounded-lg hover:bg-gronik-accent/20 transition-colors"><Eye className="w-4 h-4 text-gronik-accent" /></button>
                          <button className="p-2 rounded-lg hover:bg-green-500/20 transition-colors"><Edit className="w-4 h-4 text-green-400" /></button>
                          <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                          <button className="p-2 rounded-lg hover:bg-yellow-500/20 transition-colors"><Ban className="w-4 h-4 text-yellow-400" /></button>
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

export default UsersManagement; 