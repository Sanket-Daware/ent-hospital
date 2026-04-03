import React, { useEffect } from 'react';
import HeroSection from '../components/about/HeroSection';
import MissionVision from '../components/about/MissionVision';
import WhyChooseUs from '../components/about/WhyChooseUs';
import SpecializedTeam from '../components/about/SpecializedTeam';

const AboutPage = ({ onOpenAppointment }) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-mint-dark selection:text-white overflow-x-hidden relative bg-slate-50">
            {/* Background Image Container */}
            <div 
                className="fixed inset-0 z-0 pointer-events-none bg-no-repeat bg-cover bg-center opacity-50"
                style={{ 
                    backgroundImage: 'url("/images/bg2.png")',
                    backgroundAttachment: 'fixed'
                }}
            />
            
            <div className="relative z-10 pt-20 bg-white/40 backdrop-blur-[2px]">
            {/* 1. Hero Section (Existing logic extracted) */}
            <HeroSection onOpenAppointment={onOpenAppointment} />

            {/* 2. Mission & Vision (New) */}
            <MissionVision />

            {/* 3. Why Choose Us (New) */}
            <WhyChooseUs />

            {/* 5. Specialized Team (Existing logic extracted) */}
            <SpecializedTeam />
            </div>
        </div>
    );
};

export default AboutPage;
