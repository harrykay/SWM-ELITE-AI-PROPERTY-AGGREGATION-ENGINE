
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Heart, MapPin, CheckCircle2, User, 
  Maximize2, DollarSign, PenTool, Calendar, Play, 
  ChevronRight, ArrowLeft, Image as ImageIcon, Video,
  Info, ClipboardCheck, Sparkles, ExternalLink,
  Building2, Hammer, DraftingCompass, Clock,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Project } from '../App';

interface SingleProjectPageProps {
  project: Project;
  onNavigate: (page: string) => void;
}

export const SingleProjectPage: React.FC<SingleProjectPageProps> = ({ project, onNavigate }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const specs = [
    { label: 'Client Node', value: project.client || 'Confidential', icon: User },
    { label: 'Location', value: project.location, icon: MapPin },
    { label: 'Surface Area', value: project.surfaceArea || 'N/A', icon: Maximize2 },
    { label: 'Project Value', value: project.value || 'N/A', icon: DollarSign },
    { label: 'Timeline', value: project.timeline || 'N/A', icon: Clock },
    { label: 'Lead Architect', value: project.architect || 'SMW Uganda', icon: DraftingCompass },
    { label: 'Project Manager', value: project.projectManager || 'N/A', icon: User },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#06080f] min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8DC63F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-[#8DC63F]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">Project Node: {project.id}</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                {project.title.split(' ').slice(0, -1).join(' ')}<br />
                <span className="text-[#8DC63F]">{project.title.split(' ').pop()}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <Building2 size={14} className="text-[#8DC63F]" />
                  {project.category}
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                  project.status === 'completed'
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-[#8DC63F]/10 border border-[#8DC63F]/20 text-[#8DC63F]'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-green-500' : 'bg-[#8DC63F] animate-pulse'}`}></div>
                  {project.status}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all">
                <Share2 size={20} />
              </button>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${
                  isSaved ? 'bg-[#8DC63F] border-[#8DC63F] text-black' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hero Media Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-8 aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group relative"
          >
            <img src={project.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-transparent to-transparent opacity-40"></div>
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <ImageIcon size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Primary Visual Node</span>
            </div>
          </motion.div>

          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
            {project.gallery?.slice(0, 2).map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="aspect-square lg:aspect-auto lg:h-[calc(50%-12px)] rounded-[2.5rem] overflow-hidden border border-white/5 group relative"
              >
                <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${i}`} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </motion.div>
            )) || (
              <div className="col-span-2 lg:col-span-1 h-full bg-[#111421] rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <Sparkles size={48} className="text-[#8DC63F]/20" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Additional nodes pending synchronization</p>
              </div>
            )}
          </div>
        </div>

        {/* Technical Specifications & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-7 space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Info size={20} className="text-[#8DC63F]" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Project Description</h3>
              </div>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                {project.description}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <ClipboardCheck size={20} className="text-[#8DC63F]" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Technical Requirements</h3>
              </div>
              <div className="space-y-4">
                {project.requirements?.map((req, i) => (
                  <div 
                    key={i} 
                    className="bg-[#111421] border border-white/5 rounded-2xl overflow-hidden transition-all"
                  >
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                      className="w-full p-6 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] text-xs font-black">
                          0{i + 1}
                        </div>
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-widest">{req}</span>
                      </div>
                      {activeAccordion === i ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                    </button>
                    <AnimatePresence>
                      {activeAccordion === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-18 pb-6 text-xs text-gray-500 font-medium leading-relaxed ml-18"
                        >
                          Verified compliance with SMW technical standards. Implementation phase completed with 100% fidelity to architectural blueprints.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#111421] rounded-[3.5rem] border border-white/5 p-10 md:p-12 sticky top-32">
              <div className="flex items-center gap-3 mb-10">
                <DraftingCompass size={24} className="text-[#8DC63F]" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Technical Specs</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
                      <spec.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{spec.label}</p>
                      <p className="text-lg font-black text-white group-hover:text-[#8DC63F] transition-colors">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-white/5">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-[#8DC63F] text-black py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] transition-all hover:bg-white flex items-center justify-center gap-4 shadow-2xl shadow-[#8DC63F]/10"
                >
                  <ExternalLink size={18} /> Download Blueprints
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Video size={24} className="text-[#8DC63F]" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Project Visualization</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">4K Render Available</span>
          </div>
          
          <div className="aspect-video rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl relative group">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center z-10">
              <button className="w-24 h-24 rounded-full bg-[#8DC63F] text-black flex items-center justify-center shadow-2xl shadow-[#8DC63F]/40 hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
              </button>
            </div>
            <img 
              src={project.image} 
              className="w-full h-full object-cover blur-sm group-hover:blur-none transition-all duration-700" 
              alt="Video Thumbnail" 
              referrerPolicy="no-referrer"
            />
            {/* Standard YouTube Embed placeholder logic could go here */}
          </div>
        </section>

      </div>
    </div>
  );
};
