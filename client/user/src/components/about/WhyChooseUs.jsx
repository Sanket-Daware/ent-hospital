import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { whyChooseUsData } from '../../data/aboutData';

const WhyChooseUs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-mint-dark font-bold text-xs uppercase tracking-widest mb-3 block"
                    >
                        Pioneering Care
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
                    >
                        Why Choose Suvidha ENT?
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 80 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-mint mx-auto rounded-full shadow-sm"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {whyChooseUsData.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`rounded-[2rem] border transition-all duration-300 overflow-hidden shadow-sm ${
                                    isActive 
                                    ? 'bg-white shadow-2xl shadow-slate-200 border-mint/20' 
                                    : 'bg-[#F5F5F5]/80 backdrop-blur-md border-slate-100 hover:shadow-xl'
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                                    className="w-full p-6 md:p-8 flex items-center justify-between gap-4 text-left group"
                                >
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                            isActive 
                                            ? 'bg-mint text-slate-900 shadow-lg shadow-mint/20 -rotate-6' 
                                            : 'bg-white shadow-sm text-slate-400 group-hover:text-slate-800'
                                        }`}>
                                            <item.icon size={22} />
                                        </div>
                                        <h3 className={`text-base md:text-lg font-bold transition-colors leading-tight ${
                                            isActive ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-900'
                                        }`}>
                                            {item.question}
                                        </h3>
                                    </div>
                                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                                        isActive ? 'border-mint bg-mint text-slate-900 rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900'
                                    }`}>
                                        <ChevronDown size={16} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        >
                                            <div className="px-6 pb-6 md:px-24 md:pb-8">
                                                <div className="h-px bg-slate-100 mb-6" />
                                                <p className="text-sm md:text-base text-slate-600 leading-relaxed font-sans font-medium">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
