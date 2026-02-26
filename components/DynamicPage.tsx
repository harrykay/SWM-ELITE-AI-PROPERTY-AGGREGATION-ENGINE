
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface DynamicPageProps {
  page: {
    title: string;
    content: string;
    meta_description?: string;
  };
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ page }) => {
  return (
    <div className="pt-36 md:pt-52 pb-24 bg-[#06080f] min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              {page.title}
            </h1>
            {page.meta_description && (
              <p className="text-gray-500 font-medium text-lg italic">
                {page.meta_description}
              </p>
            )}
            <div className="w-24 h-1 bg-[#8DC63F] mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-400 prose-strong:text-[#8DC63F] prose-a:text-[#8DC63F] hover:prose-a:text-white transition-colors">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
