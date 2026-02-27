import React from 'react';
import { MessageSquare, Bell, Send, Users } from 'lucide-react';

const communications = {
  unreadMessages: 5,
  announcements: [
    { id: 1, title: 'Scheduled Maintenance', date: '2024-08-01' },
    { id: 2, title: 'Community BBQ', date: '2024-07-25' },
  ],
  recentChats: [
    { name: 'John Doe', message: 'I have a question about my lease.', time: '10m ago' },
    { name: 'Jane Smith', message: 'Thanks for the quick response!', time: '1h ago' },
  ],
};

export const CommunicationsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Communications Hub</h3>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Send className="mr-2" size={16} />
            New Message
          </button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Bell className="mr-2" size={16} />
            New Announcement
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="mr-2" /> Recent Chats
          </h4>
          <ul>
            {communications.recentChats.map(chat => (
              <li key={chat.name} className="py-2 border-b border-gray-700">
                <p className="font-bold">{chat.name}</p>
                <p className="text-gray-400">{chat.message}</p>
                <p className="text-xs text-gray-500 text-right">{chat.time}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h4 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="mr-2" /> Announcements
          </h4>
          <ul>
            {communications.announcements.map(a => (
              <li key={a.id} className="py-2 border-b border-gray-700">
                <p>{a.title}</p>
                <p className="text-xs text-gray-500">{a.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
