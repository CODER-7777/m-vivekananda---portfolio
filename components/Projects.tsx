import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

export const Projects: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-16 gradient-border-l pl-6"
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.projects.map((proj, index) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/10 hover:border-cyan-500/50 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                 <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute bottom-4 left-6 z-20">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                    </h3>
                    {proj.subtitle && (
                        <p className="text-cyan-300 text-sm font-mono">{proj.subtitle}</p>
                    )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-violet-300 border border-violet-500/30 bg-violet-500/10 px-2 py-1 rounded-full">{proj.period}</span>
                </div>
                
                <ul className="text-gray-400 text-sm mb-6 space-y-2 list-disc list-inside">
                  {proj.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.techStack.map(tech => (
                    <span key={tech} className="text-xs font-mono text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded flex items-center gap-1 border border-cyan-500/20">
                      <Layers size={10} /> {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 border-t border-white/10 pt-4">
                    <button className="flex items-center gap-2 text-sm text-white hover:text-cyan-400 transition-colors">
                      <Code size={16} /> View Code
                    </button>
                    {proj.link && (
                        <button className="flex items-center gap-2 text-sm text-white hover:text-cyan-400 transition-colors">
                        <ExternalLink size={16} /> Live Demo
                        </button>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};