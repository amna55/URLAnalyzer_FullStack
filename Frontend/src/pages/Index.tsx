
import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { Features } from '@/components/Features';
import { Dashboard } from '@/components/Dashboard';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'dashboard'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">
      <Navigation activeSection={activeSection} />
      <Hero />
      <Features />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default Index;
