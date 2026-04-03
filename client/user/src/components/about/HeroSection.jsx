import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onOpenAppointment }) => {
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-[400px] h-full opacity-[0.03] pointer-events-none hidden lg:block">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                    <pattern id="hexagons" width="10" height="17.32" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M5 0 L10 2.89 L10 8.66 L5 11.55 L0 8.66 L0 2.89 Z" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#hexagons)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-stretch gap-0">
                    {/* Left: Building Photo */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative z-10"
                    >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 aspect-[4/3] lg:aspect-auto h-full">
                            <img 
                                src="/images/hospital-building.jpg" 
                                alt="Suvidha ENT Hospital Building" 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200";
                                    e.target.onerror = null;
                                }}
                            />
                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl pl-1">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-rose-500 border-b-[8px] border-b-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Middle: Vertical Accent Bar */}
                    <div className="hidden lg:flex w-24 items-center justify-center relative">
                        <div className="h-full w-4 bg-mint rounded-full relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-mint-dark rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-[45%] lg:pl-10 pt-16 lg:pt-0 flex flex-col justify-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                            About Us
                        </h2>
                        
                        <div className="space-y-4 text-sm text-slate-500 font-sans leading-relaxed text-left">
                            <p>
                                Welcome to Suvidha ENT Hospital with Rehabilitation Center, where compassionate care meets advanced medical expertise.
                            </p>
                            <p>
                                We are dedicated to providing exceptional healthcare services with a focus on holistic healing and personalized patient care. Our state-of-the-art facilities ensure that every patient receives the highest standard of care in Amravati.
                            </p>
                            <p>
                                At Suvidha, we understand that each individual is unique, and so are their healthcare needs. Our experienced medical professionals provide a comprehensive range of services tailored to your health.
                            </p>
                        </div>

                        <div className="mt-8 flex items-center gap-6">
                            <button 
                                onClick={onOpenAppointment}
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold tracking-tight shadow-xl shadow-slate-200 transition-all flex items-center gap-3 active:scale-95 group text-sm"
                            >
                                <span>Book Appointment</span>
                                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-mint transition-colors">
                                    <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent"></div>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
