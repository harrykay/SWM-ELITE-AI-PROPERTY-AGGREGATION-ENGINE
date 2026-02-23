
import React from 'react';
import { Smartphone, Layout, UserPlus, ShoppingBag, ShieldCheck, TrendingUp, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  { 
    title: 'Buyer-Focused Experience', 
    desc: 'Smooth browsing and confident decision making.', 
    icon: <MousePointer2 size={24} />,
    side: 'left'
  },
  { 
    title: 'Fully Responsive', 
    desc: 'Adapts seamlessly to all modern device viewports.', 
    icon: <Smartphone size={24} />,
    side: 'left'
  },
  { 
    title: 'Powerful Admin Control', 
    desc: 'Complete oversight of listings, users, and settings.', 
    icon: <ShieldCheck size={24} />,
    side: 'left'
  },
  { 
    title: 'Modern Design', 
    desc: 'Sleek layouts optimized for clarity and engagement.', 
    icon: <Layout size={24} />,
    side: 'right'
  },
  { 
    title: 'Seller Management', 
    desc: 'Comprehensive tools for listings and appointments.', 
    icon: <ShoppingBag size={24} />,
    side: 'right'
  },
  { 
    title: 'Smart Investment Tools', 
    desc: 'AI-driven insights to evaluate true property value.', 
    icon: <TrendingUp size={24} />,
    side: 'right'
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Why <span className="text-[#FF5A3D]">SMW Platform</span> is the best choice for you?
          </h2>
          <div className="w-16 h-1.5 bg-[#FF5A3D] mx-auto rounded-full mt-6"></div>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-0">
          
          {/* Left Side Reasons */}
          <div className="space-y-20 lg:w-1/3 z-10">
            {reasons.filter(r => r.side === 'left').map((r, i) => (
              <ReasonItem key={r.title} reason={r} align="right" />
            ))}
          </div>

          {/* Central Hub Connector */}
          <div className="relative lg:w-1/3 flex items-center justify-center">
             <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-orange-100 rounded-full scale-150 opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center justify-center p-8 z-10 text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80" 
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#FF5A3D]/20 shadow-xl" 
                      alt="Hub"
                    />
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-1">Estate Hub</p>
                    <p className="text-xl font-black text-gray-900 tracking-tight leading-none uppercase">Central<br/>Intelligence</p>
                </div>

                {/* Desktop Connection Lines */}
                <svg className="absolute inset-0 w-full h-full hidden lg:block overflow-visible" viewBox="0 0 100 100">
                   <line x1="-150" y1="20" x2="0" y2="40" stroke="#eee" strokeWidth="0.5" />
                   <line x1="-150" y1="50" x2="0" y2="50" stroke="#eee" strokeWidth="0.5" />
                   <line x1="-150" y1="80" x2="0" y2="60" stroke="#eee" strokeWidth="0.5" />
                   
                   <line x1="250" y1="20" x2="100" y2="40" stroke="#eee" strokeWidth="0.5" />
                   <line x1="250" y1="50" x2="100" y2="50" stroke="#eee" strokeWidth="0.5" />
                   <line x1="250" y1="80" x2="100" y2="60" stroke="#eee" strokeWidth="0.5" />
                </svg>
             </div>
          </div>

          {/* Right Side Reasons */}
          <div className="space-y-20 lg:w-1/3 z-10">
            {reasons.filter(r => r.side === 'right').map((r, i) => (
              <ReasonItem key={r.title} reason={r} align="left" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ReasonItem: React.FC<{ reason: any; align: 'left' | 'right' }> = ({ reason, align }) => (
  <motion.div 
    initial={{ opacity: 0, x: align === 'left' ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className={`flex items-start gap-6 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}
  >
    <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-[#FF5A3D] shadow-sm border border-gray-100 group-hover:scale-110 transition-transform shrink-0">
      {reason.icon}
    </div>
    <div className="space-y-2">
      <h4 className="text-lg font-black text-gray-900 tracking-tighter uppercase">{reason.title}</h4>
      <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">{reason.desc}</p>
    </div>
  </motion.div>
);
