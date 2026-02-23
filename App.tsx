
import * as React from 'react';
import { useState, useEffect, useCallback, ReactNode } from 'react';
import { Navbar } from './components/Navbar';
import { TopHeader } from './components/TopHeader';
import { Hero } from './components/Hero';
import { EcosystemGrid } from './components/EcosystemGrid';
import { WhoWeAre } from './components/WhoWeAre';
import { PartnerLogos } from './components/PartnerLogos';
import { ServicesGrid } from './components/ServicesGrid';
import { PropertyShowcase } from './components/PropertyShowcase';
import { CoreFeaturesFlow } from './components/CoreFeaturesFlow';
import { FeaturedProperties } from './components/FeaturedProperties';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PropertiesPage } from './components/PropertiesPage';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { AddListingPage } from './components/AddListingPage';
import { SinglePropertyPage } from './components/SinglePropertyPage';
import { SingleProjectPage } from './components/SingleProjectPage';
import { ContactPage } from './components/ContactPage';
import { DashboardHub } from './components/DashboardHub';
import { ManageDashboard } from './components/ManageDashboard';
import { ComparisonModal } from './components/ComparisonModal';
import { VoiceAssistant } from './components/VoiceAssistant';
import { LoginPage } from './components/LoginPage';
import { ProjectsPage } from './components/ProjectsPage';
import { PropertyFeed } from './components/PropertyFeed';
import { Repeat, AlertTriangle, RefreshCw } from 'lucide-react';

// --- Global Error Boundary ---
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; error: Error | null; }

