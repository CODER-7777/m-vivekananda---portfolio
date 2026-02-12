import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { PORTFOLIO_DATA } from '../constants';

export const PhysicsSkills: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [isPhysicsActive, setIsPhysicsActive] = useState(false);

    useEffect(() => {
        if (!canvasRef.current || !isPhysicsActive) return;

        // Create engine
        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 0.5, scale: 0.001 },
        });
        engineRef.current = engine;

        const render = Matter.Render.create({
            element: canvasRef.current,
            engine: engine,
            options: {
                width: canvasRef.current.clientWidth,
                height: 600,
                wireframes: false,
                background: 'transparent',
            },
        });

        // Create boundaries
        const walls = [
            Matter.Bodies.rectangle(render.options.width! / 2, 0, render.options.width!, 10, { isStatic: true }),
            Matter.Bodies.rectangle(render.options.width! / 2, 600, render.options.width!, 10, { isStatic: true }),
            Matter.Bodies.rectangle(0, 300, 10, 600, { isStatic: true }),
            Matter.Bodies.rectangle(render.options.width!, 300, 10, 600, { isStatic: true }),
        ];

        // Create skill bodies
        const skills = PORTFOLIO_DATA.skills.map((skill, index) => {
            const x = 100 + (index % 10) * 80;
            const y = 100 + Math.floor(index / 10) * 60;
            const width = skill.name.length * 8 + 30;
            const height = 40;

            const body = Matter.Bodies.rectangle(x, y, width, height, {
                restitution: 0.8,
                friction: 0.01,
                render: {
                    fillStyle: 'rgba(255, 255, 255, 0.05)',
                    strokeStyle: '#06b6d4',
                    lineWidth: 2,
                },
            });

            // Store skill name for rendering
            (body as any).skillName = skill.name;

            return body;
        });

        // Add all bodies to world
        Matter.Composite.add(engine.world, [...walls, ...skills]);

        // Mouse control
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });

        Matter.Composite.add(engine.world, mouseConstraint);

        // Run engine and renderer
        Matter.Render.run(render);
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Custom render loop for text
        const renderText = () => {
            const ctx = render.canvas.getContext('2d');
            if (!ctx) return;

            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            skills.forEach(body => {
                const { x, y } = body.position;
                const angle = body.angle;

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);
                ctx.fillStyle = '#06b6d4';
                ctx.fillText((body as any).skillName, 0, 0);
                ctx.restore();
            });

            requestAnimationFrame(renderText);
        };
        renderText();

        // Cleanup
        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            render.canvas.remove();
        };
    }, [isPhysicsActive]);

    return (
        <section className="py-12 bg-[#050510] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-white gradient-border-l pl-6">
                        Technical Proficiency
                    </h2>
                    <button
                        onClick={() => setIsPhysicsActive(!isPhysicsActive)}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
                    >
                        {isPhysicsActive ? 'Static Mode' : 'Physics Mode 🎮'}
                    </button>
                </div>

                {isPhysicsActive ? (
                    <div>
                        <p className="text-gray-400 mb-4 text-center">
                            🎮 Drag and throw skills around! Watch them bounce and collide!
                        </p>
                        <div ref={canvasRef} className="w-full" />
                    </div>
                ) : (
                    <StaticSkills />
                )}
            </div>
        </section>
    );
};

// Static skills fallback
const StaticSkills: React.FC = () => {
    const categories = Array.from(new Set(PORTFOLIO_DATA.skills.map(s => s.category)));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {categories.map((category, catIndex) => (
                <div key={category}>
                    <h3 className="text-xl font-bold text-cyan-400 mb-8 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-violet-500 rounded-full" />
                        {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {PORTFOLIO_DATA.skills
                            .filter(s => s.category === category)
                            .map((skill) => (
                                <div
                                    key={skill.name}
                                    className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default"
                                >
                                    {skill.name}
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
