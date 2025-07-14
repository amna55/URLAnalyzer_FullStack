
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, ExternalLink, BarChart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { UrlForm } from './UrlForm';
import { WebsiteDetails } from './WebsiteDetails';
import { useToast } from '@/hooks/use-toast';

interface WebsiteData {
  id: number;
  title: string;
  url: string;
  status: 'queued' | 'running' | 'completed' | 'error';
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

export const Dashboard = () => {
  const [websites, setWebsites] = useState<WebsiteData[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteData | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data generation for demonstration
  const generateMockData = (url: string): Omit<WebsiteData, 'id'> => {
    const title = `${new URL(url).hostname.replace('www.', '')} - Website Analysis`;
    const internalLinks = Math.floor(Math.random() * 200) + 20;
    const externalLinks = Math.floor(Math.random() * 50) + 5;
    const brokenLinks = Math.floor(Math.random() * 10);
    
    return {
      title,
      url,
      status: 'completed',
      htmlVersion: 'HTML5',
      internalLinks,
      externalLinks,
      brokenLinks,
      headings: {
        h1: Math.floor(Math.random() * 5) + 1,
        h2: Math.floor(Math.random() * 10) + 2,
        h3: Math.floor(Math.random() * 15) + 3,
        h4: Math.floor(Math.random() * 8) + 1,
        h5: Math.floor(Math.random() * 5),
        h6: Math.floor(Math.random() * 3),
      },
      brokenLinksList: Array.from({ length: brokenLinks }, (_, i) => ({
        url: `${url}/broken-link-${i + 1}`,
        statusCode: [404, 403, 500, 502][Math.floor(Math.random() * 4)],
      })),
      lastCrawled: 'Just now',
    };
  };

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    
    // Create initial entry with 'queued' status
    const newId = Date.now();
    const newWebsite: WebsiteData = {
      id: newId,
      ...generateMockData(url),
      status: 'queued',
      title: 'Analyzing...',
      internalLinks: 0,
      externalLinks: 0,
      brokenLinks: 0,
      headings: { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
      brokenLinksList: [],
      lastCrawled: 'Queued',
    };

    setWebsites(prev => [newWebsite, ...prev]);

    // Simulate processing
    setTimeout(() => {
      setWebsites(prev => prev.map(site => 
        site.id === newId 
          ? { ...site, status: 'running' as const, lastCrawled: 'Processing...' }
          : site
      ));
    }, 500);

    // Complete analysis after delay
    setTimeout(() => {
      const completedData = generateMockData(url);
      setWebsites(prev => prev.map(site => 
        site.id === newId 
          ? { ...site, ...completedData, status: 'completed' as const }
          : site
      ));
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${url}`,
      });
    }, 3000);
  };

  const handleDelete = (ids: number[]) => {
    setWebsites(prev => prev.filter(site => !ids.includes(site.id)));
    setSelectedIds([]);
    toast({
      title: "Deleted",
      description: `Removed ${ids.length} website${ids.length > 1 ? 's' : ''} from analysis`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'running':
        return <Clock className="h-5 w-5 text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Website Analyzer Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Analyze any website to get detailed insights about its structure, links, and SEO elements
          </p>
        </div>

        <UrlForm onUrlSubmit={handleUrlSubmit} isLoading={isLoading} />

        {selectedIds.length > 0 && (
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() => handleDelete(selectedIds)}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedIds.length})
            </Button>
          </div>
        )}

        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">Analyzed Websites</h3>
            <p className="text-gray-400">Click on any row to view detailed analysis and charts</p>
          </div>
          
          {websites.length === 0 ? (
            <div className="p-12 text-center">
              <BarChart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No websites analyzed yet</p>
              <p className="text-gray-500 text-sm">Add a URL above to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <Checkbox
                        checked={selectedIds.length === websites.length && websites.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedIds(websites.map(site => site.id));
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Website</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Links</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Issues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {websites.map((site) => (
                    <tr 
                      key={site.id} 
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => site.status === 'completed' && setSelectedWebsite(site)}
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.includes(site.id)}
                          onCheckedChange={() => toggleSelection(site.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{site.title}</div>
                          <div className="text-sm text-gray-400 flex items-center">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            {site.url}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(site.status)}
                          <span className="text-sm capitalize text-gray-300">{site.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div>{site.internalLinks} internal</div>
                          <div>{site.externalLinks} external</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          site.brokenLinks === 0 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {site.brokenLinks} broken
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedWebsite && (
          <WebsiteDetails
            website={selectedWebsite}
            onClose={() => setSelectedWebsite(null)}
          />
        )}
      </div>
    </section>
  );
};
