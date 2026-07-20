
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Building2, Clock } from 'lucide-react';
import { Project } from '../App';

interface LatestProjectsProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
  onViewAll: () => void;
}

export const LatestProjects: React.FC<LatestProjectsProps> = ({ projects, onProjectClick, onViewAll }) => {
  const latestThree = projects.slice(0, 3);

  return (
    <section className="py-24 bg-white dark:bg-[#06080f] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#8DC63F]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">Development Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-[0.85]">
              Latest <span className="text-[#8DC63F]">Projects</span>
            </h2>
          </div>
          <button 
            onClick={onViewAll}
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-[#8DC63F] transition-colors"
          >
            View Full Portfolio <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestThree.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onProjectClick(project.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-gray-200 dark:border-white/5 mb-8 shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="absolute top-6 right-6">
                  <div className={`px-4 py-2 rounded-xl backdrop-blur-md border text-[8px] font-black uppercase tracking-widest ${
                    project.status === 'completed' 
                      ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                      : 'bg-[#8DC63F]/20 border-[#8DC63F]/30 text-[#8DC63F]'
                  }`}>
                    {project.status}
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={12} className="text-[#8DC63F]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none group-hover:text-[#8DC63F] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{project.location}</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#8DC63F] group-hover:text-black group-hover:border-[#8DC63F] transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
