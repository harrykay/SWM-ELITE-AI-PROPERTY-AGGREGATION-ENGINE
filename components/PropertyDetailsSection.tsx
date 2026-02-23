
import React from 'react';
import { Home, MapPin, Bed, Bath, Maximize, Heart, Share2, Calculator, Map, List, Search, Layers, TrendingUp } from 'lucide-react';

export const PropertyDetailsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Property <span className="text-[#FF5A3D]">Details</span>
          </h2>
          <p className="text-gray-600">With a detailed, responsive, and buyer-focused property presentation.</p>
        </div>

        {/* Large Property Card Mockup */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-32 border border-gray-100 max-w-5xl mx-auto">
           {/* Fake Browser UI */}
           <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Home</span>
                <span>Listing</span>
                <span>Investment</span>
                <span className="text-[#FF5A3D]">What we do</span>
              </div>
              <button className="bg-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg">Become a Seller</button>
           </div>

           <div className="p-8">
             <div className="grid md:grid-cols-2 gap-4 h-[400px]">
                <div className="rounded-2xl bg-gray-200 overflow-hidden relative">
                   <img src="https://picsum.photos/seed/house1/800/600" className="w-full h-full object-cover" alt="Main house" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div> For Sale
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <img src="https://picsum.photos/seed/house2/400/300" className="rounded-2xl h-full w-full object-cover" alt="Detail 1" />
                   <div className="relative rounded-2xl overflow-hidden h-full">
                      <img src="https://picsum.photos/seed/house3/400/300" className="h-full w-full object-cover" alt="Detail 2" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                          <Share2 size={24} />
                        </div>
                      </div>
                   </div>
                   <img src="https://picsum.photos/seed/house4/400/300" className="rounded-2xl h-full w-full object-cover" alt="Detail 3" />
                   <img src="https://picsum.photos/seed/house5/400/300" className="rounded-2xl h-full w-full object-cover" alt="Detail 4" />
                </div>
             </div>

             <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-8">
               <div className="flex-1">
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Luxury Looking Villa, London, UK</h3>
                 <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                   <MapPin size={16} /> 551 Joanne Lane, Wilmington, MA 01887
                 </div>
                 <div className="flex items-baseline gap-2">
                   <span className="text-2xl font-black text-[#FF5A3D]">$ 250,000</span>
                   <span className="text-sm text-gray-400">Down Payment</span>
                   <span className="text-sm font-bold text-gray-700">$20,254</span>
                 </div>
               </div>
               
               <div className="bg-orange-50 p-6 rounded-2xl w-full md:w-80 border border-orange-100">
                  <h4 className="font-bold text-gray-900 mb-4">Start Your Purchase</h4>
                  <p className="text-xs text-gray-500 mb-4">Submit your full-price offer to begin the secure purchase process.</p>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-xl border border-orange-100 flex justify-between text-xs font-semibold">
                      <span>Down Payment:</span>
                      <span className="text-[#FF5A3D]">$15,000</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-orange-100 flex justify-between text-xs font-semibold">
                      <span>Offer Price:</span>
                      <span className="text-[#FF5A3D]">$250,000</span>
                    </div>
                  </div>
               </div>
             </div>
           </div>
        </div>

        {/* Core Property Features with Wavy Line */}
        <div className="text-center mb-24">
           <h2 className="text-3xl font-bold">Core Property <span className="text-[#FF5A3D]">Features</span></h2>
        </div>

        <div className="relative max-w-4xl mx-auto space-y-24">
          {/* Feature Connectors (Dashed SVG Paths) */}
          <svg className="absolute top-10 left-0 w-full h-[120%] pointer-events-none opacity-20" viewBox="0 0 800 1200" fill="none" stroke="#FF5A3D" strokeWidth="2" strokeDasharray="8 8">
            <path d="M 100 0 Q 150 150 700 300 T 100 600 T 700 900" />
          </svg>

          {/* Feature Row 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-48 h-48 bg-orange-100 rounded-full flex items-center justify-center p-8">
                <div className="bg-white w-full h-full rounded-full shadow-lg flex items-center justify-center text-[#FF5A3D]">
                  <Home size={64} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="text-xl font-bold mb-4">Property <span className="text-[#FF5A3D]">Overview</span></h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span>*</span> Price & property status</li>
                <li className="flex items-center gap-2"><span>*</span> Title and location</li>
                <li className="flex items-center gap-2"><span>*</span> High-quality visual preview</li>
              </ul>
            </div>
          </div>

          {/* Feature Row 2 (Reversed) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center p-8">
                <div className="bg-white w-full h-full rounded-full shadow-lg flex items-center justify-center text-blue-500">
                  <Layers size={64} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:text-right">
              <h4 className="text-xl font-bold mb-4">Key <span className="text-[#FF5A3D]">Details</span></h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center md:justify-end gap-2"><span>*</span> Number of beds & baths</li>
                <li className="flex items-center md:justify-end gap-2"><span>*</span> Property size (sqft)</li>
                <li className="flex items-center md:justify-end gap-2"><span>*</span> Icon-based quick info</li>
              </ul>
            </div>
          </div>

          {/* Feature Row 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-48 h-48 bg-yellow-50 rounded-full flex items-center justify-center p-8">
                <div className="bg-white w-full h-full rounded-full shadow-lg flex items-center justify-center text-yellow-500">
                  <MapPin size={64} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="text-xl font-bold mb-4">Buyer <span className="text-[#FF5A3D]">Actions</span></h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span>*</span> Schedule tour</li>
                <li className="flex items-center gap-2"><span>*</span> Contact agent</li>
                <li className="flex items-center gap-2"><span>*</span> Visit Physically</li>
              </ul>
            </div>
          </div>

          {/* Feature Row 4 (Reversed) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-48 h-48 bg-orange-50 rounded-full flex items-center justify-center p-8">
                <div className="bg-white w-full h-full rounded-full shadow-lg flex items-center justify-center text-orange-600">
                  <Calculator size={64} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:text-right">
              <h4 className="text-xl font-bold mb-4">Calculate <span className="text-[#FF5A3D]">Mortgage</span></h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center md:justify-end gap-2"><span>*</span> Monthly Payment</li>
                <li className="flex items-center md:justify-end gap-2"><span>*</span> Affordability Check</li>
                <li className="flex items-center md:justify-end gap-2"><span>*</span> Real Time Update</li>
              </ul>
            </div>
          </div>
          
           {/* Feature Row 5 */}
           <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-48 h-48 bg-green-50 rounded-full flex items-center justify-center p-8">
                <div className="bg-white w-full h-full rounded-full shadow-lg flex items-center justify-center text-green-500">
                  <Map size={64} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="text-xl font-bold mb-4">Interactive <span className="text-[#FF5A3D]">Map View</span></h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><span>*</span> Property location map</li>
                <li className="flex items-center gap-2"><span>*</span> Nearby places</li>
                <li className="flex items-center gap-2"><span>*</span> Visual Landmarks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
