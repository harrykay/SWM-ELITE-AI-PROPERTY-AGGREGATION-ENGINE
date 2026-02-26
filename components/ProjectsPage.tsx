
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MapPin, Search, Plus, Filter, LayoutGrid, 
  CheckCircle2, Clock, ArrowRight, ExternalLink,
  Building2, Hammer, DraftingCompass, Sparkles
} from 'lucide-react';
import { Project } from '../App';

interface ProjectsPageProps {
  projects: Project[];
  onProjectClick?: (id: string) => void;
}

type FilterStatus = 'ALL PROJECTS' | 'ONGOING' | 'COMPLETED';

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, onProjectClick }) => {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('ALL PROJECTS');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL PROJECTS') return projects;
    return projects.filter(p => p.status.toUpperCase() === activeFilter);
  }, [projects, activeFilter]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="pt-32 pb-24 bg-[#06080f] min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8DC63F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Hero Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-[#8DC63F]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">Project Ledger</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
                Architectural<br />
                <span className="text-[#8DC63F]">Ecosystem</span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                A verified ledger of SMW infrastructure developments across the Ugandan landscape. 
                From luxury residencies to community hubs.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-6">
              <div className="flex items-center gap-8 border-b border-white/10 pb-4">
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Total Nodes</p>
                  <p className="text-2xl font-black text-white">{projects.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Active Build</p>
                  <p className="text-2xl font-black text-[#8DC63F]">{projects.filter(p => p.status === 'ongoing').length}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 bg-[#111421] p-2 rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-1 w-full md:w-auto">
            {(['ALL PROJECTS', 'ONGOING', 'COMPLETED'] as FilterStatus[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 md:flex-none px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === filter 
                    ? 'bg-[#8DC63F] text-black shadow-xl shadow-[#8DC63F]/20' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 px-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search Ledger..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-[#8DC63F]/50 transition-all"
              />
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-500 hover:text-white transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onProjectClick?.(project.id)}
                className="group cursor-pointer"
              >
                <div className="bg-[#111421] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#8DC63F]/30 transition-all duration-500 shadow-2xl relative">
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6">
                      <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md border ${
                        project.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'completed' ? 'bg-green-400' : 'bg-amber-400 animate-pulse'}`}></div>
                        {project.status}
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => toggleFavorite(project.id, e)}
                      className={`absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all ${
                        favorites.has(project.id) 
                          ? 'bg-[#8DC63F] border-[#8DC63F] text-black' 
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      <Heart size={18} fill={favorites.has(project.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#8DC63F] mb-3">
                      <Sparkles size={12} />
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#8DC63F] transition-colors leading-none">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 mb-6">
                      <MapPin size={14} className="text-gray-600" />
                      <span className="text-xs font-bold">{project.location}</span>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                          <LayoutGrid size={14} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">View Node</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-[#8DC63F] group-hover:text-black transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Stats / Footer Info */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { label: 'Total Projects', value: '150+', icon: Building2 },
              { label: 'Cities Covered', value: '12', icon: MapPin },
              { label: 'Years Active', value: '70+', icon: Clock },
              { label: 'Client Nodes', value: '500+', icon: CheckCircle2 }
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#8DC63F]">
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-3xl font-black text-white tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
