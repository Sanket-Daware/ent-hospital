import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Clock, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ContactPage = () => {
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
        <div className="pt-24 min-h-screen relative bg-slate-50 font-sans selection:bg-mint-dark selection:text-white">
            <div 
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ 
                    backgroundImage: "url('/images/bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat-y'
                }}
            />
            <div className="relative z-10 min-h-screen">


            {/* Main Contact Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <div className="space-y-8">
                                {[
                                    { 
                                        icon: Phone, 
                                        label: "Call Us", 
                                        content: "(+91) 9422519279", 
                                        color: "bg-sky text-sky-dark",
                                        desc: "Available Mon-Sat for immediate support."
                                    },
                                    { 
                                        icon: Mail, 
                                        label: "Email Us", 
                                        content: "care@entcarehospital.com", 
                                        color: "bg-mint text-mint-dark",
                                        desc: "We typically respond within 24 hours."
                                    },
                                    { 
                                        icon: Clock, 
                                        label: "Working Hours", 
                                        content: "11am-4pm & 7pm-9pm", 
                                        color: "bg-rose text-rose-dark",
                                        desc: "Monday through Saturday (Evening sessions available)"
                                    }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * index }}
                                        className="flex items-start gap-6 group"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0`}>
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                            <p className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-slate-600 transition-colors mb-1">{item.content}</p>
                                            <p className="text-sm text-slate-500 font-sans">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-mint/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-mint/30 transition-colors" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <MapPin className="text-mint" size={24} />
                                        <h4 className="text-xl font-bold">Visit Our Facility</h4>
                                    </div>
                                    <p className="text-slate-400 font-sans leading-relaxed mb-8">
                                        Suvidha ENT, Amravati, Maharashtra, India. <br />
                                        Located in the heart of the medical district.
                                    </p>
                                    <a 
                                        href="https://www.google.com/maps/dir//Suvidha+ENT,+Amravati" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-mint transition-colors"
                                    >
                                        Get Directions <ExternalLink size={16} />
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7">
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 h-full"
                            >
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div 
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="h-full flex flex-col items-center justify-center text-center py-20"
                                        >
                                            <div className="w-24 h-24 bg-mint rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-mint/20">
                                                <CheckCircle2 className="text-mint-dark" size={56} />
                                            </div>
                                            <h3 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">Inquiry Received!</h3>
                                            <p className="text-slate-500 text-lg max-w-[300px] mx-auto font-sans leading-relaxed">
                                                Thank you for reaching out. A healthcare specialist will contact you shortly.
                                            </p>
                                            <button 
                                                onClick={() => setStatus('idle')}
                                                className="mt-10 text-slate-400 font-bold uppercase tracking-widest text-xs hover:text-slate-600"
                                            >
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="mb-10">
                                                <h3 className="text-3xl font-bold text-slate-800 mb-2">Send us a Message</h3>
                                                <p className="text-slate-500 font-sans">Have a specific question? Fill the form below.</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {status === 'error' && (
                                                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm italic">
                                                        {errorMessage}
                                                    </div>
                                                )}
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                                        <input 
                                                            required
                                                            type="text" 
                                                            placeholder="John Doe"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-dark/5 focus:border-sky-dark transition-all bg-slate-50 placeholder:text-slate-300 font-medium"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
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
                                                            className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-dark/5 focus:border-sky-dark transition-all bg-slate-50 placeholder:text-slate-300 font-medium"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                                    <input 
                                                        required
                                                        type="email" 
                                                        placeholder="john@example.com"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-dark/5 focus:border-sky-dark transition-all bg-slate-50 placeholder:text-slate-300 font-medium"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-slate-700 ml-1">How can we help?</label>
                                                    <textarea 
                                                        required
                                                        rows="4"
                                                        placeholder="Tell us about your concern..."
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-dark/5 focus:border-sky-dark transition-all bg-slate-50 placeholder:text-slate-300 font-medium resize-none shadow-inner"
                                                    ></textarea>
                                                </div>

                                                <button 
                                                    disabled={status === 'sending'}
                                                    type="submit" 
                                                    className="w-full py-5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold tracking-tight shadow-xl shadow-slate-200 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 group disabled:opacity-70"
                                                >
                                                    {status === 'sending' ? (
                                                        <>
                                                            <Loader2 size={24} className="animate-spin" />
                                                            <span>Delivering Message...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                            <span>Send Inquiry</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    );
};

export default ContactPage;
