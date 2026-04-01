import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

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
    const [step, setStep] = useState('form'); // form, loading, success
    const [error, setError] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isSlotsLoading, setIsSlotsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        contact: '',
        reason: '',
        appointmentDate: '',
        timeSlot: ''
    });

    // Fetch available slots when date changes
    useEffect(() => {
        const fetchSlots = async () => {
            if (!formData.appointmentDate) return;
            
            setIsSlotsLoading(true);
            setAvailableSlots([]);
            setFormData(prev => ({ ...prev, timeSlot: '' })); // Reset time if date changes

            try {
                const res = await axios.get(`/api/appointments/available-slots?date=${formData.appointmentDate}`);
                if (res.data.success) {
                    setAvailableSlots(res.data.slots);
                } else {
                    setError(res.data.message || 'Failed to load slots');
                }
            } catch (err) {
                console.error("Fetch slots error:", err);
                setError('Could not fetch available slots. Please try another date.');
            } finally {
                setIsSlotsLoading(false);
            }
        };

        fetchSlots();
    }, [formData.appointmentDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.appointmentDate || !formData.timeSlot) {
            setError('Please select both a date and a time slot.');
            return;
        }

        // 1. Validate contact number (exactly 10 digits)
        const contactDigits = formData.contact.replace(/\D/g, '');
        if (contactDigits.length !== 10) {
            setError('Please enter a valid 10-digit contact number.');
            return;
        }

        setStep('loading');

        try {
            const response = await axios.post('/api/appointments', formData);
            if (response.data.success) {
                setStep('success');
            } else {
                setStep('form');
                setError(response.data.message || 'Failed to book appointment.');
            }
        } catch (err) {
            setStep('form');
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const handleClose = () => {
        setStep('form');
        setFormData({ name: '', surname: '', contact: '', reason: '', appointmentDate: '', timeSlot: '' });
        onClose();
    };

    if (!isOpen) return null;

    // Get today's date in YYYY-MM-DD for min attribute
    const todayStr = new Date().toISOString().split('T')[0];

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
                                            maxLength={10}
                                            placeholder="Enter Your Contact Number"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50"
                                            value={formData.contact}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '');
                                                if (value.length <= 10) {
                                                    setFormData({ ...formData, contact: value });
                                                }
                                            }}
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

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 ml-1">Select Date</label>
                                            <input
                                                required
                                                type="date"
                                                min={todayStr}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50"
                                                value={formData.appointmentDate}
                                                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-slate-700 ml-1">Available Time</label>
                                            <select
                                                required
                                                disabled={!formData.appointmentDate || isSlotsLoading}
                                                className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-mint-dark/50 focus:border-mint-dark transition-all bg-slate-50/50 appearance-none overflow-hidden ${(!formData.appointmentDate || isSlotsLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                value={formData.timeSlot}
                                                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                                            >
                                                <option value="" disabled>
                                                    {isSlotsLoading ? 'Loading...' : !formData.appointmentDate ? 'Pick a date' : 'Select time'}
                                                </option>
                                                {availableSlots.map((slot) => (
                                                    <option key={slot} value={slot}>{slot}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-mint-dark hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-mint-dark/20 hover:shadow-mint-dark/40 transition-all transform hover:-translate-y-0.5 mt-4"
                                    >
                                        Book Appointment Now
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="py-20 flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-mint/10 rounded-full flex items-center justify-center mb-6 relative">
                                    <Loader2 className="text-mint-dark animate-spin" size={48} strokeWidth={2} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Processing...</h2>
                                <p className="text-slate-500 mb-0">Scheduling your appointment with our ENT specialists.</p>
                            </motion.div>
                        )}

                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-12 flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 bg-mint rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-mint/20">
                                    <CheckCircle2 className="text-mint-dark" size={56} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Appointment Booked!</h2>
                                <p className="text-slate-600 mb-6 max-w-xs mx-auto text-lg leading-relaxed">Thank you, {formData.name}. Your appointment for {formData.reason} on {new Date(formData.appointmentDate).toLocaleDateString()} at {formData.timeSlot} has been confirmed.</p>

                                <button
                                    onClick={handleClose}
                                    className="px-10 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 transition-all hover:scale-105"
                                >
                                    Return to Site
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
