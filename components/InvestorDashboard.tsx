import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, DollarSign, Percent, MapPin, Building, LandPlot, BarChart3, 
  Calculator, RefreshCw, Layers, ArrowUpRight, HelpCircle, AlertCircle, Sparkles 
} from 'lucide-react';
import { Currency, formatPrice, UGX_RATE } from '../App';

interface InvestorDashboardProps {
  currency: Currency;
  onNavigate: (page: string) => void;
}

// 1. Historical data for Uganda Real Estate (2018 - 2026)
// Values represented in USD per square meter (average premium properties)
const HISTORICAL_DATA = [
  { year: '2018', KampalaCentral: 1150, Entebbe: 850, Wakiso: 450, inflation: 4.8 },
  { year: '2019', KampalaCentral: 1220, Entebbe: 910, Wakiso: 490, inflation: 4.2 },
  { year: '2020', KampalaCentral: 1190, Entebbe: 880, Wakiso: 520, inflation: 5.1 }, // Pandemic slight dip in central, land in Wakiso grew
  { year: '2021', KampalaCentral: 1280, Entebbe: 950, Wakiso: 580, inflation: 3.9 },
  { year: '2022', KampalaCentral: 1380, Entebbe: 1040, Wakiso: 660, inflation: 6.5 },
  { year: '2023', KampalaCentral: 1490, Entebbe: 1120, Wakiso: 740, inflation: 5.3 },
  { year: '2024', KampalaCentral: 1610, Entebbe: 1230, Wakiso: 830, inflation: 4.5 },
  { year: '2025', KampalaCentral: 1750, Entebbe: 1350, Wakiso: 920, inflation: 4.1 },
  { year: '2026', KampalaCentral: 1900, Entebbe: 1480, Wakiso: 1050, inflation: 3.8 },
];

// 2. Yield data by premium Ugandan suburbs / hotspots
const DISTRICT_YIELDS = [
  { name: 'Kololo', yield: 8.2, appreciation: 11.5, type: 'Premium Residential' },
  { name: 'Nakasero', yield: 7.8, appreciation: 12.0, type: 'Commercial/Office' },
  { name: 'Muyenga', yield: 8.5, appreciation: 9.8, type: 'High-end Rentals' },
  { name: 'Bugolobi', yield: 9.1, appreciation: 8.5, type: 'Mixed Use / Apartments' },
  { name: 'Naalya', yield: 7.2, appreciation: 14.5, type: 'Middle-Class Housing' },
  { name: 'Entebbe', yield: 6.9, appreciation: 13.2, type: 'Tourism / Lakeside' },
  { name: 'Kira/Wakiso', yield: 5.5, appreciation: 18.0, type: 'Land & Subdivisions' },
];

// 3. Asset composition breakdown in current market
const MARKET_COMPOSITION = [
  { name: 'Vacant Land & Plots', value: 38, color: '#8DC63F' },
  { name: 'Residential Apartments', value: 24, color: '#007b8a' },
  { name: 'Commercial & Retail', value: 18, color: '#161925' },
  { name: 'Luxury Villas & Townhouses', value: 15, color: '#FF5A3D' },
  { name: 'Industrial & Warehousing', value: 5, color: '#F7B500' },
];

