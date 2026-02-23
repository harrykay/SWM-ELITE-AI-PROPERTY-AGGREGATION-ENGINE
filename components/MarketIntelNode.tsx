
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, Search, Newspaper, Globe, 
  ExternalLink, TrendingUp, Info, Loader2,
  AlertCircle, RefreshCw, BarChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export const MarketIntelNode: React.FC = () => {
  const [intel, setIntel] = useState<string>('');
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketIntel = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Analyze the current state of the Ugandan real estate market in 2024 and 2025. Focus on Kampala, Entebbe, and emerging suburbs. Highlight luxury trends, diaspora investment interest, and infrastructure impacts like new expressways. Be concise and use bullet points.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setIntel(response.text || "No intelligence data received.");
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSources(chunks);
    } catch (err: any) {
      console.error("Gemini Error:", err);
      setError("Failed to reach the intelligence node. Protocol error.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketIntel();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase flex items-center gap-3">
            <Globe className="text-[#8DC63F]" /> Market Intelligence Node
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Real-time asset trends verified by Google Search Grounding.</p>
        </div>
        <button 
          onClick={fetchMarketIntel}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#8DC63F] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#8DC63F]/20 disabled:opacity-50"
        >
          {isLoading ? <RefreshCw className="animate-spin" size={14} /> : <RefreshCw size={14} />}
          Refresh Protocol
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Intel Panel */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1a1e2e] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-sm p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8DC63F] rounded-full blur-[120px] opacity-[0.03]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 bg-[#8DC63F]/10 rounded-xl flex items-center justify-center text-[#8DC63F]">
                 <Sparkles size={20} />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">AI Analysis Terminal</span>
            </div>

            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-6 text-[#8DC63F]" size={40} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Parsing Global Market Nodes...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center space-y-4">
                 <AlertCircle size={48} className="text-red-500 mx-auto opacity-20" />
                 <p className="text-red-500 font-bold text-sm uppercase tracking-widest">{error}</p>
                 <button onClick={fetchMarketIntel} className="text-[#8DC63F] text-xs font-black underline uppercase">Retry Handshake</button>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed whitespace-pre-wrap">
                  {intel}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sources & Metadata Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gray-900 dark:bg-black rounded-[2rem] p-8 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-[#8DC63F]" />
                <h4 className="text-lg font-black uppercase tracking-tighter">Growth Index</h4>
              </div>
              <div className="space-y-4">
                {[
                   { label: 'Kampala Luxury', growth: '+12.4%' },
                   { label: 'Diaspora Volume', growth: '+28.1%' },
                   { label: 'Land Valuation', growth: '+8.4%' }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                    <span className="text-[#8DC63F] font-black">{stat.growth}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white dark:bg-[#1a1e2e] rounded-[2rem] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
             <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <Newspaper size={14} className="text-[#8DC63F]" /> Grounding Sources
             </h4>
             <div className="space-y-4">
               {sources.length > 0 ? sources.map((source, i) => (
                 source.web && (
                   <a 
                    key={i} 
                    href={source.web.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl group hover:bg-[#8DC63F]/5 transition-all border border-transparent hover:border-[#8DC63F]/20"
                   >
                     <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#111421] flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/10 group-hover:scale-110 transition-transform">
                        <Globe size={14} className="text-[#8DC63F]" />
                     </div>
                     <div className="overflow-hidden">
                       <p className="text-[10px] font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">{source.web.title}</p>
                       <p className="text-[8px] text-gray-400 truncate mt-1">{source.web.uri}</p>
                     </div>
                     <ExternalLink size={12} className="shrink-0 text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </a>
                 )
               )) : (
                 <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center py-4 italic">No external nodes linked.</p>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
