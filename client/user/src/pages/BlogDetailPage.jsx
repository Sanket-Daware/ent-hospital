import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, Tag, Share2, ExternalLink, Send, Mail, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppointmentModal from '../components/AppointmentModal';

const BlogDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

    useEffect(() => {
        fetchBlogDetail();
    }, [id]);

    const fetchBlogDetail = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/blogs/${id}`);
            if (res.data.success) {
                setBlog(res.data.blog);
                fetchRelated(res.data.blog.category);
            }
        } catch (error) {
            console.error("Fetch detail error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRelated = async (category) => {
        try {
            const res = await axios.get(`/api/blogs?category=${category}&publishedOnly=true`);
            if (res.data.success) {
                setRelatedBlogs(res.data.blogs.filter(b => b._id !== id).slice(0, 3));
            }
        } catch (err) {
            console.error("Related blogs error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <Loader2 className="animate-spin text-sky-dark" size={64} />
                <p className="text-slate-400 font-bold animate-pulse text-xl">Loading specialized medical article...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <div className="text-center p-12 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 max-w-lg">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Oops! Article Not Found</h2>
                    <p className="text-slate-500 mb-8 font-sans">The medical information you're looking for might have moved or been updated.</p>
                    <button 
                        onClick={() => navigate('/blogs')}
                        className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={18} /> Back to Medical Articles
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 font-sans">
            <div className="max-w-7xl mx-auto px-6">
                {/* Back Button & Breadcrumbs */}
                <div className="flex items-center gap-6 mb-12">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-dark hover:border-sky/30 transition-all shadow-sm group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <Link to="/" className="hover:text-slate-800 transition-colors">Home</Link>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <Link to="/blogs" className="hover:text-slate-800 transition-colors">Medical Articles</Link>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-sky-dark">{blog.category}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <article className="lg:col-span-8">
                        {/* Header Section */}
                        <div className="mb-10">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sky-dark font-accent text-xl mb-4 block"
                            >
                                {blog.category} Specialist Content
                            </motion.span>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-8 font-serif leading-tight tracking-tight"
                            >
                                {blog.title}
                            </motion.h1>
                            
                            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-200/50 mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-400 overflow-hidden">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Written By</p>
                                        <p className="text-sm font-bold text-slate-800">{blog.author || 'Medical Staff'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-sky/20 flex items-center justify-center text-sky-dark shadow-sm">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Published On</p>
                                        <p className="text-sm font-bold text-slate-800">{new Date(blog.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-auto">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Share Article:</span>
                                    <div className="flex gap-2">
                                        <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-dark transition-all"><ExternalLink size={16} /></button>
                                        <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-dark transition-all"><Send size={16} /></button>
                                        <button className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-dark transition-all"><Mail size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {blog.imageUrl && (
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="aspect-video w-full rounded-[3rem] overflow-hidden bg-slate-100 mb-12 shadow-2xl shadow-slate-200"
                            >
                                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                            </motion.div>
                        )}

                        {/* Article Text Content */}
                        <div className="prose prose-slate max-w-none text-slate-600 font-sans leading-relaxed space-y-8">
                            <p className="text-xl font-bold text-slate-800 mb-10 leading-relaxed max-w-3xl">
                                {blog?.excerpt}
                            </p>
                            {blog?.content?.split('\n\n').map((para, i) => (
                                <p key={i} className="text-lg">
                                    {para}
                                </p>
                            )) || <p className="italic text-slate-400">Detailed healthcare guidance coming soon.</p>}
                        </div>

                        {/* Article Footer Tags */}
                        <div className="mt-16 pt-10 border-t border-slate-200/50 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Tag size={18} />
                                <span className="text-xs font-bold uppercase tracking-widest">Topics:</span>
                            </div>
                            <span className="px-5 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{blog.category} Care</span>
                            <span className="px-5 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">ENT Health</span>
                            <span className="px-5 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">Medical Advice</span>
                        </div>
                    </article>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Help Box */}
                        <div className="bg-sky rounded-[3rem] p-10 shadow-xl shadow-sky/10 border border-sky/30">
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-sky-dark mb-8 shadow-sm">
                                <HelpCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 font-serif">Need Medical Advice?</h3>
                            <p className="text-slate-600 font-medium mb-10 leading-relaxed text-sm">
                                Our ENT specialists are here to provide personalized diagnostic assessments and treatment plans based on your specific symptoms.
                            </p>
                            <div className="space-y-4">
                                <a href="tel:9422519279" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sky-dark group-hover:scale-110 transition-transform shadow-sm"><Phone size={20} /></div>
                                    <span className="font-bold text-slate-800 tracking-tight text-xl">(+91) 9422519279</span>
                                </a>
                                <button 
                                    onClick={() => setIsAppointmentModalOpen(true)}
                                    className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-3 mt-6 shadow-xl shadow-slate-900/10"
                                >
                                    Book Consult Now <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Related Articles */}
                        {relatedBlogs.length > 0 && (
                            <div className="space-y-8 px-4">
                                <h4 className="text-slate-800 font-bold text-xl uppercase tracking-widest border-l-4 border-mint-dark pl-4">Related Specialty Tips</h4>
                                <div className="space-y-8">
                                    {relatedBlogs.map((rBlog) => (
                                        <Link key={rBlog._id} to={`/blogs/${rBlog._id}`} className="flex gap-4 group cursor-pointer group">
                                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-md">
                                                <img 
                                                    src={rBlog.imageUrl || '/images/blog-placeholder.png'} 
                                                    alt={rBlog.title} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                />
                                            </div>
                                            <div className="py-1">
                                                <h5 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-sky-dark transition-colors mb-2">
                                                    {rBlog.title}
                                                </h5>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest py-1 px-2 bg-slate-100 rounded-md">
                                                    {rBlog.category}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            <AppointmentModal 
                isOpen={isAppointmentModalOpen} 
                onClose={() => setIsAppointmentModalOpen(false)} 
            />
        </div>
    );
};

export default BlogDetailPage;
