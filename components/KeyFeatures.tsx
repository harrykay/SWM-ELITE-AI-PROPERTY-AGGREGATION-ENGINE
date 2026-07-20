
import React from 'react';
import { 
  Smartphone, UserCheck, Repeat, Zap, 
  LineChart, UserMinus, Users, Clock, 
  Settings, LayoutDashboard, PlusSquare, Calendar
} from 'lucide-react';

const features = [
  { icon: <Smartphone />, title: 'Fully Responsive' },
  { icon: <UserCheck />, title: 'User Friendly' },
  { icon: <Repeat />, title: 'Compare Property' },
  { icon: <Zap />, title: 'Smart Listing' },
  { icon: <LineChart />, title: 'Investor Investment' },
  { icon: <UserMinus />, title: 'Directly Contact' },
  { icon: <Users />, title: 'Collaboration' },
  { icon: <Clock />, title: 'Real Time Update' },
  { icon: <Settings />, title: 'Smart Management' },
  { icon: <LayoutDashboard />, title: 'Admin/Seller Dashboard' },
  { icon: <PlusSquare />, title: 'Create Projects' },
  { icon: <Calendar />, title: 'Easily Get Appoint' },
];

export const KeyFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Key <span className="text-[#8DC63F]">Features</span>
          </h2>
          <div className="w-24 h-1 bg-[#8DC63F] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-14 h-14 bg-[#8DC63F]/10 text-[#8DC63F] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8DC63F] group-hover:text-black transition-all duration-300">
                {/* Fix: Cast f.icon to any to allow passing size prop in cloneElement */}
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 leading-snug px-2">
                {f.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
