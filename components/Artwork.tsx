import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../constants';
import { Play, Image as ImageIcon, Box, X } from 'lucide-react';

export const Artwork: React.FC = () => {
    const [selectedArtwork, setSelectedArtwork] = useState<typeof PORTFOLIO_DATA.artwork[0] | null>(null);

    return (
        <section className="py-24 bg-black relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-16"
                >
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl text-white shadow-lg shadow-violet-500/20">
                        <Box size={32} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">Blender Artwork</h2>
                        <p className="text-gray-400 mt-2">3D Renders, Animations, and Visual Effects</p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PORTFOLIO_DATA.artwork.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedArtwork(item)}
                            className="group relative aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all cursor-pointer"
                        >
                            <img
                                src={item.thumbnail || item.url}
                                alt={item.title}
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="p-1.5 bg-violet-600 rounded-full text-white">
                                        {item.type === 'video' ? <Play size={12} fill="white" /> : <ImageIcon size={12} />}
                                    </span>
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    {item.description}
                                </p>
                            </div>

                            {/* Play Button Overlay for Videos */}
                            {item.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                                        <Play size={32} fill="white" className="text-white ml-1" />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Add New Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="aspect-video bg-zinc-900/30 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors group cursor-pointer"
                    >
                        <Box size={40} className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="font-mono text-sm">Add more .mp4 / .blend</span>
                    </motion.div>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedArtwork && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedArtwork(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedArtwork(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="aspect-video w-full bg-black">
                                {selectedArtwork.type === 'video' ? (
                                    <video
                                        src={selectedArtwork.url}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src={selectedArtwork.url}
                                        alt={selectedArtwork.title}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>

                            <div className="p-6 bg-zinc-900">
                                <h3 className="text-2xl font-bold text-white mb-2">{selectedArtwork.title}</h3>
                                <p className="text-gray-400">{selectedArtwork.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};