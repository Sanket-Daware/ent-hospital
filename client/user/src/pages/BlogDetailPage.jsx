import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, Tag, Share2, Phone, ArrowRight, HelpCircle, Globe } from 'lucide-react';
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
        window.scrollTo(0, 0);
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
                setRelatedBlogs(res.data.blogs.filter(b => b._id !== id).slice(0, 4));
            }
        } catch (err) {
            console.error("Related blogs error:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <Loader2 className="animate-spin text-sky-dark" size={64} />
                <p className="text-slate-400 font-bold animate-pulse text-xl">Preparing editorial medical article...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
                <div className="text-center p-12 bg-[#F8F6F1] rounded-[3rem] shadow-xl shadow-slate-100/50 border border-slate-100 max-w-lg">
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
        <div className="min-h-screen bg-white font-sans selection:bg-sky/30">
            {/* Custom Fonts for Editorial Look */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Dancing+Script:wght@700&family=Inter:wght@400;500;600;700&display=swap');
                    .font-editorial-title { font-family: 'Lora', serif; }
                    .font-handwritten { font-family: 'Dancing Script', cursive; }
                `}
            </style>

            {/* Section 1: Hero Header (#F8F6F1) */}
            <header className="bg-[#F8F6F1] pt-32 pb-40 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500/60 mb-6 tracking-wide">
                        <Link to="/" className="hover:text-slate-800 transition-colors uppercase">Home</Link>
                        <span className="text-slate-300">/</span>
                        <Link to="/blogs" className="hover:text-slate-800 transition-colors uppercase">Articles</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-sky-dark uppercase">{blog.category}</span>
                    </nav>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-editorial-title font-bold text-slate-900 mb-10 leading-[1.1] tracking-tight"
                    >
                        {blog.title}
                    </motion.h1>

                    <div className="w-16 h-px bg-slate-300 mx-auto mb-10" />

                    <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Expert medical guidance from our ENT specialists. Always consult with a qualified physician for personalized diagnosis and treatment.
                    </p>
                </div>
            </header>

            {/* Section 2: Main Layout with Overlapping Doctor Card */}
            <main className="max-w-[1200px] mx-auto px-6 relative -mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left: Featured Image + Content */}
                    <div className="lg:col-span-7">
                        {/* Featured Image (Vertical/Tall focus) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/60 mb-16 relative mt-[140px]"
                        >
                            <img
                                src={blog.imageUrl || '/images/blog-placeholder.png'}
                                alt={blog.title}
                                className="w-full h-auto min-h-[500px] object-cover"
                            />
                        </motion.div>

                        {/* Article Text Content */}
                        <article className="prose prose-slate max-w-none px-2 lg:px-6">
                            <p className="text-[17px] font-semibold text-slate-900 leading-relaxed mb-12 font-editorial-title">
                                {blog?.excerpt}
                            </p>

                            <div className="text-slate-700 leading-[1.8] space-y-8 font-medium">
                                {blog?.content?.split('\n\n').map((para, i) => (
                                    <p key={i} className="text-[12px] md:text-[13px]">
                                        {para}
                                    </p>
                                )) || <p className="italic text-slate-400">Detailed healthcare guidance coming soon.</p>}
                            </div>

                            {/* Tags Footer */}
                            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap gap-3">
                                <span className="px-5 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">{blog.category} Care</span>
                                <span className="px-5 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">ENT Health</span>
                                <span className="px-5 py-2 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">Expert Medical Tips</span>
                            </div>
                        </article>
                    </div>

                    {/* Right: Overlapping Doctor Card + Sidebar */}
                    <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-16 lg:ml-[70px]">
                        {/* Overlapping Doctor Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-[2.5rem] p-10 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.08)] border border-slate-100 text-center relative z-20 -mt-[50px]"
                        >
                            <div className="w-[154px] h-[154px] rounded-full overflow-hidden mx-auto mb-8 ring-8 ring-[#F8F6F1]/50 border border-slate-200 shadow-xl">
                                <img
                                    src="/images/doctor-sanket.png"
                                    alt="Dr. Swapnil Sharma"
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1000";
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>

                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Medical Reviewer</p>
                            <h3 className="text-slate-900 text-sm mb-4 font-bold md:flex items-center justify-center gap-2">
                                HI, I'M <span className="text-3xl font-handwritten text-sky-dark inline-block ml-1">Dr. Swapnil Sharma</span>
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed mb-10 px-4 font-medium">
                                Welcome to our health blog. I'm dedicated to providing clear, evidence-based ENT
                                insights to help you and your family breathe, hear, and feel better every day.
                            </p>

                            <button
                                onClick={() => navigate('/about')}
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all mb-8 shadow-xl shadow-slate-200 tracking-wider text-xs uppercase"
                            >
                                More About Me
                            </button>

                            <div className="flex justify-center gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-[#f8fbff] flex items-center justify-center text-slate-400 hover:text-sky-dark transition-all border border-slate-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#f8fbff] flex items-center justify-center text-slate-400 hover:text-[#1877F2] transition-all border border-slate-100">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-[#f8fbff] flex items-center justify-center text-slate-400 hover:text-sky-dark transition-all border border-slate-100"><Share2 size={18} /></a>
                            </div>
                        </motion.div>

                        {/* Medical Call to Action */}
                        <div className="bg-sky rounded-[2.5rem] p-10 shadow-2xl shadow-sky/10 border border-sky/30">
                            <HelpCircle className="text-sky-dark mb-6" size={40} />
                            <h4 className="text-2xl font-editorial-title font-bold text-slate-900 mb-4 tracking-tight">Need a Consultation?</h4>
                            <p className="text-slate-600 font-medium mb-10 leading-relaxed text-sm">
                                Our ENT specialists are here to provide personalized diagnostic assessments and expert treatment plans.
                            </p>
                            <button
                                onClick={() => setIsAppointmentModalOpen(true)}
                                className="w-full py-4 bg-white text-sky-dark rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-lg"
                            >
                                Book Now <ArrowRight size={18} />
                            </button>
                        </div>

                        {/* Related Articles - Sidebar (As requested) */}
                        <div className="space-y-8 px-4">
                            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest border-l-4 border-mint-dark pl-4">Suggested Reading</h4>
                            <div className="space-y-10">
                                {relatedBlogs.map((rBlog) => (
                                    <Link key={rBlog._id} to={`/blogs/${rBlog._id}`} className="flex gap-5 group cursor-pointer">
                                        <div className="w-20 h-20 rounded-[1.25rem] overflow-hidden shrink-0 border border-slate-100 shadow-md">
                                            <img
                                                src={rBlog.imageUrl || '/images/blog-placeholder.png'}
                                                alt={rBlog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="py-0.5">
                                            <h5 className="text-[15px] font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-sky-dark transition-colors mb-2">
                                                {rBlog.title}
                                            </h5>
                                            <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.15em]">
                                                {rBlog.category} Specialists
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <AppointmentModal
                isOpen={isAppointmentModalOpen}
                onClose={() => setIsAppointmentModalOpen(false)}
            />
        </div>
    );
};

export default BlogDetailPage;
