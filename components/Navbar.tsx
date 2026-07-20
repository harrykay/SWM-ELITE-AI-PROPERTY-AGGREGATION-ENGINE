
import React, { useState, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, Plus, ChevronDown } from 'lucide-react';
import { Currency, UserRole } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate?: (page: string, params?: any) => void;
  activePage?: string;
  compareCount?: number;
  onOpenCompare?: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
  user?: { name: string; role: UserRole; id: string };
  isOffline?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  notificationCount?: number;
  currency?: Currency;
  onToggleCurrency?: () => void;
  cmsPages?: any[];
  cmsMenus?: any[];
}

const Logo: React.FC = () => (
  <div className="flex items-center gap-4">
    <div className="relative w-12 h-10 flex items-end">
      <div className="absolute left-0 bottom-0 w-[24px] h-[24px] border-l-[6px] border-t-[6px] border-gray-600 rounded-tl-sm"></div>
      <div className="absolute left-[12px] bottom-0 w-[12px] h-[20px] bg-[#007b8a] z-10 flex flex-col items-center gap-[2px] pt-[3px]">
        <div className="w-[5px] h-[3px] bg-white/40"></div>
        <div className="w-[5px] h-[3px] bg-white/40"></div>
      </div>
      <div className="absolute right-0 bottom-0 w-[26px] h-full border-r-[6px] border-t-[6px] border-[#8DC63F] rounded-tr-sm"></div>
    </div>
    <div className="flex flex-col justify-center leading-none">
      <span className="text-[32px] font-black tracking-tighter text-white">SMW</span>
      <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#8DC63F]">Building on Trust</span>
    </div>
  </div>
);

