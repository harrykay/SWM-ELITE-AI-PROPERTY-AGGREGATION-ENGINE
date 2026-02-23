
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, Heart, MapPin, CheckCircle2, User, 
  Maximize2, DollarSign, PenTool, Calendar, Play, 
  ChevronRight, ArrowLeft, Image as ImageIcon, Video,
  Info, ClipboardCheck, Sparkles
} from 'lucide-react';
import { Project } from '../App';

interface SingleProjectPageProps {
  project: Project;
}

export const SingleProjectPage: React.FC<SingleProjectPageProps> = ({ project }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="pt-36 md:pt-52 pb-24 bg-white dark:bg-[#06080f] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Navigation & Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">
              <Sparkles size={14} /> Architectural Ledger Node
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.9]">
              {project.title}
            </h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
              <Share2 size={14} /> Share Node
            </button>
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                isSaved ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/10' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10 text-gray-500'
              }`}
            >
              <Heart size={14} fill={isSaved ? "currentColor" : "none"} /> {isSaved ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>
        </div>

        {/* ... Rest of bento grid and content sections (standardized pt handles the hero area) ... */}
        {/* High-Fidelity Bento Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mb-20 h-[500px] md:h-[650px]">
          {/* Bento grid content remains the same but within adjusted container spacing */}
          <div className="md:col-span-2 md:row-span-2 rounded-[3rem] overflow-hidden group relative shadow-2xl">
            <img src={project.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
          </div>
          {/* ... Remaining images ... */}
        </div>
        {/* ... Remaining page content ... */}
      </div>
    </div>
  );
};
