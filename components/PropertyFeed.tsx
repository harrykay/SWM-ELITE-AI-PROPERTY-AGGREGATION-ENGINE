
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, Sparkles, ArrowRight } from 'lucide-react';
import { Property, Currency, formatPrice } from '../App';

interface PropertyFeedProps {
  currency: Currency;
  onPropertyClick: (id: string) => void;
}

export const PropertyFeed: React.FC<PropertyFeedProps> = ({ currency, onPropertyClick }) => {
  const [properties, setProperties] = useState<(Property & { aiSummary?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch('/api/properties/latest');
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        }
      } catch (err) {
        console.error('FETCH_LATEST_ERROR:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 rounded-3xl h-[450px] animate-pulse border border-white/10" />
        ))}
      </div>
    );
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20 text-[#8DC63F] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} />
            AI-Powered Insights
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Latest from <span className="text-[#8DC63F]">Uganda</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl font-medium">
            Explore the newest additions to the SMW ecosystem, featuring AI-generated summaries for quick decision making.
          </p>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-3 text-white font-bold uppercase text-xs tracking-widest hover:text-[#8DC63F] transition-colors"
        >
          View All Listings
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop, idx) => (
          <motion.div
            key={prop.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-[#0d111a] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-[#8DC63F]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(141,198,63,0.1)]"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={prop.images?.[0] || 'https://picsum.photos/seed/property/800/600'} 
                alt={prop.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <span className="text-white font-black text-sm">
                  {formatPrice(prop.price, currency)}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 bg-[#8DC63F] text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {prop.type}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <MapPin size={12} className="text-[#8DC63F]" />
                  {prop.location}
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-[#8DC63F] transition-colors line-clamp-1">
                  {prop.title}
                </h3>
              </div>

              {/* AI Summary */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <Sparkles size={12} className="text-[#8DC63F]" />
                </div>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  "{prop.aiSummary || 'No summary available.'}"
                </p>
              </div>

              {/* Specs */}
              <div className="flex items-center justify-between py-4 border-y border-white/5">
                <div className="flex items-center gap-2">
                  <Bed size={16} className="text-gray-500" />
                  <span className="text-white font-bold text-sm">{prop.beds}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath size={16} className="text-gray-500" />
                  <span className="text-white font-bold text-sm">{prop.baths}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize size={16} className="text-gray-500" />
                  <span className="text-white font-bold text-sm">{prop.size} sqft</span>
                </div>
              </div>

              <button 
                onClick={() => onPropertyClick(prop.id)}
                className="w-full bg-white/5 hover:bg-[#8DC63F] text-white hover:text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
