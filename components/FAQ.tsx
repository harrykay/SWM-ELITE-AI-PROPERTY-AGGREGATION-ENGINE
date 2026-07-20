
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ChevronRight } from 'lucide-react';

const faqs = [
  {
    question: "How do you handle construction for diaspora clients?",
    answer: "We utilize a dedicated project management dashboard where clients can view real-time photographic progress, verified site reports, and milestone approvals. You remain in control without being physically present."
  },
  {
    question: "What is a 'Property Node' in your ecosystem?",
    answer: "A Property Node represents a verified asset within our digital ledger. Each node contains exhaustive documentation, including land titles, structural integrity reports, and verified valuations."
  },
  {
    question: "Can I sell my property through the SMW network?",
    answer: "Yes. Sellers can initialize an asset listing through our platform. Once our team performs the required technical verification, your property is marketed to our global network of buyers and investors."
  },
  {
    question: "Are your construction costs fixed or variable?",
    answer: "We offer both turnkey fixed-price contracts and flexible itemized billing depending on the project scope. Transparency is our priority; every shilling is accounted for in our financial tracking node."
  }
];

interface FAQProps {
  onNavigate?: (page: string) => void;
}

export const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-white dark:bg-[#0a0c16] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">
            <HelpCircle size={14} /> Intelligence Base
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none mb-6">
            Operational <span className="text-[#8DC63F]">Protocols.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Frequently asked questions about our construction and real estate ecosystem.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`rounded-3xl border transition-all duration-300 ${
                activeIndex === i 
                  ? 'bg-gray-50 dark:bg-white/5 border-[#8DC63F]/20' 
                  : 'bg-white dark:bg-[#161925] border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10'
              }`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <span className={`text-lg font-black tracking-tight uppercase ${activeIndex === i ? 'text-[#8DC63F]' : 'text-gray-900 dark:text-white'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === i ? 'bg-[#8DC63F] text-white rotate-180' : 'bg-gray-100 dark:bg-white/10 text-gray-400'}`}>
                  {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0">
                      <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-100 dark:border-white/5 pt-6">
                        {faq.answer}
                      </p>
                      <button 
                        onClick={() => onNavigate?.('about')}
                        className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase text-[#8DC63F] tracking-widest hover:gap-4 transition-all"
                      >
                        Learn more protocol <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