class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("CRITICAL_NODE_CRASH:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#06080f] flex items-center justify-center p-10 z-[1000]">
          <div className="text-center space-y-8 max-w-xl">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <AlertTriangle className="text-red-500" size={48} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Infrastructure Fault</h1>
            <p className="text-gray-500 font-medium">Resetting AI logic nodes to prevent data corruption.</p>
            <button onClick={() => window.location.reload()} className="bg-[#8DC63F] text-black px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 mx-auto shadow-2xl">
              <RefreshCw size={16} /> Re-Initialize
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export type Currency = 'UGX' | 'USD';
// Fix: Added missing UserRole values 'seller' and 'marketer'
export type UserRole = 'admin' | 'manager' | 'agent' | 'maintainer' | 'tenant' | 'buyer' | 'investor' | 'visitor' | 'seller' | 'marketer';

// Fix: Exported UGX_RATE and formatPrice helper for other components
export const UGX_RATE = 3800;

export const formatPrice = (price: number, currency: Currency) => {
  if (currency === 'UGX') {
    return `Shs ${(price * UGX_RATE).toLocaleString()}`;
  }
  return `$${price.toLocaleString()}`;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  avatar?: string;
}

export interface Tenant extends UserProfile {
  propertyId: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface Project {
  id: string; title: string; location: string; status: 'ongoing' | 'completed'; image: string;
  gallery?: string[]; category: string; client?: string; surfaceArea?: string;
  value?: string; architect?: string; timeline?: string; description?: string;
  requirements?: string[];
}

// Fix: Updated Property interface with missing fields used across pages
export interface Property {
  id: string; title: string; location: string; price: number; type: string;
  description: string; beds: number; baths: number; size: number;
  images: string[]; status: string; yearBuilt: number;
  host: { name: string; avatar: string; status: string; yearsHosting: number; };
  address: { street: string; city: string; state: string; zip: string; area: string; country: string; };
  features: { interior: string[]; outdoor: string[]; utilities: string[]; other: string[]; };
  isFeatured?: boolean;
  guests?: number;
  rating?: number;
  reviewsCount?: number;
  bedrooms?: number;
  isGuestFavorite?: boolean;
  aiSummary?: string;
}

// Fix: Export missing Service and AboutContent interfaces
export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface AboutContent {
  whoWeAre: string;
  background: string;
  mission: string;
  vision: string;
}

export interface AppSettings {
  siteName: string;
  seoDescription: string;
  themeColor: string;
  fontFamily: string;
  enableLanding: boolean;
  enableRegister: boolean;
  enable2FA: boolean;
  language: 'en' | 'fr' | 'ug';
}

const INITIAL_SETTINGS: AppSettings = {
  siteName: 'SMW Hub',
  seoDescription: 'Premium Real Estate Ecosystem Uganda',
  themeColor: '#8DC63F',
  fontFamily: 'Plus Jakarta Sans',
  enableLanding: true,
  enableRegister: true,
  enable2FA: false,
  language: 'en'
};

const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1', title: 'The Kololo Heights Penthouse', location: 'Kololo, Kampala', price: 450000, type: 'Apartment',
    description: 'Ultra-luxury living at the highest peak of Kampala.', beds: 3, baths: 4, size: 3200, yearBuilt: 2023,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'], status: 'hot offer',
    host: { name: 'Agent Brian', avatar: 'https://i.pravatar.cc/150?u=brian', status: 'Verified Agent', yearsHosting: 8 },
    address: { street: 'Acacia Ave', city: 'Kampala', state: 'Central', zip: '0000', area: 'Kololo', country: 'Uganda' },
    features: { interior: ['Floor-to-ceiling windows'], outdoor: ['Infinity Pool'], utilities: ['Backup Power'], other: ['24/7 Concierge'] },
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 42
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'projects' | 'services' | 'dashboard' | 'about' | 'contact' | 'login' | 'manage-content' | 'single-project' | 'single-property' | 'add-listing'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [auth, setAuth] = useState<{ user: UserProfile } | null>(null);
  const [currency, setCurrency] = useState<Currency>('UGX');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProperties(data);
          }
        }
      } catch (err) {
        console.error('FETCH_PROPERTIES_ERROR:', err);
      }
    };
    fetchProperties();
  }, []);

  const handleNavigate = useCallback((page: string, params?: any) => {
    const p = page.toLowerCase().trim().replace(/\s+/g, '-');
    if (p === 'single-project') { setSelectedProjectId(params?.id); setCurrentPage('single-project'); }
    else if (p === 'single-property') { setSelectedPropertyId(params?.id); setCurrentPage('single-property'); }
    else { setCurrentPage(p as any); }
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (u: any) => {
    setAuth({ user: { id: u.id || '1', name: u.name || 'User', email: u.email || 'user@smw.co.ug', role: u.role || 'buyer', isVerified: true } });
    handleNavigate('dashboard');
  };

  return (
    <GlobalErrorBoundary>
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#06080f] text-gray-100' : 'bg-white text-gray-900'}`} style={{ fontFamily: settings.fontFamily }}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <TopHeader onNavigate={handleNavigate} isAuthenticated={!!auth} user={auth?.user} onLogout={() => setAuth(null)} />
          <Navbar onNavigate={handleNavigate} activePage={currentPage} currency={currency} onToggleCurrency={() => setCurrency(c => c === 'UGX' ? 'USD' : 'UGX')} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
        </div>
        
        <main>
          {currentPage === 'home' && (
            <div className="animate-in fade-in duration-1000">
              <Hero currency={currency} />
              <EcosystemGrid />
              <WhoWeAre />
              <PartnerLogos />
              <FeaturedProperties currency={currency} />
              <PropertyFeed currency={currency} onPropertyClick={(id) => handleNavigate('single-property', { id })} />
              <Testimonials />
              <FAQ />
              <CTA />
            </div>
          )}
          {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
          {currentPage === 'properties' && <PropertiesPage properties={properties} onPropertyClick={(id) => handleNavigate('single-property', { id })} currency={currency} />}
          {currentPage === 'projects' && <ProjectsPage projects={projects} onProjectClick={(id) => handleNavigate('single-project', { id })} />}
          {currentPage === 'dashboard' && auth?.user && (
            <DashboardHub 
              userRole={auth.user.role} onRoleChange={() => {}} properties={properties} currency={currency} 
              onManageContent={() => setCurrentPage('manage-content')} 
            />
          )}
          {currentPage === 'manage-content' && auth?.user && (
            <ManageDashboard 
              settings={settings} onUpdateSettings={setSettings}
              properties={properties} onUpdateProperty={(p) => setProperties(prev => prev.map(item => item.id === p.id ? p : item))}
              projects={projects} onUpdateProject={(p) => setProjects(prev => prev.map(item => item.id === p.id ? p : item))} onAddProject={(p) => setProjects(prev => [p, ...prev])}
            />
          )}
          {currentPage === 'single-project' && <SingleProjectPage project={projects.find(p => p.id === selectedProjectId) || projects[0]} />}
          {currentPage === 'single-property' && <SinglePropertyPage property={properties.find(p => p.id === selectedPropertyId) || properties[0]} currency={currency} />}
        </main>
        <Footer />
        <VoiceAssistant />
      </div>
    </GlobalErrorBoundary>
  );
};

export default App;
