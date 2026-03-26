import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Zap, Users, Sparkles } from 'lucide-react';

const PromoSection = ({ onOpenAppointment }) => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-mint/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-sky/30 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
                    
                    {/* Left: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose text-rose-dark text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <Gift size={14} />
                            Limited Time Offer
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight mb-6"
                        >
                            Your First Step to <br />
                            <span className="text-mint-dark">Better Hearing</span>
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 text-lg md:text-xl font-sans leading-relaxed mb-10 max-w-lg"
                        >
                            Book your first consultation today and get a full ENT screening at 50% off. Experience world-class care designed for your comfort.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button 
                                onClick={onOpenAppointment}
                                className="px-8 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                            >
                                <Zap size={18} fill="currentColor" />
                                Claim Offer Now
                            </button>
                            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                                View Packages
                            </button>
                        </motion.div>
                    </div>

                    {/* Right: Illustration & Stats */}
                    <div className="relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl relative"
                        >
                             <img 
                                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000" 
                                alt="Professional ENT Specialist" 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Stats Floating Cards */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-10 -right-4 md:-right-8 bg-white p-5 rounded-3xl shadow-xl border border-slate-50 max-w-[180px]"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-mint rounded-lg text-mint-dark">
                                    <Users size={20} />
                                </div>
                                <span className="text-2xl font-bold text-slate-800">500+</span>
                            </div>
                            <p className="text-xs text-slate-400 font-sans leading-tight">Happy patients this month alone</p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="absolute -bottom-6 -left-4 md:-left-8 bg-white p-5 rounded-3xl shadow-xl border border-slate-50 max-w-[200px]"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-rose rounded-lg text-rose-dark">
                                    <Sparkles size={20} />
                                </div>
                                <span className="text-2xl font-bold text-slate-800">100%</span>
                            </div>
                            <p className="text-xs text-slate-400 font-sans leading-tight">Patient satisfaction in our care programs</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
