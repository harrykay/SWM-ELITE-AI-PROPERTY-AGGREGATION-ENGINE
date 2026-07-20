
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Heart, Share2, Play, ChevronRight, Calculator, 
  ShieldCheck, CheckCircle2, Star, MessageSquare, Phone, Mail 
} from 'lucide-react';
import { Currency, formatPrice } from '../App';

interface PropertyShowcaseProps {
  currency: Currency;
  onNavigate: (page: string) => void;
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ currency, onNavigate }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
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

            <div className="mt-12 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">Luxury Waterfront Villa</h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-sm">
                  <MapPin size={16} className="text-[#8DC63F]" /> Plot 12, Acacia Avenue, Kololo, Kampala
                </div>
              </div>

              {/* Dedicated Agent Profile */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-50 dark:bg-white/5 p-6 rounded-3xl border border-gray-200/50 dark:border-white/10 shadow-sm relative transition-all duration-300">
                
                {/* Agent Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl border-2 border-[#8DC63F] overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                      className="w-full h-full object-cover" 
                      alt="Consulting Agent" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Small absolute checkmark */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#8DC63F] rounded-lg border-2 border-white dark:border-[#111421] flex items-center justify-center text-black">
                    <ShieldCheck size={12} strokeWidth={3} />
                  </div>
                </div>

                {/* Agent Credentials */}
                <div className="flex-1 space-y-1.5 min-w-[220px]">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-base font-black text-gray-900 dark:text-white">Sarah Namubiru</span>
                    
                    {/* Verified Agent Badge with interactive Tooltip */}
                    <div className="relative inline-block">
                      <div 
                        onMouseEnter={() => setIsTooltipVisible(true)}
                        onMouseLeave={() => setIsTooltipVisible(false)}
                        onFocus={() => setIsTooltipVisible(true)}
                        onBlur={() => setIsTooltipVisible(false)}
                        tabIndex={0}
                        className="cursor-pointer bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 hover:border-[#8DC63F] hover:bg-[#8DC63F]/20 rounded-full px-2.5 py-0.5 flex items-center gap-1 transition-all duration-300 outline-none"
                      >
                        <ShieldCheck size={11} className="text-[#8DC63F] shrink-0" />
                        <span className="text-[9px] font-black uppercase tracking-wider text-[#8DC63F]">Verified Agent</span>
                      </div>

                      {/* Tooltip component */}
                      <AnimatePresence>
                        {isTooltipVisible && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[290px] bg-white dark:bg-[#111421] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl p-4 z-50 text-left pointer-events-auto cursor-default font-sans"
                          >
                            {/* Inner Tooltip Header */}
                            <div className="flex items-center gap-2.5 pb-2.5 border-b border-gray-100 dark:border-white/5 mb-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#8DC63F]/15 text-[#8DC63F] flex items-center justify-center shrink-0">
                                <ShieldCheck size={18} />
                              </div>
                              <div>
                                <h4 className="text-[11px] font-black uppercase text-gray-900 dark:text-white tracking-widest leading-none">Verification Passport</h4>
                                <span className="text-[8px] text-gray-400 font-bold tracking-widest block mt-0.5 uppercase">SMW Security Protocol Secured</span>
                              </div>
                            </div>

                            {/* Inner Tooltip Specifications Grid */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">Passport ID:</span>
                                <span className="text-gray-900 dark:text-white font-mono">SMW-AG-2026-0482</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">Regulatory Lic:</span>
                                <span className="text-gray-900 dark:text-white font-mono">REA/UG/2023/89</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">KYC Compliance:</span>
                                <span className="text-[#8DC63F] uppercase tracking-wider flex items-center gap-0.5 font-black">
                                  COMPLETED <CheckCircle2 size={10} />
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">Background Check:</span>
                                <span className="text-[#8DC63F] uppercase tracking-wider font-black">Passed</span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">Client Rating:</span>
                                <span className="text-gray-900 dark:text-white flex items-center gap-0.5 font-black">
                                  4.95 / 5.00 <Star size={10} fill="#8DC63F" className="text-[#8DC63F]" />
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] font-bold">
                                <span className="text-gray-400 uppercase tracking-wider">Volume Transacted:</span>
                                <span className="text-gray-900 dark:text-white font-black">Shs 15B+ (8 Years)</span>
                              </div>
                            </div>

                            {/* Triangle Arrow */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-white dark:bg-[#111421] border-r border-b border-gray-100 dark:border-white/10 rotate-45"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Senior Real Estate Consultant</p>
                  
                  {/* Direct Action contact shortcuts */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <button 
                      onClick={() => onNavigate('contact')}
                      className="p-1.5 bg-white dark:bg-white/5 hover:bg-[#8DC63F]/25 dark:hover:bg-[#8DC63F]/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#8DC63F] transition-all cursor-pointer"
                      title="Send Message"
                    >
                      <MessageSquare size={13} />
                    </button>
                    <button 
                      onClick={() => window.location.href = 'tel:+256700000000'}
                      className="p-1.5 bg-white dark:bg-white/5 hover:bg-[#8DC63F]/25 dark:hover:bg-[#8DC63F]/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#8DC63F] transition-all cursor-pointer"
                      title="Call Agent"
                    >
                      <Phone size={13} />
                    </button>
                    <button 
                      onClick={() => window.location.href = 'mailto:sarah.n@smw.co.ug'}
                      className="p-1.5 bg-white dark:bg-white/5 hover:bg-[#8DC63F]/25 dark:hover:bg-[#8DC63F]/10 border border-gray-200 dark:border-white/10 rounded-lg text-gray-600 dark:text-gray-300 hover:text-[#8DC63F] transition-all cursor-pointer"
                      title="Send Email"
                    >
                      <Mail size={13} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
