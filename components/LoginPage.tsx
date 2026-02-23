
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Mail, ChevronRight, ShieldCheck, AlertCircle, 
  Terminal, ClipboardCheck, Info, UserPlus, Key, 
  ArrowLeft, Fingerprint, Activity, CheckCircle2,
  RefreshCw, WifiOff, ShieldAlert, Mic, Users, User, Shield,
  ShoppingBag, TrendingUp, Briefcase, Megaphone, Home
} from 'lucide-react';
import { UserRole } from '../App';

interface LoginPageProps {
  onLogin: (user?: any) => void;
}

type AuthMode = 'login' | 'register' | 'recovery';

interface RoleOption {
  id: UserRole;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const REGISTRATION_ROLES: RoleOption[] = [
  { 
    id: 'buyer', 
    label: 'Buyer', 
    icon: <User size={24} />, 
    description: 'Looking to acquire premium property nodes.' 
  },
  { 
    id: 'tenant', 
    label: 'Tenant', 
    icon: <Home size={24} />, 
    description: 'Seeking luxury residential or commercial leases.' 
  },
  { 
    id: 'seller', 
    label: 'Seller', 
    icon: <ShoppingBag size={24} />, 
    description: 'List and liquidate architectural assets.' 
  },
  { 
    id: 'investor', 
    label: 'Landlord Investor', 
    icon: <TrendingUp size={24} />, 
    description: 'Manage portfolios and generational wealth.' 
  },
  { 
    id: 'agent', 
    label: 'Agent', 
    icon: <Briefcase size={24} />, 
    description: 'Broker infrastructure deals across regions.' 
  },
  { 
    id: 'marketer', 
    label: 'Marketer', 
    icon: <Megaphone size={24} />, 
    description: 'Amplify property reach and ecosystem visibility.' 
  },
];

const SAMPLE_USERS = [
  { email: 'admin@smw.co.ug', password: 'password123', role: 'admin' as const, name: 'Master Architect' },
  { email: 'seller@smw.co.ug', password: 'password123', role: 'seller' as const, name: 'Premium Developer' },
  { email: 'buyer@smw.co.ug', password: 'password123', role: 'buyer' as const, name: 'Asset Seeker' },
  { email: 'tenant@smw.co.ug', password: 'password123', role: 'tenant' as const, name: 'Resident Node' },
  { email: 'investor@smw.co.ug', password: 'password123', role: 'investor' as const, name: 'Portfolio Lead' },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [registerStep, setRegisterStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const selectSampleUser = (user: typeof SAMPLE_USERS[0]) => {
    setEmail(user.email);
    setPassword(user.password);
    setFullName(user.name);
    setError(null);
    setSuccessMsg(null);
    setMode('login');
  };

  const handleRegisterNext = () => {
    if (selectedRole) {
      setRegisterStep(2);
    } else {
      setError("ROLE SELECTION REQUIRED: Select your infrastructure status.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    const sample = SAMPLE_USERS.find(u => u.email === email && u.password === password);
    if (sample && mode === 'login') {
      setTimeout(() => {
        setIsLoading(false);
        onLogin(sample);
      }, 800);
      return;
    }

    if (true) { // Sandbox mode always active for now
      setTimeout(() => {
        setIsLoading(false);
        if (mode === 'register') {
          setMode('login');
          setRegisterStep(1);
          setSuccessMsg("IDENTITY NODE ESTABLISHED. VERIFICATION SENT TO EMAIL NODE.");
        } else {
          onLogin({ email, role: 'buyer', name: fullName || 'Demo User' });
        }
      }, 800);
      return;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-32 pb-32 bg-[#06080f] min-h-screen flex flex-col items-center px-6 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#8DC63F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mt-12"
      >
        <div className="bg-[#111421]/60 border border-white/10 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="absolute left-10 md:left-16 top-32 bottom-32 w-[2px] bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0 hidden md:block"></div>

          <div className="flex justify-between items-baseline mb-12">
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              {mode === 'login' ? 'Identity Access' : `Step ${registerStep}: ${registerStep === 1 ? 'Who are you?' : 'Identity Specs'}`}
            </h3>
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setRegisterStep(1);
                setError(null);
                setSuccessMsg(null);
              }}
              className="text-[12px] font-black uppercase tracking-[0.2em] text-[#8DC63F] border-b-2 border-[#8DC63F]/20 pb-1 hover:text-white hover:border-white transition-all"
            >
              {mode === 'login' ? 'Register' : 'Back to Login'}
            </button>
          </div>

          <div className="flex justify-center mb-10">
            <div className="bg-[#1a2212] border border-[#8DC63F]/30 px-6 py-2 rounded-full flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] animate-pulse"></div>
               <span className="text-[10px] font-black uppercase text-[#8DC63F] tracking-[0.3em]">Live Connection Mode</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mb-10 p-5 bg-[#251010] border border-red-500/30 rounded-[1.5rem] flex items-center gap-4 text-red-500"
              >
                <div className="w-8 h-8 rounded-full border-2 border-red-500/40 flex items-center justify-center shrink-0">
                  <span className="font-bold text-lg">!</span>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{error}</span>
              </motion.div>
            )}
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="mb-10 p-5 bg-[#102511] border border-[#8DC63F]/30 rounded-[1.5rem] flex items-center gap-4 text-[#8DC63F]"
              >
                <div className="w-8 h-8 rounded-full border-2 border-[#8DC63F]/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {mode === 'login' ? (
            <form onSubmit={handleSubmit} className="space-y-8 md:pl-16">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Node</label>
                  <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@smw.co.ug"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.08] transition-all font-bold text-sm"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Access Credentials</label>
                  <input 
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.08] transition-all font-bold text-sm"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={isLoading}
                  className="w-full bg-[#8DC63F] text-black py-6 rounded-[1.8rem] font-black uppercase text-[12px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#8DC63F]/10"
                >
                  {isLoading ? <RefreshCw className="animate-spin" /> : 'Establish Link'}
                </button>
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] mb-6 text-center">Sample Identity Nodes</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {SAMPLE_USERS.map((user) => (
                    <button
                      key={user.role}
                      type="button"
                      onClick={() => selectSampleUser(user)}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#8DC63F]/30 hover:bg-[#8DC63F]/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#8DC63F] transition-colors">
                        {user.role === 'admin' ? <Shield size={18} /> : user.role === 'seller' ? <Key size={18} /> : <User size={18} />}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{user.role}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-8 md:pl-16">
              <AnimatePresence mode="wait">
                {registerStep === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {REGISTRATION_ROLES.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-6 rounded-[2rem] border transition-all text-left flex flex-col gap-4 group ${
                          selectedRole === role.id 
                            ? 'bg-[#8DC63F] border-[#8DC63F] text-black' 
                            : 'bg-white/5 border-white/10 text-white hover:border-[#8DC63F]/50 hover:bg-[#8DC63F]/5'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedRole === role.id ? 'bg-black/10' : 'bg-white/5 text-[#8DC63F]'
                        }`}>
                          {role.icon}
                        </div>
                        <div>
                          <h4 className="font-black uppercase text-[11px] tracking-widest mb-1">{role.label}</h4>
                          <p className={`text-[10px] leading-relaxed font-bold ${
                            selectedRole === role.id ? 'text-black/60' : 'text-gray-500'
                          }`}>
                            {role.description}
                          </p>
                        </div>
                      </button>
                    ))}
                    <div className="sm:col-span-2 lg:col-span-3 pt-6">
                      <button 
                        onClick={handleRegisterNext}
                        className="w-full bg-white text-black py-6 rounded-[1.8rem] font-black uppercase text-[12px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-[#8DC63F] transition-all shadow-xl"
                      >
                        Proceed to Security Specs <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="step2"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <button 
                      type="button" 
                      onClick={() => setRegisterStep(1)}
                      className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-[#8DC63F] transition-colors mb-4"
                    >
                      <ArrowLeft size={14} /> Back to Role Selection
                    </button>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Node Identifier</label>
                        <input 
                          type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.08] transition-all font-bold text-sm"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Email Node</label>
                        <input 
                          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.08] transition-all font-bold text-sm"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Access Credentials</label>
                        <input 
                          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-[#8DC63F]/50 focus:bg-white/[0.08] transition-all font-bold text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={isLoading}
                        className="w-full bg-[#8DC63F] text-black py-6 rounded-[1.8rem] font-black uppercase text-[12px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#8DC63F]/10"
                      >
                        {isLoading ? <RefreshCw className="animate-spin" /> : 'Initialize Identity Register'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex items-center gap-4 justify-center pt-8 opacity-40">
            <ShieldCheck size={16} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Infrastructure Security Active</span>
          </div>
        </div>
      </motion.div>

      <button className="fixed bottom-12 right-12 w-20 h-20 bg-[#8DC63F] text-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(141,198,63,0.3)] hover:scale-110 transition-transform z-50">
        <Mic size={32} />
      </button>
    </div>
  );
};
