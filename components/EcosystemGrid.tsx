
import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, ShoppingBag, TrendingUp } from 'lucide-react';

const ecosystems = [
  { label: 'Buyer', icon: <User size={28} />, color: '#8DC63F' },
  { label: 'Admin', icon: <ShieldCheck size={28} />, color: '#FF5A3D' },
  { label: 'Seller', icon: <ShoppingBag size={28} />, color: '#0073e1' },
  { label: 'Investor', icon: <TrendingUp size={28} />, color: '#9c27b0' },
];

interface EcosystemGridProps {
  onNavigate: (page: string) => void;
}

export const EcosystemGrid: React.FC<EcosystemGridProps> = ({ onNavigate }) => {
  const handleItemClick = (label: string) => {
    switch (label) {
      case 'Buyer': onNavigate('properties'); break;
      case 'Seller': onNavigate('dashboard'); break;
      case 'Investor': onNavigate('projects'); break;
      case 'Admin': onNavigate('login'); break;
      default: onNavigate('login');
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-20">
          <div className="inline-block px-8 py-3 bg-gray-100 rounded-full text-3xl font-black text-gray-900 shadow-sm border border-gray-200 mb-4">
            4 <span className="text-[#FF5A3D]">in</span> 1
          </div>
          <div className="w-16 h-1.5 bg-[#FF5A3D] mx-auto rounded-full mt-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {ecosystems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleItemClick(item.label)}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
                {/* Custom Hexagon Shape with SVG */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-lg transition-transform group-hover:scale-110">
                  <path 
                    d="M50 5 L90 27.5 V72.5 L50 95 L10 72.5 V27.5 Z" 
                    fill="white" 
                    stroke={item.color} 
                    strokeWidth="1.5"
                  />
                </svg>
                <div 
                  className="relative z-10 flex items-center justify-center transition-all group-hover:rotate-12"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
              </div>
              <span className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
