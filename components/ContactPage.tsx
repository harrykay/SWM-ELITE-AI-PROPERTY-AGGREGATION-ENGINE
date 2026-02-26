
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, Send, CheckCircle2, ShieldCheck, 
  AlertCircle, MapPin, Globe, Clock, MessageSquare,
  ArrowRight, ExternalLink, Linkedin, Twitter, Facebook
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmit, setLastSubmit] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmit(Date.now());
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-[#06080f] min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8DC63F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-[#8DC63F]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">Contact Protocol</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
                Get In<br />
                <span className="text-[#8DC63F]">Touch</span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                High-integrity construction and property intelligence at your service. 
                Synchronize with our technical nodes across the globe.
              </p>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-14 h-14 rounded-full border-4 border-[#06080f] bg-gray-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Specialist" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Specialists Online Now</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Phone Node */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-[#111421] p-8 rounded-[2.5rem] border border-white/5 group hover:border-[#8DC63F]/20 transition-all"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-[#8DC63F]/10 rounded-2xl flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
                    <Phone size={28} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status</span>
                    <div className="flex items-center gap-2 text-[#8DC63F] text-[10px] font-black uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse"></div>
                      Available
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Phone Nodes</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Uganda HQ', number: '+256 414 270 703' },
                    { label: 'Technical Support', number: '+256 772 456 150' },
                    { label: 'UK Operations', number: '+44 7958 045 097' }
                  ].map((p, i) => (
                    <a key={i} href={`tel:${p.number.replace(/\s/g, '')}`} className="flex items-center justify-between group/link">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{p.label}</span>
                      <span className="text-lg font-black text-white group-hover/link:text-[#8DC63F] transition-colors">{p.number}</span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Email Node */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#111421] p-8 rounded-[2.5rem] border border-white/5 group hover:border-[#8DC63F]/20 transition-all"
              >
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Digital Inquiry</h3>
                <a href="mailto:info@smw.co.ug" className="text-2xl font-black text-white hover:text-[#8DC63F] transition-colors break-all">
                  info@smw.co.ug
                </a>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-4">Typical Response: &lt; 2 Hours</p>
              </motion.div>

              {/* HQ Node */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#111421] p-8 rounded-[2.5rem] border border-white/5 group hover:border-[#8DC63F]/20 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8DC63F]/5 rounded-full blur-3xl"></div>
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-8 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Architecture HQ</h3>
                <p className="text-gray-400 font-medium leading-relaxed mb-6">
                  MUTEC Building, Plot 101/7 Butikiro Road<br />
                  Namirembe/ Rubaga P.o.Box.30880<br />
                  Kampala, Uganda
                </p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F] hover:text-white transition-colors">
                  Open in Maps <ExternalLink size={14} />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#111421] p-8 md:p-16 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8DC63F] to-transparent opacity-30"></div>
              
              {isSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-[#8DC63F]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#8DC63F]/20">
                    <CheckCircle2 size={48} className="text-[#8DC63F]" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Transmission Secured</h3>
                  <p className="text-gray-500 mb-10 font-medium text-lg">Our processing node has received your inquiry. A specialist will synchronize with you shortly.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="bg-[#8DC63F] text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#8DC63F]/10 hover:bg-white transition-all"
                  >
                    Establish New Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Broadcast Inquiry</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                      <Clock size={14} /> 24/7 Active
                    </div>
                  </div>

                  {error && (
                    <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500">
                      <AlertCircle size={20} />
                      <span className="text-[11px] font-black uppercase tracking-widest">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Identity Name</label>
                      <div className="relative">
                        <input 
                          required 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})} 
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.06] transition-all font-bold text-sm" 
                          placeholder="Full Name" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Node</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.06] transition-all font-bold text-sm" 
                        placeholder="address@node.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Inquiry Subject</label>
                    <input 
                      required 
                      value={formData.subject} 
                      onChange={e => setFormData({...formData, subject: e.target.value})} 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-6 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.06] transition-all font-bold text-sm" 
                      placeholder="e.g. Property Acquisition" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Message Transmission</label>
                    <textarea 
                      required 
                      rows={6} 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-6 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.06] transition-all font-bold text-sm resize-none" 
                      placeholder="Enter detailed technical requirements..." 
                    />
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl flex items-center justify-between group cursor-pointer" onClick={() => setIsVerified(!isVerified)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${isVerified ? 'bg-[#8DC63F] border-[#8DC63F]' : 'border-white/10'}`}>
                        {isVerified && <CheckCircle2 size={16} className="text-black" />}
                      </div>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] group-hover:text-white transition-colors">Verified Human Check</span>
                    </div>
                    <ShieldCheck size={24} className={isVerified ? 'text-[#8DC63F]' : 'text-gray-600'} />
                  </div>

                  <button 
                    disabled={isSubmitting} 
                    className="w-full bg-[#8DC63F] text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] transition-all hover:bg-white disabled:opacity-50 flex items-center justify-center gap-4 shadow-2xl shadow-[#8DC63F]/10"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Synchronizing...
                      </div>
                    ) : (
                      <>
                        <Send size={18} /> Broadcast Transmission
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Social & Global Presence */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div>
              <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Global Presence</h4>
              <p className="text-gray-500 text-sm font-medium">Synchronized operations across East Africa and the United Kingdom.</p>
            </div>
            <div className="flex justify-center gap-8">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' }
              ].map((s, i) => (
                <button key={i} className="w-14 h-14 rounded-2xl bg-[#111421] border border-white/5 flex items-center justify-center text-gray-500 hover:text-[#8DC63F] hover:border-[#8DC63F]/30 transition-all">
                  <s.icon size={24} />
                </button>
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Technical Support</p>
              <p className="text-white font-black text-lg">24/7 Global Response Node</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
