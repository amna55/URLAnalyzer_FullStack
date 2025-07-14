
import { Globe, BarChart3, Shield, Zap, Search, Settings } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: Globe,
      title: 'Smart Web Crawling',
      description: 'Advanced crawling engine that analyzes HTML structure, counts headings, and identifies internal vs external links.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Beautiful charts and graphs showing link distribution, broken links analysis, and comprehensive site metrics.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Secure & Authenticated',
      description: 'All API requests use robust authorization mechanisms ensuring your data stays protected and secure.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Monitor crawl progress in real-time with live status updates from queued to running to completion.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Search,
      title: 'Advanced Filtering',
      description: 'Powerful search and filter capabilities with pagination, sorting, and fuzzy matching across all results.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Settings,
      title: 'Bulk Operations',
      description: 'Efficiently manage multiple URLs with bulk actions for re-running analysis or deleting selected entries.',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to analyze, monitor, and understand websites at scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/5 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-blue-100 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
