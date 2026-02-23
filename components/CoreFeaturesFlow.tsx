
import React from 'react';
import { Home, Layers, MapPin, Calculator, Map, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { 
    title: 'Property Overview', 
    icon: <Home size={32} />, 
    details: ['Price & property status', 'Title and location', 'High-quality visual preview'],
    color: '#FF5A3D',
    bgColor: 'bg-orange-50'
  },
  { 
    title: 'Key Details', 
    icon: <Layers size={32} />, 
    details: ['Beds & baths count', 'Property size (sqft)', 'Icon-based quick info'],
    color: '#0073e1',
    bgColor: 'bg-blue-50',
    reverse: true
  },
  { 
    title: 'Buyer Actions', 
    icon: <CheckCircle2 size={32} />, 
    details: ['Schedule site tour', 'Direct contact agent', 'Virtual walkthroughs'],
    color: '#8DC63F',
    bgColor: 'bg-green-50'
  },
  { 
    title: 'Calculate Mortgage', 
    icon: <Calculator size={32} />, 
    details: ['Monthly Payments', 'Affordability Check', 'Real Time Updates'],
    color: '#f59e0b',
    bgColor: 'bg-yellow-50',
    reverse: true
  },
  { 
    title: 'Interactive Map', 
    icon: <Map size={32} />, 
    details: ['Location precision', 'Nearby landmarks', 'Visual area context'],
    color: '#9c27b0',
    bgColor: 'bg-purple-50'
  },
];

export const CoreFeaturesFlow: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Core Property <span className="text-[#FF5A3D]">Features</span>
          </h2>
          <div className="w-16 h-1.5 bg-[#FF5A3D] mx-auto rounded-full mt-6"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Custom SVG Wavy Path Connector */}
          <svg className="absolute top-10 left-0 w-full h-[120%] pointer-events-none opacity-20 hidden md:block" viewBox="0 0 800 1200" fill="none" stroke="#FF5A3D" strokeWidth="2.5" strokeDasharray="12 12">
            <path d="M 100 0 Q 150 150 700 300 T 100 600 T 700 900 T 100 1200" />
          </svg>

          <div className="space-y-32">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${feature.reverse ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className={`w-48 h-48 ${feature.bgColor} rounded-full flex items-center justify-center p-8 transition-transform hover:scale-105 duration-500`}>
                    <div className="bg-white w-full h-full rounded-full shadow-2xl flex items-center justify-center" style={{ color: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className={`w-full md:w-1/2 ${feature.reverse ? 'md:text-right' : ''}`}>
                  <h4 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-6">{feature.title}</h4>
                  <ul className={`space-y-4 ${feature.reverse ? 'flex flex-col items-end' : ''}`}>
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                        {!feature.reverse && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A3D]"></span>}
                        {detail}
                        {feature.reverse && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A3D]"></span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
