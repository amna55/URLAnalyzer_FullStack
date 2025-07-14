
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WebsiteData {
  id: number;
  title: string;
  url: string;
  status: string;
  htmlVersion: string;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: number;
  headings: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  brokenLinksList: Array<{
    url: string;
    statusCode: number;
  }>;
  lastCrawled: string;
}

interface WebsiteDetailsProps {
  website: WebsiteData;
  onClose: () => void;
}

export const WebsiteDetails = ({ website, onClose }: WebsiteDetailsProps) => {
  const headingData = [
    { name: 'H1', count: website.headings.h1 },
    { name: 'H2', count: website.headings.h2 },
    { name: 'H3', count: website.headings.h3 },
    { name: 'H4', count: website.headings.h4 },
    { name: 'H5', count: website.headings.h5 },
    { name: 'H6', count: website.headings.h6 },
  ];

  const linkData = [
    { name: 'Internal Links', value: website.internalLinks, color: '#3b82f6' },
    { name: 'External Links', value: website.externalLinks, color: '#8b5cf6' },
    { name: 'Broken Links', value: website.brokenLinks, color: '#ef4444' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{website.title}</h2>
            <div className="flex items-center text-gray-400 mt-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              <a href={website.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {website.url}
              </a>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
              <div className="text-2xl font-bold text-white">{website.internalLinks}</div>
              <div className="text-sm text-gray-300">Internal Links</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
              <div className="text-2xl font-bold text-white">{website.externalLinks}</div>
              <div className="text-sm text-gray-300">External Links</div>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg p-4 border border-red-500/30">
              <div className="text-2xl font-bold text-white">{website.brokenLinks}</div>
              <div className="text-sm text-gray-300">Broken Links</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-white">{website.htmlVersion}</div>
              <div className="text-sm text-gray-300">HTML Version</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Heading Distribution */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Heading Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={headingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Link Distribution */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Link Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={linkData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {linkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {linkData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Broken Links List */}
          {website.brokenLinksList.length > 0 && (
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                Broken Links ({website.brokenLinksList.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {website.brokenLinksList.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-gray-300 text-sm truncate flex-1 mr-4">{link.url}</span>
                    <span className="text-red-400 font-mono text-sm">{link.statusCode}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
