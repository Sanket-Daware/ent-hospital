import React, { useEffect } from 'react';
import HeroSection from '../components/about/HeroSection';
import MissionVision from '../components/about/MissionVision';
import FAQSection from '../components/about/FAQSection';
import SpecializedTeam from '../components/about/SpecializedTeam';

const AboutPage = ({ onOpenAppointment }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-mint-dark selection:text-white overflow-x-hidden relative bg-white">
            <div className="relative z-10">
            {/* 1. Hero Section (Centered & Warm) */}
            <HeroSection onOpenAppointment={onOpenAppointment} />

            {/* 2. Mission & Vision (Floating Card + Zig-Zag) */}
            <MissionVision />

            {/* 3. FAQ Section (Expanded Q&A) */}
            <FAQSection />

            {/* 4. Specialized Team */}
            <SpecializedTeam />
            </div>
        </div>
    );
};

export default AboutPage;
