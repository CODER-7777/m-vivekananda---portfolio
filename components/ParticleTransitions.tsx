import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

export const ParticleTransitions: React.FC = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options = React.useMemo(
        () => ({
            background: {
                color: {
                    value: 'transparent',
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: 'push',
                    },
                    onHover: {
                        enable: true,
                        mode: 'repulse',
                    },
                    resize: {
                        enable: true,
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: ['#7c3aed', '#06b6d4', '#ec4899'],
                },
                links: {
                    color: '#7c3aed',
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: 'none' as const,
                    enable: true,
                    outModes: {
                        default: 'bounce' as const,
                    },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={options}
                className="fixed inset-0 pointer-events-none z-0"
            />
        );
    }
    return <></>;
};
