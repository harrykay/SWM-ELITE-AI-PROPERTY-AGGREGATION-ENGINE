import React, { useState, useEffect } from 'react';
import { Menu, Bell, Sun, Moon, Plus, ChevronDown, Check, Sparkles } from 'lucide-react';
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

const Logo: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => (
  <div className="flex items-center gap-3 md:gap-4 select-none">
    <div className="relative w-10 h-8 md:w-12 md:h-10 flex items-end">
      <div className="absolute left-0 bottom-0 w-[20px] h-[20px] md:w-[24px] md:h-[24px] border-l-[4px] md:border-l-[6px] border-t-[4px] md:border-t-[6px] border-gray-400 dark:border-gray-600 rounded-tl-sm"></div>
      <div className="absolute left-[10px] md:left-[12px] bottom-0 w-[10px] md:w-[12px] h-[16px] md:h-[20px] bg-[#007b8a] z-10 flex flex-col items-center gap-[1px] md:gap-[2px] pt-[2px] md:pt-[3px]">
        <div className="w-[4px] md:w-[5px] h-[2.5px] md:h-[3px] bg-white/40"></div>
        <div className="w-[4px] md:w-[5px] h-[2.5px] md:h-[3px] bg-white/40"></div>
      </div>
      <div className="absolute right-0 bottom-0 w-[22px] md:w-[26px] h-full border-r-[4px] md:border-r-[6px] border-t-[4px] md:border-t-[6px] border-[#8DC63F] rounded-tr-sm"></div>
    </div>
    <div className="flex flex-col justify-center leading-none">
      <span className="text-2xl md:text-[32px] font-black tracking-tighter text-gray-900 dark:text-white transition-colors duration-500">SMW</span>
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-[#8DC63F]">Building on Trust</span>
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
  const [isPublishOpen, setIsPublishOpen] = useState(false);
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-3 md:py-4 bg-white/95 dark:bg-[#06080f]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-md' 
        : 'py-6 md:py-8 bg-white/70 dark:bg-[#06080f]/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="cursor-pointer" onClick={() => onNavigate?.('home')}><Logo isDarkMode={isDarkMode} /></div>

        {/* Center: Main Navigation Nodes (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Properties', 'Projects', 'Investor Hub'].map((item) => {
            const pageName = item === 'Investor Hub' ? 'investor-dashboard' : item.toLowerCase();
            const isActive = activePage === pageName;
            return (
              <button
                key={item}
                onClick={() => onNavigate?.(pageName)}
                className={`relative py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#8DC63F] ${
                  isActive ? 'text-[#8DC63F]' : 'text-gray-700 dark:text-white/70'
                }`}
              >
                {item}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8DC63F]" 
                  />
                )}
              </button>
            );
          })}

          {/* Services Dropdown Node */}
          <div 
            className="relative group h-full py-2"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              onClick={() => onNavigate?.('services')}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 hover:text-[#8DC63F] ${
                activePage === 'services' || ['land-processing', 'design'].includes(activePage || '') ? 'text-[#8DC63F]' : 'text-gray-700 dark:text-white/70'
              }`}
            >
              Services <ChevronDown size={10} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-[#8DC63F]' : ''}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 z-[100]"
                >
                  <div className="bg-white dark:bg-[#111421] border border-gray-100 dark:border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
                    <div className="p-2 grid grid-cols-1 gap-1">
                      {SUB_SERVICES.map((sub) => {
                        const targetPage = sub.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              if (['land-processing', 'design'].includes(targetPage)) {
                                onNavigate?.(targetPage);
                              } else {
                                onNavigate?.('services');
                              }
                              setIsServicesOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#8DC63F]/10 transition-all border border-transparent hover:border-gray-100 dark:hover:border-[#8DC63F]/20 group/sub"
                          >
                            <span className="group-hover/sub:translate-x-1 transition-transform inline-block">
                              {sub}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="bg-[#8DC63F] h-1 w-full opacity-60"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {['About', 'Contact', 'Blog'].map((item) => {
            const pageName = item.toLowerCase();
            const isActive = activePage === pageName;
            return (
              <button
                key={item}
                onClick={() => onNavigate?.(pageName)}
                className={`relative py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#8DC63F] ${
                  isActive ? 'text-[#8DC63F]' : 'text-gray-700 dark:text-white/70'
                }`}
              >
                {item}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8DC63F]" 
                  />
                )}
              </button>
            );
          })}

          {/* Dynamic Pages Dropdown */}
          {cmsPages.length > 0 && (
            <div 
              className="relative group h-full py-2"
              onMouseEnter={() => setIsPagesOpen(true)}
              onMouseLeave={() => setIsPagesOpen(false)}
            >
              <button
                className="text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 text-gray-700 dark:text-white/70 hover:text-[#8DC63F]"
              >
                More <ChevronDown size={10} className={`transition-transform duration-300 ${isPagesOpen ? 'rotate-180 text-[#8DC63F]' : ''}`} />
              </button>

              <AnimatePresence>
                {isPagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-60 z-[100]"
                  >
                    <div className="bg-white dark:bg-[#111421] border border-gray-100 dark:border-white/10 rounded-[1.5rem] shadow-2xl overflow-hidden backdrop-blur-xl">
                      <div className="p-2 grid grid-cols-1 gap-1">
                        {cmsPages.map((page) => (
                          <button
                            key={page.id}
                            onClick={() => {
                              onNavigate?.('dynamic', { id: page.id });
                              setIsPagesOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#8DC63F]/10 transition-all border border-transparent hover:border-gray-100 dark:hover:border-[#8DC63F]/20"
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
        <div className="flex items-center gap-2.5 md:gap-4">
          
          {/* Publishing Dropdown (Saves clutter by grouping CTAs) */}
          <div 
            className="hidden md:block relative py-2"
            onMouseEnter={() => setIsPublishOpen(true)}
            onMouseLeave={() => setIsPublishOpen(false)}
          >
            <button 
              className="flex items-center gap-2 bg-[#8DC63F] text-black px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-[#9ee047] transition-all shadow-md shadow-[#8DC63F]/10 active:scale-95"
            >
              <Plus size={14} strokeWidth={2.5} />
              Publish Asset
              <ChevronDown size={10} strokeWidth={2.5} className={`transition-transform duration-300 ${isPublishOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isPublishOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full pt-2 w-52 z-[100]"
                >
                  <div className="bg-white dark:bg-[#111421] border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden p-1.5 flex flex-col gap-1">
                    <button 
                      onClick={() => {
                        onNavigate?.('add-listing');
                        setIsPublishOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#8DC63F]/10 transition-colors flex items-center gap-2"
                    >
                      <Plus size={12} className="text-[#8DC63F]" />
                      Add Property Listing
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate?.('add-project');
                        setIsPublishOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#8DC63F]/10 transition-colors flex items-center gap-2"
                    >
                      <Plus size={12} className="text-[#8DC63F]" />
                      Add Project Node
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Premium Segmented Currency Toggle */}
          <div className="hidden sm:flex bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-0.5 rounded-xl shadow-inner select-none">
            <button 
              onClick={() => currency !== 'USD' && onToggleCurrency?.()}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                currency === 'USD' 
                  ? 'bg-white dark:bg-white/10 text-[#8DC63F] shadow-sm' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
            >
              USD
            </button>
            <button 
              onClick={() => currency !== 'UGX' && onToggleCurrency?.()}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                currency === 'UGX' 
                  ? 'bg-white dark:bg-white/10 text-[#8DC63F] shadow-sm' 
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
            >
              UGX
            </button>
          </div>

          {/* Minimalist Theme Icon-Only Toggle */}
          <button 
            onClick={onToggleDarkMode} 
            className="p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white transition-all shadow-sm"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={15} className="text-[#8DC63F]" /> : <Moon size={15} className="text-gray-700" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white transition-all shadow-sm">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#8DC63F] rounded-full animate-pulse"></span>
          </button>

          {/* Mobile Menu Toggle Icon */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-800 dark:text-white hover:text-[#8DC63F] transition-colors lg:hidden rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            <Menu size={18} strokeWidth={2.5} />
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
            className="fixed inset-0 z-[200] bg-white dark:bg-[#06080f] flex flex-col transition-colors duration-500"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100 dark:border-white/10">
              <Logo isDarkMode={isDarkMode} />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 text-gray-800 dark:text-white hover:text-red-500 transition-colors rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {['Home', 'Properties', 'Projects', 'Investor Hub', 'Services', 'About', 'Contact', 'Blog'].map((item) => {
                const pageName = item === 'Investor Hub' ? 'investor-dashboard' : item.toLowerCase();
                const isActive = activePage === pageName;
                return (
                  <button
                    key={item}
                    onClick={() => handleMobileNavigate(pageName)}
                    className={`text-xl font-black uppercase tracking-wider text-left transition-colors ${
                      isActive ? 'text-[#8DC63F]' : 'text-gray-800 dark:text-white'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
              
              <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>

              {/* Mobile Currency toggle */}
              <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-gray-600 dark:text-white">Active Currency</span>
                <button 
                  onClick={onToggleCurrency}
                  className="bg-white dark:bg-white/10 px-4 py-2 rounded-xl text-xs font-black text-[#8DC63F] border border-gray-200 dark:border-white/15"
                >
                  {currency}
                </button>
              </div>

              {/* Mobile Theme selector */}
              <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-gray-600 dark:text-white">Theme Mode</span>
                <button 
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-2 bg-[#8DC63F]/10 px-4 py-2 rounded-xl border border-[#8DC63F]/20"
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={14} className="text-[#8DC63F]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={14} className="text-gray-700" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>
              
              <div className="flex flex-col gap-3 mt-auto">
                <button
                  onClick={() => handleMobileNavigate('add-listing')}
                  className="w-full bg-[#8DC63F] hover:bg-[#9ee047] text-black py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center shadow-lg transition-transform active:scale-[0.98]"
                >
                  Add Property Listing
                </button>
                <button
                  onClick={() => handleMobileNavigate('add-project')}
                  className="w-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-colors"
                >
                  Add Project Node
                </button>
                <button
                  onClick={() => handleMobileNavigate('login')}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-center transition-colors"
                >
                  User Login / Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
