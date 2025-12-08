import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

export const Education: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-16 gradient-border-l pl-6"
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:border-violet-500/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-violet-500">
                <GraduationCap size={100} />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-gray-400 mb-4">{edu.institution}</p>
                
                <div className="flex items-center gap-2 text-sm text-cyan-300 mb-4">
                  <Calendar size={14} />
                  <span>{edu.period}</span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{edu.board}</span>
                    <span className="font-mono text-violet-400 font-bold">{edu.score}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};