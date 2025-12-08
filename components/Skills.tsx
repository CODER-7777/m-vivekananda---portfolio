import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../constants';

export const Skills: React.FC = () => {
    
  // Group skills by category
  const categories = Array.from(new Set(PORTFOLIO_DATA.skills.map(s => s.category)));

  return (
    <section className="py-24 bg-[#050510] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-16 gradient-border-l pl-6"
        >
          Technical Proficiency
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {categories.map((category, catIndex) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 }}
                >
                    <h3 className="text-xl font-bold text-cyan-400 mb-8 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-violet-500 rounded-full" />
                        {category}
                    </h3>
                    <div className="space-y-6">
                        {PORTFOLIO_DATA.skills
                            .filter(s => s.category === category)
                            .map((skill, index) => (
                                <div key={skill.name} className="group">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-300 font-medium group-hover:text-cyan-300 transition-colors">{skill.name}</span>
                                        <span className="text-gray-500 text-xs font-mono">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                            className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};