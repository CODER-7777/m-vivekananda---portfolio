import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../constants';

export const Skills: React.FC = () => {

    // Group skills by category
    const categories = Array.from(new Set(PORTFOLIO_DATA.skills.map(s => s.category)));

    return (
        <section className="py-12 bg-[#050510] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-8 gradient-border-l pl-6"
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
                            <div className="flex flex-wrap gap-3">
                                {PORTFOLIO_DATA.skills
                                    .filter(s => s.category === category)
                                    .map((skill, index) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.05 }}
                                            className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default"
                                        >
                                            {skill.name}
                                        </motion.div>
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