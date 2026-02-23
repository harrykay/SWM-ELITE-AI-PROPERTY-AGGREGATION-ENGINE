
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize, Bed, Car, ArrowRight, Sparkles } from 'lucide-react';
import { Currency, formatPrice } from '../App';

const featuredProperties = [
  {
    title: "Regal Riverside Residence",
    location: "Greenville, New Jersey",
    price: 33000,
    period: "/ Per Month",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    status: "For Rent",
    sqft: "1370",
    bhk: "3",
    cars: "2/3"
  },
  {
    title: "Toronto Town House",
    location: "Downtown, Toronto",
    price: 45000,
    period: "/ Per Month",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    status: "For Rent/Sale",
    sqft: "1250",
    bhk: "2",
    cars: "1/2"
  },
  {
    title: "Apartments Auckland",
    location: "City Center, Auckland",
    price: 3000,
    period: "/ Per Square",
    image: "https://images.unsplash.com/photo-1600607687940-c52af0a09a0f?auto=format&fit=crop&w=800&q=80",
    status: "For Sale",
    sqft: "2120",
    bhk: "4",
    cars: "3/4"
  }
];

interface FeaturedPropertiesProps {
  currency: Currency;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ currency }) => {
  return (
    <section className="py-24 bg-[#0a0c16] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
          <div className="max-w-xl">
            <div className="inline-block border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-6">
              Properties List
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
              Discover And Find Your<br />Featured Properties
            </h2>
          </div>
          <div className="flex-1 max-w-md md:text-right">
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Explore our curated selection of ultra-luxury homes and apartments. Built with excellence, verified for quality.
            </p>
            <button className="bg-orange-400 text-gray-900 px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 ml-auto">
              View All Properties <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {featuredProperties.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161925] rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col md:flex-row items-center p-4 gap-8 group"
            >
              <div className="w-full md:w-80 h-56 rounded-[2rem] overflow-hidden relative shrink-0">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-orange-400 text-gray-900 text-[9px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">
                  {p.status}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black tracking-tight">{p.title}</h3>
                
                {/* AI Summary */}
                <div className="flex items-center gap-2 text-[#8DC63F] text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={12} /> AI Insight
                </div>
                <p className="text-gray-400 text-sm italic leading-relaxed border-l-2 border-[#8DC63F]/30 pl-4">
                  "Premium luxury living at its finest. This property features cutting-edge amenities and modern architectural design elements."
                </p>
                
                <div className="flex flex-wrap gap-8 pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Maximize size={16} className="text-orange-400" /> {p.sqft} Sq.ft
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Bed size={16} className="text-orange-400" /> {p.bhk} BHK
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Car size={16} className="text-orange-400" /> {p.cars} Cars
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64 h-full md:border-l border-white/5 md:pl-8 flex flex-col justify-center gap-6">
                <div>
                  <p className="text-3xl font-black text-orange-400">{formatPrice(p.price, currency)}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{p.period}</p>
                </div>
                <button className="w-full border border-white/20 text-white px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center gap-2">
                  Details <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
