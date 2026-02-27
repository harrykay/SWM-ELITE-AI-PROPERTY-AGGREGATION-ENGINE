
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CMSManager } from './CMSManager';
import { 
  LayoutDashboard, Home, Users, CheckCircle, TrendingUp, 
  MessageSquare, Edit3, Save, Plus, X, Info, Layers, 
  MapPin, ClipboardList, Briefcase, Trash2, ShieldCheck, 
  Settings2, Globe, Mail, CreditCard, Lock, Bell, Zap, 
  FileText, Smartphone, Cpu, Languages, Eye, Type,
  AlertCircle, ChevronRight, UserMinus, UserCheck, Key,
  Wallet, Sun, Menu
} from 'lucide-react';
import { Property, Project, AppSettings, UserRole } from '../App';

interface ManageDashboardProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  properties: Property[];
  onUpdateProperty: (p: Property) => void;
  onDeleteProperty: (id: string) => void;
  projects: Project[];
  onUpdateProject: (p: Project) => void;
  onAddProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  onNavigate: (page: string) => void;
}

type MainTab = 'properties' | 'projects' | 'users' | 'finance' | 'subscriptions' | 'settings' | 'cms';

export const ManageDashboard: React.FC<ManageDashboardProps> = ({ 
  settings, onUpdateSettings, properties, onUpdateProperty, onDeleteProperty, projects, onUpdateProject, onAddProject, onDeleteProject, onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('settings');
  const [subTab, setSubTab] = useState('general');
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <div className="px-4 py-1">
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all rounded-2xl ${
          activeTab === id 
            ? 'text-black bg-[#8DC63F] shadow-xl shadow-[#8DC63F]/20' 
            : 'text-gray-500 hover:text-white hover:bg-white/5'
        }`}
      >
        <Icon size={18} /> {label}
      </button>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#04060b] flex">
      {/* Sidebar Node */}
      <div className="w-80 border-r border-white/5 flex flex-col pt-12 hidden lg:flex">
        <div className="px-8 mb-16">
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
              <div className="flex items-center gap-2">
                <span className="text-[32px] font-black tracking-tighter text-white">SMW</span>
                <span className="text-[10px] font-black bg-[#8DC63F] text-black px-1.5 py-0.5 rounded-md">OS</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#8DC63F]">Building on Trust</span>
            </div>
          </div>
        </div>

        <nav className="flex-1">
          <SidebarItem id="settings" label="DASHBOARD" icon={LayoutDashboard} />
          <SidebarItem id="users" label="TENANTS" icon={Users} />
          <SidebarItem id="projects" label="MAINTENANCE" icon={Briefcase} />
          <SidebarItem id="finance" label="FINANCES" icon={Wallet} />
          <SidebarItem id="cms" label="CMS" icon={Globe} />
          <SidebarItem id="subscriptions" label="SAAS" icon={CreditCard} />
        </nav>
      </div>

      {/* Main Command Center */}
      <div className="flex-1 flex flex-col">
        {/* Top Command Bar */}
        <div className="h-32 border-b border-white/5 flex items-center justify-between px-12">
          <div className="flex items-center gap-4">
            <div className="lg:hidden"><Globe size={24} className="text-[#8DC63F]" /></div>
          </div>
          <div className="flex items-center gap-8">
            {activeTab === 'settings' && (
              <button 
                onClick={handleSaveSettings}
                className="bg-[#8DC63F] text-black px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#8DC63F]/20"
              >
                <Save size={18} />
                Save Changes
              </button>
            )}
            <button className="bg-[#8DC63F] text-black px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#8DC63F]/20">
              <Plus size={18} strokeWidth={3} />
              Initialize Asset
            </button>
            <button className="text-white hover:text-[#8DC63F] transition-colors relative">
              <Bell size={24} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
            <button className="bg-white/5 px-8 py-3 rounded-2xl border border-white/10 text-[#8DC63F] font-black text-[13px] tracking-widest hover:bg-white/10 transition-all">
              UGX
            </button>
            <button className="text-white hover:text-[#8DC63F] transition-colors">
              <Sun size={24} />
            </button>
            <button className="text-white hover:text-[#8DC63F] transition-colors">
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Content Node */}
        <div className="p-12 flex-1 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-6">
                Dashboard<br />
                Overview
              </h1>
              <p className="text-gray-500 font-medium text-lg max-w-xl">Real-time status of your property ecosystem node.</p>
            </div>
            <div className="bg-[#111421] px-8 py-4 rounded-[2rem] border border-white/5 flex items-center gap-4 shadow-2xl">
              <div className="w-3 h-3 rounded-full bg-[#8DC63F] animate-pulse"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#8DC63F]">System Healthy</span>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'cms' && <CMSManager />}
            
            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-[#111421] p-8 rounded-[2.5rem] border border-white/5">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8">System Configuration</h3>
                    <div className="space-y-2">
                      {['general', 'security', 'notifications', 'integrations'].map(t => (
                        <button 
                          key={t}
                          onClick={() => setSubTab(t)}
                          className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            subTab === t ? 'bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/20' : 'text-gray-500 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-[#111421] p-10 rounded-[3rem] border border-white/5">
                  <div className="flex justify-between items-center mb-10">
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{subTab} Protocol</h4>
                    <div className="flex items-center gap-4">
                      {showSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[#8DC63F] text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                        >
                          <CheckCircle size={14} /> Synchronized
                        </motion.div>
                      )}
                      <button 
                        onClick={handleSaveSettings}
                        className="bg-[#8DC63F] text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 hover:bg-white transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Platform Name</label>
                        <input 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all" 
                          value={localSettings.siteName} 
                          onChange={e => setLocalSettings({...localSettings, siteName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Primary Language</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all appearance-none">
                          <option>English (Global)</option>
                          <option>Luganda (Local)</option>
                          <option>Swahili (Regional)</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-2xl flex items-center justify-center text-[#8DC63F]"><ShieldCheck size={24} /></div>
                        <div>
                          <h5 className="text-sm font-black text-white uppercase tracking-tight">Two-Factor Authentication</h5>
                          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Enhanced security for administrative nodes</p>
                        </div>
                      </div>
                      <div className="w-14 h-7 bg-gray-800 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-5 h-5 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="bg-[#111421] rounded-[3rem] border border-white/5 p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Project Portfolio</h3>
                  <button 
                    onClick={() => onNavigate('add-project')}
                    className="bg-[#8DC63F] text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 flex items-center gap-2"
                  >
                    <Plus size={16} /> New Project Node
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Project Identity</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Location</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Category</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Status</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {projects.map(p => (
                        <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                          <td className="py-6 pr-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                <img src={p.image} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-black text-white uppercase tracking-tight">{p.title}</span>
                            </div>
                          </td>
                          <td className="py-6 text-gray-500 text-[10px] font-bold uppercase tracking-widest">{p.location}</td>
                          <td className="py-6 text-white font-black text-sm uppercase tracking-widest text-[10px]">{p.category}</td>
                          <td className="py-6">
                            <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                              p.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                              <button 
                                onClick={() => {
                                  if (confirm('Are you sure you want to decommission this project node?')) {
                                    onDeleteProject(p.id);
                                  }
                                }}
                                className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-[#111421] rounded-[3rem] border border-white/5 p-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Property Ledger</h3>
                  <button 
                    onClick={() => onNavigate('add-listing')}
                    className="bg-[#8DC63F] text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 flex items-center gap-2"
                  >
                    <Plus size={16} /> New Asset Node
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Asset Identity</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Location</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Valuation</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Status</th>
                        <th className="pb-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {properties.map(p => (
                        <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                          <td className="py-6 pr-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                <img src={p.images[0]} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-sm font-black text-white uppercase tracking-tight">{p.title}</span>
                            </div>
                          </td>
                          <td className="py-6 text-gray-500 text-[10px] font-bold uppercase tracking-widest">{p.location}</td>
                          <td className="py-6 text-white font-black text-sm">${p.price.toLocaleString()}</td>
                          <td className="py-6">
                            <span className="px-3 py-1 bg-[#8DC63F]/10 text-[#8DC63F] rounded-lg text-[8px] font-black uppercase tracking-widest">{p.status}</span>
                          </td>
                          <td className="py-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                              <button 
                                onClick={() => {
                                  if (confirm('Are you sure you want to decommission this asset node?')) {
                                    onDeleteProperty(p.id);
                                  }
                                }}
                                className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
