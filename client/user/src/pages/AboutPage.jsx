import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, ShieldCheck, Stethoscope, Globe, Mail } from 'lucide-react';

const AboutPage = ({ onOpenAppointment }) => {
    return (
        <div className="pt-24 min-h-screen bg-white font-sans selection:bg-mint-dark selection:text-white">
            {/* Hero Section - Radiant Inspired */}
            <section className="relative py-20 overflow-hidden bg-white">
                {/* Background decorative element (similar to right side of image 1) */}
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
                            animate={{ opacity: 1, x: 0 }}
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
                                {/* Optional: Play button overlay as seen in image 1 */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl pl-1">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-rose-500 border-b-[10px] border-b-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Middle: Vertical Accent Bar (Image 1 style) */}
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
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:w-[45%] lg:pl-10 pt-16 lg:pt-0 flex flex-col justify-center"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
                                About Us
                            </h2>
                            
                            <div className="space-y-6 text-lg text-slate-500 font-sans leading-relaxed text-left">
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

                            <div className="mt-12 flex items-center gap-8">
                                <button 
                                    onClick={onOpenAppointment}
                                    className="px-10 py-5 bg-slate-900 border-b-4 border-slate-700 hover:bg-slate-800 text-white rounded-3xl font-bold tracking-tight shadow-xl shadow-slate-200 transition-all flex items-center gap-3 active:scale-95 group"
                                >
                                    <span>Book Now</span>
                                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-mint transition-colors">
                                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent"></div>
                                    </div>
                                </button>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Specialized Team Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                {/* Background decorative element */}
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-mint text-mint-dark text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            Professional Care
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
                        >
                            Our Specialized Team
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 max-w-2xl mx-auto text-lg font-sans"
                        >
                            Meet our board-certified experts dedicated to providing the highest quality of ear, nose, and throat care.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            {
                                name: "Dr. Swapnil Sharma",
                                role: "Founder & Chief ENT Surgeon",
                                degree: "MBBS, MS (ENT)",
                                image: "/images/doctor-sanket.png",
                                bio: "Specialist in complex ENT surgical procedures with over 15 years of experience.",
                                color: "bg-sky"
                            },
                            {
                                name: "Dr. Ananya Gupta",
                                role: "Senior Consultant",
                                degree: "MBBS, DLO (ENT)",
                                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800",
                                bio: "Dedicated to providing compassionate and comprehensive pediatric ENT care.",
                                color: "bg-mint"
                            },
                            {
                                name: "Dr. Rahul Deshmukh",
                                role: "ENT Specialist",
                                degree: "MBBS, MS (ENT)",
                                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800",
                                bio: "Expert in diagnostic audiology and advanced endoscopic treatments.",
                                color: "bg-rose"
                            }
                        ].map((doc, i) => (
                            <motion.div 
                                key={i}
                                variants={{
                                    hidden: (i) => ({
                                        opacity: 0,
                                        x: i % 2 === 0 ? -100 : 100,
                                        y: 20
                                    }),
                                    visible: (i) => ({
                                        opacity: 1,
                                        x: 0,
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 70,
                                            damping: 15,
                                            delay: i * 0.1
                                        }
                                    })
                                }}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-20px" }}
                                className="group relative bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl transition-all"
                            >
                                {/* Image Container */}
                                <div className="aspect-[1/1] overflow-hidden relative">
                                    <img 
                                        src={doc.image} 
                                        alt={doc.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ef159963?auto=format&fit=crop&q=80&w=800";
                                            e.target.onerror = null;
                                        }}
                                    />
                                    {/* Link overlays */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-dark cursor-pointer shadow-lg hover:scale-110 transition-all">
                                            <Globe size={20} />
                                        </div>
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-dark cursor-pointer shadow-lg hover:scale-110 transition-all">
                                            <Mail size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Details Container */}
                                <div className="p-10 text-center">
                                    <div className={`w-12 h-1 px-4 ${doc.color} mx-auto mb-6 rounded-full`}></div>
                                    <h4 className="text-2xl font-bold text-slate-800 mb-1">{doc.name}</h4>
                                    <p className="text-sky-dark font-bold text-sm tracking-widest uppercase mb-4">{doc.role}</p>
                                    <p className="text-slate-400 font-bold text-xs uppercase mb-6 tracking-tighter">{doc.degree}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed font-sans mb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {doc.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
