import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { BlogPost } from '../App';
import Markdown from 'react-markdown';

interface SingleBlogPageProps {
  blog: BlogPost;
  onBack: () => void;
}

export const SingleBlogPage: React.FC<SingleBlogPageProps> = ({ blog, onBack }) => {
  if (!blog) return <div className="pt-32 pb-24 text-center text-white">Blog not found</div>;

  return (
    <div className="pt-32 pb-24 bg-[#06080f] min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8DC63F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#8DC63F] transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Journal
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#8DC63F] mb-6">
            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            {blog.excerpt}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-white/5"
        >
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <div className="markdown-body text-gray-300 leading-relaxed font-medium">
            <Markdown>{blog.content}</Markdown>
          </div>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-8 border-t border-white/10">
            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 w-full mb-2">Tags</div>
            {blog.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
