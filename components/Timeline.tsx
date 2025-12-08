import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../constants';
import { Briefcase } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section className="py-24 bg-[#050510] relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-16 gradient-border-l pl-6"
        >
          Experience
        </motion.h2>

        <div className="relative border-l-2 border-cyan-500/20 ml-4 md:ml-12 space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-16"
            >
              {/* Icon Dot */}
              <div className="absolute left-[-20px] top-0 w-10 h-10 rounded-full bg-black border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10">
                  <Briefcase size={18} />
              </div>
              
              <div className="glass-panel p-6 md:p-8 rounded-xl hover:bg-white/5 transition-colors border-l-4 border-l-cyan-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Briefcase size={80} className="text-cyan-500" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <p className="text-cyan-400 text-lg font-medium">{exp.company}</p>
                        {exp.location && <span className="text-gray-500 text-sm hidden md:block">• {exp.location}</span>}
                    </div>
                  </div>
                  <span className="text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full text-sm mt-2 md:mt-0 w-fit border border-violet-500/20 font-mono">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3 relative z-10">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-3">
                      <span className="text-cyan-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_5px_cyan]" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};