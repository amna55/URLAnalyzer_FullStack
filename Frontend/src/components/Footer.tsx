
import { Globe, Zap, Github, Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="h-8 w-8 text-blue-400" />
                <Zap className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                WebCrawler Pro
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Next-generation web crawler built for developers who demand excellence.
              Analyze, monitor, and understand websites like never before.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Github className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Mail className="h-5 w-5 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Smart Web Crawling</li>
              <li className="hover:text-white transition-colors cursor-pointer">Real-time Analytics</li>
              <li className="hover:text-white transition-colors cursor-pointer">Bulk Operations</li>
              <li className="hover:text-white transition-colors cursor-pointer">Secure API</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Technology</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">React & TypeScript</li>
              <li className="hover:text-white transition-colors cursor-pointer">Go Backend</li>
              <li className="hover:text-white transition-colors cursor-pointer">MySQL Database</li>
              <li className="hover:text-white transition-colors cursor-pointer">Modern DevOps</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              Built for Sykell Full-Stack Developer Assessment.
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>and modern tech</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
