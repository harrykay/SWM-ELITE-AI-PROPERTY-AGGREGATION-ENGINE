import React from 'react';
import { User, Mail, Phone, Building, ChevronDown } from 'lucide-react';

const tenants = [
  { name: 'John Doe', property: 'SMW-001', status: 'Active', avatar: '/placeholder-user.jpg' },
  { name: 'Jane Smith', property: 'SMW-002', status: 'Active', avatar: '/placeholder-user.jpg' },
  { name: 'Peter Jones', property: 'SMW-003', status: 'Inactive', avatar: '/placeholder-user.jpg' },
  { name: 'Mary Williams', property: 'SMW-004', status: 'Active', avatar: '/placeholder-user.jpg' },
];

export const TenantsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Tenants</h3>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center">
            Filter <ChevronDown className="ml-2" size={16} />
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Tenant</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenants.map((tenant, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img src={tenant.avatar} alt={tenant.name} className="w-16 h-16 rounded-full" />
              <div>
                <h4 className="text-xl font-bold">{tenant.name}</h4>
                <p className="text-gray-400">{tenant.property}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm ${tenant.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {tenant.status}
              </span>
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-400" />
                <Phone size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
