import React, { useState, useEffect } from 'react';
import { User, Shield, Trash2, Edit, Check, X, RefreshCw } from 'lucide-react';

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

export const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setError('Failed to fetch users.');
      }
    } catch (err) {
      setError('An error occurred while fetching users.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (user: User) => {
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, role: selectedRole } : u));
        setEditingUser(null);
      } else {
        setError('Failed to update user role.');
      }
    } catch (err) {
      setError('An error occurred while updating user role.');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (res.ok) {
          setUsers(users.filter(u => u.id !== userId));
        } else {
          setError('Failed to delete user.');
        }
      } catch (err) {
        setError('An error occurred while deleting user.');
      }
    }
  };

  const startEditing = (user: User) => {
    setEditingUser(user);
    setSelectedRole(user.role);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><RefreshCw className="animate-spin text-gray-500" size={32} /></div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">User Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser?.id === user.id ? (
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="bg-gray-700 text-white rounded-md p-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="agent">Agent</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  ) : (
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">{user.role}</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingUser?.id === user.id ? (
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleUpdateRole(user)} className="text-green-500 hover:text-green-400"><Check size={18} /></button>
                      <button onClick={() => setEditingUser(null)} className="text-red-500 hover:text-red-400"><X size={18} /></button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <button onClick={() => startEditing(user)} className="text-indigo-500 hover:text-indigo-400"><Edit size={18} /></button>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
