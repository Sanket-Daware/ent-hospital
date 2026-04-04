import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail } from 'lucide-react';

const SpecializedTeam = () => {
    const doctors = [
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
    ];

    return (
        <section className="pt-8 pb-20 relative overflow-hidden">
            {/* Background decorative element */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-mint text-mint-dark text-[10px] font-bold uppercase tracking-widest mb-4"
                    >
                        Professional Care
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold text-slate-800 mb-3"
                    >
                        Our Specialized Team
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-2xl mx-auto text-sm font-sans leading-relaxed"
                    >
                        Meet our board-certified experts dedicated to providing the highest quality of ear, nose, and throat care.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {doctors.map((doc, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-3 transition-all duration-300 border border-slate-50"
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
                            <div className="p-7 text-center">
                                <div className={`w-12 h-1 px-4 ${doc.color} mx-auto mb-5 rounded-full`}></div>
                                <h4 className="text-lg font-bold text-slate-800 mb-1">{doc.name}</h4>
                                <p className="text-sky-dark font-bold text-[10px] tracking-widest uppercase mb-3">{doc.role}</p>
                                <p className="text-slate-400 font-bold text-[9px] uppercase mb-4 tracking-tighter">{doc.degree}</p>
                                <p className="text-slate-500 text-xs leading-relaxed font-sans mb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {doc.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecializedTeam;
