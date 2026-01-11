import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const CSSRobot: React.FC = () => {
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
    const robotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!robotRef.current) return;

            const rect = robotRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate angle and distance
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 30); // Limit movement range

            const x = Math.cos(angle) * (distance / 5); // Scale down movement
            const y = Math.sin(angle) * (distance / 5);

            setPupilPos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={robotRef}
            className="absolute right-[10%] bottom-[10%] md:bottom-[20%] z-0 pointer-events-none select-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{
                y: [0, -15, 0],
                opacity: 1
            }}
            transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1 }
            }}
        >
            {/* Robot Container */}
            <div className="relative w-48 h-56 md:w-64 md:h-80">

                {/* Antenna */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-t from-gray-700 to-gray-500 overflow-visible -z-10">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
                </div>

                {/* Head */}
                <div className="absolute top-12 left-0 w-full h-40 bg-[#1a1a2e] rounded-[2rem] border-4 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center justify-center overflow-hidden">
                    {/* Face Screen */}
                    <div className="w-[90%] h-[80%] bg-[#0f0f1a] rounded-[1.5rem] border border-white/10 relative overflow-hidden flex items-center justify-center gap-6 shadow-inner cursor-pointer group">

                        {/* Scanlines Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                        {/* Left Eye */}
                        <div className="w-16 h-16 bg-cyan-900/50 rounded-full relative flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <motion.div
                                className="w-10 h-10 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] flex items-center justify-center"
                                animate={{ x: pupilPos.x, y: pupilPos.y }}
                                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            >
                                <motion.div
                                    className="w-3 h-3 bg-white rounded-full opacity-80"
                                    animate={{ x: pupilPos.x * 0.5, y: pupilPos.y * 0.5 }}
                                />
                            </motion.div>
                        </div>

                        {/* Right Eye */}
                        <div className="w-16 h-16 bg-cyan-900/50 rounded-full relative flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <motion.div
                                className="w-10 h-10 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] flex items-center justify-center"
                                animate={{ x: pupilPos.x, y: pupilPos.y }}
                                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            >
                                <motion.div
                                    className="w-3 h-3 bg-white rounded-full opacity-80"
                                    animate={{ x: pupilPos.x * 0.5, y: pupilPos.y * 0.5 }}
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Mouth/Voice Line */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-1 bg-cyan-500/30 rounded-full overflow-hidden flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-cyan-400 rounded-full"
                                animate={{ height: [4, 12, 4] }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.1
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Neck */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-16 bg-gray-800 -z-10 rounded-b-xl border-x-2 border-gray-600" />

                {/* Body Top */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-28 bg-[#1a1a2e] rounded-t-[3rem] border-t-4 border-x-4 border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.2)] flex justify-center pt-6">
                    {/* Chest Core */}
                    <div className="w-20 h-20 rounded-full bg-violet-900/30 border border-violet-400/50 flex items-center justify-center relative">
                        <motion.div
                            className="w-12 h-12 bg-violet-500 rounded-full shadow-[0_0_25px_#8b5cf6]"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
