
import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img src="https://picsum.photos/seed/cta/800/800" className="rounded-2xl shadow-2xl rotate-3" alt="Desktop and Mobile Mockup" />
              <div className="absolute -bottom-10 -right-10 w-48 h-80 bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 hidden lg:block">
                <img src="https://picsum.photos/seed/mobile/300/600" className="w-full h-full object-cover rounded-[2rem]" alt="Mobile Mockup" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Get Start Your <span className="text-[#FF5A3D]">Estate Hub</span> Journey Easily
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Everything you need to launch and manage a modern real estate platform fast, secure, and responsive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-[#FF5A3D] text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-orange-200 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Buy Now <ArrowRight size={20} />
              </button>
              <button className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                View Live Demo <ArrowRight size={20} className="text-[#FF5A3D]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
