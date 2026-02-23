
import React, { useState } from 'react';
import { 
  LayoutDashboard, Building, BarChart3, Users, 
  Box, Activity, Wallet, Clock, History, Edit3, 
  TrendingUp, ArrowUpRight, ArrowDownRight, Wrench, 
  MessageSquare, ShieldCheck, User, AlertTriangle
} from 'lucide-react';
import { UserRole, Property, Currency, formatPrice } from '../App';

interface DashboardHubProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  properties: Property[];
  currency: Currency;
  onManageContent?: () => void;
}

export const DashboardHub: React.FC<DashboardHubProps> = ({ 
  userRole, currency, properties, onManageContent 
}) => {
  const [activeView, setActiveView] = useState('Dashboard');

  const stats = [
    { icon: Wallet, label: "Net Portfolio", value: "Shs 4.2B", trend: "+12%", up: true, color: "text-[#8DC63F]", bg: "bg-[#8DC63F]/10" },
    { icon: Building, label: "Active Units", value: "24", trend: "+2", up: true, color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Wrench, label: "Pending Maintenance", value: "3", trend: "-1", up: false, color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Users, label: "Total Tenants", value: "18", trend: "0%", up: true, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="flex h-screen bg-[#020408] text-gray-100 overflow-hidden pt-20">
      <aside className="w-72 bg-[#06080f] border-r border-white/5 flex flex-col h-full z-[60] shrink-0 transition-all">
        <div className="p-7 flex items-center justify-between border-b border-white/5">
           <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tighter uppercase">SMW</span>
              <span className="text-xl font-medium text-[#8DC63F] tracking-tighter">OS</span>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {['Dashboard', 'Tenants', 'Maintenance', 'Finances', 'Communications'].map((label) => (
            <button 
              key={label}
              onClick={() => setActiveView(label)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeView === label ? 'bg-[#8DC63F] text-black font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard size={18} className="shrink-0" />
              <span className="ml-4 text-[10px] font-black uppercase tracking-widest">{label}</span>
            </button>
          ))}
          
          {(userRole === 'admin' || userRole === 'manager') && onManageContent && (
            <div className="pt-8 mt-8 border-t border-white/5">
              <button onClick={onManageContent} className="w-full flex items-center px-4 py-3 rounded-xl text-[#8DC63F] hover:bg-[#8DC63F]/10 transition-all">
                <ShieldCheck size={18} />
                <span className="ml-4 text-[10px] font-black uppercase tracking-widest">Admin Terminal</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{activeView} Overview</h2>
            <p className="text-gray-500 font-medium text-sm">Real-time status of your property ecosystem node.</p>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-[#8DC63F] animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">System Healthy</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#0d111a] border border-white/5 p-8 rounded-[2.5rem] group hover:border-[#8DC63F]/20 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center`}><s.icon size={26} /></div>
                <div className={`flex items-center gap-1 text-[10px] font-black ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                   {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {s.trend}
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
              <h4 className="text-3xl font-black text-white tracking-tighter">{s.value}</h4>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-[#0d111a] border border-white/5 rounded-[2.5rem] p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Performance Ledger</h3>
                <div className="flex gap-2">
                   <button className="px-4 py-2 bg-white/5 rounded-lg text-[10px] font-black text-gray-400">DAILY</button>
                   <button className="px-4 py-2 bg-[#8DC63F] rounded-lg text-[10px] font-black text-black">MONTHLY</button>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 pb-4">
                 {[40, 70, 45, 90, 65, 80, 50, 100, 75, 85, 60, 95].map((h, i) => (
                   <div key={i} className="flex-1 bg-[#8DC63F]/10 rounded-t-xl group relative cursor-pointer hover:bg-[#8DC63F]/30 transition-all" style={{ height: `${h}%` }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Shs {h}M</div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-widest pt-4 border-t border-white/5">
                 <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
              </div>
           </div>

           <div className="bg-[#0d111a] border border-white/5 rounded-[2.5rem] p-10">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-10">Recent Events</h3>
              <div className="space-y-6">
                {[
                  { icon: User, text: "New Tenant Verified", time: "2h ago", color: "text-blue-400" },
                  { icon: Wrench, text: "Leaking Pipe Fixed", time: "5h ago", color: "text-green-400" },
                  { icon: Wallet, text: "Rent Payment Received", time: "1d ago", color: "text-[#8DC63F]" },
                  { icon: AlertTriangle, text: "Contract Expiring Soon", time: "2d ago", color: "text-amber-400" },
                ].map((ev, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${ev.color}`}><ev.icon size={18} /></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-200">{ev.text}</p>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{ev.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 border border-white/5 rounded-2xl text-[10px] font-black uppercase text-gray-500 hover:text-white hover:bg-white/5 transition-all">Audit Global Ledger</button>
           </div>
        </div>
      </div>
    </div>
  );
};
