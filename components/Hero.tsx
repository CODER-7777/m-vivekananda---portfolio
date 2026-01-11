import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import { CSSRobot } from './CSSRobot';

const TYPING_TEXTS = [
  "Civil Engineer",
  "Robotics Enthusiast",
  "ML Practitioner",
  "Autonomous Systems Builder"
];

// Main Drone Animation
const DroneAnimation = () => (
  <motion.div
    className="absolute top-1/4 right-[15%] w-32 h-32 md:w-48 md:h-48 opacity-20 md:opacity-40 pointer-events-none z-0"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {/* Central Body */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-violet-500/20 rounded-full border border-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.5)]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
    </div>
    {/* Arms */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-violet-500/30 rotate-45" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-violet-500/30 -rotate-45" />

    {/* Rotors */}
    {[
      "top-0 left-0",
      "top-0 right-0",
      "bottom-0 left-0",
      "bottom-0 right-0"
    ].map((pos, i) => (
      <motion.div
        key={i}
        className={`absolute ${pos} w-16 h-16 border-2 border-dashed border-cyan-500/30 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </motion.div>
);

// Secondary "Scanner Bot" Animation
const ScannerBot = () => (
  <motion.div
    className="absolute bottom-1/3 left-[10%] w-16 h-16 pointer-events-none z-0 hidden md:block"
    animate={{
      x: [0, 100, 0],
      y: [0, -50, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="w-full h-full border border-cyan-500/30 rounded-full flex items-center justify-center relative"
    >
      <div className="w-8 h-8 bg-cyan-900/40 rounded-full border border-cyan-500/50" />
      <div className="absolute -top-1 w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_10px_#7c3aed]" />
    </motion.div>
  </motion.div>
);

const HUDOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Scanning Line */}
    <motion.div
      className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-20"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />

    {/* Corner Brackets */}
    <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-violet-500/20 rounded-tl-3xl" />
    <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl" />

    {/* Random Floating Hexagons */}
    <motion.div
      className="absolute top-1/3 left-10 text-violet-500/10 text-6xl"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      ⬡
    </motion.div>
  </div>
);

const HumanoidBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 25; // Parallax strength
      const y = (e.clientY - innerHeight / 2) / 25;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="absolute right-0 bottom-0 z-0 opacity-20 md:opacity-40 pointer-events-none select-none mix-blend-screen"
      animate={{
        x: mousePosition.x * -1, // Inverese movement for depth
        y: mousePosition.y * -1
      }}
      transition={{ type: "spring", stiffness: 75, damping: 15 }}
    >
      <img
        src="https://images.unsplash.com/photo-1546188994-03c14d934271?q=80&w=1974&auto=format&fit=crop"
        alt="Humanoid Robot"
        className="w-[800px] h-auto object-cover mask-image-gradient"
        style={{
          maskImage: 'linear-gradient(to top, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 100%)'
        }}
      />
      {/* Glowing Eyes Effect */}
      <div className="absolute top-[30%] left-[45%] w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]" />
      <div className="absolute top-[30%] left-[55%] w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]" />
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = TYPING_TEXTS[textIndex];
    const typeSpeed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#030014]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px]"
        />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <DroneAnimation />
      <ScannerBot />
      {/* <HumanoidBackground /> */}
      <CSSRobot />
      <HUDOverlay />

      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col items-center text-center">


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight neon-text"
          >
            {PORTFOLIO_DATA.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-12 md:h-16 mb-8 flex items-center justify-center"
          >
            <span className="text-2xl md:text-4xl text-gray-300 font-light">
              I am a <span className="font-semibold gradient-text">{displayText}</span>
              <span className="animate-pulse text-violet-500">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-6 leading-relaxed"
          >
            {PORTFOLIO_DATA.about}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 mb-8"
          >
            {[
              { link: PORTFOLIO_DATA.socials.github, Icon: Github },
              { link: PORTFOLIO_DATA.socials.linkedin, Icon: Linkedin },
              { link: `mailto:${Array.isArray(PORTFOLIO_DATA.socials.email) ? PORTFOLIO_DATA.socials.email[0] : PORTFOLIO_DATA.socials.email}`, Icon: Mail }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="group p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all border border-white/10 relative overflow-hidden shadow-[0_0_15px_rgba(124,58,237,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <social.Icon size={24} className="relative z-10 text-gray-300 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-500/50"
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};