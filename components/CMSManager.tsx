
import React, { useState, useEffect } from 'react';
import { 
  FileText, Image as ImageIcon, Menu as MenuIcon, Palette, 
  Plus, Edit2, Trash2, Save, Globe, Eye, Copy, Archive,
  CheckCircle, Clock, Layout, Type, Maximize, Settings,
  ChevronRight, Search, Filter, MoreVertical, Upload,
  X, Check, AlertCircle, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CMSTab = 'pages' | 'posts' | 'media' | 'menus' | 'design';

export const CMSManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CMSTab>('pages');
  const [loading, setLoading] = useState(false);

  const CMSTabButton = ({ id, label, icon: Icon }: { id: CMSTab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
        activeTab === id ? 'bg-[#8DC63F] text-black shadow-xl shadow-[#8DC63F]/20' : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={16} /> {label}
    </button>
  );

  return (
    <div className="space-y-12">
      {/* CMS Navigation */}
      <div className="flex items-center gap-3 bg-[#111421] p-2 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
        <CMSTabButton id="pages" label="Pages" icon={FileText} />
        <CMSTabButton id="posts" label="Posts & Blog" icon={Edit2} />
        <CMSTabButton id="media" label="Media Library" icon={ImageIcon} />
        <CMSTabButton id="menus" label="Navigation" icon={MenuIcon} />
        <CMSTabButton id="design" label="Design & Theme" icon={Palette} />
      </div>

      {/* CMS Content Area */}
      <div className="min-h-[600px]">
        {activeTab === 'pages' && <PageManager />}
        {activeTab === 'posts' && <PostManager />}
        {activeTab === 'media' && <MediaLibrary />}
        {activeTab === 'menus' && <MenuManager />}
        {activeTab === 'design' && <DesignCustomizer />}
      </div>
    </div>
  );
};

// --- Sub-Components ---

const PageManager = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages');
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (status: string) => {
    setLoading(true);
    try {
      const method = currentPage.id ? 'PUT' : 'POST';
      const url = currentPage.id ? `/api/cms/pages/${currentPage.id}` : '/api/cms/pages';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentPage, status })
      });
      if (res.ok) {
        setIsEditing(false);
        fetchPages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Page Management</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Create and control site structure</p>
        </div>
        <button 
          onClick={() => { setCurrentPage({ title: '', slug: '', content: '', status: 'draft' }); setIsEditing(true); }}
          className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={16} /> Create New Page
        </button>
      </div>

      {isEditing ? (
        <div className="bg-[#111421] rounded-[2.5rem] p-10 border border-white/5 space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">{currentPage.id ? 'Edit Page' : 'New Page'}</h4>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Page Title</label>
              <input 
                value={currentPage.title} 
                onChange={e => setCurrentPage({...currentPage, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all" 
                placeholder="e.g. Terms of Service"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">URL Slug</label>
              <input 
                value={currentPage.slug} 
                onChange={e => setCurrentPage({...currentPage, slug: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all" 
                placeholder="e.g. terms-of-service"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Page Content (Markdown/HTML)</label>
            <textarea 
              rows={12}
              value={currentPage.content} 
              onChange={e => setCurrentPage({...currentPage, content: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all resize-none" 
              placeholder="Enter page content here..."
            />
          </div>
          <div className="flex justify-end gap-4">
            <button 
              disabled={loading}
              onClick={() => handleSave('draft')}
              className="px-8 py-4 rounded-xl text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Save Draft'}
            </button>
            <button 
              disabled={loading}
              onClick={() => handleSave('published')}
              className="bg-[#8DC63F] text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 disabled:opacity-50"
            >
              {loading ? 'Synchronizing...' : 'Publish Page'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pages.map(page => (
            <div key={page.id} className="bg-[#111421] p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-[#8DC63F]/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-[#8DC63F] transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">{page.title}</h4>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">/{page.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${page.status === 'published' ? 'bg-[#8DC63F]/10 text-[#8DC63F]' : 'bg-white/5 text-gray-500'}`}>
                  {page.status}
                </span>
                <button onClick={() => { setCurrentPage(page); setIsEditing(true); }} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={16} /></button>
                <button className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {pages.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <FileText size={48} className="text-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No custom pages found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PostManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [type, setType] = useState('blog');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6">
          <select 
            value={type} 
            onChange={e => setType(e.target.value)}
            className="bg-[#111421] border border-white/10 rounded-xl px-4 py-2 text-white font-black uppercase text-[10px] tracking-widest outline-none focus:border-[#8DC63F]"
          >
            <option value="blog">Blog Posts</option>
            <option value="service">Services</option>
            <option value="testimonial">Testimonials</option>
            <option value="project">Projects</option>
          </select>
          <div className="h-8 w-px bg-white/10"></div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Managing {type} content nodes</p>
        </div>
        <button className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
          <Plus size={16} /> Add {type}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
          <Edit2 size={48} className="text-gray-800 mx-auto mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No {type} items found</p>
        </div>
      </div>
    </div>
  );
};

const MediaLibrary = () => {
  const [media, setMedia] = useState<any[]>([]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Media Infrastructure</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Global asset management</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
            <Upload size={16} /> Upload Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-square bg-[#111421] rounded-3xl border border-white/5 overflow-hidden group relative cursor-pointer">
            <img src={`https://picsum.photos/seed/${i}/400/400`} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-[#8DC63F] hover:text-black transition-all"><Eye size={16} /></button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-red-500 transition-all"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MenuManager = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Navigation Protocols</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Configure global routing nodes</p>
        </div>
        <button className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform">
          <Plus size={16} /> Create New Menu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#111421] p-6 rounded-3xl border border-[#8DC63F]/30">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Primary Header</h4>
            <div className="space-y-2">
              <div className="p-3 bg-white/5 rounded-xl text-[10px] font-bold text-white flex items-center justify-between">
                Home <Maximize size={12} className="text-gray-500" />
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-[10px] font-bold text-white flex items-center justify-between">
                Properties <Maximize size={12} className="text-gray-500" />
              </div>
              <div className="p-3 bg-white/5 rounded-xl text-[10px] font-bold text-white flex items-center justify-between pl-8 border-l-2 border-[#8DC63F]/20">
                For Sale <Maximize size={12} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-[#111421] p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center">
          <Settings size={48} className="text-gray-800 mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Select a menu to configure its architecture</p>
        </div>
      </div>
    </div>
  );
};

const DesignCustomizer = () => {
  const [theme, setTheme] = useState({
    primary: '#8DC63F',
    secondary: '#06080f',
    font: 'Plus Jakarta Sans',
    radius: '24px'
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setIsDeploying(false);
    setDeployed(true);
    setTimeout(() => setDeployed(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Visual Identity</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time theme customization</p>
        </div>
        <div className="flex items-center gap-4">
          {deployed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#8DC63F] text-[10px] font-black uppercase tracking-widest">
              Theme Deployed
            </motion.div>
          )}
          <button 
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-[#8DC63F] text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isDeploying ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save size={16} />
            )}
            {isDeploying ? 'Deploying...' : 'Deploy Theme Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F]">Color Palette</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500">Primary Accent</label>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: theme.primary }}></div>
                  <input value={theme.primary} onChange={e => setTheme({...theme, primary: e.target.value})} className="bg-transparent text-white font-mono text-[10px] outline-none w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500">Background Core</label>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: theme.secondary }}></div>
                  <input value={theme.secondary} onChange={e => setTheme({...theme, secondary: e.target.value})} className="bg-transparent text-white font-mono text-[10px] outline-none w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F]">Typography Node</h4>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]">
              <option>Plus Jakarta Sans</option>
              <option>Inter</option>
              <option>Space Grotesk</option>
              <option>Outfit</option>
            </select>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F]">Layout Toggles</h4>
            <div className="space-y-3">
              {['Hero Section', 'Ecosystem Grid', 'Featured Properties', 'Testimonials', 'FAQ'].map(section => (
                <div key={section} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">{section}</span>
                  <div className="w-12 h-6 bg-[#8DC63F] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8DC63F]">Live Preview Protocol</h4>
          <div className="bg-white rounded-[3rem] p-12 min-h-[500px] shadow-2xl relative overflow-hidden">
            <div className="max-w-md space-y-6">
              <div className="w-12 h-12 rounded-2xl mb-8" style={{ backgroundColor: theme.primary }}></div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">ARCHITECTING <span style={{ color: theme.primary }}>TRUST</span> SINCE 1950.</h1>
              <p className="text-gray-500 font-medium">Premium real estate ecosystem serving Uganda and the diaspora with high-integrity construction intelligence.</p>
              <button className="px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl" style={{ backgroundColor: theme.primary, color: 'black' }}>Explore Assets</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
