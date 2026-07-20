
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, UserCheck, ShieldCheck, Award } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Robert Mukasa",
    role: "Medical Specialist, London",
    text: "As a member of the diaspora, finding a reliable construction partner was my biggest hurdle. SMW Developers not only built my dream home in Kampala but managed the entire process with 100% transparency. Their digital tracking is unmatched.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=mukasa",
    verified: true
  },
  {
    name: "Sarah Namayanja",
    role: "Commercial Developer",
    text: "Technical excellence at every stage. We've collaborated on three high-rise projects now, and the engineering integrity SMW brings to the table is consistent. They are more than builders; they are ecosystem architects.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    verified: true
  },
  {
    name: "James Odong",
    role: "Property Investor",
    text: "The ROI analysis and property management node they provide is essential for serious investors. They handled the tenant vetting and maintenance flawlessly. Highly recommended for peace of mind.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=james",
    verified: true
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#06080f] overflow-hidden relative transition-colors duration-500">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8DC63F]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-[#8DC63F]/10 px-4 py-2 rounded-full text-[10px] font-black text-[#8DC63F] uppercase tracking-[0.4em] mb-6 border border-[#8DC63F]/20">
            <Award size={14} /> Client Testimonies
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none mb-6">
            Trusted by the <br /> <span className="text-[#8DC63F]">Global Diaspora.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg">
            Real stories from homeowners and investors who have successfully built generational value with SMW.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#161925] p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5 relative group"
            >
              <Quote className="absolute top-10 right-10 text-gray-100 dark:text-white/5 w-16 h-16 transition-colors group-hover:text-[#8DC63F]/10" />
              
              <div className="flex gap-1 text-yellow-400 mb-8">
                {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>

              <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-10 text-[15px] italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-gray-50 dark:border-white/5">
                <div className="relative">
                   <img src={t.avatar} className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={t.name} referrerPolicy="no-referrer" />
                   {t.verified && (
                     <div className="absolute -bottom-2 -right-2 bg-[#8DC63F] text-white p-1 rounded-lg border-2 border-white dark:border-[#161925]">
                       <ShieldCheck size={12} />
                     </div>
                   )}
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight text-sm">{t.name}</h4>
                  <p className="text-[10px] font-black text-[#8DC63F] uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
           <div className="flex items-center gap-3">
              <UserCheck size={20} className="text-gray-900 dark:text-white" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">12,000+ Happy Nodes</span>
           </div>
           <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-gray-900 dark:text-white" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white">Escrow Secured</span>
           </div>
        </div>
      </div>
    </section>
  );
};
