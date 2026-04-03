import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ContactSection = () => {
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (formData.phone.length !== 10) {
            setStatus('error');
            setErrorMessage('Please enter a valid 10-digit phone number.');
            return;
        }
        
        try {
            const response = await axios.post('/api/contact', formData);
            if (response.data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(response.data.message || 'Failed to send message.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-mint/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-sky/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Column: Info */}
                    <div className="space-y-12">
                        <div>
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-1.5 rounded-full bg-sky text-sky-dark text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                Get in Touch
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-tight"
                            >
                                Have any questions? <br />
                                <span className="text-sky-dark underline decoration-sky/30 underline-offset-8">We're here to help</span>
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="mt-6 text-sm text-slate-500 font-sans leading-relaxed max-w-md"
                            >
                                Our team is ready to provide you with the information you need and schedule your specialized ENT consultation.
                            </motion.p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Phone, label: "Call Us", content: "(+91) 9422519279", color: "bg-sky text-sky-dark" },
                                { icon: Mail, label: "Email Us", content: "care@entcarehospital.com", color: "bg-mint text-mint-dark" },
                                { icon: MapPin, label: "Visit Us", content: "Suvidha ENT, Amravati, Maharashtra", color: "bg-rose text-rose-dark" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-4 group cursor-pointer"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-lg shadow-slate-200 transition-transform group-hover:scale-110`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                        <p className="text-sm md:text-base font-medium text-slate-800 tracking-tight group-hover:text-slate-600 transition-colors">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 relative">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div 
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-10"
                                >
                                    <div className="w-16 h-16 bg-mint rounded-full flex items-center justify-center mb-6 shadow-xl shadow-mint/20">
                                        <CheckCircle2 className="text-mint-dark" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">Message Sent!</h3>
                                    <p className="text-xs text-slate-500 max-w-[200px] mx-auto font-sans leading-relaxed">
                                        Thank you for reaching out. Our team will get back to you within 24 hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {status === 'error' && (
                                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs italic">
                                                {errorMessage}
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-slate-700 ml-1">Full Name</label>
                                                <input 
                                                    required
                                                    type="text" 
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className="w-full px-5 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-mint-dark/5 focus:border-mint-dark transition-all bg-slate-50 placeholder:text-slate-400 text-sm font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-slate-700 ml-1">Phone Number</label>
                                                <input 
                                                    required
                                                    type="tel" 
                                                    maxLength={10}
                                                    placeholder="10 digit number"
                                                    value={formData.phone}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        if (value.length <= 10) {
                                                            setFormData({...formData, phone: value});
                                                        }
                                                    }}
                                                    className="w-full px-5 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-mint-dark/5 focus:border-mint-dark transition-all bg-slate-50 placeholder:text-slate-400 text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-700 ml-1">Email Address</label>
                                            <input 
                                                required
                                                type="email" 
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full px-5 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-mint-dark/5 focus:border-mint-dark transition-all bg-slate-50 placeholder:text-slate-400 text-sm font-medium"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-medium text-slate-700 ml-1">Your Message</label>
                                            <textarea 
                                                required
                                                rows="4"
                                                placeholder="How can we help you?"
                                                value={formData.message}
                                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                className="w-full px-5 py-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-mint-dark/5 focus:border-mint-dark transition-all bg-slate-50 placeholder:text-slate-400 text-sm font-medium resize-none shadow-inner"
                                            ></textarea>
                                        </div>

                                        <button 
                                            disabled={status === 'sending'}
                                            type="submit" 
                                            className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold tracking-tight shadow-xl shadow-slate-200 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group text-sm"
                                        >
                                            {status === 'sending' ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    <span>Sending Message...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
