import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';
import { whyChooseUsData } from '../../data/aboutData';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(-1); // Changed from 0 to -1 so no items are open by default

    return (
        <section className="pt-24 pb-8 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 px-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight"
                    >
                        Common ENT Questions
                    </motion.h2>
                    <p className="text-slate-500 font-sans text-[12px] md:text-[13px] font-normal">
                        Get expert answers to the most frequently asked questions about our services and ENT health.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
                    {whyChooseUsData.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                                    isActive 
                                    ? 'bg-slate-50 border-slate-200 shadow-sm' 
                                    : 'bg-white border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                                    className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left group"
                                >
                                    <h3 className={`text-[13px] md:text-sm font-bold transition-colors leading-tight ${
                                        isActive ? 'text-slate-950' : 'text-slate-700 group-hover:text-slate-950'
                                    }`}>
                                        {item.question}
                                    </h3>
                                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                                        isActive ? 'bg-slate-900 text-white border-slate-900 rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-slate-400'
                                    }`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="px-6 pb-8 md:px-8 md:pb-10">
                                                <div className="h-px bg-slate-200/60 mb-6" />
                                                <p className="text-[12px] md:text-[13px] text-slate-600 leading-relaxed font-sans font-normal">
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

export default FAQSection;
