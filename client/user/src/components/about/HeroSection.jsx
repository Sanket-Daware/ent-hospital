import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onOpenAppointment }) => {
    return (
        <section className="relative pt-24 pb-12 lg:pt-[120px] lg:pb-20 overflow-hidden bg-[#FFF5F0]">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-[400px] h-full opacity-[0.02] pointer-events-none hidden lg:block">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                    <pattern id="hexagons" width="10" height="17.32" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M5 0 L10 2.89 L10 8.66 L5 11.55 L0 8.66 L0 2.89 Z" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#hexagons)" />
                </svg>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 tracking-tight leading-tight"
                >
                    Making quality healthcare <br /> a better reality
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[12px] md:text-[14px] text-slate-600 font-sans leading-relaxed mb-12 max-w-3xl mx-auto font-normal"
                >
                    Suvidha ENT Hospital is a leading provider of specialized ear, nose, and throat care that simplifies, 
                    digitizes, and automates medical processes for your family. Our hospital serves patients from all industries, 
                    ranging from local residents to specialized medical referrals.
                </motion.p>

                {/* Building Photo Below Text */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-5xl mx-auto"
                >
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50 aspect-[16/9] border-8 border-white bg-white">
                        <img 
                            src="/images/hospital-building.jpg" 
                            alt="Suvidha ENT Hospital Building" 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200";
                                e.target.onerror = null;
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
