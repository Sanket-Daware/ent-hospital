import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Heart, MessageCircle, FastForward, PlayCircle, X, Loader2, CheckCircle2, PenLine, Filter, Search } from 'lucide-react';
import axios from 'axios';
import AppointmentModal from '../components/AppointmentModal';

const cardColors = [
    'bg-sky-100/80 border border-sky-200', 
    'bg-white border border-slate-200 shadow-sm', 
    'bg-rose-100/80 border border-rose-200', 
    'bg-amber-100/80 border border-amber-200', 
    'bg-purple-100/80 border border-purple-200'
];

const StarPicker = ({ value, onChange }) => (
    <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
            <button
                key={s}
                type="button"
                onClick={() => onChange(s)}
                className="transition-transform hover:scale-125 focus:outline-none"
            >
                <Star
                    size={32}
                    className={s <= value ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                />
            </button>
        ))}
    </div>
);

const HappyPatientsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ patientName: '', rating: 0, content: '' });
    const [formError, setFormError] = useState('');

    // Filter states
    const [starFilter, setStarFilter] = useState(0); // 0 means All
    const [keywordFilter, setKeywordFilter] = useState('All');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/testimonials?approvedOnly=true');
            if (res.data.success) {
                setReviews(res.data.testimonials);
            }
        } catch (error) {
            console.error('Fetch reviews error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setFormError('');
        if (!formData.patientName.trim()) return setFormError('Please enter your name.');
        if (formData.rating === 0) return setFormError('Please select a star rating.');
        if (!formData.content.trim()) return setFormError('Please write your review.');

        setSubmitting(true);
        try {
            const res = await axios.post('/api/testimonials/submit', formData);
            if (res.data.success) {
                setSubmitted(true);
                setFormData({ patientName: '', rating: 0, content: '' });
            }
        } catch (error) {
            setFormError(error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const openModal = () => { setIsModalOpen(true); setSubmitted(false); setFormError(''); };
    const closeModal = () => { setIsModalOpen(false); setSubmitted(false); setFormData({ patientName: '', rating: 0, content: '' }); };

    const filteredReviews = reviews.filter(r => {
        const matchesStar = starFilter === 0 || r.rating === starFilter;
        const matchesKeyword = keywordFilter === 'All' || 
            (r.treatment?.toLowerCase().includes(keywordFilter.toLowerCase())) ||
            (r.content?.toLowerCase().includes(keywordFilter.toLowerCase()));
        return matchesStar && matchesKeyword;
    });

    return (
        <div className="pt-10 min-h-screen relative bg-slate-50 font-sans selection:bg-mint-dark selection:text-white">
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
                {/* Hero Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-sky/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-mint-dark font-accent text-xl mb-4 block"
                        >
                            Success Stories
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-7xl md:text-5xl font-bold font-serif text-slate-800 tracking-tight leading-tight mb-8"
                        >
                            Voices of <br />
                            <span className="text-mint-dark underline decoration-mint/20 underline-offset-8">Our Patients</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed"
                        >
                            Join the community of over 50,000 satisfied patients who have found specialized care and healing with us.
                        </motion.p>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="pb-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-wrap items-center justify-center gap-6 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                            {/* Star Filter */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stars:</span>
                                <div className="flex bg-slate-50 p-1 rounded-xl">
                                    {[0, 5, 4, 3, 2, 1].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setStarFilter(star)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                                starFilter === star 
                                                ? 'bg-slate-900 text-white shadow-md' 
                                                : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                        >
                                            {star === 0 ? 'All' : `${star}★`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Keyword Filter */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type:</span>
                                <div className="flex bg-slate-50 p-1 rounded-xl">
                                    {['All', 'Ear', 'Nose', 'Throat'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setKeywordFilter(type)}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                                                keywordFilter === type 
                                                ? 'bg-slate-900 text-white shadow-md' 
                                                : 'text-slate-500 hover:text-slate-800'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Grid */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-slate-200" size={48} />
                            </div>
                        ) : filteredReviews.length === 0 ? (
                            <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                    <Quote size={32} />
                                </div>
                                <p className="text-slate-400 italic font-sans text-xl">
                                    No reviews matching your filters. Try adjusting them!
                                </p>
                                <button 
                                    onClick={() => { setStarFilter(0); setKeywordFilter('All'); }}
                                    className="mt-6 text-mint-dark font-bold hover:underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {filteredReviews.map((review, i) => (
                                    <motion.div
                                        key={review._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center ${cardColors[i % cardColors.length]}`}
                                    >
                                        <div className="mb-8 relative">
                                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500 bg-white flex items-center justify-center">
                                                {review.patientImageUrl ? (
                                                    <img src={review.patientImageUrl} alt={review.patientName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-3xl font-bold text-slate-400 font-serif">
                                                        {review.patientName.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm">
                                                <div className="flex text-amber-400">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} size={12} fill="currentColor" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <Quote className="text-slate-200 mb-6 group-hover:scale-110 transition-transform duration-500" size={48} strokeWidth={3} />

                                        <p className="text-slate-700 text-lg font-sans leading-relaxed mb-8 italic">
                                            "{review.content}"
                                        </p>

                                        <div className="mt-auto">
                                            <h4 className="font-bold text-slate-800 tracking-tight text-xl">{review.patientName}</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                                                {review.treatment || 'Verified Patient'}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-12 bg-mint/20 mb-24 rounded-[3rem] mx-6">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-serif">Ready to Experience <br /> the Suvidha Difference?</h2>
                        <p className="text-slate-500 text-xl font-sans mb-12 max-w-2xl mx-auto leading-relaxed">
                            Our specialists are here to provide the same exceptional level of care to you and your loved ones.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button 
                                onClick={() => setIsAppointmentModalOpen(true)}
                                className="px-12 py-5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold tracking-tight shadow-xl shadow-slate-200 transition-all hover:scale-105 active:scale-95"
                            >
                                Schedule Your Visit
                            </button>
                            <button 
                                onClick={openModal}
                                className="px-10 py-5 bg-white text-slate-800 rounded-2xl font-bold tracking-tight shadow-lg hover:shadow-xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95 border border-slate-100"
                            >
                                <PenLine size={20} className="text-mint-dark" />
                                Share Your Experience
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Review Submission Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 font-serif">Share Your Journey</h2>
                                    <p className="text-sm text-slate-400 font-sans mt-1">Your review will appear after admin approval.</p>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                                    <X size={22} />
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-12 flex flex-col items-center text-center gap-4"
                                    >
                                        <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="text-mint-dark" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800">Review Received!</h3>
                                        <p className="text-slate-500 font-sans max-w-xs leading-relaxed">
                                            Thank you for sharing your experience. We truly appreciate your feedback and trust in us.
                                        </p>
                                        <button 
                                            onClick={closeModal}
                                            className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all font-sans"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form 
                                        key="form"
                                        onSubmit={handleSubmitReview}
                                        className="p-8 space-y-6"
                                    >
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">FullName *</label>
                                            <input 
                                                type="text"
                                                required
                                                placeholder="Enter your full name"
                                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-sky-400 font-medium transition-all"
                                                value={formData.patientName}
                                                onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">How was your experience? *</label>
                                            <div className="px-2">
                                                <StarPicker value={formData.rating} onChange={v => setFormData({ ...formData, rating: v })} />
                                                <p className="text-xs text-slate-400 mt-2 font-medium">
                                                    {formData.rating === 0 && 'Tap a star to rate'}
                                                    {formData.rating > 0 && `${['⭐ Poor', '⭐⭐ Fair', '⭐⭐⭐ Good', '⭐⭐⭐⭐ Very Good', '⭐⭐⭐⭐⭐ Excellent!'][formData.rating - 1]}`}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Feedback *</label>
                                            <textarea 
                                                required
                                                rows="4"
                                                placeholder="Tell us more about your visit..."
                                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-sky-400 font-sans resize-none transition-all"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            />
                                        </div>

                                        {formError && (
                                            <p className="text-xs text-rose-500 font-bold px-2">{formError}</p>
                                        )}

                                        <button 
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all font-sans disabled:opacity-60"
                                        >
                                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <PenLine size={18} />}
                                            {submitting ? 'Submitting Review...' : 'Submit Now'}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AppointmentModal 
                isOpen={isAppointmentModalOpen} 
                onClose={() => setIsAppointmentModalOpen(false)} 
            />
        </div>
    );
};

export default HappyPatientsPage;
