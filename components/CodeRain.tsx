import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';

interface CodeChar {
    x: number;
    y: number;
    char: string;
    speed: number;
    projectName?: string;
}

export const CodeRain: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const charsRef = useRef<CodeChar[]>([]);
    const hoveredProjectRef = useRef<string | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Get code snippets from projects
        const codeSnippets: string[] = [];
        PORTFOLIO_DATA.projects.forEach(project => {
            project.techStack.forEach(tech => {
                codeSnippets.push(tech);
            });
            codeSnippets.push(project.title);
        });

        // Initialize characters
        const init = () => {
            charsRef.current = [];
            const columns = Math.floor(canvas.width / 20);
            for (let i = 0; i < columns; i++) {
                charsRef.current.push({
                    x: i * 20,
                    y: Math.random() * canvas.height,
                    char: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
                    speed: 1 + Math.random() * 3,
                    projectName: PORTFOLIO_DATA.projects[Math.floor(Math.random() * PORTFOLIO_DATA.projects.length)].title,
                });
            }
        };

        // Set canvas size and re-init
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        resize();
        window.addEventListener('resize', resize);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Check hover
            hoveredProjectRef.current = null;
            charsRef.current.forEach(char => {
                const distance = Math.sqrt(
                    Math.pow(char.x - e.clientX, 2) + Math.pow(char.y - e.clientY, 2)
                );
                if (distance < 50) {
                    hoveredProjectRef.current = char.projectName || null;
                }
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(5, 4, 20, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '14px monospace';
            ctx.fillStyle = '#7c3aed';

            charsRef.current.forEach(char => {
                // Check if mouse is near
                const distance = Math.sqrt(
                    Math.pow(char.x - mouseRef.current.x, 2) + Math.pow(char.y - mouseRef.current.y, 2)
                );

                if (distance < 50) {
                    // Pause and highlight
                    ctx.fillStyle = '#06b6d4';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#06b6d4';
                } else {
                    ctx.fillStyle = '#7c3aed';
                    ctx.shadowBlur = 0;
                    char.y += char.speed;
                }

                ctx.fillText(char.char.charAt(Math.floor(char.y / 20) % char.char.length), char.x, char.y);

                // Reset position
                if (char.y > canvas.height) {
                    char.y = 0;
                    char.char = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                    char.projectName = PORTFOLIO_DATA.projects[Math.floor(Math.random() * PORTFOLIO_DATA.projects.length)].title;
                }
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0 opacity-30"
                style={{ mixBlendMode: 'screen' }}
            />
        </>
    );
};
