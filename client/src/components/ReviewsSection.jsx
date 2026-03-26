import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
    {
        id: 1,
        name: "Sanket Daware",
        role: "Patient",
        content: "Dr. Sanket and the entire team at Suvidha ENT are incredibly professional. The specialized care I received for my sinus issue was life-changing. Highly recommended!",
        rating: 5,
        color: "bg-sky-50"
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "Patient",
        content: "The waiting area is comfortable, and the staff is very polite. The treatment for my daughter's ear infection was quick and effective. A truly premium hospital experience.",
        rating: 5,
        color: "bg-mint-50"
    },
    {
        id: 3,
        name: "Rahul Mehra",
        role: "Checkup",
        content: "I've visited many ENT clinics, but the equipment and expertise here are top-notch. They explain everything clearly and make you feel at ease throughout the process.",
        rating: 5,
        color: "bg-rose-50"
    }
];

const ReviewsSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-mint text-mint-dark text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            Patient Trust
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold font-serif text-slate-800 tracking-tight leading-tight"
                        >
                            What our patients <br />
                            <span className="text-mint-dark underline decoration-mint/30 underline-offset-8">say about us</span>
                        </motion.h2>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Patient" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex text-amber-400 mb-0.5">
                                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-xs font-bold text-slate-600 tracking-tight">500+ Happy Patients</p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-10 rounded-[2.5rem] ${review.color} relative group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2`}
                        >
                            <div className="absolute top-8 right-10 text-slate-200 group-hover:text-slate-300 transition-colors">
                                <Quote size={48} strokeWidth={3} />
                            </div>
                            
                            <div className="flex text-amber-400 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            
                            <p className="text-slate-700 text-lg font-sans leading-relaxed mb-8 italic">
                                "{review.content}"
                            </p>
                            
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 font-bold shadow-sm">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 tracking-tight">{review.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
