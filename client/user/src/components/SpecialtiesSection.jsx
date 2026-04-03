import React, { useState } from 'react';
import { motion } from 'framer-motion';

const teams = [
    {
        name: 'Specialist Doctors',
        title: 'Our core medical team consists of highly experienced, board-certified ENT specialists dedicated to providing top-tier clinical care.',
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
        color: 'bg-sky',
        position: 'object-top'
    },
    {
        name: 'Care Nursing Staff',
        title: 'Compassionate, round-[the-clock] nursing professionals providing 24/7 patient support, post-op care, and attentive monitoring.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
        color: 'bg-rose',
        position: 'object-center'
    },
    {
        name: 'Diagnostic Lab',
        title: 'Equipped with state-of-the-art imaging and testing technology to ensure accurate, rapid diagnoses for all ENT conditions.',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
        color: 'bg-slate-200',
        position: 'object-center'
    },
    {
        name: 'Reception & Admin',
        title: 'The friendly faces who seamlessly manage your visit, insurance claims, and appointment scheduling with absolute efficiency.',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
        color: 'bg-mint',
        position: 'object-center'
    }
];

const SpecialtiesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(0);

    return (
        <section className="py-24 bg-comfort-gray">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-bold text-slate-800 mb-4"
                    >
                        Meet Our Specialized Teams
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-sm font-sans"
                    >
                        Collaboration is at the heart of our clinical excellence. Every member of our team is dedicated to providing compassionate care.
                    </motion.p>
                </div>

                <div className="flex flex-row overflow-x-auto md:overflow-hidden snap-x snap-mandatory h-[500px] md:h-[450px] gap-4 pb-4 md:pb-0 scrollbar-hide w-full">
                    {teams.map((item, i) => {
                        const isHovered = hoveredIndex === i;
                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                className={`relative rounded-2xl overflow-hidden shadow-lg transition-[flex,min-width] duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer snap-center shrink-0 w-[85vw] md:w-auto ${isHovered ? 'md:[flex:3_1_0%]' : 'md:[flex:1_1_0%] md:min-w-[100px]'} h-full md:min-h-full`}
                            >
                                {/* Background Image */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={`absolute inset-0 w-full h-full object-cover ${item.position} transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-105' : 'scale-100 filter brightness-50'
                                        }`}
                                />
                                <div className={`absolute inset-0 transition-opacity duration-[800ms] ${isHovered ? 'bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent' : 'bg-slate-900/20'}`} />

                                {/* Vertical Title (DIRECT CHILD of relative container) */}
                                <div
                                    className={`absolute inset-0 hidden md:flex items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                >
                                    <h3
                                        className="text-white text-2xl font-bold font-serif whitespace-nowrap"
                                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                    >
                                        {item.name}
                                    </h3>
                                </div>

                                {/* Content Wrapper (Expanded state and mobile) */}
                                <div className="absolute inset-0 flex items-end p-6 md:p-8">
                                    <div className={`transition-all duration-[800ms] w-full flex flex-col ${isHovered ? 'opacity-100 translate-y-0 delay-100' : 'opacity-100 md:opacity-0 md:translate-y-8 md:pointer-events-none'}`}>
                                        <div className={`transition-[max-width,opacity] duration-[800ms] ease-in-out ${isHovered ? 'md:max-w-2xl' : 'w-full md:max-w-0'} overflow-hidden`}>
                                            <div className="min-w-[280px]">
                                                <div className={`w-fit px-4 py-1.5 rounded-full ${item.color} text-slate-800 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 font-sans`}>
                                                    Specialty Team
                                                </div>
                                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 font-serif line-clamp-1">{item.name}</h3>
                                                <p className="text-white/80 text-sm md:text-base font-sans line-clamp-2 md:line-clamp-none max-w-sm mb-6">
                                                    {item.title}
                                                </p>
                                                <button className="px-5 py-2 md:px-6 md:py-2.5 bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-sm rounded-xl font-semibold transition-colors font-sans text-xs md:text-sm">
                                                    Explore Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SpecialtiesSection;
