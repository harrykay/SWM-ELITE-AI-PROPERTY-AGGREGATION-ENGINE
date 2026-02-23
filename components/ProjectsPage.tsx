
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Search, Plus, Filter, LayoutGrid, CheckCircle2, Clock } from 'lucide-react';
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

  return (
    <div className="pt-36 md:pt-52 pb-24 bg-white dark:bg-[#06080f] min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
            Architectural <span className="text-[#8DC63F]">Ecosystem</span>
          </h1>
          <p className="text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto px-4">
            A verified ledger of SMW infrastructure developments across the Ugandan landscape.
          </p>
        </div>

        {/* ... Rest of projects page content ... */}
      </div>
    </div>
  );
};
