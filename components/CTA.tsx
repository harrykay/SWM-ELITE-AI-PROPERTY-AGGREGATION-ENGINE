
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onNavigate: (page: string) => void;
}

export const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img src="https://picsum.photos/seed/cta/800/800" className="rounded-2xl shadow-2xl rotate-3" alt="Desktop and Mobile Mockup" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-10 -right-10 w-48 h-80 bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 hidden lg:block">
                <img src="https://picsum.photos/seed/mobile/300/600" className="w-full h-full object-cover rounded-[2rem]" alt="Mobile Mockup" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Get Started On Your <span className="text-[#8DC63F]">SMW Hub</span> Journey
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              The premier platform for construction, architecture, and property management in Uganda. Secure, transparent, and reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-[#8DC63F] text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#8DC63F]/20 hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate('properties')}
                className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                View Properties <ArrowRight size={20} className="text-[#8DC63F]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
