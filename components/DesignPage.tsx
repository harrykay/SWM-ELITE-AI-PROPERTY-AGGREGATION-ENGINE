import React from 'react';
import { motion } from 'framer-motion';
import { DraftingCompass, Sparkles, Leaf, Layout, TrendingUp, ArrowRight } from 'lucide-react';

interface DesignPageProps {
  onNavigate: (page: string) => void;
}

export const DesignPage: React.FC<DesignPageProps> = ({ onNavigate }) => {
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
              <DraftingCompass size={16} /> Architectural Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[1.1]">
              Visionary <span className="text-[#8DC63F]">Design</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Discover innovative architectural design by SMW. We create luxury, functional, and sustainable spaces that enhance lifestyle, maximize property value, and inspire modern living.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => onNavigate('projects')}
                className="bg-[#8DC63F] text-black px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform shadow-2xl shadow-[#8DC63F]/20 flex items-center gap-3"
              >
                View Portfolio <ArrowRight size={18} />
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
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
              alt="Architectural Design" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/20 to-transparent opacity-90"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                <p className="text-white font-medium text-lg italic">
                  "Great spaces begin with visionary design."
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
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Balancing Beauty & Function
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Our architectural and planning team creates environments that balance beauty, functionality, and long-term value. From luxury residences to commercial developments, SMW designs are guided by core principles that ensure excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: "Modern Aesthetics", desc: "Contemporary, timeless visual appeal." },
              { icon: Leaf, title: "Sustainability", desc: "Eco-friendly principles and materials." },
              { icon: Layout, title: "Lifestyle Layouts", desc: "Spaces driven by human experience." },
              { icon: TrendingUp, title: "Investment Value", desc: "Designed for long-term performance." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 group hover:border-[#8DC63F]/50 transition-colors">
                <div className="w-14 h-14 bg-[#8DC63F]/10 text-[#8DC63F] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">{item.title}</h3>
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
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-6">
            Spaces People Aspire To
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            Every project is tailored to enhance comfort, prestige, and usability — ensuring your property is not only visually impressive but also commercially and practically sound. We design spaces people aspire to live, work, and invest in.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-gray-900 dark:bg-white text-white dark:text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#8DC63F] hover:text-black transition-all shadow-xl"
          >
            Discuss Your Project
          </button>
        </motion.div>

      </div>
    </div>
  );
};
