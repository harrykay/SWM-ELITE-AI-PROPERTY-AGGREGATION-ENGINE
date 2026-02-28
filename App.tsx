
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
import { AddProjectPage } from './components/AddProjectPage';
import { SinglePropertyPage } from './components/SinglePropertyPage';
import { SingleProjectPage } from './components/SingleProjectPage';
import { ContactPage } from './components/ContactPage';
import { LandProcessingPage } from './components/LandProcessingPage';
import { DesignPage } from './components/DesignPage';
import { DashboardHub } from './components/DashboardHub';
import { ManageDashboard } from './components/ManageDashboard';
import { ComparisonModal } from './components/ComparisonModal';
import { BlogPage } from './components/BlogPage';
import { SingleBlogPage } from './components/SingleBlogPage';
import { VoiceAssistant } from './components/VoiceAssistant';
import { LoginPage } from './components/LoginPage';
import { ProjectsPage } from './components/ProjectsPage';
import { PropertyFeed } from './components/PropertyFeed';
import { LatestProjects } from './components/LatestProjects';
import { DynamicPage } from './components/DynamicPage';
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  publishedAt: string;
}

export interface Project {
  id: string; title: string; location: string; status: 'ongoing' | 'completed'; image: string;
  gallery?: string[]; category: string; client?: string; surfaceArea?: string;
  value?: string; architect?: string; timeline?: string; description?: string;
  requirements?: string[]; projectManager?: string;
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

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Kololo Residency Interior',
    location: 'Kololo, Kampala',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'Interior Design',
    description: 'A complete interior overhaul for a luxury penthouse in Kololo. The project involved custom cabinetry, high-end lighting fixtures, and premium marble finishes. Our team worked closely with the client to create a space that is both functional and aesthetically stunning.',
    client: 'Private Investor',
    surfaceArea: '320 m²',
    value: 'Shs 450M',
    architect: 'SMW Design Studio',
    timeline: 'Jan 2023 - June 2023',
    requirements: [
      'Custom marble flooring throughout',
      'Smart lighting integration',
      'Italian kitchen cabinetry',
      'Climate control optimization'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'p2',
    title: 'Naguru Modern Kitchen',
    location: 'Naguru, Kampala',
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    category: 'Renovation',
    description: 'Modern kitchen installation with high-end finishes and custom cabinetry. We transformed an outdated kitchen into a state-of-the-art culinary space featuring integrated appliances and a massive waterfall island.',
    client: 'Residential Client',
    surfaceArea: '45 m²',
    value: 'Shs 85M',
    architect: 'SMW Interior Team',
    timeline: 'Mar 2023 - May 2023',
    requirements: [
      'Integrated Bosch appliances',
      'Quartz countertops',
      'Soft-close cabinetry',
      'LED ambient lighting'
    ]
  },
  {
    id: 'p3',
    title: 'Entebbe Lakeside Villa',
    location: 'Entebbe',
    status: 'ongoing',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    category: 'Construction',
    description: 'Ongoing construction of a 5-bedroom luxury villa overlooking Lake Victoria. This project utilizes advanced structural engineering to maximize views while maintaining structural integrity on the sloping lakeside terrain.',
    client: 'International Client',
    surfaceArea: '1,200 m²',
    value: 'Shs 2.4B',
    architect: 'SMW Architecture',
    timeline: 'Sept 2023 - Present',
    requirements: [
      'Reinforced concrete structure',
      'Infinity pool overlooking the lake',
      'Sustainable water harvesting system',
      'Solar energy grid integration'
    ]
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'properties' | 'projects' | 'services' | 'dashboard' | 'about' | 'contact' | 'login' | 'manage-content' | 'single-project' | 'single-property' | 'add-listing' | 'add-project' | 'dynamic' | 'land-processing' | 'design' | 'blog' | 'single-blog'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [user, setUser] = useState<any>(null);
  const [auth, setAuth] = useState<{ user: UserProfile } | null>(null);
  const [currency, setCurrency] = useState<Currency>('UGX');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cmsSettings, setCmsSettings] = useState<any>({});
  const [cmsPages, setCmsPages] = useState<any[]>([]);

