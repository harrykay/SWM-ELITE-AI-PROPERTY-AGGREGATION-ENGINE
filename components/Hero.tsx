
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Sparkles, Building2, Users2, ShieldCheck } from 'lucide-react';
import { Currency } from '../App';

interface HeroProps {
  currency: Currency;
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ currency, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('Sales');

  const ugandanCities = [
    'Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 
    'Mbale', 'Masaka', 'Arua', 'Lira', 'Fort Portal', 
    'Hoima', 'Mukono', 'Kabale', 'Soroti', 'Wakiso'
  ];

  const stats = [
    { icon: <Building2 size={16} />, label: "Properties", value: "5.2k+" },
    { icon: <Users2 size={16} />, label: "Happy Clients", value: "12k+" },
    { icon: <ShieldCheck size={16} />, label: "Years Trust", value: "70+" },
  ];

  const priceOptions = currency === 'UGX' 
    ? ['Price Range', '0 - 380M', '380M - 1.9B', '1.9B - 3.8B', '3.8B+']
    : ['Price Range', '$0 - $100k', '$100k - $500k', '$500k - $1M', '$1M+'];

  return (
    <section className="relative min-h-[850px] md:h-screen md:min-h-[950px] flex items-center justify-center overflow-hidden pt-28 md:pt-0">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover" 
          alt="Luxury Architecture" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-24 md:mb-40"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-black text-[#8DC63F] uppercase tracking-[0.4em] mb-6 md:mb-10 border border-white/10">
            <Sparkles size={14} className="animate-pulse" /> Unified Market Hub • {currency} Active
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-9xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-[0.9] uppercase">
            Architecting<br /><span className="text-[#8DC63F]">Trust & Value.</span>
          </h1>
          <p className="text-white/60 text-base md:text-xl max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-medium mb-8 md:mb-12 px-4">
            Pioneering construction and premium property management since 1950. 
            A unified hub for the local market and global Ugandan diaspora.
          </p>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-8 md:mt-12">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-white/40 mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-black text-white tracking-tighter">{stat.value}</div>
                <div className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 z-20">
        <div className="flex mb-0 pl-1 gap-1 md:gap-2 overflow-x-auto no-scrollbar">
          {['Sales', 'Rentals', 'Invest'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-t-2xl md:rounded-t-3xl transition-all duration-300 whitespace-nowrap ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]' : 'bg-black/40 text-white/50 hover:text-white backdrop-blur-2xl'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-r-2xl md:rounded-r-[3rem] rounded-bl-2xl md:rounded-bl-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-6 md:p-12 flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch md:items-end border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 flex-1 w-full">
            <FilterOption label="Property Nodes" options={['Select Category', 'Apartment', 'Villa', 'Studio', 'Plot']} />
            <FilterOption label="Target Node (City)" options={['Global View', ...ugandanCities]} />
            <FilterOption label="Spec Hierarchy" options={['Beds | Baths', '1 | 1', '2 | 2', '3+ | 3+']} />
            <FilterOption label={`Asset Valuation (${currency})`} options={priceOptions} />
          </div>
          <button 
            onClick={() => onNavigate('properties')}
            className="w-full lg:w-auto bg-gray-900 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] flex items-center justify-center gap-3 md:gap-4 hover:bg-[#8DC63F] hover:text-black transition-all shadow-xl shadow-gray-200"
          >
            <Search size={18} /> Search Assets
          </button>
        </div>
      </div>

      <div className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-10">
        <div className="w-px h-20 bg-white/20 mx-auto"></div>
        <div className="text-white/40 text-[9px] font-black uppercase tracking-[0.8em] rotate-180 py-10" style={{ writingMode: 'vertical-rl' }}>ESTABLISHED 1950</div>
        <div className="w-px h-20 bg-white/20 mx-auto"></div>
      </div>
    </section>
  );
};

const FilterOption: React.FC<{ label: string, options: string[] }> = ({ label, options }) => (
  <div className="flex flex-col">
    <label className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-2 md:mb-4 ml-1">{label}</label>
    <div className="relative group">
      <select className="w-full bg-gray-50 border-0 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4.5 text-[11px] md:text-xs font-black text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-[#8DC63F] transition-all cursor-pointer group-hover:bg-gray-100">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-hover:text-gray-900 transition-colors" size={16} />
    </div>
  </div>
);