// 4. Detailed regional profiles for interactive exploration
const REGIONAL_PROFILES = {
  kololo: {
    name: 'Kololo, Kampala',
    avgLandCost: 150000, // per Decimal in USD
    avgApartmentSqm: 1800,
    rentalYield: '7.5% - 9.0%',
    growthDriver: 'Diplomatic missions, premium security enclave, and absolute status value. High density of multinational headquarters.',
    riskLevel: 'Low (Core Asset)',
    investmentGrade: 'AAA (Sovereign Class)',
    highlights: ['Zero default rate historically', 'Highly liquid secondary market', 'High concentration of foreign expatriates'],
  },
  nakasero: {
    name: 'Nakasero, Kampala',
    avgLandCost: 180000,
    avgApartmentSqm: 2100,
    rentalYield: '7.0% - 8.5%',
    growthDriver: 'Central Business District hub, premium five-star hotels, luxury retail developments, and high-spec corporate office spaces.',
    riskLevel: 'Low (Institutional Capital)',
    investmentGrade: 'AAA (Institutional Class)',
    highlights: ['Maximum price per square meter', 'Ultra-high commercial demand', 'Grade-A building specs'],
  },
  muyenga: {
    name: 'Muyenga & Kabalagala',
    avgLandCost: 50000,
    avgApartmentSqm: 1100,
    rentalYield: '8.0% - 9.8%',
    growthDriver: 'High-altitude scenic views of Lake Victoria, diverse leisure amenities, culinary establishments, and a robust rental market for short-term/long-term international stays.',
    riskLevel: 'Medium-Low',
    investmentGrade: 'AA (Premium Grade)',
    highlights: ['Outstanding rental cash flow stability', 'Vibrant nightlife & service economy', 'Scenic hill landscape'],
  },
  naalya: {
    name: 'Naalya & Namugongo',
    avgLandCost: 20000,
    avgApartmentSqm: 750,
    rentalYield: '6.8% - 8.0%',
    growthDriver: 'Middle-class population boom, superb road networks (Northern Bypass), modern supermarkets (Metroplex Mall), and affordable luxury developments.',
    riskLevel: 'Medium',
    investmentGrade: 'A (Growth Class)',
    highlights: ['Rapid mass-market tenant absorption', 'Excellent capital gains over 5 years', 'Modern gated community trends'],
  },
  entebbe: {
    name: 'Entebbe Lakeside',
    avgLandCost: 35000,
    avgApartmentSqm: 1300,
    rentalYield: '6.5% - 7.5%',
    growthDriver: 'Lakeside leisure, international airport expansion, brand-new expressways, tourism node, and elite boarding institutions.',
    riskLevel: 'Medium-Low',
    investmentGrade: 'AA (Resort & Commercial Class)',
    highlights: ['High weekend leisure holiday rental yields', 'Unique lake frontage premium', 'Cleaner, greener environment'],
  },
  wakiso: {
    name: 'Kira / Sonde (Wakiso Corridor)',
    avgLandCost: 8000,
    avgApartmentSqm: 550,
    rentalYield: '5.0% - 6.5%',
    growthDriver: 'Rapid residential land subdivision, primary location for new home construction, highway connection projects, and private school investments.',
    riskLevel: 'Medium-High (Infrastructure-Dependent)',
    investmentGrade: 'A- (Opportunistic Growth Class)',
    highlights: ['Highest capital appreciation percentage', 'Perfect for land banking', 'Highly affordable entry pricing'],
  },
};