  const handleLogin = (loggedInUser: any) => {
    setUser(loggedInUser);
    handleNavigate('dashboard');
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setUser(null);
    handleNavigate('home');
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Not authenticated');
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      setAuth({ user: { id: String(user.id), name: user.email, email: user.email, role: user.role, isVerified: true } });
    } else {
      setAuth(null);
    }
  }, [user]);

  const handleNavigate = useCallback((page: string, params?: any) => {
    const p = page.toLowerCase().trim().replace(/\s+/g, '-');
    if (p === 'single-project') { setSelectedProjectId(params?.id); setCurrentPage('single-project'); }
    else if (p === 'single-property') { setSelectedPropertyId(params?.id); setCurrentPage('single-property'); }
    else if (p === 'single-blog') { setSelectedBlogSlug(params?.slug); setCurrentPage('single-blog'); }
    else if (p === 'dynamic') { setSelectedPageId(params?.id); setCurrentPage('dynamic'); }
    else { setCurrentPage(p as any); }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const [settingsRes, pagesRes] = await Promise.all([
          fetch('/api/cms/settings'),
          fetch('/api/cms/pages')
        ]);
        if (settingsRes.ok) setCmsSettings(await settingsRes.json());
        if (pagesRes.ok) setCmsPages(await pagesRes.json());
      } catch (err) {
        console.error('FETCH_CMS_DATA_ERROR:', err);
      }
    };
    fetchCmsData();
  }, []);

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
    
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.error('FETCH_PROJECTS_ERROR:', err);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setBlogs(data);
          }
        }
      } catch (err) {
        console.error('FETCH_BLOGS_ERROR:', err);
      }
    };

    fetchProperties();
    fetchProjects();
    fetchBlogs();
  }, []);

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('DELETE_PROPERTY_ERROR:', err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('DELETE_PROJECT_ERROR:', err);
    }
  };

  const protectedRoutes = ['dashboard', 'manage-content', 'add-listing', 'add-project'];
  if (!auth && (currentPage === 'login' || protectedRoutes.includes(currentPage))) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const isDashboard = ['dashboard', 'manage-content', 'add-listing'].includes(currentPage);

  return (
    <GlobalErrorBoundary>
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#06080f] text-gray-100' : 'bg-white text-gray-900'}`} style={{ fontFamily: settings.fontFamily }}>
        
        {!isDashboard && (
          <div className="fixed top-0 left-0 right-0 z-50">
            <TopHeader onNavigate={handleNavigate} isAuthenticated={!!auth} user={auth?.user} onLogout={() => setAuth(null)} />
            <Navbar 
              onNavigate={handleNavigate} 
              activePage={currentPage} 
              currency={currency} 
              onToggleCurrency={() => setCurrency(c => c === 'UGX' ? 'USD' : 'UGX')} 
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
              isDarkMode={isDarkMode}
              cmsPages={cmsPages}
              cmsMenus={[]}
            />
          </div>
        )}
        
        <main className={!isDashboard ? "pt-0" : ""}>
          {currentPage === 'home' && (
            <div className="animate-in fade-in duration-1000">
              <Hero currency={currency} />
              {cmsSettings.showEcosystem !== false && <EcosystemGrid />}
              {cmsSettings.showWhoWeAre !== false && <WhoWeAre />}
              <PartnerLogos />
              {cmsSettings.showFeatured !== false && <FeaturedProperties currency={currency} />}
              {cmsSettings.showLatestProjects !== false && (
                <LatestProjects 
                  projects={projects} 
                  onProjectClick={(id) => handleNavigate('single-project', { id })} 
                  onViewAll={() => handleNavigate('projects')}
                />
              )}
              <PropertyFeed currency={currency} onPropertyClick={(id) => handleNavigate('single-property', { id })} />
              {cmsSettings.showTestimonials !== false && <Testimonials />}
              {cmsSettings.showFAQ !== false && <FAQ />}
              <CTA />
            </div>
          )}
          {currentPage === 'properties' && <PropertiesPage properties={properties} onPropertyClick={(id) => handleNavigate('single-property', { id })} currency={currency} />}
          {currentPage === 'projects' && <ProjectsPage projects={projects} onProjectClick={(id) => handleNavigate('single-project', { id })} />}
          {currentPage === 'blog' && <BlogPage blogs={blogs} onBlogClick={(slug) => handleNavigate('single-blog', { slug })} />}
          {currentPage === 'about' && (
            <AboutPage content={{
              whoWeAre: "SMW Construction Developers is a premier real estate and construction firm based in Uganda.",
              background: "Founded in 1950, we have decades of experience in delivering high-quality infrastructure.",
              mission: "To provide innovative and sustainable architectural solutions.",
              vision: "To be the leading property ecosystem in East Africa."
            }} />
          )}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'services' && (
            <ServicesPage services={[
              { id: '1', title: 'Construction', description: 'High-quality building services.', details: ['Residential', 'Commercial'] },
              { id: '2', title: 'Design', description: 'Architectural design and planning.', details: ['3D Modeling', 'Blueprints'] }
            ]} />
          )}
          {currentPage === 'land-processing' && <LandProcessingPage />}
          {currentPage === 'design' && <DesignPage />}
          {currentPage === 'add-listing' && (
            <AddListingPage 
              userRole={auth?.user?.role || 'agent'} 
              currency={currency} 
              onAddProperty={(p) => setProperties(prev => [p, ...prev])} 
            />
          )}
          {currentPage === 'add-project' && (
            <AddProjectPage 
              onAddProject={(p) => setProjects(prev => [p, ...prev])} 
            />
          )}
          {currentPage === 'dashboard' && auth?.user && (
            <DashboardHub 
              userRole={auth.user.role} onRoleChange={() => {}} properties={properties} currency={currency} 
              onManageContent={() => setCurrentPage('manage-content')} 
              onLogout={handleLogout}
            />
          )}
          {currentPage === 'manage-content' && auth?.user && (
            <ManageDashboard 
              settings={settings} onUpdateSettings={setSettings}
              properties={properties} onUpdateProperty={(p) => setProperties(prev => prev.map(item => item.id === p.id ? p : item))}
              onDeleteProperty={handleDeleteProperty}
              projects={projects} onUpdateProject={(p) => setProjects(prev => prev.map(item => item.id === p.id ? p : item))} 
              onAddProject={(p) => setProjects(prev => [p, ...prev])}
              onDeleteProject={handleDeleteProject}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          )}
          {currentPage === 'single-project' && (
            projects.length > 0 ? (
              <SingleProjectPage project={projects.find(p => p.id === selectedProjectId) || projects[0]} />
            ) : (
              <div className="pt-40 text-center text-gray-500 font-black uppercase tracking-widest">Project Node Not Found</div>
            )
          )}
          {currentPage === 'single-property' && (
            properties.length > 0 ? (
              <SinglePropertyPage property={properties.find(p => p.id === selectedPropertyId) || properties[0]} currency={currency} />
            ) : (
              <div className="pt-40 text-center text-gray-500 font-black uppercase tracking-widest">Asset Node Not Found</div>
            )
          )}
          {currentPage === 'single-blog' && <SingleBlogPage blog={blogs.find(b => b.slug === selectedBlogSlug) || blogs[0]} onBack={() => handleNavigate('blog')} />}
          {currentPage === 'dynamic' && selectedPageId && (
            <DynamicPage page={cmsPages.find(p => p.id === selectedPageId)} />
          )}
        </main>

        {!isDashboard && <Footer />}
        <VoiceAssistant />
      </div>
    </GlobalErrorBoundary>
  );
};

export default App;
