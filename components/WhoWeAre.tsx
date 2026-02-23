
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Play, ArrowRight } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Left: Unique Image Grid */}
        <div className="w-full lg:w-1/2 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl h-80"
              >
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="Modern House" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl h-48"
              >
                <img src="https://images.unsplash.com/photo-1600607687940-c52af0a09a0f?auto=format&fit=crop&w=600&q=80" alt="House Detail" className="w-full h-full object-cover" />
              </motion.div>
            </div>
            <div className="space-y-4 pt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[2.5rem] overflow-hidden shadow-2xl h-96 relative group"
              >
                <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=600&q=80" alt="Luxury Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/50 transition-colors">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Trust Score Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-gray-100 z-10"
          >
            <div className="text-4xl font-black text-gray-900">4.9</div>
            <div>
              <div className="flex gap-0.5 text-yellow-400 mb-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Trust Score</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="w-full lg:w-1/2">
          <div className="inline-block bg-orange-50 px-4 py-1.5 rounded-full text-[11px] font-black text-[#8DC63F] uppercase tracking-[0.2em] mb-6">
            Who We Are
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tighter">
            Dedicated To Finding<br />Your Ideal Property.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10 text-lg">
            Since 1950, SMW Construction Developers has been at the forefront of the Ugandan real estate market. We deliver great results through dedication, ease of process, and extraordinary services.
          </p>

          <div className="space-y-5 mb-12">
            {[
              "Expert property valuation and market analysis",
              "Reliable construction management since 1950",
              "Dedicated support for diaspora clients"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-gray-700 font-bold group">
                <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-white transition-colors">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button className="group flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-[#8DC63F] transition-all">
            More About Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
