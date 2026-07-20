import React from 'react';
import { motion } from 'framer-motion';
import { Map, ShieldCheck, Target, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

interface LandProcessingPageProps {
  onNavigate: (page: string) => void;
}

export const LandProcessingPage: React.FC<LandProcessingPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-36 md:pt-52 pb-24 bg-gray-50 dark:bg-[#06080f] min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#8DC63F]/10 text-[#8DC63F] rounded-2xl text-[10px] font-black uppercase tracking-widest">
              <Map size={16} /> Professional Services
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[1.1]">
              Land <span className="text-[#8DC63F]">Processing</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Secure your investment with SMW’s professional land processing services in Uganda. We handle title verification, approvals, and planning to make your land development-ready.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-[#8DC63F] text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-[#8DC63F]/20 flex items-center gap-3"
              >
                Start Processing <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80" 
              alt="Land Processing" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                <p className="text-white font-medium text-lg italic">
                  "Owning land should be exciting, not complicated."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#111421] rounded-[3rem] p-10 md:p-20 shadow-xl border border-gray-100 dark:border-white/5 mb-24"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Transforming Raw Opportunity
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              At SMW, our Land Processing service transforms raw opportunity into secure, investment-ready property. From title verification and acquisition support to regulatory approvals and subdivision planning, we handle the entire journey with precision and transparency.
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you are a local buyer or part of the diaspora investing in Uganda, we ensure your land is:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: ShieldCheck, title: "Legally Compliant", desc: "Full title verification and legal clearance." },
              { icon: Target, title: "Strategically Positioned", desc: "Optimized for maximum value and utility." },
              { icon: TrendingUp, title: "Development-Ready", desc: "All approvals and planning secured." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 text-center group hover:border-[#8DC63F]/50 transition-colors">
                <div className="w-16 h-16 mx-auto bg-[#8DC63F]/10 text-[#8DC63F] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6">
            Build Wealth & Legacy
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            We remove uncertainty and replace it with confidence — giving you a solid foundation to build wealth, legacy, and future developments.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-gray-900 dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#8DC63F] hover:text-black transition-all shadow-xl"
          >
            Consult Our Experts
          </button>
        </motion.div>

      </div>
    </div>
  );
};
