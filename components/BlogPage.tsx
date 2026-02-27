import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { BlogPost } from '../App';

interface BlogPageProps {
  blogs: BlogPost[];
  onBlogClick: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ blogs, onBlogClick }) => {
  return (
    <div className="pt-32 pb-24 bg-[#06080f] min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8DC63F]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#8DC63F]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8DC63F]">Insights & News</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-8">
              The <span className="text-[#8DC63F]">Journal</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              Latest insights, news, and updates from the world of real estate and architecture.
            </p>
          </motion.div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-[#111421] rounded-[2.5rem] border border-white/5">
            <p className="text-gray-500 text-lg font-medium">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => onBlogClick(blog.slug)}
                className="group cursor-pointer bg-[#111421] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#8DC63F]/30 transition-all duration-500 shadow-2xl flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                  </div>

                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#8DC63F] transition-colors leading-none">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex gap-2">
                      {blog.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-1 rounded-md">
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#8DC63F] text-black flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
