
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UrlFormProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlForm = ({ onUrlSubmit, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      // If input doesn't start with http or https, prepend http://
      const normalizedUrl = url.startsWith('http://') || url.startsWith('https://')
        ? url
        : 'http://' + url;

      new URL(normalizedUrl);

      onUrlSubmit(normalizedUrl);
      setUrl('');
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-sm p-6 mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Add Website to Analyze</h3>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </form>
    </div>
  );
};
