
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, Share2, Play, ChevronRight, Calculator } from 'lucide-react';
import { Currency, formatPrice } from '../App';

interface PropertyShowcaseProps {
  currency: Currency;
  onNavigate: (page: string) => void;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ currency, onNavigate }) => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
            Property <span className="text-[#8DC63F]">Details</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            A meticulous, responsive, and buyer-centric presentation of luxury real estate.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden max-w-6xl mx-auto">
          <div className="px-10 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <span className="text-gray-900 border-b-2 border-[#8DC63F] pb-1">Listing</span>
              <span className="cursor-pointer hover:text-gray-900" onClick={() => onNavigate('projects')}>Investment</span>
              <span className="cursor-pointer hover:text-gray-900" onClick={() => onNavigate('services')}>Services</span>
              <span className="cursor-pointer hover:text-gray-900" onClick={() => onNavigate('contact')}>Contact</span>
            </div>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-[#8DC63F] text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
            >
              Request Info
            </button>
          </div>
          
          {/* ... rest of the component ... */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-4">
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Luxury Home" referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6 flex gap-3">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#8DC63F] shadow-lg">For Sale</span>
                  </div>
                  <div className="absolute bottom-8 right-8 flex gap-4">
                     <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors">
                        <Play size={24} fill="currentColor" />
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 h-32">
                  <img src="https://images.unsplash.com/photo-1512918766775-d56aebb309f3?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover rounded-2xl border-2 border-[#8DC63F] cursor-pointer" alt="Interior 1" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity" alt="Interior 2" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity" alt="Kitchen" referrerPolicy="no-referrer" />
                  <div className="relative rounded-2xl overflow-hidden cursor-pointer group h-full">
                    <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Bedroom" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest">
                      +12 Photos
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col h-full shadow-inner">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter">Purchase Summary</h4>
                      <div className="flex gap-2">
                        <Heart size={18} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                        <Share2 size={18} className="text-gray-400 hover:text-[#0073e1] cursor-pointer" />
                      </div>
                    </div>
                    
                    <div className="space-y-6 flex-1">
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Total Listing Price</p>
                        <p className="text-4xl font-black text-[#8DC63F]">{formatPrice(250000, currency)}</p>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-bold text-gray-600">
                          <span>Minimum Down Payment</span>
                          <span className="text-gray-900">{formatPrice(20254, currency)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-600">
                          <span>Monthly Tax Estimate</span>
                          <span className="text-gray-900">{formatPrice(1150, currency)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-600">
                          <span>Mortgage (30yr Fixed)</span>
                          <span className="text-gray-900">{formatPrice(1850, currency)}/mo</span>
                        </div>
                      </div>

                      <div className="bg-white rounded-3xl p-5 border border-gray-200 flex items-center gap-4">
                         <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-2xl flex items-center justify-center text-[#8DC63F]">
                            <Calculator size={24} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Affordability</p>
                            <p className="text-xs font-bold text-gray-900">Calculate Monthly Payments</p>
                         </div>
                         <ChevronRight size={16} className="ml-auto text-gray-300" />
                      </div>
                    </div>

                    <button 
                      onClick={() => onNavigate('contact')}
                      className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl hover:bg-black transition-all mt-10"
                    >
                      Start Your Purchase
                    </button>
                 </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Luxury Waterfront Villa</h3>
                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                  <MapPin size={16} className="text-[#8DC63F]" /> Plot 12, Acacia Avenue, Kololo, Kampala
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
