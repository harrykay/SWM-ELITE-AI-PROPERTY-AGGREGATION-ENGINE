import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertTriangle, Upload, X, CheckCircle2 } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import { Project } from '../App';

interface AddProjectPageProps {
  onAddProject?: (project: Project) => void;
}

interface InputProps {
  label: string;
  field: string;
  type?: string;
  placeholder?: string;
  formData: any;
  setFormData: any;
  required?: boolean;
  error?: string;
}

const Input = ({ label, field, type = 'text', placeholder = '', formData, setFormData, required = false, error }: InputProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</label>
      {error && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{error}</span>}
    </div>
    <input 
      type={type} 
      value={formData[field]} 
      onChange={e => setFormData({...formData, [field]: e.target.value})} 
      className={`w-full bg-gray-100 dark:bg-[#111421] border ${error ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-[#8DC63F] transition-all text-sm placeholder-gray-400 dark:placeholder-gray-600`} 
      placeholder={placeholder} 
    />
  </div>
);

export const AddProjectPage: React.FC<AddProjectPageProps> = ({ onAddProject }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    status: 'ongoing' as 'ongoing' | 'completed',
    category: 'Residential',
    client: '',
    surfaceArea: '',
    value: '',
    architect: '',
    timeline: '',
    description: '',
    image: '',
    gallery: [] as string[],
    requirements: '', // We will split this by comma
    projectManager: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.image) newErrors.image = "Main image is required";
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processFiles = (files: FileList | File[], isGallery = false) => {
    if (!files || files.length === 0) return;

    if (!isGallery) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        setValidationErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      const currentGalleryLength = formData.gallery.length;
      const remainingSlots = 5 - currentGalleryLength;
      if (remainingSlots <= 0) return;

      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      const newImages: string[] = [];
      let processedCount = 0;
      
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          processedCount++;
          if (processedCount === filesToProcess.length) {
            setFormData(prev => ({
              ...prev,
              gallery: [...prev.gallery, ...newImages]
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (files) processFiles(files, isGallery);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    processFiles(acceptedFiles, true);
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      setError("Please correct the errors in the form.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r)
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.slice(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit project');
      }

      const newProject = data;

      if (onAddProject) {
        onAddProject(newProject);
      }

      setSuccess(true);
      setValidationErrors({});
      setFormData({
        title: '', location: '', status: 'ongoing', category: 'Residential',
        client: '', surfaceArea: '', value: '', architect: '', timeline: '',
        description: '', image: '', gallery: [], requirements: '', projectManager: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-[#06080f] min-h-screen font-sans transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Add New Project</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Register a new development project to the portfolio.</p>
        </div>

        <div className="bg-white dark:bg-[#111421] p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-md flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-bold">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-8 bg-green-500/10 border border-green-500/20 rounded-[2rem] flex flex-col items-center text-center gap-4 shadow-2xl shadow-green-500/5"
            >
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black shadow-lg shadow-green-500/20">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Project Registered</h3>
                <p className="text-green-500/70 text-xs font-bold uppercase tracking-widest mt-1">Node successfully synchronized with the portfolio</p>
              </div>
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Add Another
                </button>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Project Title *" 
                field="title" 
                placeholder="e.g. Kololo Heights Penthouse" 
                formData={formData} 
                setFormData={(data: any) => {
                  setFormData(data);
                  if (validationErrors.title) setValidationErrors({...validationErrors, title: ''});
                }} 
                error={validationErrors.title}
              />
              <Input 
                label="Location *" 
                field="location" 
                placeholder="e.g. Kololo, Kampala" 
                formData={formData} 
                setFormData={(data: any) => {
                  setFormData(data);
                  if (validationErrors.location) setValidationErrors({...validationErrors, location: ''});
                }} 
                error={validationErrors.location}
              />
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Status *</label>
                  {validationErrors.status && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{validationErrors.status}</span>}
                </div>
                <select 
                  value={formData.status} 
                  onChange={e => {
                    setFormData({...formData, status: e.target.value as any});
                    if (validationErrors.status) setValidationErrors({...validationErrors, status: ''});
                  }} 
                  className={`w-full bg-gray-100 dark:bg-[#111421] border ${validationErrors.status ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-[#8DC63F] transition-all text-sm appearance-none cursor-pointer`}
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Category *</label>
                  {validationErrors.category && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{validationErrors.category}</span>}
                </div>
                <select 
                  value={formData.category} 
                  onChange={e => {
                    setFormData({...formData, category: e.target.value});
                    if (validationErrors.category) setValidationErrors({...validationErrors, category: ''});
                  }} 
                  className={`w-full bg-gray-100 dark:bg-[#111421] border ${validationErrors.category ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-[#8DC63F] transition-all text-sm appearance-none cursor-pointer`}
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Mixed-Use">Mixed-Use</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <Input label="Client" field="client" placeholder="e.g. Private Investor" formData={formData} setFormData={setFormData} />
              <Input label="Surface Area" field="surfaceArea" placeholder="e.g. 15,000 sq ft" formData={formData} setFormData={setFormData} />
              <Input label="Project Value" field="value" placeholder="e.g. $2.5M" formData={formData} setFormData={setFormData} />
              <Input label="Architect" field="architect" placeholder="e.g. Studio SMW" formData={formData} setFormData={setFormData} />
              <Input label="Project Manager" field="projectManager" placeholder="e.g. John Doe" formData={formData} setFormData={setFormData} />
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Project Timeline</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Start Date</span>
                    <input 
                      type="month" 
                      className="w-full bg-gray-100 dark:bg-[#111421] border border-gray-200 dark:border-white/10 rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-[#8DC63F] transition-all text-xs"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formatted = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                        const currentEnd = formData.timeline.split(' - ')[1] || 'Present';
                        setFormData({...formData, timeline: `${formatted} - ${currentEnd}`});
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">End Date</span>
                    <input 
                      type="month" 
                      className="w-full bg-gray-100 dark:bg-[#111421] border border-gray-200 dark:border-white/10 rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-[#8DC63F] transition-all text-xs"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formatted = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                        const currentStart = formData.timeline.split(' - ')[0] || 'TBD';
                        setFormData({...formData, timeline: `${currentStart} - ${formatted}`});
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Visual Span</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8DC63F]">{formData.timeline || 'No timeline set'}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden relative">
                    {/* Gantt-like Grid Nodes */}
                    <div className="absolute inset-0 flex justify-between px-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-black/5 dark:bg-white/5"></div>
                      ))}
                    </div>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: formData.timeline ? '100%' : '0%' }}
                      className="h-full bg-[#8DC63F] shadow-[0_0_10px_rgba(141,198,63,0.3)] relative z-10"
                    />
                  </div>
                  {formData.timeline && (
                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-2 text-right">
                      Estimated Duration: {(() => {
                        const parts = formData.timeline.split(' - ');
                        if (parts.length === 2 && parts[0] !== 'TBD' && parts[1] !== 'Present') {
                          const start = new Date(parts[0]);
                          const end = new Date(parts[1]);
                          const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                          return months > 0 ? `${months} Months` : 'Less than a month';
                        }
                        return 'Ongoing';
                      })()}
                    </p>
                  )}
                </div>
              </div>

              <Input label="Requirements (comma separated)" field="requirements" placeholder="e.g. LEED Certification, Smart Home" formData={formData} setFormData={setFormData} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Description</label>
              <textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full bg-gray-100 dark:bg-[#111421] border border-gray-200 dark:border-white/10 rounded-md p-4 text-gray-800 dark:text-white outline-none focus:border-[#8DC63F] transition-all text-sm min-h-[150px]" 
                placeholder="Detailed project description..."
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Main Image *</label>
                  {validationErrors.image && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{validationErrors.image}</span>}
                </div>
                {formData.image ? (
                  <div className="relative w-full h-64 rounded-xl overflow-hidden group">
                    <img src={formData.image} alt="Main" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, image: ''})}
                      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className={`border-2 border-dashed ${validationErrors.image ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10' : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1a1d2d]'} rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-all`}>
                    <Upload className={`${validationErrors.image ? 'text-red-400' : 'text-gray-400'} mb-4`} size={32} />
                    <span className={`text-sm font-bold ${validationErrors.image ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>Upload Main Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Gallery Images (Max 5)</label>
                <ImageUploader 
                  files={formData.gallery.map(url => ({ preview: url }))}
                  onDrop={handleDrop}
                  onRemoveFile={removeGalleryImage}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-white/10">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8DC63F] text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#7ab033] transition-colors disabled:opacity-50 flex justify-center items-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Register Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
