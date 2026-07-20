
import React from 'react';
import { motion } from 'framer-motion';

const techGroups = [
  {
    title: 'Frontend',
    color: 'bg-blue-600',
    items: [
      { name: 'Next Js', url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
      { name: 'React', url: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
      { name: 'Tailwind Css', url: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg' },
      { name: 'Redux Toolkit', url: 'https://cdn.worldvectorlogo.com/logos/redux.svg' },
    ]
  },
  {
    title: 'Backend',
    color: 'bg-gray-800',
    items: [
      { name: 'Node Js', url: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
      { name: 'Express', url: 'https://cdn.worldvectorlogo.com/logos/express-109.svg' },
      { name: 'mongoDB', url: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
      { name: 'Mongoose', url: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongoose/mongoose.png' },
    ]
  },
  {
    title: 'Payments & Real Time',
    color: 'bg-[#8DC63F]',
    items: [
      { name: 'Stripe', url: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
      { name: 'WebSocket', url: 'https://cdn.worldvectorlogo.com/logos/socket-io-1.svg' },
    ]
  }
];

export const TechStack: React.FC = () => {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Technologies</h2>
          <div className="w-16 h-1.5 bg-[#8DC63F] mx-auto rounded-full mt-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto mt-8 font-medium">
            Our technological frontier spans high-performance frameworks and reliable data models for maximum innovation.
          </p>
        </div>

        <div className="space-y-16">
          {techGroups.map((group, groupIdx) => (
            <div key={group.title} className="relative border border-gray-100 bg-white rounded-[3rem] p-12 pt-20 shadow-xl shadow-gray-200/50 overflow-hidden">
               <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${group.color} text-white px-12 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg`}>
                 {group.title}
               </div>
               <div className="flex flex-wrap justify-center gap-8 md:gap-20">
                 {group.items.map((tech, i) => (
                   <motion.div 
                    key={tech.name} 
                    whileHover={{ y: -10 }}
                    className="flex flex-col items-center group"
                   >
                     <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full shadow-inner border border-gray-100 flex items-center justify-center p-6 group-hover:bg-white group-hover:shadow-2xl transition-all duration-300">
                       <img src={tech.url} alt={tech.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                     </div>
                     <span className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                       {tech.name}
                     </span>
                   </motion.div>
                 ))}
               </div>
            </div>
          ))}

          <div className="text-center pt-16">
            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-10">
              Real Time <span className="text-[#8DC63F]">Notification System</span> Using
            </h3>
            <div className="bg-white px-12 py-6 rounded-3xl shadow-2xl border border-gray-100 inline-flex items-center gap-6 group hover:scale-105 transition-transform">
              <img src="https://cdn.worldvectorlogo.com/logos/socket-io-1.svg" alt="WebSocket" className="w-10 h-10 group-hover:rotate-12 transition-transform" referrerPolicy="no-referrer" />
              <div className="text-left border-l border-gray-100 pl-6">
                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Protocol</p>
                 <span className="text-2xl font-black text-gray-900 tracking-tight">WebSocket</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
