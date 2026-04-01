import React, { useState, useEffect } from 'react';
import { Star, Quote, X, Loader2, CheckCircle2, PenLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

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

const ReviewsSection = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ patientName: '', rating: 0, content: '' });
    const [formError, setFormError] = useState('');

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

    // Average rating display
    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : '5.0';

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
                            <p className="text-xs font-bold text-slate-600 tracking-tight">
                                {avgRating} avg · {reviews.length > 0 ? `${reviews.length}+ Reviews` : '500+ Happy Patients'}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Review Cards */}
                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="animate-spin text-slate-200" size={48} />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-slate-300 italic font-sans">No reviews yet. Be the first to share your experience!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.slice(0, 3).map((review, index) => (
                            <motion.div
                                key={review._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-10 rounded-[2.5rem] ${cardColors[index % cardColors.length]} relative group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2`}
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
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-500 font-bold shadow-sm overflow-hidden">
                                        {review.patientImageUrl
                                            ? <img src={review.patientImageUrl} alt={review.patientName} className="w-full h-full object-cover" />
                                            : review.patientName.charAt(0).toUpperCase()
                                        }
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 tracking-tight">{review.patientName}</h4>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                                            {review.treatment || 'Patient'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Share Review CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <p className="text-slate-500 font-sans">Visited us recently?</p>
                    <div className="flex gap-4">
                        <button 
                            onClick={openModal}
                            className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                        >
                            <PenLine size={18} />
                            Share Your Experience
                        </button>
                        <a 
                            href="/happy-patients"
                            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                        >
                            View All Reviews
                        </a>
                    </div>
                </motion.div>
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
                                    <h2 className="text-2xl font-bold text-slate-800">Share Your Experience</h2>
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
                                        <h3 className="text-2xl font-bold text-slate-800">Thank You!</h3>
                                        <p className="text-slate-500 font-sans max-w-xs leading-relaxed">
                                            Your review has been submitted and is pending admin approval. We appreciate your feedback!
                                        </p>
                                        <button 
                                            onClick={closeModal}
                                            className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
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
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Name *</label>
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
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Star Rating *</label>
                                            <div className="px-2">
                                                <StarPicker value={formData.rating} onChange={v => setFormData({ ...formData, rating: v })} />
                                                <p className="text-xs text-slate-400 mt-2 font-medium">
                                                    {formData.rating === 0 && 'Tap a star to rate'}
                                                    {formData.rating === 1 && '⭐ Poor'}
                                                    {formData.rating === 2 && '⭐⭐ Fair'}
                                                    {formData.rating === 3 && '⭐⭐⭐ Good'}
                                                    {formData.rating === 4 && '⭐⭐⭐⭐ Very Good'}
                                                    {formData.rating === 5 && '⭐⭐⭐⭐⭐ Excellent!'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Review *</label>
                                            <textarea 
                                                required
                                                rows="4"
                                                placeholder="Tell us about your experience at Suvidha ENT..."
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
                                            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg disabled:opacity-60"
                                        >
                                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <PenLine size={18} />}
                                            {submitting ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ReviewsSection;
