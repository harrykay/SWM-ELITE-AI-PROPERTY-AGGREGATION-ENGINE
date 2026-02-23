
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Gem, Users, Lightbulb, UserCheck, CheckCircle } from 'lucide-react';
import { AboutContent } from '../App';

interface AboutPageProps {
  content: AboutContent;
}

const ValueIconMap: Record<string, React.ReactNode> = {
  'Quality': <Gem size={24} />,
  'Integrity': <ShieldCheck size={24} />,
  'Customer Satisfaction': <UserCheck size={24} />,
  'Innovation': <Lightbulb size={24} />,
  'Professionalism': <Users size={24} />,
};

export const AboutPage: React.FC<AboutPageProps> = ({ content }) => {
  return (
    <div className="pt-36 md:pt-52 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
            About <span className="text-[#8DC63F]">SMW Construction </span>
          </h1>
          <div className="w-24 h-1.5 bg-[#8DC63F] mx-auto mb-8"></div>
          <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            Building lasting value across Uganda and the diaspora since our foundations in 1950.
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-24 md:space-y-32">
          {/* Who We Are & Background */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6 md:space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed md:leading-loose text-base md:text-lg">{content.whoWeAre}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Our Background</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{content.background}</p>
              <div className="pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#8DC63F]/10 text-[#8DC63F] rounded-2xl flex items-center justify-center font-black text-2xl shadow-sm">50</div>
                  <span className="font-bold text-gray-900 uppercase tracking-wider text-xs md:text-sm">Years of Trusted Expertise</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gray-900 text-white p-10 md:p-14 rounded-[3rem] relative overflow-hidden group"
            >
              <Target className="absolute -bottom-4 -right-4 w-40 h-40 text-white/5 group-hover:scale-110 transition-transform duration-500" />
              <h2 className="text-2xl font-black mb-6 flex items-center gap-4 uppercase tracking-tighter">
                <Target className="text-[#8DC63F]" size={28} /> Our Mission
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed relative z-10">{content.mission}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#8DC63F] text-white p-10 md:p-14 rounded-[3rem] relative overflow-hidden group shadow-xl shadow-[#8DC63F]/10"
            >
              <Eye className="absolute -bottom-4 -right-4 w-40 h-40 text-white/10 group-hover:scale-110 transition-transform duration-500" />
              <h2 className="text-2xl font-black mb-6 flex items-center gap-4 uppercase tracking-tighter">
                <Eye className="text-white" size={28} /> Our Vision
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed relative z-10">{content.vision}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
