import React from 'react';
import { motion } from 'framer-motion';

export const ARPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#030014] text-white flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-4xl font-bold mb-6 gradient-text">
                    AR Experience
                </h1>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-6">
                    <p className="text-gray-400 mb-4">
                        This is a placeholder for the AR experience. In a full implementation, this would use:
                    </p>
                    <ul className="text-left text-gray-300 space-y-2 mb-6">
                        <li>• WebXR API for AR capabilities</li>
                        <li>• Camera access for AR view</li>
                        <li>• 3D models of projects/portfolio elements</li>
                        <li>• Marker-based or markerless AR tracking</li>
                        <li>• Interactive 3D holographic elements</li>
                    </ul>

                    <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-[2px] rounded-lg">
                        <div className="bg-[#030014] p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-3 text-cyan-400">
                                🚀 Future Implementation
                            </h3>
                            <p className="text-sm text-gray-400">
                                WebXR/AR.js integration would enable viewing 3D models of projects,
                                an interactive holographic business card, and spatial navigation through
                                portfolio content in augmented reality.
                            </p>
                        </div>
                    </div>
                </div>

                <motion.a
                    href="#/"
                    className="inline-block px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← Back to Portfolio
                </motion.a>
            </motion.div>
        </div>
    );
};
