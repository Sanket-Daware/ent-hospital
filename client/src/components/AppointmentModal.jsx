import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const reasons = [
    {
        id: 'ear',
        label: 'Ear',
        sub: 'Hearing loss, ear pain, tinnitus, ear infections'
    },
    {
        id: 'nose',
        label: 'Nose',
        sub: 'Sinusitis, nasal blockage, rhinitis, nose bleeding'
    },
    {
        id: 'throat',
        label: 'Throat',
        sub: 'Tonsillitis, voice problems, swallowing difficulty'
    },
    {
        id: 'head-neck',
        label: 'Head & Neck',
        sub: 'Neck lumps, thyroid issues, head/neck tumors'
    },
    {
        id: 'pediatric',
        label: 'Pediatric ENT',
        sub: 'ENT issues in children (birth defects, sleep apnea, allergies)'
    },
    {
        id: 'sleep-snoring',
        label: 'Sleep & Snoring',
        sub: 'Sleep apnea, snoring'
    },
    {
        id: 'other',
        label: 'Other / Not Sure',
        sub: 'General checkup or other concerns'
    }
];

const AppointmentModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('form'); // form, paying, success
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        contact: '',
        reason: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // 1. Show the "Processing Payment" screen
        setStep('paying');

        // 2. Simulate a delay for "Payment Processing" and then show success
        setTimeout(() => {
            setStep('success');
        }, 3000);
    };

    const handleClose = () => {
        setStep('form');
        setFormData({ name: '', surname: '', contact: '', reason: '' });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-10">
                    <AnimatePresence mode="wait">
                        {step === 'form' && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Book Appointment</h2>
                                    <p className="text-slate-500">Fill in the details below to schedule your visit with our ENT specialists.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg border border-red-100 italic">
                                            {error}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 ml-1">First Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 ml-1">Surname</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Doe"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50"
                                                value={formData.surname}
                                                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 ml-1">Contact Number</label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50"
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 ml-1">Reason for Visit</label>
                                        <select
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50 appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]"
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                        >
                                            <option value="" disabled>Select a specialty area</option>
                                            {reasons.map((r) => (
                                                <option key={r.id} value={r.label}>
                                                    {r.label} — {r.sub.length > 40 ? r.sub.substring(0, 40) + '...' : r.sub}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-mint-dark hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-mint-dark/20 hover:shadow-mint-dark/40 transition-all transform hover:-translate-y-0.5 mt-4"
                                    >
                                        Proceed to Payment (₹500)
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 'paying' && (
                            <motion.div
                                key="paying"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="py-12 flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-sky rounded-full flex items-center justify-center mb-6 relative">
                                    <CreditCard className="text-sky-dark relative z-10" size={32} />
                                    <Loader2 className="absolute inset-0 text-sky-dark animate-spin" size={80} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulating Razorpay</h2>
                                <p className="text-slate-500 mb-0">Processing your secure payment of ₹500...</p>
                                <p className="text-xs text-slate-400 mt-4 italic font-accent text-lg">"Trust in our expert care"</p>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="text-mint-dark" size={48} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Appointment Booked!</h2>
                                <p className="text-slate-600 mb-8 max-w-xs mx-auto">Thank you, {formData.name}. Your appointment for {formData.reason} has been confirmed. We've sent details to {formData.contact}.</p>

                                <button
                                    onClick={handleClose}
                                    className="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold transition-colors"
                                >
                                    Enter Site
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default AppointmentModal;
