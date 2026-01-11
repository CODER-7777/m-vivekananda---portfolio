import React from 'react';
import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';
import { Education } from '../components/Education';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Leadership } from '../components/Leadership';
import { Artwork } from '../components/Artwork';

export const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Education />
            <Timeline />
            <Projects />
            <Artwork />
            <Skills />
            <Leadership />
        </>
    );
};
