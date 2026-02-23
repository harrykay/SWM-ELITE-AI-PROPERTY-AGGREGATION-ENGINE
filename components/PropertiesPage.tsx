
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, MapPin, Heart, Star, ChevronLeft, ChevronRight, 
  Repeat, Map, Sparkles, Bed, Bath, Maximize, ChevronDown, SortAsc,
  Flame, Clock, BrainCircuit, Loader2, ArrowRight, Zap
} from 'lucide-react';
import { Property, Currency, formatPrice, UGX_RATE } from '../App';
import { GoogleGenAI, Type } from "@google/genai";

interface PropertiesPageProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
  compareList?: string[];
  onToggleCompare?: (id: string) => void;
  currency: Currency;
}

type SortOption = 'Newest First' | 'Price: Low to High' | 'Price: High to Low' | 'Bedrooms: Ascending' | 'Bedrooms: Descending';

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ 
  properties, 
  onPropertyClick, 
  compareList = [], 
  onToggleCompare,
  currency
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Sales');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('Newest First');
  
  // AI Matching States
  const [aiMatches, setAiMatches] = useState<Property[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [hasGeneratedMatches, setHasGeneratedMatches] = useState(false);

  // Filter States
  const [category, setCategory] = useState('All Categories');
  const [city, setCity] = useState('All Cities');
  const [beds, setBeds] = useState('Any');
  const [priceRange, setPriceRange] = useState('Any Price');

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleToggleCompare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onToggleCompare) onToggleCompare(id);
  };

  const fetchAiMatches = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const favoriteDetails = properties
        .filter(p => favorites.has(p.id))
        .map(p => ({ title: p.title, type: p.type, price: p.price, location: p.location }));

      const availablePool = properties.map(p => ({
        id: p.id,
        title: p.title,
        type: p.type,
        price: p.price,
        location: p.location,
        beds: p.beds
      }));

      const prompt = `Act as an expert real estate matching engine for SMW Construction Developers.
      User Profile: They have favorited these properties: ${JSON.stringify(favoriteDetails)}.
      Current Filters: Category=${category}, City=${city}, PriceRange=${priceRange}.
      
      Available Properties Pool: ${JSON.stringify(availablePool)}.
      
      Select the TOP 3 property IDs from the Available Pool that best match the user's architectural taste and budget. 
      Return only a JSON array of the 3 IDs.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });

      const matchedIds: string[] = JSON.parse(response.text || "[]");
      const matchedProps = properties.filter(p => matchedIds.includes(p.id));
      setAiMatches(matchedProps);
      setHasGeneratedMatches(true);
    } catch (err) {
      console.error("AI Matching Error:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Trigger AI matching when favorites change significantly or on page load if user has favorites
  useEffect(() => {
    if (favorites.size > 0 && !hasGeneratedMatches) {
      fetchAiMatches();
    }
  }, [favorites.size]);

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'for sale': return { color: 'bg-[#8DC63F]', icon: null };
      case 'for rent': return { color: 'bg-[#0073e1]', icon: null };
      case 'active': return { color: 'bg-[#0073e1]', icon: null };
      case 'hot offer': return { color: 'bg-red-500 animate-pulse', icon: <Flame size={10} className="fill-current" /> };
      case 'pending': return { color: 'bg-yellow-500', icon: <Clock size={10} /> };
      case 'short term': return { color: 'bg-indigo-600', icon: null };
      default: return { color: 'bg-gray-900', icon: null };
    }
  };

  const processedProperties = useMemo(() => {
    let result = properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = category === 'All Categories' || p.type.toLowerCase().includes(category.toLowerCase());
      const matchesCity = city === 'All Cities' || p.location.toLowerCase().includes(city.toLowerCase());
      
      let matchesBeds = true;
      if (beds !== 'Any') {
        const minBeds = parseInt(beds);
        matchesBeds = p.beds >= minBeds;
      }

      let matchesPrice = true;
      if (priceRange !== 'Any Price') {
        if (priceRange.includes('0 - 100k')) matchesPrice = p.price <= 100000;
        else if (priceRange.includes('100k - 500k')) matchesPrice = p.price > 100000 && p.price <= 500000;
        else if (priceRange.includes('500k+')) matchesPrice = p.price > 500000;
      }

      return matchesSearch && matchesCategory && matchesCity && matchesBeds && matchesPrice;
    });

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Bedrooms: Ascending':
        result.sort((a, b) => a.beds - b.beds);
        break;
      case 'Bedrooms: Descending':
        result.sort((a, b) => b.beds - a.beds);
        break;
      case 'Newest First':
        result.sort((a, b) => a.yearBuilt - a.yearBuilt);
        break;
    }

    return result;
  }, [searchTerm, properties, category, city, beds, priceRange, sortBy]);

  const priceOptions = [
    'Any Price', 
    currency === 'UGX' ? '0 - 380M' : '$0 - $100k', 
    currency === 'UGX' ? '380M - 1.9B' : '$100k - $500k', 
    currency === 'UGX' ? '1.9B+' : '$500k+'
  ];

  return (
    <div className="pt-36 md:pt-52 pb-24 bg-[#f8f9fa] dark:bg-[#0a0c16] min-h-screen transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        {/* Search & Tabs */}
        <div className="mb-14">
          <div className="flex mb-0 overflow-x-auto no-scrollbar gap-1">
            {['Sales', 'Rentals', 'Invest'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 md:px-10 py-4 text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] rounded-t-2xl transition-all duration-300 ${
                  activeTab === tab ? 'bg-white dark:bg-[#161925] text-gray-900 dark:text-white shadow-xl' : 'bg-black/10 text-white/50 hover:text-white backdrop-blur-xl'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#161925] p-6 md:p-10 rounded-b-[2rem] rounded-tr-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
             <FilterSelect label="Categories" value={category} onChange={setCategory} options={['All Categories', 'Apartment', 'Villa', 'Studio', 'Entire home']} />
             <FilterSelect label="Cities" value={city} onChange={setCity} options={['All Cities', 'Kampala', 'Entebbe', 'Jinja', 'Moshi', 'Dar es Salaam']} />
             <FilterSelect label="Beds | Baths" value={beds} onChange={setBeds} options={['Any', '1+ Beds', '2+ Beds', '3+ Beds']} />
             <FilterSelect label={`Price (${currency})`} value={priceRange} onChange={setPriceRange} options={priceOptions} />
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-2xl flex items-center justify-center text-[#8DC63F] shadow-lg shadow-[#8DC63F]/5 border border-[#8DC63F]/20">
                 <BrainCircuit size={24} />
               </div>
               <div>
                 <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Personalized AI Matches</h2>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Synced with your architectural preferences</p>
               </div>
            </div>
            {!hasGeneratedMatches && !isAiLoading && (
              <button 
                onClick={fetchAiMatches}
                className="bg-white dark:bg-[#161925] border border-[#8DC63F]/30 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#8DC63F] hover:bg-[#8DC63F] hover:text-white transition-all flex items-center gap-2 w-fit"
              >
                <Zap size={14} /> Refresh AI Analysis
              </button>
            )}
          </div>

          <div className="relative">
            {isAiLoading ? (
              <div className="bg-white dark:bg-[#161925] rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center space-y-4 border border-gray-100 dark:border-white/5">
                <Loader2 className="animate-spin text-[#8DC63F]" size={40} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 animate-pulse">Calculating optimal asset nodes...</p>
              </div>
            ) : aiMatches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aiMatches.map((match, i) => (
                  <div 
                    key={match.id} 
                    onClick={() => onPropertyClick(match.id)}
                    className="group relative bg-[#111421] rounded-[2rem] overflow-hidden border border-[#8DC63F]/20 cursor-pointer hover:border-[#8DC63F]/50 transition-all duration-500 shadow-2xl"
                  >
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-[#8DC63F] text-black text-[8px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                        <Sparkles size={10} fill="currentColor" /> 98% Match
                      </div>
                    </div>
                    <div className="aspect-[1.8/1] overflow-hidden">
                      <img src={match.images[0]} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={match.title} />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-gray-500 mb-2">
                        <MapPin size={10} className="text-[#8DC63F]" /> {match.location}
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight line-clamp-1 mb-2 group-hover:text-[#8DC63F] transition-colors">{match.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8DC63F] font-black text-lg tracking-tighter">{formatPrice(match.price, currency)}</span>
                        <ArrowRight size={14} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#161925] rounded-[2.5rem] p-10 border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-700 mb-6">
                  <BrainCircuit size={32} />
                </div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2">Initialize AI Ecosystem</h3>
                <p className="text-xs text-gray-500 max-w-sm mb-8">Favorite properties to train your personal AI agent and unlock tailored architectural recommendations.</p>
                <button 
                  onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}
                  className="bg-gray-900 dark:bg-white dark:text-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Explore Global Grid
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Global Grid Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] mb-4">
              <span>Market</span> <ChevronRight size={12} className="text-gray-300" /> <span className="text-gray-900 dark:text-gray-100">Global Infrastructure Grid</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">Market Assets</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex flex-col">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mb-2 pl-1">Sort Properties</label>
              <div className="relative group min-w-[220px]">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full bg-white dark:bg-[#161925] border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-3 text-[12px] font-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#8DC63F] transition-all appearance-none cursor-pointer shadow-sm"
                >
                  <option value="Newest First">Newest First</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Bedrooms: Ascending">Bedrooms: Ascending</option>
                  <option value="Bedrooms: Descending">Bedrooms: Descending</option>
                </select>
                <SortAsc className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#8DC63F] transition-colors" size={16} />
              </div>
            </div>
            <p className="text-gray-400 text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 dark:border-white/5 pb-3">
              {processedProperties.length} Verified Nodes Loaded
            </p>
          </div>
        </div>

        {/* Main Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {processedProperties.map(property => {
            const isCompared = compareList.includes(property.id);
            const statusStyle = getStatusStyles(property.status);
            return (
              <div 
                key={property.id} 
                onClick={() => onPropertyClick(property.id)}
                className="bg-white dark:bg-[#161925] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-100 dark:border-white/5 flex flex-col h-full cursor-pointer"
              >
                <div className="relative aspect-[1.3/1] overflow-hidden shrink-0">
                  <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s] ease-out" loading="lazy" />
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2">
                    {property.isFeatured && (
                      <span className="bg-[#FF5A3D] text-white text-[9px] md:text-[10px] font-black uppercase px-4 py-2 rounded-xl shadow-2xl tracking-[0.2em] flex items-center gap-2 border border-white/10">
                        <Sparkles size={12} fill="currentColor" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <span className={`text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-lg shadow-xl tracking-widest flex items-center gap-1.5 ${statusStyle.color}`}>
                      {statusStyle.icon}
                      {property.status}
                    </span>
                  </div>
                  
                  {/* Overlay Interaction */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/30 backdrop-blur-[3px]">
                     <button onClick={(e) => handleToggleCompare(e, property.id)} className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] flex flex-col items-center justify-center shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 ${isCompared ? 'bg-[#8DC63F] text-black scale-110' : 'bg-white text-gray-900 hover:bg-[#8DC63F] hover:text-white'}`}>
                       <Repeat size={24} className={isCompared ? 'animate-pulse' : ''} />
                       <span className="text-[8px] font-black uppercase tracking-widest mt-1 hidden md:block">{isCompared ? 'Remove' : 'Compare'}</span>
                     </button>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex justify-between items-end">
                    <div className="flex items-center gap-2.5 text-white text-[11px] md:text-[14px] font-black uppercase tracking-widest">
                      <MapPin size={16} className="text-[#8DC63F]" />
                      <span className="truncate max-w-[180px] md:max-w-none">{property.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 md:p-10 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-2.5 md:mb-4 group-hover:text-[#8DC63F] transition-colors leading-tight uppercase tracking-tight">{property.title}</h3>
                  <div className="text-[#8DC63F] text-2xl md:text-3xl font-black mb-5 md:mb-8 tracking-tighter">
                    {formatPrice(property.price, currency)}
                    {property.status === 'for rent' && <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 ml-1.5 tracking-[0.3em]">/ MO</span>}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 md:gap-5 border-t border-gray-100 dark:border-white/5 pt-6 md:pt-10 mt-auto mb-6 md:mb-10">
                    <div className="flex flex-col items-center gap-1.5"><Bed size={20} className="text-[#8DC63F]" /><span className="text-[14px] font-black text-gray-900 dark:text-white">{property.beds}</span><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Beds</span></div>
                    <div className="flex flex-col items-center gap-1.5"><Bath size={20} className="text-[#8DC63F]" /><span className="text-[14px] font-black text-gray-900 dark:text-white">{property.baths}</span><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Baths</span></div>
                    <div className="flex flex-col items-center gap-1.5"><Maximize size={20} className="text-[#8DC63F]" /><span className="text-[14px] font-black text-gray-900 dark:text-white">{property.size}</span><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sq.ft</span></div>
                  </div>

                  <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-4"><div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-[#8DC63F]/20 overflow-hidden shadow-xl"><img src={property.host.avatar} className="w-full h-full object-cover" alt="host" loading="lazy" /></div><span className="text-[11px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-200 hidden sm:block">{property.host.name}</span></div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => handleToggleCompare(e, property.id)}
                        title={isCompared ? "Remove from comparison" : "Add to comparison"}
                        className={`w-11 h-11 md:w-12 md:h-12 rounded-[1.2rem] flex items-center justify-center transition-all ${isCompared ? 'bg-[#8DC63F]/10 text-[#8DC63F] border-[#8DC63F]/20 shadow-inner' : 'bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-[#8DC63F] hover:bg-[#8DC63F]/5 border border-transparent'}`}
                      >
                        <Repeat size={20} />
                      </button>
                      <button 
                        onClick={(e) => toggleFavorite(e, property.id)} 
                        className={`w-11 h-11 md:w-12 md:h-12 rounded-[1.2rem] flex items-center justify-center transition-all ${favorites.has(property.id) ? 'bg-red-50 dark:bg-red-500/10 text-red-500 shadow-inner' : 'bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                      >
                        <Heart size={20} fill={favorites.has(property.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FilterSelect: React.FC<{ label: string, value: string, onChange: (v: string) => void, options: string[] }> = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mb-4 pl-1">{label}</label>
    <div className="relative group">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 dark:bg-[#1f2335] border-0 rounded-2xl px-6 py-4.5 text-[13px] font-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#8DC63F] focus:bg-white dark:focus:bg-[#2a2f4a] transition-all appearance-none cursor-pointer group-hover:bg-gray-100 dark:group-hover:bg-[#252a3f] shadow-sm"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#8DC63F] transition-colors" size={18} />
    </div>
  </div>
);
