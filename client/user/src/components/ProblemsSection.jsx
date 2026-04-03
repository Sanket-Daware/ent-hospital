import React from 'react';
import { motion } from 'framer-motion';
import { Ear, Wind, MessageSquare, ShieldAlert, Baby, Moon } from 'lucide-react';

const problems = [
    {
        title: 'Ear Conditions',
        icon: <Ear className="text-sky-dark" size={28} />,
        desc: 'Hearing loss, chronic ear pain, tinnitus, and recursive infections requiring specialized care.',
        color: 'bg-sky',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=400' // Placeholder since quota hit
    },
    {
        title: 'Nasal & Sinus',
        icon: <Wind className="text-mint-dark" size={28} />,
        desc: 'Sinusitis, nasal blockage, chronic rhinitis, and frequent nose bleeding treatments.',
        color: 'bg-mint',
        image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=400'
    },
    {
        title: 'Throat & Voice',
        icon: <MessageSquare className="text-rose-dark" size={28} />,
        desc: 'Tonsillitis, vocal cord problems, and swallowing difficulty managed by experts.',
        color: 'bg-rose',
        image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400'
    },
    {
        title: 'Head & Neck',
        icon: <ShieldAlert className="text-slate-600" size={28} />,
        desc: 'Neck lumps, thyroid issues, and specialized head/neck tumor screenings.',
        color: 'bg-slate-100',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400'
    },
    {
        title: 'Pediatric ENT',
        icon: <Baby className="text-sky-dark" size={28} />,
        desc: 'Specialized care for children, including birth defects, sleep apnea, and allergies.',
        color: 'bg-sky',
        image: 'https://images.unsplash.com/photo-1536640712247-c45474762886?auto=format&fit=crop&q=80&w=400'
    },
    {
        title: 'Sleep & Snoring',
        icon: <Moon className="text-mint-dark" size={28} />,
        desc: 'Comprehensive solutions for sleep apnea and chronic snoring issues.',
        color: 'bg-mint',
        image: 'https://images.unsplash.com/photo-1511295742364-9119557d4196?auto=format&fit=crop&q=80&w=400'
    }
];

const ProblemsSection = () => {
    return (
        <section className="py-20 bg-mint overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-mint-dark font-accent text-lg mb-2 block"
                    >
                        "Your health, our commitment"
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold text-slate-800 mb-4"
                    >
                        Problems We Solve
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-lg mx-auto text-sm"
                    >
                        We provide comprehensive diagnosis and treatment for a wide range of ear, nose, throat, head, and neck conditions using the latest medical advancements.
                    </motion.p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center">
                    {/* Left Column */}
                    <div className="space-y-10">
                        {problems.slice(0, 3).map((prob, i) => (
                            <motion.div
                                key={prob.title}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-row lg:flex-row-reverse items-start gap-4 lg:text-right group"
                            >
                                <div className={`w-12 h-12 shrink-0 ${prob.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                                    {prob.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1.5">{prob.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-sans text-xs">{prob.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative mx-auto w-full max-w-[85%] lg:max-w-none aspect-[3/4] lg:aspect-auto lg:h-[510px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                            alt="Doctor treating patient"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                    </motion.div>

                    {/* Right Column */}
                    <div className="space-y-10">
                        {problems.slice(3, 6).map((prob, i) => (
                            <motion.div
                                key={prob.title}
                                initial={{ opacity: 0, x: 15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 text-left group"
                            >
                                <div className={`w-12 h-12 shrink-0 ${prob.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                                    {prob.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1.5">{prob.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-sans text-xs">{prob.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};




export default ProblemsSection;
