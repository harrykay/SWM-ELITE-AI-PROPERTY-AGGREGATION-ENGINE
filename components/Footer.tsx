
import React from 'react';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Mail, Phone, MapPin, ArrowUpRight,
  ShieldCheck, Globe, Clock, ExternalLink,
  ChevronRight, MessageCircle
} from 'lucide-react';

const Logo: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'light' }) => (
  <div className="flex items-center gap-2.5">
    <div className="relative w-11 h-10 flex items-end">
      <div className="absolute left-0 bottom-0 w-[22px] h-[22px] border-l-[5px] border-t-[5px] border-[#4d4d4d] dark:border-gray-500 rounded-tl-sm"></div>
      <div className="absolute left-[11px] bottom-0 w-[10px] h-[18px] bg-[#007b8a] z-10 flex flex-col items-center gap-[2px] pt-[3px]">
        <div className="w-[4px] h-[3px] bg-white/40"></div>
        <div className="w-[4px] h-[3px] bg-white/40"></div>
        <div className="w-[4px] h-[3px] bg-white/40"></div>
      </div>
      <div className="absolute right-0 bottom-0 w-[24px] h-full border-r-[5px] border-t-[5px] border-[#8DC63F] rounded-tr-sm"></div>
    </div>
    <div className="flex flex-col justify-center leading-none">
      <span className={`text-[28px] font-bold tracking-tight ${variant === 'light' ? 'text-white' : 'text-[#4d4d4d] dark:text-gray-200'}`}>SMW</span>
      <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8DC63F]">Building on Trust</span>
    </div>
  </div>
);

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0a0c16] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Background Accents */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8DC63F]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 -right-24 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">
          
          {/* Brand Core Column */}
          <div className="space-y-12">
            <Logo variant="light" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
              A reliable and experienced construction developers serving clients across Uganda and the diaspora. Architecting trust since 1950.
            </p>
            <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] w-fit backdrop-blur-md">
              <ShieldCheck size={20} className="text-[#8DC63F]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8DC63F]">Infrastructure Verified</span>
                <span className="text-[8px] font-bold uppercase text-gray-500">Security Protocols Active</span>
              </div>
            </div>
          </div>

          {/* Navigation Matrix Column */}
          <div className="lg:pl-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 mb-10 border-b border-white/5 pb-4">
              Market Nodes
            </h4>
            <ul className="space-y-6">
              {[
                { label: 'Asset Search', icon: <ChevronRight size={14} />, page: 'properties' },
                { label: 'Global Properties', icon: <ChevronRight size={14} />, page: 'properties' },
                { label: 'Investment Portal', icon: <ChevronRight size={14} />, page: 'projects' },
                { label: 'Our Services', icon: <ChevronRight size={14} />, page: 'services' },
                { label: 'About History', icon: <ChevronRight size={14} />, page: 'about' },
                { label: 'Contact Hub', icon: <ChevronRight size={14} />, page: 'contact' }
              ].map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-[#8DC63F] text-sm font-bold transition-all hover:translate-x-1 flex items-center gap-3 group"
                  >
                    <span className="text-white/5 group-hover:text-[#8DC63F] transition-colors">{link.icon}</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Infrastructure Column */}
          <div className="lg:pl-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 mb-10 border-b border-white/5 pb-4">
              Support Protocol
            </h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8DC63F] shrink-0 group-hover:bg-[#8DC63F] group-hover:text-white transition-all duration-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-1">Global HQ</p>
                  <p className="text-gray-400 text-sm leading-relaxed font-bold">
                    MUTEC Building, Plot 101/7 Butikiro Road<br />
                    Namirembe/ Rubaga P.o.Box.30880, Kampala
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8DC63F] shrink-0 group-hover:bg-[#8DC63F] group-hover:text-white transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-1">Voice Link</p>
                  <div className="flex flex-col">
                    <a href="tel:+256414270703" className="text-gray-400 hover:text-white text-sm font-black transition-colors">+256 414 270 703</a>
                    <a href="tel:+256772456150" className="text-gray-400 hover:text-white text-xs font-black transition-colors">+256 772 456 150</a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8DC63F] shrink-0 group-hover:bg-[#8DC63F] group-hover:text-white transition-all duration-500">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-1">Digital Mail</p>
                  <a href="mailto:info@smw.co.ug" className="text-gray-400 hover:text-white text-sm font-black transition-colors">info@smw.co.ug</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Protocols Column */}
          <div className="lg:pl-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 mb-10 border-b border-white/5 pb-4">
              Social Nodes
            </h4>
            <div className="space-y-12">
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Facebook, color: 'hover:bg-[#1877F2]' },
                  { icon: Twitter, color: 'hover:bg-[#1DA1F2]' },
                  { icon: Instagram, color: 'hover:bg-[#E4405F]' },
                  { icon: Linkedin, color: 'hover:bg-[#0A66C2]' },
                  { icon: MessageCircle, color: 'hover:bg-[#25D366]' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className={`w-12 h-12 rounded-[1.2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-xl group ${item.color}`}
                  >
                    <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-5 flex items-center gap-3">
                  <Clock size={14} className="text-[#8DC63F]" /> Market Dispatch
                </p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter email for updates..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 px-6 text-[11px] font-bold outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.08] transition-all pr-14 text-white"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8DC63F] hover:text-white transition-all transform hover:scale-110">
                    <ArrowUpRight size={22} />
                  </button>
                </div>
                <p className="text-[9px] text-gray-600 mt-4 font-bold uppercase tracking-[0.2em] italic">
                  * Subscribe for bi-weekly architecture insights.
                </p>
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer Metadata Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
              © {new Date().getFullYear()} SMW CONSTRUCTION DEVELOPERS.
            </p>
            <div className="flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
              <Globe size={14} className="text-[#8DC63F]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Global Hub Status: Active</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <button className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5 group">
              Privacy Protocol <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="hover:text-[#8DC63F] transition-colors flex items-center gap-1.5 group">
              Security Terms <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="hover:text-[#8DC63F] transition-colors">Infrastructure Roadmap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
