
import React from 'react';
import { LayoutDashboard, List, TrendingUp, Calendar } from 'lucide-react';

const SellerCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}> = ({ title, icon, features, color }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
    <div className={`flex items-center gap-3 mb-6 ${color}`}>
      {icon}
      <h4 className="font-bold text-gray-900">{title}</h4>
    </div>
    <ul className="space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export const SellerDashboard: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            Easy to <span className="text-[#8DC63F]">Sell</span>
          </h2>
          <p className="text-gray-600">Designed to simplify selling, boost visibility, and speed up conversions.</p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-20">
          <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
            <img src="https://picsum.photos/seed/dash2/1200/600" className="w-full opacity-90" alt="Seller Dashboard" referrerPolicy="no-referrer" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SellerCard
            title="Overview"
            icon={<LayoutDashboard />}
            features={["Premium Flow", "Live Graph & Charts", "All Overview"]}
            color="text-[#8DC63F]"
          />
          <SellerCard
            title="Listing"
            icon={<List />}
            features={["Manage Listing", "Create Property", "7 easy step"]}
            color="text-blue-500"
          />
          <SellerCard
            title="Manage Investments"
            icon={<TrendingUp />}
            features={["My Projects", "Create Project", "Wallet", "Live Reports"]}
            color="text-[#8DC63F]"
          />
          <SellerCard
            title="Manage Appointments"
            icon={<Calendar />}
            features={["Filter (Pending Confirmed & Cancelled)", "Confirm Appointment", "Cancel Appointment"]}
            color="text-[#8DC63F]"
          />
        </div>
      </div>
    </section>
  );
};
