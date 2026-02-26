
import React from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, User, LayoutDashboard, LogOut } from 'lucide-react';
import { UserRole } from '../App';

interface TopHeaderProps {
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  user?: { name: string; role: UserRole; id: string };
  onLogout: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onNavigate, isAuthenticated, user, onLogout }) => {
  return (
    <div className="w-full bg-[#04060b] border-b border-white/5 py-2.5 px-6 md:px-12 z-[60] relative hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Contact Nodes */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
              <Phone size={12} />
            </div>
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">+256 414 270 703</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
              <Mail size={12} />
            </div>
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">INFO@SMW.CO.UG</span>
          </div>
        </div>

        {/* Right: Auth & Dashboard Nodes */}
        <div className="flex items-center gap-10">
          {/* Social Links */}
          <div className="flex items-center gap-4 border-r border-white/10 pr-10">
            <button className="text-gray-600 hover:text-white transition-colors"><Facebook size={14} /></button>
            <button className="text-gray-600 hover:text-white transition-colors"><Twitter size={14} /></button>
            <button className="text-gray-600 hover:text-white transition-colors"><Linkedin size={14} /></button>
          </div>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 text-[10px] font-black uppercase text-[#8DC63F] tracking-[0.2em] hover:text-white transition-colors"
                >
                  <LayoutDashboard size={14} />
                  DASHBOARD
                </button>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={14} />
                  Terminate Session
                </button>
                <div className="flex items-center gap-3 bg-black/40 px-5 py-2 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="w-8 h-8 rounded-full bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] border border-[#8DC63F]/20">
                    <User size={14} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">
                      {user?.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">
                      {user?.name.split(' ')[1]}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 text-[10px] font-black uppercase text-white hover:text-[#8DC63F] tracking-[0.3em] transition-all bg-white/5 px-6 py-2 rounded-xl border border-white/10 hover:border-[#8DC63F]/50 shadow-lg shadow-black/20"
              >
                <User size={14} /> Establish Identity
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
