
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Rate limiting timestamp
  const [lastSubmit, setLastSubmit] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate Limiting Security: Check if submitted in last 60 seconds
    const now = Date.now();
    if (now - lastSubmit < 60000) {
      setError("Rate Limit Exceeded: Please wait 60 seconds before sending another message.");
      return;
    }

    if (!isVerified) {
      setError("Security Check Required: Please verify you are human.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmit(Date.now());
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-36 md:pt-52 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Get In <span className="text-[#8DC63F]">Touch</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">High-integrity construction and property intelligence at your service.</motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <div className="space-y-8 md:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 group hover:border-[#8DC63F]/20 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#8DC63F] mb-6 shadow-sm group-hover:scale-110 transition-transform"><Phone size={28} /></div>
                <h3 className="font-black text-gray-900 mb-3 uppercase tracking-widest text-[10px]">Phone Node</h3>
                <a href="tel:+256414270703" className="text-xl font-black text-gray-900 hover:text-[#8DC63F] transition-colors break-words">+256 414 270 703</a>
              </div>
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 group hover:border-[#8DC63F]/20 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#8DC63F] mb-6 shadow-sm group-hover:scale-110 transition-transform"><Mail size={28} /></div>
                <h3 className="font-black text-gray-900 mb-3 uppercase tracking-widest text-[10px]">Digital Inquiry</h3>
                <a href="mailto:info@smw.co.ug" className="text-xl font-black text-gray-900 hover:text-[#8DC63F] transition-colors break-words">info@smw.co.ug</a>
              </div>
            </div>
            
            <div className="hidden lg:block p-10 bg-[#06080f] rounded-[3rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#8DC63F]/10 rounded-full blur-3xl"></div>
               <h4 className="text-xl font-black uppercase tracking-tighter mb-4">Architecture HQ</h4>
               <p className="text-gray-400 font-medium leading-relaxed">
                 Plot 101/7 Butikiro Road<br />
                 Rubaga, Kampala, Uganda
               </p>
               <div className="mt-8 flex items-center gap-3 text-[#8DC63F] font-black uppercase text-[10px] tracking-[0.4em]">
                  <div className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse"></div>
                  Center for Technical Excellence
               </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
            {isSubmitted ? (
              <div className="text-center py-20 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Message Secured</h3>
                <p className="text-gray-500 mb-10 font-medium">Our processing node has received your inquiry. A specialist will synchronize with you shortly.</p>
                <button onClick={() => setIsSubmitted(false)} className="bg-[#8DC63F] text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#8DC63F]/10 hover:scale-105 transition-all">Establish New Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-red-100 mb-6"><AlertCircle size={16} /> {error}</div>}
                
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Identity Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border-2 border-transparent focus:border-[#8DC63F]/20 focus:bg-white rounded-2xl py-4.5 px-6 outline-none transition-all font-bold text-sm" placeholder="Your Full Name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Node</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border-2 border-transparent focus:border-[#8DC63F]/20 focus:bg-white rounded-2xl py-4.5 px-6 outline-none transition-all font-bold text-sm" placeholder="address@node.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Message Transmission</label>
                    <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border-2 border-transparent focus:border-[#8DC63F]/20 focus:bg-white rounded-2xl py-4.5 px-6 outline-none transition-all font-bold text-sm resize-none" placeholder="Enter detailed inquiry protocol..." />
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 p-6 rounded-[1.8rem] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} className="w-6 h-6 rounded-lg border-gray-300 text-[#8DC63F] focus:ring-[#8DC63F] cursor-pointer" />
                    <span className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em]">Verified Human Check</span>
                  </div>
                  <ShieldCheck size={24} className="text-[#8DC63F]" />
                </div>

                <button disabled={isSubmitting} className="w-full bg-gray-900 text-white py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-black disabled:opacity-50 flex items-center justify-center gap-4 shadow-2xl shadow-gray-200">
                  {isSubmitting ? 'Synchronizing...' : <><Send size={18} /> Broadcast Transmission</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
