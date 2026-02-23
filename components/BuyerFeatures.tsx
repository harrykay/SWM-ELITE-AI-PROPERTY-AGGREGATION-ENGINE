
import React from 'react';
import { Home, Search, List, Heart, TrendingUp, Users } from 'lucide-react';

const BuyerFeatureRow: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  image: string;
  reverse?: boolean;
}> = ({ title, subtitle, description, icon, features, image, reverse }) => (
  <div className={`flex flex-col md:flex-row items-center gap-12 mb-32 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="w-full md:w-1/2">
      <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
        <span className="text-[#FF5A3D]">{title}</span> {subtitle}
      </h3>
      <p className="text-gray-600 mb-8 max-w-lg">{description}</p>
      <div className="space-y-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-50 text-[#FF5A3D] rounded-full flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{f}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="w-full md:w-1/2">
      <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
        <img src={image} className="w-full rounded-xl" alt={title} />
      </div>
    </div>
  </div>
);

export const BuyerFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold">
            More Buyer <span className="text-[#FF5A3D]">Features</span>
          </h2>
          <div className="w-32 h-1 bg-[#FF5A3D] mx-auto mt-4 rounded-full"></div>
        </div>

        <BuyerFeatureRow
          title="Property"
          subtitle="Listing"
          description="Discover and explore properties through clean, organized, and responsive listings with complete details."
          icon={<Home size={20} />}
          features={[
            "Clean & well organized property listings",
            "Advanced filters for quick search",
            "Detailed property cards with price & features"
          ]}
          image="https://picsum.photos/seed/list1/800/600"
        />

        <BuyerFeatureRow
          title="Collection"
          subtitle="& Access"
          description="Organize and manage your favorite properties in one place for with anyone quick access and collaboration."
          icon={<Heart size={20} />}
          features={[
            "Create custom property collections",
            "Manage collection access & permissions",
            "Share collections with team members"
          ]}
          image="https://picsum.photos/seed/list2/800/600"
          reverse
        />

        <BuyerFeatureRow
          title="Compare"
          subtitle="Property"
          description="Compare multiple properties side by side to make confident, informed decisions faster."
          icon={<Search size={20} />}
          features={[
            "Side-by-side property comparison",
            "Compare price, size & amenities easily",
            "Make confident, faster decisions"
          ]}
          image="https://picsum.photos/seed/list3/800/600"
        />

        <BuyerFeatureRow
          title="Investment"
          subtitle=""
          description="Invest in properties confidently with powerful insights and growth potential."
          icon={<TrendingUp size={20} />}
          features={[
            "Smart investment insights & ROI overview",
            "Cost breakdown & funding details",
            "Secure and transparent investment flow"
          ]}
          image="https://picsum.photos/seed/list4/800/600"
          reverse
        />
      </div>
    </section>
  );
};
