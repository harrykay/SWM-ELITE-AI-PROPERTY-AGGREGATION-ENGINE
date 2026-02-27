import React from 'react';
import { Wrench, Clock, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

const maintenanceRequests = [
  { title: 'Leaky Faucet', property: 'SMW-001', priority: 'High', status: 'Pending', date: '2024-07-28' },
  { title: 'Broken Window', property: 'SMW-002', priority: 'Medium', status: 'In Progress', date: '2024-07-27' },
  { title: 'AC Not Cooling', property: 'SMW-003', priority: 'Low', status: 'Completed', date: '2024-07-26' },
  { title: 'Cracked Wall', property: 'SMW-004', priority: 'High', status: 'Pending', date: '2024-07-28' },
];

const priorityColors = {
  High: 'text-red-400',
  Medium: 'text-yellow-400',
  Low: 'text-green-400',
};

const statusIcons = {
  Pending: <Clock size={16} />,
  'In Progress': <Wrench size={16} />,
  Completed: <CheckCircle size={16} />,
};

export const MaintenanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Maintenance Requests</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="mr-2" size={16} />
          New Request
        </button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-4">Title</th>
              <th className="p-4">Property</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRequests.map((request, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-4">{request.title}</td>
                <td className="p-4">{request.property}</td>
                <td className={`p-4 ${priorityColors[request.priority]}`}>{request.priority}</td>
                <td className="p-4 flex items-center space-x-2">
                  {statusIcons[request.status]}
                  <span>{request.status}</span>
                </td>
                <td className="p-4">{request.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
