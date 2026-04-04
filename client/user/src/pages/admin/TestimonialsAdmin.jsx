import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Trash2, 
    Edit, 
    X,
    Loader2,
    Star,
    Quote,
    UserCircle,
    CheckCircle2,
    XCircle,
    Clock,
    Filter
} from 'lucide-react';
import axios from 'axios';

const STATUS_COLORS = {
    approved: 'bg-mint text-mint-dark',
    pending: 'bg-amber-100 text-amber-700',
    rejected: 'bg-rose-100 text-rose-700'
};

const TestimonialsAdmin = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [formData, setFormData] = useState({
        patientName: '',
        treatment: '',
        rating: 5,
        content: '',
        patientImageUrl: ''
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/testimonials');
            if (res.data.success) {
                setTestimonials(res.data.testimonials);
            }
        } catch (error) {
            console.error("Fetch testimonials error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await axios.patch(`/api/testimonials/${id}/approve`);
            if (res.data.success) {
                setTestimonials(prev => prev.map(t => t._id === id ? { ...t, isApproved: true } : t));
            }
        } catch (error) {
            console.error("Approve error:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            const res = await axios.patch(`/api/testimonials/${id}/reject`);
            if (res.data.success) {
                setTestimonials(prev => prev.map(t => t._id === id ? { ...t, isApproved: false } : t));
            }
        } catch (error) {
            console.error("Reject error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTestimonial) {
                const res = await axios.put(`/api/testimonials/${editingTestimonial._id}`, formData);
                if (res.data.success) {
                    setTestimonials(prev => prev.map(t => t._id === editingTestimonial._id ? res.data.testimonial : t));
                }
            } else {
                const res = await axios.post('/api/testimonials', formData);
                if (res.data.success) {
                    setTestimonials([res.data.testimonial, ...testimonials]);
                }
            }
            closeModal();
        } catch (error) {
            console.error("Submit testimonial error:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this testimonial?")) return;
        try {
            const res = await axios.delete(`/api/testimonials/${id}`);
            if (res.data.success) {
                setTestimonials(testimonials.filter(t => t._id !== id));
            }
        } catch (error) {
            console.error("Delete testimonial error:", error);
        }
    };

    const openModal = (testimonial = null) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData({
                patientName: testimonial.patientName,
                treatment: testimonial.treatment || '',
                rating: testimonial.rating || 5,
                content: testimonial.content,
                patientImageUrl: testimonial.patientImageUrl || ''
            });
        } else {
            setEditingTestimonial(null);
            setFormData({ patientName: '', treatment: '', rating: 5, content: '', patientImageUrl: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTestimonial(null);
    };

    // Filter logic
    const filteredTestimonials = testimonials.filter(t => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Approved') return t.isApproved === true;
        if (activeFilter === 'Pending') return t.isApproved === false && t.source === 'patient';
        if (activeFilter === 'Admin') return t.source === 'admin';
        return true;
    });

    const pendingCount = testimonials.filter(t => !t.isApproved && t.source === 'patient').length;

    const getStatusLabel = (t) => {
        if (t.isApproved) return 'approved';
        if (t.source === 'patient') return 'pending';
        return 'rejected';
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">Patient Feedback</h1>
                    <p className="text-[13px] text-slate-500 font-sans">
                        Manage and approve patient reviews.
                        {pendingCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[11px] font-semibold">
                                {pendingCount} pending approval
                            </span>
                        )}
                    </p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-medium text-[13px] hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={18} />
                    <span>Add Testimonial</span>
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-400">
                    <Filter size={16} />
                    <span className="text-[11px] font-semibold uppercase tracking-widest">Filter By</span>
                </div>
                {['All', 'Pending', 'Approved', 'Admin'].map((label) => (
                    <button
                        key={label}
                        onClick={() => setActiveFilter(label)}
                        className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                            activeFilter === label 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent'
                        }`}
                    >
                        {label}
                        {label === 'Pending' && pendingCount > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 bg-amber-400 text-white rounded-full text-[10px] font-medium">{pendingCount}</span>
                        )}
                    </button>
                ))}
                <div className="ml-auto text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-4">
                    {filteredTestimonials.length} Reviews
                </div>
            </div>

            {isLoading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="animate-spin text-slate-200" size={48} />
                </div>
            ) : filteredTestimonials.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                        <Quote size={32} />
                    </div>
                    <p className="text-slate-300 italic font-sans">No testimonials found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredTestimonials.map((t) => {
                        const statusLabel = getStatusLabel(t);
                        return (
                            <motion.div 
                                key={t._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* Status Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest flex items-center gap-1.5 ${STATUS_COLORS[statusLabel]}`}>
                                        {statusLabel === 'approved' && <CheckCircle2 size={12} />}
                                        {statusLabel === 'pending' && <Clock size={12} />}
                                        {statusLabel === 'rejected' && <XCircle size={12} />}
                                        {statusLabel}
                                    </span>
                                    {t.source === 'patient' && (
                                        <span className="text-[10px] font-medium text-slate-300 uppercase tracking-widest">Patient Submitted</span>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-100'} />
                                        ))}
                                    </div>
                                    <p className="text-[14px] text-slate-600 font-sans leading-relaxed italic">"{t.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                            {t.patientImageUrl ? (
                                                <img src={t.patientImageUrl} alt={t.patientName} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserCircle className="text-slate-300" size={32} />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 tracking-tight text-[15px]">{t.patientName}</h4>
                                            {t.treatment && <p className="text-[11px] font-semibold text-sky-dark uppercase tracking-widest">{t.treatment}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-50">
                                    {/* Approve */}
                                    {!t.isApproved && (
                                        <button 
                                            onClick={() => handleApprove(t._id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-mint/20 text-mint-dark rounded-xl text-[12px] font-semibold hover:bg-mint hover:text-white transition-all"
                                        >
                                            <CheckCircle2 size={14} /> Approve
                                        </button>
                                    )}
                                    {/* Reject */}
                                    {t.isApproved && (
                                        <button 
                                            onClick={() => handleReject(t._id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-xl text-[12px] font-semibold hover:bg-rose-500 hover:text-white transition-all"
                                        >
                                            <XCircle size={14} /> Revoke
                                        </button>
                                    )}
                                    <div className="ml-auto flex items-center gap-1">
                                        <button onClick={() => openModal(t)} className="p-2 text-slate-300 hover:text-sky-dark transition-colors rounded-xl hover:bg-sky/10">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(t._id)} className="p-2 text-slate-300 hover:text-rose transition-colors rounded-xl hover:bg-rose/10">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-800">{editingTestimonial ? 'Update Review' : 'New Testimonial'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Patient Name *</label>
                                        <input 
                                            required
                                            placeholder="Who gave the feedback?"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-semibold text-[13px]"
                                            value={formData.patientName}
                                            onChange={e => setFormData({...formData, patientName: e.target.value})}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Treatment Type</label>
                                            <input 
                                                placeholder="e.g. Ear Surgery"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-normal text-[13px]"
                                                value={formData.treatment}
                                                onChange={e => setFormData({...formData, treatment: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Star Rating *</label>
                                            <select 
                                                required
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-normal text-[13px]"
                                                value={formData.rating}
                                                onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                                            >
                                                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} Stars</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Patient Photo URL</label>
                                        <input 
                                            placeholder="Paste image link here..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-normal text-[13px]"
                                            value={formData.patientImageUrl}
                                            onChange={e => setFormData({...formData, patientImageUrl: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Feedback Content *</label>
                                        <textarea 
                                            required
                                            rows="4"
                                            placeholder="What did the patient say?"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-sans resize-none text-[13px]"
                                            value={formData.content}
                                            onChange={e => setFormData({...formData, content: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    {editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TestimonialsAdmin;
