
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Hammer, DraftingCompass, Layers, Home, 
  Settings2, Briefcase, CheckCircle2, Map as MapIcon, 
  Sparkles, ShieldCheck, Wrench, Flower2, Paintbrush 
} from 'lucide-react';
import { Service } from '../App';

interface ServicesPageProps {
  services: Service[];
}

const iconMap: Record<string, React.ReactNode> = {
  'Land Processing': <MapIcon size={32} />,
  'Design': <DraftingCompass size={32} />,
  'Facility Management': <Settings2 size={32} />,
  'Construction': <Building2 size={32} />,
  'After Sales Service & Maintenance': <Wrench size={32} />,
  'Specialist Finishings': <Paintbrush size={32} />,
  'Landscaping & Gardening': <Flower2 size={32} />,
  'Decorations': <Sparkles size={32} />,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ services }) => {
  return (
    <div className="pt-36 md:pt-52 pb-24 bg-gray-50 dark:bg-[#06080f] min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">
            Architectural <span className="text-[#8DC63F]">Solutions</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            At <span className="font-black text-gray-900 dark:text-white">SMW Construction Developers</span>, we provide a unified ecosystem of construction and property management services built on a foundation of trust since 1950.
          </p>
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
             {[
               { icon: <ShieldCheck size={16} />, text: 'Quality Integrity' },
               { icon: <Briefcase size={16} />, text: 'Reliable Protocol' },
               { icon: <Layers size={16} />, text: 'On-Time Handover' }
             ].map((node, i) => (
               <div key={i} className="flex items-center gap-3 px-5 md:px-6 py-2 md:py-2.5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-[9px] md:text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest shadow-sm">
                 <span className="text-[#8DC63F]">{node.icon}</span> {node.text}
               </div>
             ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-[#111421] p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/40 dark:shadow-none border border-gray-100 dark:border-white/5 hover:border-[#8DC63F]/30 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8DC63F]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-16 md:w-20 h-16 md:h-20 bg-[#8DC63F]/10 text-[#8DC63F] rounded-3xl flex items-center justify-center mb-6 md:mb-10 group-hover:bg-[#8DC63F] group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-6 shadow-lg shadow-[#8DC63F]/10">
                {iconMap[service.title] || <Briefcase size={32} />}
              </div>
              
              <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight leading-none group-hover:text-[#8DC63F] transition-colors">{service.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm leading-relaxed font-medium">{service.description}</p>
              
              <div className="space-y-3 pt-6 border-t border-gray-50 dark:border-white/5">
                {service.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-4 text-xs font-bold text-gray-700 dark:text-gray-300">
                    <CheckCircle2 size={16} className="text-[#8DC63F] shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => window.location.href = '/contact'}
                className="mt-10 w-full py-4 border border-gray-100 dark:border-white/10 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all"
              >
                Initialize Consultation Node
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 md:mt-32 p-10 md:p-20 bg-[#0a0c16] rounded-[3rem] md:rounded-[4rem] text-white text-center relative overflow-hidden border border-white/5"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8DC63F]/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Commitment to <span className="text-[#8DC63F]">Excellence</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-base md:text-xl font-medium mb-10 md:mb-16">
              At SMW Construction Developers, we aim to deliver services that exceed client expectations. 
              We focus on building long-term relationships based on trust, professionalism, and outstanding results. 
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-[#8DC63F] text-black px-10 md:px-16 py-4 md:py-6 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-[#8DC63F]/20"
              >
                Get a Quote
              </button>
              <button 
                onClick={() => window.location.href = '/projects'}
                className="bg-white/5 border border-white/10 text-white px-10 md:px-16 py-4 md:py-6 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.3em] hover:bg-white/10 transition-all"
              >
                View Project Node
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
