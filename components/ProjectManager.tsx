import React, { useState, useEffect } from 'react';
import { Folder, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Project } from '../App';

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error(err);
      setProjects([]);
    }
  };

  const handleSave = async () => {
    if (!currentProject || !currentProject.title) return;
    setLoading(true);
    try {
      const method = currentProject.id ? 'PUT' : 'POST';
      const url = currentProject.id ? `/api/projects/${currentProject.id}` : '/api/projects';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProject)
      });
      if (res.ok) {
        setIsEditing(false);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Project Management</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Manage all company projects</p>
        </div>
        <button 
          onClick={() => { setCurrentProject({ title: '', location: '', status: 'ongoing', image: '', category: '' }); setIsEditing(true); }}
          className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={16} /> Create New Project
        </button>
      </div>

      {isEditing && currentProject ? (
        <div className="bg-[#111421] rounded-[2.5rem] p-10 border border-white/5 space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">{currentProject.id ? 'Edit Project' : 'New Project'}</h4>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
          </div>
          {/* Add form fields for project details here */}
          <div className="flex justify-end gap-4">
            <button 
              disabled={loading}
              onClick={() => setIsEditing(false)}
              className="px-8 py-4 rounded-xl text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              disabled={loading}
              onClick={handleSave}
              className="bg-[#8DC63F] text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <div key={project.id} className="bg-[#111421] p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-[#8DC63F]/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-[#8DC63F] transition-colors">
                  <Folder size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">{project.title}</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{project.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${project.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {project.status}
                </span>
                <button onClick={() => { setCurrentProject(project); setIsEditing(true); }} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(project.id)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
