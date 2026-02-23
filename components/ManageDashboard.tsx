
import React, { useState } from 'react';
import { 
  LayoutDashboard, Home, Users, CheckCircle, TrendingUp, 
  MessageSquare, Edit3, Save, Plus, X, Info, Layers, 
  MapPin, ClipboardList, Briefcase, Trash2, ShieldCheck, 
  Settings2, Globe, Mail, CreditCard, Lock, Bell, Zap, 
  FileText, Smartphone, Cpu, Languages, Eye, Type,
  AlertCircle, ChevronRight, UserMinus, UserCheck, Key,
  Wallet
} from 'lucide-react';
import { Property, Project, AppSettings, UserRole } from '../App';

interface ManageDashboardProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  properties: Property[];
  onUpdateProperty: (p: Property) => void;
  projects: Project[];
  onUpdateProject: (p: Project) => void;
  onAddProject: (p: Project) => void;
}

type MainTab = 'properties' | 'projects' | 'users' | 'finance' | 'subscriptions' | 'settings' | 'cms';

export const ManageDashboard: React.FC<ManageDashboardProps> = ({ 
  settings, onUpdateSettings, properties, onUpdateProperty, projects, onUpdateProject, onAddProject 
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('settings');
  const [subTab, setSubTab] = useState('general');

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
        activeTab === id ? 'bg-[#8DC63F] text-black shadow-xl shadow-[#8DC63F]/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={16} /> {label}
    </button>
  );

  return (
    <section className="pt-36 md:pt-52 pb-24 bg-[#06080f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Protocol */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="px-2">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-3">SMW <span className="text-[#8DC63F]">Command Node</span></h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">Unified management for Uganda's premier property ecosystem.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#111421] p-2 rounded-2xl md:rounded-[1.5rem] border border-white/5 overflow-x-auto no-scrollbar w-full md:w-auto">
            <TabButton id="settings" label="Settings" icon={Settings2} />
            <TabButton id="cms" label="Landing CMS" icon={Globe} />
            <TabButton id="users" label="Users" icon={Users} />
            <TabButton id="finance" label="Finances" icon={Wallet} />
            <TabButton id="subscriptions" label="SaaS Packages" icon={CreditCard} />
            <TabButton id="projects" label="Project Ledger" icon={Briefcase} />
          </div>
        </div>

        {/* ... Rest of Dashboard content ... */}
      </div>
    </section>
  );
};
