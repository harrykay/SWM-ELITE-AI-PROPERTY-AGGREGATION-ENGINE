
import React, { useState, useEffect } from 'react';
import { 
  FileText, Image as ImageIcon, Menu as MenuIcon, Palette, 
  Plus, Edit2, Trash2, Save, Globe, Eye, Copy, Archive,
  CheckCircle, Clock, Layout, Type, Maximize, Settings,
  ChevronRight, Search, Filter, MoreVertical, Upload,
  X, Check, AlertCircle, Sparkles, Folder, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { UserManager } from './UserManager';
import { ProjectManager } from './ProjectManager';
import { PageBuilder } from './PageBuilder';
import { ImageUploader } from './ImageUploader';

type CMSTab = 'pages' | 'posts' | 'projects' | 'media' | 'menus' | 'design' | 'users';

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
        <CMSTabButton id="projects" label="Projects" icon={Folder} />
        <CMSTabButton id="media" label="Media Library" icon={ImageIcon} />
        <CMSTabButton id="menus" label="Navigation" icon={MenuIcon} />
        <CMSTabButton id="design" label="Design & Theme" icon={Palette} />
        <CMSTabButton id="users" label="Users" icon={Users} />
      </div>

      {/* CMS Content Area */}
      <div className="min-h-[600px]">
        {activeTab === 'pages' && <PageManager />}
        {activeTab === 'posts' && <PostManager />}
        {activeTab === 'projects' && <ProjectManager />}

        {activeTab === 'media' && <MediaLibrary />}
        {activeTab === 'menus' && <MenuManager />}
        {activeTab === 'design' && <DesignCustomizer />}
        {activeTab === 'users' && <UserManager />}
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
      if (Array.isArray(data)) {
        setPages(data);
      } else {
        setPages([]);
      }
    } catch (err) {
      console.error(err);
      setPages([]);
    }
  };

  const handleSave = async (status: string) => {
    if (!currentPage.title || !currentPage.slug) return;
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

  const handleDelete = async (id: number) => {
    if (!confirm('Archive this page?')) return;
    try {
      const res = await fetch(`/api/cms/pages/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPages();
    } catch (err) {
      console.error(err);
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
          onClick={() => { setCurrentPage({ title: '', slug: '', content: '', status: 'draft', layout: 'default', meta_title: '', meta_description: '' }); setIsEditing(true); }}
          className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus size={16} /> Create New Page
        </button>
      </div>

      {isEditing ? (
        <div className="bg-[#111421] rounded-[2.5rem] p-10 border border-white/5 space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">{currentPage.id ? 'Edit Page' : 'New Page'}</h4>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Visual Builder</span>
              <button 
                onClick={() => setCurrentPage({...currentPage, is_visual: !currentPage.is_visual})}
                className={`w-12 h-6 rounded-full relative transition-colors ${currentPage.is_visual ? 'bg-[#8DC63F]' : 'bg-gray-800'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentPage.is_visual ? 'right-1' : 'left-1'}`}></div>
              </button>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
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
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Layout Template</label>
                <select 
                  value={currentPage.layout} 
                  onChange={e => setCurrentPage({...currentPage, layout: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all appearance-none"
                >
                  <option value="default">Default Layout</option>
                  <option value="full-width">Full Width</option>
                  <option value="sidebar">With Sidebar</option>
                  <option value="landing">Landing Page</option>
                </select>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 space-y-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8DC63F]">SEO Metadata</h5>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Meta Title</label>
                <input 
                  value={currentPage.meta_title || ''} 
                  onChange={e => setCurrentPage({...currentPage, meta_title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#8DC63F]/50 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Meta Description</label>
                <textarea 
                  value={currentPage.meta_description || ''} 
                  onChange={e => setCurrentPage({...currentPage, meta_description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#8DC63F]/50 transition-all resize-none h-24" 
                />
              </div>
              <div className="space-y-2 pt-4 border-t border-white/10">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Schedule Publish Date</label>
                <input 
                  type="datetime-local"
                  value={currentPage.scheduled_at ? new Date(currentPage.scheduled_at).toISOString().slice(0, 16) : ''}
                  onChange={e => setCurrentPage({ ...currentPage, scheduled_at: e.target.value || null })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#8DC63F]/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Page Content</label>
            {currentPage.is_visual ? (
              <PageBuilder 
                content={currentPage.content}
                onContentChange={(newContent) => setCurrentPage({...currentPage, content: newContent})}
              />
            ) : (
              <textarea 
                rows={15}
                value={currentPage.content} 
                onChange={e => setCurrentPage({...currentPage, content: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all resize-none font-mono text-sm" 
                placeholder="Enter page content here..."
              />
            )}
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status:</span>
              <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${currentPage.status === 'published' ? 'bg-[#8DC63F]/10 text-[#8DC63F]' : 'bg-white/5 text-gray-500'}`}>
                {currentPage.status}
              </span>
            </div>
            <div className="flex gap-4">
              <button 
                disabled={loading}
                onClick={() => handleSave('draft')}
                className="px-8 py-4 rounded-xl text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Save Draft'}
              </button>
              {currentPage.scheduled_at ? (
                <button 
                  disabled={loading}
                  onClick={() => handleSave('scheduled')}
                  className="bg-blue-500 text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
                >
                  <Clock size={14} />
                  {loading ? 'Scheduling...' : 'Schedule'}
                </button>
              ) : (
                <button 
                  disabled={loading}
                  onClick={() => handleSave('published')}
                  className="bg-[#8DC63F] text-black px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#8DC63F]/20 disabled:opacity-50"
                >
                  {loading ? 'Synchronizing...' : 'Publish Page'}
                </button>
              )}
            </div>
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
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">/{page.slug}</p>
                    <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{page.layout}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                  page.status === 'published' ? 'bg-[#8DC63F]/10 text-[#8DC63F]' : 
                  page.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' : 
                  'bg-white/5 text-gray-500'
                }`}>
                  {page.status}
                </span>
                {page.status === 'scheduled' && page.scheduled_at && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <Clock size={12} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(page.scheduled_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <button onClick={() => { setCurrentPage(page); setIsEditing(true); }} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(page.id)} className="p-3 bg-white/5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
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
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [type]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/cms/posts?type=${type}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error(err);
      setPosts([]);
    }
  };

  const handleSave = async (status: string) => {
    if (!currentPost.title || !currentPost.slug) return;
    setLoading(true);
    try {
      const method = currentPost.id ? 'PUT' : 'POST';
      const url = currentPost.id ? `/api/cms/posts/${currentPost.id}` : '/api/cms/posts';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentPost, status, type })
      });
      if (res.ok) {
        setIsEditing(false);
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Archive this ${type}?`)) return;
    try {
      const res = await fetch(`/api/cms/posts/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

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
            <option value="team">Team Members</option>
            <option value="faq">FAQs</option>
          </select>
          <div className="h-8 w-px bg-white/10"></div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Managing {type} content nodes</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => { setCurrentPost({ title: '', slug: '', content: '', excerpt: '', status: 'draft', featured_image: '', tags: [], is_featured: false }); setIsEditing(true); }}
            className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Plus size={16} /> Add {type}
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-[#111421] rounded-[2.5rem] p-10 border border-white/5 space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-black text-white uppercase tracking-tighter">{currentPost.id ? `Edit ${type}` : `New ${type}`}</h4>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Title</label>
                <input 
                  value={currentPost.title} 
                  onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Slug</label>
                <input 
                  value={currentPost.slug} 
                  onChange={e => setCurrentPost({...currentPost, slug: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Excerpt / Short Description</label>
                <textarea 
                  value={currentPost.excerpt} 
                  onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all h-24 resize-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Content</label>
                <textarea 
                  rows={12}
                  value={currentPost.content} 
                  onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all resize-none font-mono text-sm" 
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8DC63F]">Publishing</h5>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-gray-500">Featured</span>
                    <button 
                      onClick={() => setCurrentPost({...currentPost, is_featured: !currentPost.is_featured})}
                      className={`w-12 h-6 rounded-full relative transition-colors ${currentPost.is_featured ? 'bg-[#8DC63F]' : 'bg-gray-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentPost.is_featured ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500">Featured Image URL</label>
                    <input 
                      value={currentPost.featured_image || ''} 
                      onChange={e => setCurrentPost({...currentPost, featured_image: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#8DC63F]/50 transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8DC63F]">SEO</h5>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500">Meta Title</label>
                  <input 
                    value={currentPost.meta_title || ''} 
                    onChange={e => setCurrentPost({...currentPost, meta_title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#8DC63F]/50 transition-all" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
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
              {loading ? 'Synchronizing...' : 'Publish Content'}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(post => (
            <div key={post.id} className="bg-[#111421] p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-[#8DC63F]/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden shrink-0">
                  <img src={post.featured_image || `https://picsum.photos/seed/${post.id}/200/200`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight line-clamp-1">{post.title}</h4>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mt-1">/{post.slug}</p>
                  {post.is_featured && <span className="text-[#8DC63F] text-[8px] font-black uppercase tracking-widest mt-1 block">Featured</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCurrentPost(post); setIsEditing(true); }} className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(post.id)} className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
              <Edit2 size={48} className="text-gray-800 mx-auto mb-4" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No {type} items found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MediaLibrary = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/cms/media');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMedia(data);
      } else {
        setMedia([]);
      }
    } catch (err) {
      console.error(err);
      setMedia([]);
    }
  };

  const handleUpload = async () => {
    const url = prompt('Enter image URL (simulated upload):');
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cms/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: url.split('/').pop() || 'image.jpg',
          url,
          mime_type: 'image/jpeg',
          size: 1024 * 1024,
          alt_text: 'Uploaded asset'
        })
      });
      if (res.ok) fetchMedia();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this asset?')) return;
    try {
      const res = await fetch(`/api/cms/media/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Media Infrastructure</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Global asset management</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleUpload} disabled={loading} className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50">
            <Upload size={16} /> {loading ? 'Uploading...' : 'Upload Asset'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {media.map(asset => (
          <div key={asset.id} className="aspect-square bg-[#111421] rounded-3xl border border-white/5 overflow-hidden group relative cursor-pointer">
            <img src={asset.url} alt={asset.alt_text} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-[#8DC63F] hover:text-black transition-all"><Eye size={16} /></button>
              <button onClick={() => handleDelete(asset.id)} className="p-2 bg-white/10 rounded-lg hover:bg-red-500 transition-all"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {media.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <ImageIcon size={48} className="text-gray-800 mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No media assets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MenuManager = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/cms/menus');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMenus(data);
        if (data.length > 0 && !selectedMenu) setSelectedMenu(data[0]);
      } else {
        setMenus([]);
      }
    } catch (err) {
      console.error(err);
      setMenus([]);
    }
  };

  const handleSaveMenu = async () => {
    if (!selectedMenu) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/menus/${selectedMenu.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedMenu)
      });
      if (res.ok) {
        alert('Menu architecture synchronized');
        fetchMenus();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = () => {
    const title = prompt('Item Title:');
    const url = prompt('Item URL:');
    if (!title || !url) return;
    setSelectedMenu({
      ...selectedMenu,
      items: [...selectedMenu.items, { title, url, order_index: selectedMenu.items.length }]
    });
  };

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
          {menus.map(menu => (
            <button 
              key={menu.id}
              onClick={() => setSelectedMenu(menu)}
              className={`w-full p-6 rounded-3xl border transition-all text-left ${
                selectedMenu?.id === menu.id ? 'bg-[#8DC63F]/10 border-[#8DC63F]/30' : 'bg-[#111421] border-white/5 hover:border-white/10'
              }`}
            >
              <h4 className="text-sm font-black text-white uppercase tracking-widest">{menu.name}</h4>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Location: {menu.location}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-[#111421] p-10 rounded-[2.5rem] border border-white/5">
          {selectedMenu ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-black text-white uppercase tracking-tighter">Architecture: {selectedMenu.name}</h4>
                <div className="flex gap-4">
                  <button onClick={addMenuItem} className="p-3 bg-white/5 rounded-xl text-[#8DC63F] hover:bg-[#8DC63F] hover:text-black transition-all"><Plus size={16} /></button>
                  <button onClick={handleSaveMenu} disabled={loading} className="bg-[#8DC63F] text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 disabled:opacity-50">
                    <Save size={16} /> {loading ? 'Saving...' : 'Save Architecture'}
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {selectedMenu.items.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-500"><Maximize size={14} /></div>
                      <div>
                        <p className="text-xs font-black text-white uppercase tracking-widest">{item.title}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{item.url}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedMenu({...selectedMenu, items: selectedMenu.items.filter((_: any, i: number) => i !== idx)})}
                      className="p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {selectedMenu.items.length === 0 && (
                  <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-2xl">
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">No items in this menu</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <Settings size={48} className="text-gray-800 mb-4" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Select a menu to configure its architecture</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DesignCustomizer = () => {
  const [settings, setSettings] = useState<any>({
    primaryColor: '#8DC63F',
    secondaryColor: '#111421',
    fontFamily: 'Inter',
    borderRadius: '1.5rem',
    showHero: true,
    showFeaturedProperties: true,
    showLatestProjects: true,
    showTestimonials: true,
    showBlog: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms/settings');
      const data = await res.json();
      if (data) setSettings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cms/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert('Visual identity protocols updated across all nodes');
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
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Design Customizer</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Visual identity & layout control</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="bg-[#8DC63F] text-black px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
        >
          <Save size={16} /> {loading ? 'Synchronizing...' : 'Deploy Theme Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div className="bg-[#111421] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8DC63F]"></div> Global Styles
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Primary Color</label>
                <div className="flex gap-3">
                  <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer" />
                  <input type="text" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-xs font-mono" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Secondary Color</label>
                <div className="flex gap-3">
                  <input type="color" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer" />
                  <input type="text" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-xs font-mono" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Typography System</label>
              <select 
                value={settings.fontFamily}
                onChange={e => setSettings({...settings, fontFamily: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-[#8DC63F]/50 transition-all appearance-none"
              >
                <option value="Inter">Inter (Modern Sans)</option>
                <option value="Space Grotesk">Space Grotesk (Tech)</option>
                <option value="Playfair Display">Playfair Display (Elegant)</option>
                <option value="JetBrains Mono">JetBrains Mono (Brutalist)</option>
              </select>
            </div>
          </div>

          <div className="bg-[#111421] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8DC63F]"></div> Homepage Architecture
            </h4>
            <div className="space-y-4">
              {[
                { id: 'showHero', label: 'Hero Section' },
                { id: 'showFeaturedProperties', label: 'Featured Properties' },
                { id: 'showLatestProjects', label: 'Latest Projects' },
                { id: 'showTestimonials', label: 'Testimonials' },
                { id: 'showBlog', label: 'Blog Feed' }
              ].map(section => (
                <div key={section.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-black text-white uppercase tracking-widest">{section.label}</span>
                  <button 
                    onClick={() => setSettings({...settings, [section.id]: !settings[section.id]})}
                    className={`w-12 h-6 rounded-full relative transition-colors ${settings[section.id] ? 'bg-[#8DC63F]' : 'bg-gray-800'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings[section.id] ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Live Interface Preview</label>
          <div className="aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50 border-8 border-[#111421] relative">
            <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
              {/* Mock Site Preview */}
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                  </div>
                </div>
                
                {settings.showHero && (
                  <div className="space-y-4 py-12">
                    <div className="h-12 w-3/4 bg-gray-900 rounded-2xl" style={{ backgroundColor: settings.secondaryColor }}></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                    <div className="h-12 w-40 rounded-2xl" style={{ backgroundColor: settings.primaryColor }}></div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-3xl"></div>
                  <div className="aspect-square bg-gray-100 rounded-3xl"></div>
                </div>

                <div className="space-y-4">
                  <div className="h-6 w-1/3 bg-gray-900 rounded-full" style={{ backgroundColor: settings.secondaryColor }}></div>
                  <div className="h-32 w-full bg-gray-50 rounded-3xl border border-gray-100"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/90 backdrop-blur-xl rounded-full border border-white/10 text-[8px] font-black text-white uppercase tracking-[0.2em]">
              Preview Mode Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
