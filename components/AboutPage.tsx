
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, ShieldCheck, Gem, Users, Lightbulb, 
  UserCheck, CheckCircle, Building2, Construction, 
  Briefcase, BarChart3, ClipboardCheck, Headphones,
  Handshake, Zap, Award, History, Repeat
} from 'lucide-react';
import { AboutContent } from '../App';

interface AboutPageProps {
  content: AboutContent;
}

export const AboutPage: React.FC<AboutPageProps> = ({ content }) => {
  return (
    <div className="pt-36 md:pt-52 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-[#8DC63F] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Established 1950</span>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 uppercase tracking-tighter leading-[0.9]">
            Architecting <span className="text-[#8DC63F]">Trust</span><br />
            Across Generations.
          </h1>
          <div className="w-24 h-2 bg-[#8DC63F] mx-auto mb-12"></div>
          <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Building lasting value across Uganda and the diaspora since our foundations in 1950.
          </p>
        </motion.div>

        {/* Who We Are Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Who We Are</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                SMW Construction Developers is a premier real estate development, construction, and property management company in Uganda, serving local and international investors, including the Ugandan diaspora.
              </p>
              <div className="space-y-4">
                <h3 className="text-xs font-black text-[#8DC63F] uppercase tracking-widest">Our Integrated Approach</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Building2 size={18} />, text: 'Real Estate Development' },
                    { icon: <Construction size={18} />, text: 'Construction & Infrastructure' },
                    { icon: <Briefcase size={18} />, text: 'Full-Service Property Management' },
                    { icon: <BarChart3 size={18} />, text: 'Strategic Asset Management' },
                    { icon: <ClipboardCheck size={18} />, text: 'Financial & Lease Administration' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <span className="text-[#8DC63F]">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[#8DC63F]">Prestigious Portfolio</h3>
                <p className="text-gray-400">We manage some of Kampala’s most prestigious office addresses, including:</p>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#8DC63F] pl-6 py-2">
                    <h4 className="text-xl font-black text-white">Crested Towers</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Newly refurbished 15,000 sq m landmark office complex</p>
                  </div>
                  <div className="border-l-2 border-gray-700 pl-6 py-2">
                    <h4 className="text-xl font-black text-white">Rwenzori Courts</h4>
                  </div>
                  <div className="border-l-2 border-gray-700 pl-6 py-2">
                    <h4 className="text-xl font-black text-white">Rwenzori House</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic pt-4">
                  Our portfolio spans large mixed-use commercial developments, office and retail complexes, and premium luxury estates in and around Kampala.
                </p>
              </div>
              <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.03] pointer-events-none" />
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="mb-32 bg-gray-50 -mx-4 px-4 py-24 md:rounded-[4rem]">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-xs font-black text-[#8DC63F] uppercase tracking-[0.4em] mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-8">Property Management Excellence in Uganda</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our dedicated property management division oversees a diverse range of commercial and residential properties. We deliver professional, transparent, and results-driven solutions designed to:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Maximize Yields', desc: 'Maximize rental yields and investment returns for property owners.' },
              { title: 'Protect Assets', desc: 'Protect and enhance asset value through meticulous maintenance.' },
              { title: 'Regulatory Compliance', desc: 'Ensure full regulatory compliance with local laws and standards.' },
              { title: 'Tenant Satisfaction', desc: 'Improve tenant satisfaction and retention through proactive engagement.' },
              { title: 'Operational Standards', desc: 'Maintain world-class operational standards across all managed nodes.' },
              { title: 'Advanced Technology', desc: 'Leverage advanced technology and robust accounting systems.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-2xl flex items-center justify-center text-[#8DC63F] mb-6">
                  <CheckCircle size={24} />
                </div>
                <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Services Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Core Property Management Services</h2>
              <p className="text-gray-500 mt-4 font-medium">Our comprehensive services include everything needed to safeguard and grow your investment.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: 'Staff Management', text: 'Selection and management of on-site staff (front-of-house, porters, maintenance).' },
              { icon: Construction, title: 'Facilities Management', text: 'Full facilities management and preventive maintenance protocols.' },
              { icon: BarChart3, title: 'Financial Management', text: 'Budgeting, accounting, and service charge administration.' },
              { icon: Zap, title: 'Asset Optimization', text: 'Strategic asset management and performance optimization.' },
              { icon: Handshake, title: 'Tenant Liaison', text: 'Tenant liaison and resident engagement strategies.' },
              { icon: ClipboardCheck, title: 'Rent Collection', text: 'Rent collection, accounting, and transparent reporting.' },
              { icon: Repeat, title: 'Lease Renewals', text: 'Lease renewals and professional negotiation services.' },
              { icon: UserCheck, title: 'Representation', text: 'Tenant representation services for commercial clients.' }
            ].map((service, i) => (
              <div key={i} className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl transition-all group">
                <div className="text-gray-300 group-hover:text-[#8DC63F] transition-colors mb-6">
                  <service.icon size={32} />
                </div>
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">{service.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-32">
          <div className="bg-gray-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-xs font-black text-[#8DC63F] uppercase tracking-[0.4em] mb-6">Why Choose SMW?</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                  Integrity. Expertise.<br />
                  Long-Term Value.
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-12">
                  At SMW, professionalism and integrity are at the core of everything we do. Our meticulous attention to detail, industry knowledge, and commitment to excellence have earned us a reputation as one of Uganda’s most respected property consultancies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    'Measurable Performance',
                    'Long-Term Relationships',
                    'Continuous Innovation',
                    'Sustainable Solutions',
                    'Secure Diaspora Support'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 text-sm font-bold">
                      <div className="w-2 h-2 bg-[#8DC63F] rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                  <p className="text-white text-xl font-medium leading-relaxed italic">
                    "Whether you are investing from abroad or managing property locally, we provide the expertise and structure necessary to safeguard and grow your investment."
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#8DC63F] rounded-full flex items-center justify-center text-black font-black">SMW</div>
                    <div>
                      <p className="text-white font-black uppercase tracking-widest text-xs">Executive Board</p>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">SMW Construction Developers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Award className="absolute -top-20 -right-20 w-96 h-96 text-white/[0.02] pointer-events-none" />
          </div>
        </section>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#8DC63F] mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide innovative, sustainable, and high-quality architectural, construction, and property management solutions that create long-term value for our clients and communities.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#8DC63F] p-12 rounded-[3.5rem] shadow-xl shadow-[#8DC63F]/10"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#8DC63F] mb-8">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">Our Vision</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              To become the leading integrated property ecosystem in East Africa, setting the benchmark for excellence in real estate development, construction, and property management.
            </p>
          </motion.div>
        </div>

        {/* Legacy Section */}
        <section className="text-center py-24 border-t border-gray-100">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8">
            <History size={14} /> 70+ Years of Trusted Expertise
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter max-w-5xl mx-auto leading-none mb-12">
            We do not simply build structures — we build <span className="text-[#8DC63F]">enduring value</span> for generations.
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto font-medium">
            With more than seven decades of experience, SMW Construction Developers continues to shape Uganda’s real estate sector through responsible development, strategic management, and forward-thinking innovation.
          </p>
        </section>

      </div>
    </div>
  );
};