const SUB_SERVICES = [
  "Land Processing",
  "Design",
  "Facility Management",
  "Construction",
  "After Sales Service & Maintenance",
  "Specialist Finishings",
  "Landscaping & Gardening",
  "Decorations"
];

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, activePage, isDarkMode, onToggleDarkMode, currency, onToggleCurrency, cmsPages = [], cmsMenus = []
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavigate = (page: string, params?: any) => {
    onNavigate?.(page, params);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`transition-all duration-500 ${scrolled ? 'py-4 bg-[#06080f]/95 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-[#06080f]/50 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="cursor-pointer" onClick={() => onNavigate?.('home')}><Logo /></div>

        {/* Center: Main Navigation Nodes (Desktop) */}
        <nav className="hidden lg:flex items-center gap-10">
          {['Properties', 'Projects'].map((item) => (
            <button
              key={item}
              onClick={() => onNavigate?.(item.toLowerCase())}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#8DC63F] ${
                activePage === item.toLowerCase() ? 'text-[#8DC63F]' : 'text-white/70'
              }`}
            >
              {item}
            </button>
          ))}

          {/* Services Dropdown Node */}
          <div 
            className="relative group h-full py-2"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => onNavigate?.('services')}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 hover:text-[#8DC63F] ${
                activePage === 'services' ? 'text-[#8DC63F]' : 'text-white/70'
              }`}
            >
              Services <ChevronDown size={12} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-[#8DC63F]' : ''}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72 z-[100]"
                >
                  <div className="bg-[#111421] border border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
                    <div className="p-3 grid grid-cols-1 gap-1">
                      {SUB_SERVICES.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            const targetPage = sub.toLowerCase().replace(/\s+/g, '-');
                            if (['land-processing', 'design'].includes(targetPage)) {
                              onNavigate?.(targetPage);
                            } else {
                              onNavigate?.('services');
                            }
                            setIsServicesOpen(false);
                          }}
                          className="w-full text-left px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-[#8DC63F]/10 transition-all border border-transparent hover:border-[#8DC63F]/20 group/sub"
                        >
                          <span className="group-hover/sub:translate-x-1 transition-transform inline-block">
                            {sub}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#8DC63F] h-1 w-full opacity-50"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {['About', 'Contact', 'Blog'].map((item) => (
            <button
              key={item}
              onClick={() => onNavigate?.(item.toLowerCase())}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-[#8DC63F] ${
                activePage === item.toLowerCase() ? 'text-[#8DC63F]' : 'text-white/70'
              }`}
            >
              {item}
            </button>
          ))}

          {/* Dynamic Pages Dropdown */}
          {cmsPages.length > 0 && (
            <div 
              className="relative group h-full py-2"
              onMouseEnter={() => setIsPagesOpen(true)}
              onMouseLeave={() => setIsPagesOpen(false)}
            >
              <button
                className="text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 text-white/70 hover:text-[#8DC63F]"
              >
                More <ChevronDown size={12} className={`transition-transform duration-300 ${isPagesOpen ? 'rotate-180 text-[#8DC63F]' : ''}`} />
              </button>

              <AnimatePresence>
                {isPagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-[100]"
                  >
                    <div className="bg-[#111421] border border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
                      <div className="p-3 grid grid-cols-1 gap-1">
                        {cmsPages.map((page) => (
                          <button
                            key={page.id}
                            onClick={() => {
                              onNavigate?.('dynamic', { id: page.id });
                              setIsPagesOpen(false);
                            }}
                            className="w-full text-left px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-[#8DC63F]/10 transition-all border border-transparent hover:border-[#8DC63F]/20"
                          >
                            {page.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* Right: Command Controls */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Add Listing Node - Primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => onNavigate?.('add-listing')}
              className="flex items-center gap-2 bg-[#8DC63F] text-black px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-[#8DC63F]/10 border border-transparent active:scale-95"
            >
              <Plus size={16} strokeWidth={3} />
              Add Listing
            </button>
            <button 
              onClick={() => onNavigate?.('add-project')}
              className="flex items-center gap-2 bg-white/10 text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all border border-white/20 active:scale-95"
            >
              <Plus size={16} strokeWidth={3} />
              Add Project
            </button>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2.5 text-white hover:text-[#8DC63F] transition-colors">
            <Bell size={22} />
          </button>

          {/* Currency Selector Node */}
          <button 
            onClick={onToggleCurrency}
            className="hidden sm:flex bg-white/5 px-6 py-2.5 rounded-2xl border border-white/10 text-[#8DC63F] font-black text-[12px] tracking-widest hover:bg-white/10 transition-all"
          >
            {currency}
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={onToggleDarkMode} 
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition-all group"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div className="relative w-10 h-5 bg-gray-700 rounded-full p-1 transition-colors group-hover:bg-gray-600">
              <motion.div 
                animate={{ x: isDarkMode ? 20 : 0 }}
                className="w-3 h-3 bg-[#8DC63F] rounded-full"
              />
            </div>
            {isDarkMode ? <Sun size={18} className="text-white" /> : <Moon size={18} className="text-white" />}
          </button>

          {/* Mobile Menu Bars */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-[#8DC63F] transition-colors lg:hidden"
          >
            <Menu size={32} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#06080f] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <Logo />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-[#8DC63F] transition-colors rounded-full bg-white/5"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {['Home', 'Properties', 'Projects', 'Services', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleMobileNavigate(item.toLowerCase())}
                  className={`text-2xl font-black uppercase tracking-widest text-left transition-colors ${
                    activePage === item.toLowerCase() ? 'text-[#8DC63F]' : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
              
              <div className="h-px bg-white/10 my-4"></div>

              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="text-sm font-black uppercase tracking-widest text-white">Theme Mode</span>
                <button 
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-3 bg-[#8DC63F]/10 px-4 py-2 rounded-xl border border-[#8DC63F]/20"
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={18} className="text-[#8DC63F]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} className="text-[#8DC63F]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">Dark</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="h-px bg-white/10 my-4"></div>
              
              <button
                onClick={() => handleMobileNavigate('add-listing')}
                className="bg-[#8DC63F] text-black px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-center"
              >
                Add Listing
              </button>
              <button
                onClick={() => handleMobileNavigate('add-project')}
                className="bg-white/10 text-white border border-white/20 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-center"
              >
                Add Project
              </button>
              <button
                onClick={() => handleMobileNavigate('login')}
                className="border border-white/20 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] text-center"
              >
                Login / Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
