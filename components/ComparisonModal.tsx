
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Check, Repeat, Bed, Bath, Maximize, MapPin, DollarSign, Calendar, Zap, Plus } from 'lucide-react';
import { Property, Currency, formatPrice } from '../App';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemove: (id: string) => void;
  currency: Currency;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, properties, onRemove, currency }) => {
  if (!isOpen) return null;

  const attributes = [
    { label: 'Market Price', key: 'price', icon: <DollarSign size={14} />, format: (v: number) => formatPrice(v, currency) },
    { label: 'Property Type', key: 'type', icon: <Zap size={14} /> },
    { label: 'Market Status', key: 'status', icon: <Calendar size={14} /> },
    { label: 'Location Area', key: 'location', icon: <MapPin size={14} /> },
    { label: 'Living Space', key: 'size', icon: <Maximize size={14} />, format: (v: number) => `${v.toLocaleString()} sqft` },
    { label: 'Bedrooms', key: 'beds', icon: <Bed size={14} /> },
    { label: 'Bathrooms', key: 'baths', icon: <Bath size={14} /> },
    { label: 'Construction Year', key: 'yearBuilt', icon: <Calendar size={14} /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 40 }}
          className="relative w-full max-w-7xl h-full bg-white dark:bg-[#06080f] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Area */}
          <div className="p-8 md:p-12 border-b border-gray-100 dark:border-white/5 flex justify-between items-center shrink-0 bg-white dark:bg-[#06080f] z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#8DC63F]/10 text-[#8DC63F] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Property Analysis</div>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <p className="text-sm text-gray-400 font-medium">Comparing {properties.length} of 4 slots</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">Side-by-Side Comparison</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-14 h-14 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all shadow-sm"
            >
              <X size={28} />
            </button>
          </div>

          {/* Scrollable Matrix Content */}
          <div className="flex-1 overflow-auto bg-gray-50/40 dark:bg-transparent custom-scrollbar">
            {properties.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 px-8">
                <div className="w-24 h-24 bg-[#8DC63F]/10 text-[#8DC63F] rounded-full flex items-center justify-center mb-8 animate-bounce">
                  <Repeat size={40} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">ANALYSIS QUEUE IS EMPTY</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-10 text-lg">Select up to four properties from the listings or details pages to begin a deep-dive technical comparison.</p>
                <button 
                  onClick={onClose}
                  className="bg-gray-900 dark:bg-white dark:text-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform"
                >
                  Return to Listings
                </button>
              </div>
            ) : (
              <div className="min-w-[1000px] p-8 md:p-12">
                {/* Property Headers */}
                <div className="grid grid-cols-[240px_repeat(4,1fr)] gap-8 mb-16">
                  <div className="flex flex-col justify-end pb-8">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Technical Specs</p>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white leading-tight">Property Matrix</h4>
                  </div>
                  
                  {Array.from({ length: 4 }).map((_, idx) => {
                    const p = properties[idx];
                    if (!p) return (
                      <div key={idx} className="bg-white/50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[2.5rem] h-full flex flex-col items-center justify-center p-8 text-center min-h-[220px]">
                        <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-300 mb-4">
                          <Plus size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Available Slot</p>
                      </div>
                    );
                    return (
                      <div key={p.id} className="relative group animate-in fade-in zoom-in-95 duration-500">
                        <div className="bg-white dark:bg-[#161925] rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col h-full">
                          <div className="h-40 relative">
                            <img src={p.images[0]} className="w-full h-full object-cover" alt="" />
                            <div className="absolute top-4 left-4">
                              <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg bg-gray-900 text-white`}>
                                {p.status}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="font-black text-gray-900 dark:text-white text-sm line-clamp-2 min-h-[40px] mb-2 uppercase">{p.title}</h4>
                            <div className="flex items-center gap-1.5 mb-4">
                              <Star size={12} fill="currentColor" className="text-yellow-400" />
                              <span className="text-xs font-bold text-gray-900 dark:text-white">{p.rating}</span>
                              <span className="text-xs text-gray-400 font-medium">({p.reviewsCount})</span>
                            </div>
                            <p className="text-lg font-black text-[#8DC63F]">{formatPrice(p.price, currency)}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => onRemove(p.id)}
                          className="absolute -top-3 -right-3 w-10 h-10 bg-white dark:bg-gray-800 text-gray-400 rounded-full shadow-2xl border border-gray-100 dark:border-white/10 flex items-center justify-center hover:text-red-500 hover:scale-110 transition-all z-20"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Attributes Matrix */}
                <div className="space-y-6">
                  {attributes.map((attr, idx) => (
                    <div key={attr.label} className={`grid grid-cols-[240px_repeat(4,1fr)] gap-8 items-center py-6 px-10 rounded-3xl transition-colors ${idx % 2 === 0 ? 'bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5' : 'bg-transparent hover:bg-white/30 dark:hover:bg-white/5'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-[#8DC63F]/10 text-[#8DC63F] flex items-center justify-center shrink-0">
                          {attr.icon}
                        </div>
                        <span className="font-black text-[10px] uppercase tracking-widest text-gray-500">{attr.label}</span>
                      </div>
                      {Array.from({ length: 4 }).map((_, sIdx) => {
                        const p = properties[sIdx];
                        if (!p) return <div key={sIdx} className="text-center text-gray-200/50">—</div>;
                        const val = (p as any)[attr.key];
                        return (
                          <div key={sIdx} className="text-center font-bold text-gray-900 dark:text-white text-[15px] tracking-tight">
                            {attr.format ? attr.format(val) : val}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  
                  {/* Feature Analysis */}
                  <div className="grid grid-cols-[240px_repeat(4,1fr)] gap-8 items-start py-10 px-10 rounded-[3rem] bg-gray-900 dark:bg-black text-white shadow-2xl mt-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#8DC63F] rounded-full blur-[120px] opacity-10"></div>
                    
                    <div className="relative z-10">
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8DC63F] mb-3">Feature Analysis</p>
                      <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4">Interior<br/>Amenities</h4>
                      <p className="text-[10px] text-gray-500 font-medium">Core property offerings compared.</p>
                    </div>

                    {Array.from({ length: 4 }).map((_, sIdx) => {
                      const p = properties[sIdx];
                      if (!p) return <div key={sIdx} className="text-center text-gray-700/50 pt-20">—</div>;
                      return (
                        <div key={sIdx} className="space-y-3 relative z-10">
                          {p.features?.interior?.map((f, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-3 text-[11px] text-gray-200 font-bold bg-white/5 py-3 px-4 rounded-2xl border border-white/5">
                              <Check size={14} className="text-[#8DC63F]" /> {f}
                            </div>
                          ))}
                          {(!p.features?.interior || p.features.interior.length === 0) && (
                            <div className="text-center text-gray-600 italic text-[10px] pt-10">No specific features</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Panel */}
          {properties.length > 0 && (
            <div className="p-8 md:p-12 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#06080f] flex flex-col md:flex-row justify-between items-center gap-6 shrink-0 z-20 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.05)]">
               <p className="text-gray-400 text-xs font-medium max-w-xs text-center md:text-left uppercase tracking-widest leading-relaxed">
                 Infrastructure verified through the <span className="text-[#8DC63F] font-black">SMW technical matrix</span> for decision security.
               </p>
               <div className="flex gap-4 w-full md:w-auto">
                 <button 
                   onClick={onClose}
                   className="flex-1 md:flex-none px-10 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5"
                 >
                   Continue Search
                 </button>
                 <button 
                   className="flex-1 md:flex-none bg-[#8DC63F] text-black px-12 py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-[#8DC63F]/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
                 >
                   Inquire About All <Check size={16} />
                 </button>
               </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
