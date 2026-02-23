
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Share, Heart, Star, ChevronDown, CheckCircle2, 
  Wifi, Waves, Tv, Wind, Car, Shield, Flame, Coffee, 
  Utensils, Droplets, Calendar, Flag, Award, Sparkles, MessageSquare, Repeat,
  Phone, Mail, MessageCircle, Info, Clock, User,
  Maximize, Bed, Bath, Send, Loader2, CreditCard, ShieldCheck
} from 'lucide-react';
import { Property, Currency, formatPrice, UGX_RATE } from '../App';

interface SinglePropertyPageProps {
  property: Property;
  isComparing?: boolean;
  onToggleCompare?: () => void;
  currency: Currency;
}

export const SinglePropertyPage: React.FC<SinglePropertyPageProps> = ({ property, isComparing = false, onToggleCompare, currency }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Mock user for sandbox mode
    setCurrentUser({ id: '1', name: 'Demo User' });
  }, []);

  const handlePurchase = async () => {
    if (!currentUser) return alert("IDENTITY REQUIRED: Please login to initialize purchase protocol.");
    setPurchaseStatus('processing');
    setTimeout(() => {
      setPurchaseStatus('success');
    }, 1500);
  };

  const handleBooking = async () => {
    if (!currentUser) return alert("IDENTITY REQUIRED: Please login to schedule a tour.");
    setBookingStatus('processing');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  const formatCost = (usd: number) => formatPrice(usd, currency);

  const locationText = property.address ? `${property.address.street}, ${property.address.city}` : property.location;
  const interiorFeatures = property.features?.interior || [];

  return (
    <div className="pt-36 md:pt-52 pb-24 bg-white dark:bg-[#06080f] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">
              <span>Properties</span> <ChevronDown size={12} className="-rotate-90" /> <span>{locationText}</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white uppercase leading-none tracking-tighter">{property.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSaved(!isSaved)} className={`p-4 rounded-[1.5rem] border transition-all shadow-sm ${isSaved ? 'bg-red-50 dark:bg-red-500/10 border-red-100 text-red-500' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400'}`}><Heart size={24} fill={isSaved ? "currentColor" : "none"} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl relative border border-gray-100 dark:border-white/5">
               <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover" alt={property.title} />
               <div className="absolute top-8 left-8 bg-[#8DC63F] text-black px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">{property.status}</div>
            </div>

            {/* ... Content details continue ... */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3"><Info size={24} className="text-[#8DC63F]" /> Infrastructure Intelligence</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium">{property.description || 'Verified architectural node with premium specifications.'}</p>
            </div>
            {/* ... Remaining components ... */}
          </div>

          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-white dark:bg-[#161925] rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-2xl p-10 space-y-10">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Technical Valuation</p>
                <h4 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">{formatPrice(property.price, currency)}</h4>
              </div>
              {/* ... Buttons and pricing nodes ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
