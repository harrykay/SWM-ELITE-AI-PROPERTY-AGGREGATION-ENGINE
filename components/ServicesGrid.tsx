
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "Property Sales & Marketing",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    desc: "We help you reach the right buyers with premium marketing strategies."
  },
  {
    title: "Construction Management",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=800&q=80",
    desc: "From blueprint to handover, we manage your project with precision."
  },
  {
    title: "Architecture & Design",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "Creating timeless structures with modern architectural excellence."
  }
];

export const ServicesGrid: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <div className="inline-block border border-orange-200 px-4 py-1.5 rounded-full text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-4">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Best Quality Services</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-6">
            Exceptional property solutions tailored for excellence and built on trust since 1950.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 p-2 flex flex-col group"
            >
              <div className="p-6 flex justify-between items-start">
                <h3 className="text-xl font-black text-gray-900 leading-tight max-w-[150px]">
                  {service.title}
                </h3>
                <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-all cursor-pointer">
                  <ArrowUpRight size={24} />
                </div>
              </div>
              
              <div className="relative aspect-[1.2/1] rounded-[1.5rem] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20">
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-orange-400/10 text-orange-400 px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-orange-400 hover:text-white transition-all">
            View All Services →
          </button>
        </div>
      </div>
    </section>
  );
};
