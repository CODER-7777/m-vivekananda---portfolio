import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundAnimation: React.FC = () => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Interactive Spotlight */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
                }}
            />

            {/* Sliding Grid */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-50%" }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 w-full h-[200%] opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(to right, #b026ff 1px, transparent 1px),
                            linear-gradient(to bottom, #00f3ff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 80%)`
                }}
            />

            {/* Floating Particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => {
                    const colors = ['bg-fuchsia-500', 'bg-cyan-400', 'bg-violet-500'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    return (
                        <motion.div
                            key={i}
                            className={`absolute w-1 h-1 ${randomColor} rounded-full opacity-40`}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                scale: Math.random() * 0.8 + 0.5,
                            }}
                            animate={{
                                y: [null, Math.random() * 100 + "%"],
                                opacity: [0.2, 0.8, 0.2],
                                x: [null, (Math.random() - 0.5) * 50], // Add slight horizontal drift
                            }}
                            transition={{
                                duration: Math.random() * 10 + 15,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    )
                })}
            </div>

            {/* Radial Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014]" />
        </div>
    );
};