export const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ currency, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'historical' | 'yields' | 'composition'>('historical');
  const [selectedRegion, setSelectedRegion] = useState<keyof typeof REGIONAL_PROFILES>('kololo');
  
  // ROI Projection States
  const [initialCapital, setInitialCapital] = useState<number>(100000); // in USD
  const [appreciationRate, setAppreciationRate] = useState<number>(9.5); // % per year
  const [monthlyRentPercentage, setMonthlyRentPercentage] = useState<number>(0.65); // % of asset value monthly
  const [horizonYears, setHorizonYears] = useState<number>(10);

  // Convert USD metrics to UGX if active
  const convertValue = (valUSD: number) => {
    if (currency === 'UGX') {
      return valUSD * UGX_RATE;
    }
    return valUSD;
  };

  // Convert and format value
  const formatVal = (valUSD: number, decimalPlaces = 0) => {
    const converted = convertValue(valUSD);
    if (currency === 'UGX') {
      if (converted >= 1_000_000_000) {
        return `Shs ${(converted / 1_000_000_000).toFixed(1)}B`;
      }
      if (converted >= 1_000_000) {
        return `Shs ${(converted / 1_000_000).toFixed(0)}M`;
      }
      return `Shs ${converted.toLocaleString()}`;
    }
    return `$${valUSD.toLocaleString(undefined, { maximumFractionDigits: decimalPlaces })}`;
  };

  // Dynamic calculations for the projection model
  const projectionsData = useMemo(() => {
    let currentAssetValue = initialCapital;
    let accumulatedRent = 0;
    const data = [];

    for (let year = 1; year <= horizonYears; year++) {
      const appreciation = currentAssetValue * (appreciationRate / 100);
      const startOfYearValue = currentAssetValue;
      currentAssetValue += appreciation;

      // Annual rent generated (based on average of year asset value)
      const avgValueForYear = (startOfYearValue + currentAssetValue) / 2;
      const annualRent = avgValueForYear * (monthlyRentPercentage / 100) * 12;
      accumulatedRent += annualRent;

      data.push({
        year: `Yr ${year}`,
        'Asset Appreciation': Math.round(currentAssetValue - initialCapital),
        'Accumulated Rent': Math.round(accumulatedRent),
        'Total Valuation': Math.round(currentAssetValue),
        'Total Value': Math.round(currentAssetValue + accumulatedRent),
      });
    }

    return data;
  }, [initialCapital, appreciationRate, monthlyRentPercentage, horizonYears]);

  const finalMetrics = useMemo(() => {
    const lastYear = projectionsData[projectionsData.length - 1];
    if (!lastYear) return { totalValue: 0, roi: 0, multiplier: 0, rentalShare: 0 };
    
    const initial = initialCapital;
    const appreciationValue = lastYear['Asset Appreciation'];
    const rentValue = lastYear['Accumulated Rent'];
    const totalReturn = appreciationValue + rentValue;
    const roiPercentage = (totalReturn / initial) * 100;
    const totalValue = initial + totalReturn;
    const multiplier = totalValue / initial;
    const rentalShare = (rentValue / totalReturn) * 100;

    return {
      totalValue,
      roi: roiPercentage,
      multiplier,
      rentalShare,
      appreciationValue,
      rentValue
    };
  }, [projectionsData, initialCapital]);

  // Adjust historical pricing data based on currency format
  const chartHistoricalData = useMemo(() => {
    return HISTORICAL_DATA.map(item => ({
      year: item.year,
      'Kampala Central': Math.round(convertValue(item.KampalaCentral)),
      'Entebbe': Math.round(convertValue(item.Entebbe)),
      'Wakiso': Math.round(convertValue(item.Wakiso)),
      'Inflation (%)': item.inflation
    }));
  }, [currency]);

  return (
    <div className="pt-24 md:pt-36 pb-20 px-4 md:px-12 max-w-7xl mx-auto space-y-12 md:space-y-16">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-white/5">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/20 rounded-full px-4.5 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-sm">
              <Sparkles size={11} className="animate-pulse text-[#8DC63F]" /> Sovereign Investment Hub
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden sm:inline-block">• Real-Time Analytics Nodes</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">
            Uganda Market Analytics
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
            Strategic investment index, historical property pricing, geographic capitalization, and custom ROI projections model for Uganda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => onNavigate('properties')}
            className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
          >
            Explore Active Grid
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-[#8DC63F] hover:bg-[#9ee047] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95"
          >
            Consult Investment Desk
          </button>
        </div>
      </div>

      {/* Bento Grid Top Level Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#111421] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Avg Capital Appreciation</span>
            <div className="w-9 h-9 rounded-xl bg-[#8DC63F]/15 text-[#8DC63F] flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">11.4% <span className="text-[11px] text-[#8DC63F] font-bold">YoY</span></h3>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Top Suburbs Core Index (2025-26)</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Kampala Central Leads</span>
            <span className="text-[#8DC63F] flex items-center gap-0.5"><ArrowUpRight size={12} /> +12.0%</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#111421] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Net Rental Yield Index</span>
            <div className="w-9 h-9 rounded-xl bg-[#007b8a]/15 text-[#007b8a] flex items-center justify-center">
              <Percent size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">7.8% <span className="text-[11px] text-[#007b8a] font-bold">Net</span></h3>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Sub-Saharan High-Performance Tier</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Kololo/Muyenga Peak</span>
            <span className="text-[#007b8a] flex items-center gap-0.5"><ArrowUpRight size={12} /> 9.1%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#111421] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Avg Valuation Cost</span>
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-500 flex items-center justify-center">
              <Building size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">{formatVal(1480)} <span className="text-[11px] text-orange-500 font-bold">/ Sqm</span></h3>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Premium Apartments & Office</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Kira/Sonde entry tier</span>
            <span className="text-orange-500">{formatVal(550)}/sqm</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-[#111421] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Sovereign Rating Index</span>
            <div className="w-9 h-9 rounded-xl bg-[#F7B500]/15 text-[#F7B500] flex items-center justify-center">
              <Layers size={16} />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Grade-A <span className="text-[11px] text-[#F7B500] font-bold">Stable</span></h3>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Sustained Urban expansion corridor</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <span>Population Driver</span>
            <span className="text-[#F7B500]">+5.2% Growth</span>
          </div>
        </div>

      </div>

      {/* Main Charts Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visualizers Container */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111421] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col justify-between min-h-[480px]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50 dark:border-white/5 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[#8DC63F]">
                <BarChart3 size={16} />
              </div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Market Visualization Hub</h2>
            </div>
            
            {/* Chart segment buttons */}
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10 self-start sm:self-auto">
              <button 
                onClick={() => setActiveTab('historical')}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'historical' 
                    ? 'bg-white dark:bg-white/10 text-[#8DC63F] shadow-sm' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                Pricing Trends
              </button>
              <button 
                onClick={() => setActiveTab('yields')}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'yields' 
                    ? 'bg-white dark:bg-white/10 text-[#8DC63F] shadow-sm' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                District Yields
              </button>
              <button 
                onClick={() => setActiveTab('composition')}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'composition' 
                    ? 'bg-white dark:bg-white/10 text-[#8DC63F] shadow-sm' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                Asset Composition
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[340px] flex items-center justify-center">
            {activeTab === 'historical' && (
              <ResponsiveContainer width="100%" height={340}>
                <AreaChart data={chartHistoricalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorKampala" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8DC63F" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#8DC63F" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEntebbe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007b8a" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#007b8a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWakiso" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5A3D" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#FF5A3D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis 
                    dataKey="year" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => formatVal(v)}
                    tick={{ fill: '#9CA3AF', fontSize: 9, fontWeight: 900 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 20, 33, 0.95)', 
                      borderColor: 'rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 900
                    }} 
                    formatter={(value: any, name: string) => [
                      name === 'Inflation (%)' ? `${value}%` : formatVal(Number(value) / (currency === 'UGX' ? UGX_RATE : 1)),
                      name
                    ]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '10px' }}
                  />
                  <Area type="monotone" dataKey="Kampala Central" stroke="#8DC63F" strokeWidth={3} fillOpacity={1} fill="url(#colorKampala)" />
                  <Area type="monotone" dataKey="Entebbe" stroke="#007b8a" strokeWidth={3} fillOpacity={1} fill="url(#colorEntebbe)" />
                  <Area type="monotone" dataKey="Wakiso" stroke="#FF5A3D" strokeWidth={3} fillOpacity={1} fill="url(#colorWakiso)" />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'yields' && (
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={DISTRICT_YIELDS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }} 
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 20, 33, 0.95)', 
                      borderColor: 'rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 900
                    }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="rect"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '10px' }}
                  />
                  <Bar dataKey="yield" name="Annual Rental Yield (%)" fill="#007b8a" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="appreciation" name="Avg Capital Appreciation (%)" fill="#8DC63F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeTab === 'composition' && (
              <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8">
                <div className="w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MARKET_COMPOSITION}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {MARKET_COMPOSITION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(17, 20, 33, 0.95)', 
                          borderColor: 'rgba(255,255,255,0.08)',
                          borderRadius: '16px',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 900
                        }}
                        formatter={(value) => [`${value}%`]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3.5 max-w-sm">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 dark:border-white/5 pb-2 mb-2">Composition Key</h4>
                  {MARKET_COMPOSITION.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: item.color }}></div>
                      <div className="flex justify-between items-center w-full text-[11px] font-bold">
                        <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                        <span className="text-gray-950 dark:text-white">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Region Profiles Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-[#111421] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col h-full">
          <div className="flex items-center gap-2.5 border-b border-gray-50 dark:border-white/5 pb-4 mb-4">
            <MapPin className="text-[#8DC63F]" size={18} />
            <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">District Intelligence</h2>
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] pl-1">Select Hotspot</label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value as any)}
                className="w-full bg-gray-50 dark:bg-[#0c0e18] border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 text-[11px] font-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#8DC63F] cursor-pointer"
              >
                {Object.keys(REGIONAL_PROFILES).map((key) => (
                  <option key={key} value={key}>
                    {REGIONAL_PROFILES[key as keyof typeof REGIONAL_PROFILES].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile specifications */}
            <div className="bg-gray-50 dark:bg-[#0c0e18] p-5 rounded-2xl border border-gray-100 dark:border-white/5 space-y-4">
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-100/50 dark:border-white/5">
                <span className="text-[10px] font-bold uppercase text-gray-400">Land Price (Decimal)</span>
                <span className="text-xs font-black text-[#8DC63F]">
                  {formatVal(REGIONAL_PROFILES[selectedRegion].avgLandCost)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-100/50 dark:border-white/5">
                <span className="text-[10px] font-bold uppercase text-gray-400">Avg Apartment Cost</span>
                <span className="text-xs font-black text-gray-900 dark:text-white">
                  {formatVal(REGIONAL_PROFILES[selectedRegion].avgApartmentSqm)} / Sqm
                </span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-100/50 dark:border-white/5">
                <span className="text-[10px] font-bold uppercase text-gray-400">Target Net Yield</span>
                <span className="text-xs font-black text-gray-900 dark:text-white">
                  {REGIONAL_PROFILES[selectedRegion].rentalYield}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-gray-400">Investment Rating</span>
                <span className="text-[10px] font-black text-black dark:text-white bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {REGIONAL_PROFILES[selectedRegion].investmentGrade}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                <Layers size={12} className="text-gray-400" /> Key Catalysts
              </span>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {REGIONAL_PROFILES[selectedRegion].growthDriver}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-50 dark:border-white/5">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Market Merits</span>
              <ul className="space-y-1.5">
                {REGIONAL_PROFILES[selectedRegion].highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] font-bold text-gray-600 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 bg-[#8DC63F] rounded-full mt-1 shrink-0"></span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Projections Sandbox Calculator */}
      <div className="bg-white dark:bg-[#111421] rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition-all">
        
        {/* Banner header inside card */}
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-[#151928] border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-[#8DC63F] text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Calculator size={13} /> Investor Yield Engine
            </span>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Interactive ROI Sandbox</h2>
            <p className="text-[11px] text-gray-400 font-medium">Configure capital parameters to calculate compound capital gains and yield projections in the East African real estate corridor.</p>
          </div>

          <div className="flex bg-gray-200 dark:bg-white/5 p-1 rounded-xl self-start md:self-auto border border-gray-300 dark:border-white/10">
            {[5, 10, 15].map((y) => (
              <button 
                key={y}
                onClick={() => setHorizonYears(y)}
                className={`px-4.5 py-2 rounded-lg text-[10px] font-black transition-all ${
                  horizonYears === y 
                    ? 'bg-white dark:bg-white/10 text-[#8DC63F] shadow-sm' 
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                {y} Years
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Slider input metrics */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            
            {/* Input 1 */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Initial Capital Outlay</span>
                <span className="text-sm font-black text-[#8DC63F]">{formatVal(initialCapital)}</span>
              </div>
              <input 
                type="range" 
                min={20000} 
                max={1500000} 
                step={10000}
                value={initialCapital}
                onChange={(e) => setInitialCapital(Number(e.target.value))}
                className="w-full accent-[#8DC63F] h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-black uppercase text-gray-500">
                <span>{formatVal(20000)}</span>
                <span>{formatVal(1500000)}</span>
              </div>
            </div>

            {/* Input 2 */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Est. Annual Capital Appreciation</span>
                <span className="text-sm font-black text-gray-900 dark:text-white">{appreciationRate.toFixed(1)}% / Year</span>
              </div>
              <input 
                type="range" 
                min={4.0} 
                max={20.0} 
                step={0.5}
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full accent-[#8DC63F] h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-black uppercase text-gray-500">
                <span>4.0%</span>
                <span>20.0% (High Spec Land)</span>
              </div>
            </div>

            {/* Input 3 */}
            <div className="space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Est. Monthly Rental Yield Factor</span>
                <span className="text-sm font-black text-[#007b8a]">{(monthlyRentPercentage * 12).toFixed(2)}% / Year</span>
              </div>
              <input 
                type="range" 
                min={0.3} 
                max={1.2} 
                step={0.05}
                value={monthlyRentPercentage}
                onChange={(e) => setMonthlyRentPercentage(Number(e.target.value))}
                className="w-full accent-[#007b8a] h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-black uppercase text-gray-500">
                <span>3.6% (Standard Commercial)</span>
                <span>14.4% (Apartments Peak)</span>
              </div>
            </div>

          </div>

          {/* Visualization Output Bar */}
          <div className="lg:col-span-4 bg-gray-50 dark:bg-[#0c0e18] p-6 rounded-3xl border border-gray-100 dark:border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Projection Summary</span>
              
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-gray-400 leading-none">Estimated Portfolio Value</span>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                  {formatVal(Math.round(finalMetrics.totalValue))}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-gray-200 dark:border-white/5">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase text-gray-400 block leading-none">Capital Gain</span>
                  <span className="text-sm font-black text-[#8DC63F] leading-none">
                    +{formatVal(Math.round(finalMetrics.appreciationValue))}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase text-gray-400 block leading-none">Cumulative Rent</span>
                  <span className="text-sm font-black text-[#007b8a] leading-none">
                    +{formatVal(Math.round(finalMetrics.rentValue))}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-8">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase">
                <span>Total Return on Investment</span>
                <span className="text-white bg-[#8DC63F]/20 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-2 py-0.5 rounded text-[10px] font-black">
                  {finalMetrics.roi.toFixed(0)}% ROI
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-white/5 h-2 rounded-full overflow-hidden flex">
                <div 
                  className="bg-[#8DC63F] h-full transition-all duration-500" 
                  style={{ width: `${100 - finalMetrics.rentalShare}%` }}
                />
                <div 
                  className="bg-[#007b8a] h-full transition-all duration-500" 
                  style={{ width: `${finalMetrics.rentalShare}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-gray-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]"></span> Appreciation</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#007b8a]"></span> Rental Yield</span>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-100 dark:border-yellow-500/10 p-3.5 rounded-2xl flex items-start gap-2.5 mt-4">
              <AlertCircle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-[9px] font-bold text-yellow-800 dark:text-yellow-400/90 leading-relaxed">
                Calculations assume continuous asset compounding. Real-world returns may vary based on structural maintenance factors and local municipal land taxes.
              </p>
            </div>
          </div>

          {/* Projections Trend Chart */}
          <div className="lg:col-span-3 flex flex-col justify-between min-h-[280px]">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2 pl-1 block">Growth Path Vector</span>
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectionsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 9, fontWeight: 900 }} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 20, 33, 0.95)', 
                      borderColor: 'rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 900
                    }}
                    formatter={(value) => [formatVal(Number(value)), '']}
                  />
                  <Bar dataKey="Asset Appreciation" name="Appreciation" fill="#8DC63F" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Accumulated Rent" name="Rent" fill="#007b8a" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="pt-2 text-center">
              <span className="text-[11px] font-black text-gray-900 dark:text-white uppercase">
                Multiplier: <span className="text-[#8DC63F]">{finalMetrics.multiplier.toFixed(1)}x Capital Gain</span>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
