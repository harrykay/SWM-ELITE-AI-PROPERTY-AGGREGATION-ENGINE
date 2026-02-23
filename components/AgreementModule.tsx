
import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer, Send, Clock, User } from 'lucide-react';

interface AgreementModuleProps {
  propertyTitle: string;
  clientName: string;
  amount: number;
  type: 'lease' | 'sale';
}

export const AgreementModule: React.FC<AgreementModuleProps> = ({ propertyTitle, clientName, amount, type }) => {
  const [isSigned, setIsSigned] = useState(false);

  return (
    <div className="bg-white dark:bg-[#111421] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-[#8DC63F]/10 rounded-2xl flex items-center justify-center text-[#8DC63F]">
              <FileText size={32} />
           </div>
           <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 dark:text-white">{type === 'lease' ? 'Lease Protocol' : 'Sales Agreement'}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Node: {propertyTitle}</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-400 hover:text-[#8DC63F] transition-all"><Printer size={20} /></button>
           <button className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-400 hover:text-blue-400 transition-all"><Download size={20} /></button>
        </div>
      </div>

      <div className="space-y-8 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
         <div className="p-10 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
            <p className="mb-6 font-black text-gray-900 dark:text-white uppercase text-center text-lg tracking-tighter underline">Binding Legal Infrastructure Document</p>
            <p className="mb-4">This AGREEMENT is entered into this {new Date().toLocaleDateString()} between SMW CONSTRUCTION DEVELOPERS ("Lessor/Seller") and {clientName} ("Lessee/Buyer").</p>
            <p className="mb-4 font-bold text-gray-800 dark:text-gray-200">1. PROPERTY IDENTITY NODE</p>
            <p className="mb-6">The Lessor hereby agrees to provide access to the architectural node identified as {propertyTitle}, located at the verified geographic coordinates specified in the master property ledger.</p>
            <p className="mb-4 font-bold text-gray-800 dark:text-gray-200">2. FINANCIAL TRANSACTION PROTOCOL</p>
            <p className="mb-6">Total valuation for this node is set at Shs {amount.toLocaleString()}. All transfers must occur via the verified SMW Escrow Gateway.</p>
            <p className="mb-4 font-bold text-gray-800 dark:text-gray-200">3. GOVERNANCE & MAINTENANCE</p>
            <p className="mb-6">Maintenance requests must be filed through the SMW Digital Assistant. Emergency nodes are active 24/7 for high-priority architectural failures.</p>
            <p className="italic text-[10px] text-gray-500 mt-10">This document is digitally verified and time-stamped in the global ledger. Tampering will trigger security protocols.</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-4">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black uppercase text-[#8DC63F] tracking-widest">Digital Verification</p>
               <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">AES-256 Cloud Signature Active</p>
            </div>
         </div>

         {isSigned ? (
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-8 py-4 rounded-2xl text-green-500 font-black uppercase text-[10px] tracking-widest">
               <CheckCircle2 size={18} /> Protocol Established
            </div>
         ) : (
            <button 
               onClick={() => setIsSigned(true)}
               className="bg-[#8DC63F] text-black px-12 py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#8DC63F]/20"
            >
               Authorize Agreement <Send size={18} />
            </button>
         )}
      </div>
    </div>
  );
};
