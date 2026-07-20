
import React from 'react';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin, User, LayoutDashboard, LogOut } from 'lucide-react';
import { UserRole } from '../App';

interface TopHeaderProps {
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  user?: { name: string; role: UserRole; id: string };
  onLogout: () => void;
  isDarkMode?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onNavigate, isAuthenticated, user, onLogout, isDarkMode }) => {
  return (
    <div className="w-full bg-gray-50 dark:bg-[#04060b] border-b border-gray-100 dark:border-white/5 py-2 px-6 md:px-12 z-[60] relative hidden md:block transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Contact Nodes */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-5 h-5 bg-gray-200/50 dark:bg-white/5 rounded-md flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
              <Phone size={10} />
            </div>
            <span className="text-[9px] font-black uppercase text-gray-500 dark:text-gray-400 tracking-widest">+256 414 270 703</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-5 h-5 bg-gray-200/50 dark:bg-white/5 rounded-md flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
              <Mail size={10} />
            </div>
            <span className="text-[9px] font-black uppercase text-gray-500 dark:text-gray-400 tracking-widest">INFO@SMW.CO.UG</span>
          </div>
        </div>

        {/* Right: Auth & Dashboard Nodes */}
        <div className="flex items-center gap-8">
          {/* Social Links */}
          <div className="flex items-center gap-3.5 border-r border-gray-200 dark:border-white/10 pr-8">
            <button className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"><Facebook size={12} /></button>
            <button className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"><Twitter size={12} /></button>
            <button className="text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors"><Linkedin size={12} /></button>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase text-[#8DC63F] tracking-[0.2em] hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <LayoutDashboard size={12} />
                  DASHBOARD
                </button>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={12} />
                  Logout
                </button>
                <div className="flex items-center gap-2.5 bg-gray-100 dark:bg-black/40 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-2xl">
                  <div className="w-6 h-6 rounded-full bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] border border-[#8DC63F]/20">
                    <User size={12} />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[9px] font-black uppercase text-gray-800 dark:text-white tracking-wider">
                      {user?.name}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-700 dark:text-white hover:text-white hover:bg-[#8DC63F] dark:hover:text-black hover:border-transparent tracking-[0.25em] transition-all bg-white dark:bg-white/5 px-4 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:shadow-md"
              >
                <User size={12} /> Establish Identity
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
