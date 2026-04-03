import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: '/images/hero-1.png',
        title: 'Expert Care for Your Entire Family',
        subtitle: 'Assuring you with the highest standard of ENT treatments and clinical excellence.',
        accent: 'Trust & Care',
        color: 'bg-mint'
    },
    {
        id: 2,
        image: '/images/hero-2.png',
        title: 'Advanced Diagnostic Technology',
        subtitle: 'Utilizing state-of-the-art equipment to provide precise diagnosis for all ear, nose, and throat concerns.',
        accent: 'Assurity',
        color: 'bg-sky'
    },
    {
        id: 3,
        image: '/images/hero-3.png',
        title: 'Your Comfort is Our Priority',
        subtitle: 'A welcoming environment and a dedicated team focused on your health and well-being.',
        accent: 'Welcoming',
        color: 'bg-rose'
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-rose">
            <AnimatePresence>

                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full max-w-[94%] mx-auto px-4 flex items-center">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                            >
                                <span className={`inline-block px-3 py-1 rounded-full ${slides[current].color} text-slate-800 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 font-sans shadow-sm`}>
                                    {slides[current].accent}
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light font-sans text-slate-900 leading-[1.2] mb-5 drop-shadow-sm tracking-tight capitalize">
                                    {slides[current].title}
                                </h1>
                                <p className="text-[16px] md:text-lg text-slate-700 font-sans leading-relaxed mb-8 max-w-md font-medium opacity-90 drop-shadow-sm">
                                    {slides[current].subtitle}
                                </p>
                                <button className="px-7 py-3 bg-slate-900 hover:bg-black text-white rounded-md text-[13px] font-bold shadow-xl shadow-slate-300 transition-all hover:-translate-y-0.5 active:scale-95">
                                    Discover Our Services
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>





            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-10">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white transition-colors group">
                    <ChevronLeft className="text-slate-400 group-hover:text-slate-800" />
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center hover:bg-white transition-colors group">
                    <ChevronRight className="text-slate-400 group-hover:text-slate-800" />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-10 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${current === i ? 'w-10 bg-mint-dark' : 'w-4 bg-slate-200'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
