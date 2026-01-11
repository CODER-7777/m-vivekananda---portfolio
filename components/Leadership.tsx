import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Star, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

export const Leadership: React.FC = () => {
    return (
        <section className="py-12 bg-black relative overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-20 w-96 h-96 bg-violet-900 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-8 gradient-border-l pl-6"
                >
                    Leadership & Certifications
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Leadership Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Users className="text-cyan-500" /> Positions of Responsibility
                        </h3>
                        <div className="space-y-6">
                            {PORTFOLIO_DATA.leadership.map((pos, index) => (
                                <motion.div
                                    key={pos.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 p-4 rounded-xl border-l-4 border-cyan-600 hover:bg-white/10 transition-colors"
                                >
                                    <h4 className="text-lg font-semibold text-white">{pos.role}</h4>
                                    <p className="text-gray-400 text-sm">{pos.organization}</p>
                                    <p className="text-violet-400 text-xs mt-2 font-mono">{pos.period}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Award className="text-violet-500" /> Certifications
                        </h3>
                        <div className="grid gap-4">
                            {PORTFOLIO_DATA.certifications.map((cert, index) => (
                                <motion.a
                                    key={index}
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-panel p-6 rounded-xl flex items-center justify-between gap-4 hover:scale-[1.02] transition-transform group cursor-pointer border-l-4 border-transparent hover:border-violet-500"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-violet-500/20 p-3 rounded-full text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                            <Star size={24} />
                                        </div>
                                        <span className="text-lg text-gray-200 group-hover:text-white transition-colors">{cert.name}</span>
                                    </div>
                                    <ExternalLink size={18} className="text-gray-500 group-hover:text-cyan-400" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};