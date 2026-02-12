import React from 'react';
import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';
import { Education } from '../components/Education';
import { Projects } from '../components/Projects';
import { PhysicsSkills } from '../components/PhysicsSkills';
import { Leadership } from '../components/Leadership';
import { Artwork } from '../components/Artwork';
import { GitHubStats } from '../components/GitHubStats';
import { ARBusinessCard } from '../components/ARBusinessCard';
import { Scene3D } from '../components/Scene3D';

export const Home: React.FC = () => {
    return (
        <>
            <div className="relative">
                <Hero />
                {/* 3D Scene overlay on Hero - Centered to avoid robot collision */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] hidden lg:block opacity-50">
                    <Scene3D />
                </div>
            </div>
            <Education />
            <Timeline />
            <Projects />
            <GitHubStats />
            <Artwork />
            <PhysicsSkills />
            <Leadership />
        </>
    );
};
