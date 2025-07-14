
import { Code, Database, Server, Smartphone } from 'lucide-react';

export const TechStack = () => {
  const technologies = [
    {
      category: 'Frontend',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      techs: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      category: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      techs: ['Go (Golang)', 'Gin Framework', 'REST APIs', 'JWT Auth']
    },
    {
      category: 'Database',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      techs: ['MySQL', 'Migrations', 'Indexing', 'Optimization']
    },
    {
      category: 'DevOps',
      icon: Code,
      color: 'from-orange-500 to-red-500',
      techs: ['Docker', 'CI/CD', 'Testing', 'Monitoring']
    }
  ];

  return (
    <section id="tech" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built with modern, scalable technologies for maximum performance and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/5 hover:border-white/20 transition-all duration-500 hover:scale-105"
            >
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${tech.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <tech.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-6 text-white">
                  {tech.category}
                </h3>
                
                <div className="space-y-2">
                  {tech.techs.map((techName, techIndex) => (
                    <div
                      key={techIndex}
                      className="px-3 py-2 rounded-lg bg-white/5 text-gray-300 text-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      {techName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
            <Code className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-gray-300">Production-ready architecture with 8+ hours of development</span>
          </div>
        </div>
      </div>
    </section>
  );
};
