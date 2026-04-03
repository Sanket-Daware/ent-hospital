import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, GraduationCap, Ear } from 'lucide-react';

const DoctorSection = ({ onOpenAppointment }) => {
    return (
        <section className="py-24 bg-[#f8fbff] relative overflow-hidden font-sans min-h-[650px] flex items-center">
            {/* Google Fonts Import for Professional Typography */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');`}
            </style>

            {/* Solid Corner Decorative Shapes - Hospital-grade Blue/Green/Pink Palette */}
            {/* Top-left Shape (Mint Green for Health) */}
            <div 
                className="absolute -top-16 -left-16 w-64 h-64 bg-[#ecfdf5] rounded-full opacity-40 pointer-events-none" 
            />
            
            {/* Bottom-right Shape (Soft Petal Pink for Calm) */}
            <div 
                className="absolute -bottom-16 -right-12 w-96 h-96 bg-[#fff1f2] rounded-full opacity-50 pointer-events-none" 
            />

            <div className="max-w-7xl mx-auto px-6 relative w-full">
                <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-0">
                    
                    {/* Left: Mission & Professional Quote (Balanced Flex) */}
                    <div className="flex-1 relative flex justify-start">
                        <div className="relative max-w-xl">
                            {/* Clinical Navy Quotes */}
                            <div className="absolute -top-6 -left-6 text-slate-300 text-[80px] font-serif opacity-30 leading-none">
                                “
                            </div>
                            
                            <div className="relative z-10 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-sky/10 text-sky-dark text-[8px] font-bold rounded-full mb-4 uppercase tracking-wider">
                                        <Award size={12} />
                                        Chief Consultant Surgeon
                                    </div>
                                    
                                    <h2 className="text-[13px] md:text-[17px] text-slate-800 leading-[1.8] font-sans antialiased font-normal">
                                        At <span className="font-bold text-slate-900 border-b-2 border-sky-light">Suvidha ENT Clinic</span>, our medical excellence is rooted in precision and extreme patient dedication. We leverage advanced surgical technology to deliver life-changing outcomes for our community.
                                        <br /><br />
                                        Your auditory and upper respiratory health is our primary clinical focus.
                                    </h2>
                                </motion.div>

                                {/* Book Consultation (Compact Variant) */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <button 
                                        onClick={onOpenAppointment}
                                        className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-[10px] font-bold shadow-lg shadow-slate-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                                    >
                                        <Calendar size={14} />
                                        Book Consultation
                                    </button>
                                </motion.div>
                            </div>
                            
                            <div className="absolute -bottom-10 right-[25%] text-slate-300 text-[80px] font-serif opacity-30 leading-none">
                                ”
                            </div>
                        </div>
                    </div>

                    {/* Middle: Floating Specialty Icons (Triple-Flex Mathematical Centering) */}
                    <div className="hidden lg:flex flex-col items-center justify-center gap-14 relative z-10 w-40 flex-shrink-0">
                        {/* 1st: Realistic Nose Icon (Floating - Top-Left) */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-14 h-14 bg-[#e0f2fe] rounded-2xl flex items-center justify-center text-sky-dark shadow-sm border border-white -translate-x-12"
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 21h4c1.1 0 2-.9 2-2 0-.6-.3-1.1-.7-1.4-1.3-.9-2.3-2.4-2.3-4.1V6c0-1.1-.9-2-2-2s-2 .9-2 2v7.5c0 1.7-1 3.2-2.3 4.1-.4.3-.7.8-.7 1.4 0 1.1.9 2 2 2z" />
                                <circle cx="10" cy="18" r="1" fill="currentColor" opacity="0.2" />
                                <circle cx="14" cy="18" r="1" fill="currentColor" opacity="0.2" />
                            </svg>
                        </motion.div>

                        {/* 2nd: Ear Icon (Floating - Center) */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="w-14 h-14 bg-[#dcfce7] rounded-full flex items-center justify-center text-mint-dark shadow-sm border border-white translate-x-0"
                        >
                            <Ear size={28} />
                        </motion.div>

                        {/* 3rd: Realistic Throat Icon (Floating - Mid-Left) */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="w-14 h-14 bg-[#fff1f2] rounded-2xl flex items-center justify-center text-rose-dark shadow-sm border border-white -translate-x-6"
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 2h6l1 4-1 12H9L8 6l1-4z" />
                                <path d="M11 8h2l1 2v3l-1 2h-2l-1-2v-3l1-2z" fill="currentColor" opacity="1" />
                                <path d="M10 22h4M12 18v4" />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Right: Doctor Medical Profile (Balanced Flex) */}
                    <div className="flex-1 relative flex justify-end">
                        <div className="relative flex flex-col items-center lg:items-end w-auto max-w-lg">
                            {/* Circular Profile Frame */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative mb-6"
                            >
                                <div className="w-[220px] h-[220px] md:w-[325px] md:h-[325px] rounded-full overflow-hidden border-[10px] border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative z-20">
                                    <img 
                                        src="/images/doctor-sanket.png" 
                                        alt="Dr. Swapnil Sharma" 
                                        className="w-full h-full object-cover object-top"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000";
                                            e.target.onerror = null;
                                        }}
                                    />
                                </div>
                                {/* Specialist Badge Overlap */}
                                <div className="absolute -bottom-2 -left-4 bg-white px-4 py-2.5 rounded-xl shadow-lg z-30 flex items-center gap-2 border border-slate-50">
                                    <div className="p-1.5 bg-mint rounded-lg text-mint-dark">
                                        <GraduationCap size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tight">Verified</p>
                                        <p className="text-[10px] font-bold text-slate-800">10+ Yrs Exp</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Professional Name and Medical Title */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 20 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-center lg:text-right relative z-30 flex flex-col items-center lg:items-end"
                            >
                                <h3 className="text-xl md:text-2xl text-slate-900 mb-1 font-serif tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Dr. Swapnil Sharma
                                </h3>
                                <div className="mb-6">
                                    <p className="text-sm font-bold text-sky-dark font-sans tracking-tight">MBBS, MS - ENT Surgeon</p>
                                    <div className="h-0.5 w-12 bg-sky-light mt-1 ml-auto hidden lg:block" />
                                    <div className="h-0.5 w-12 bg-sky-light mt-1 mx-auto lg:hidden" />
                                </div>
                                
                                {/* Professional Interaction */}
                                <div className="flex items-center justify-center lg:justify-end gap-3">
                                    <motion.a 
                                        whileHover={{ scale: 1.1 }}
                                        href="#" 
                                        className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-sky-dark transition-all border border-slate-50"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </motion.a>
                                    <motion.a 
                                        whileHover={{ scale: 1.1 }}
                                        href="#" 
                                        className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#1877F2] transition-all border border-slate-50"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </motion.a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorSection;
