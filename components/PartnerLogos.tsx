
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "CENTENARY BANK", "STANBIC UGANDA", "NSSF UGANDA", "MUTEC CONSTRUCTION", "MINISTRY OF LANDS", "KCCA", "UIA"
];

export const PartnerLogos: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-[#06080f] border-y border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.6em] text-gray-400 mb-10">Trusted By Industry Nodes</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all">
          {partners.map((partner, i) => (
            <motion.div 
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-widest"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
