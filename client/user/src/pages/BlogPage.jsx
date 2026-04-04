import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, FileText, ChevronRight, Share2, Copy, Send } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Masonry from 'react-masonry-css';

const ShareMenu = ({ blog, onClose }) => {
    const shareUrl = `${window.location.origin}/blogs/${blog._id}`;
    const shareTitle = `Check out this ENT health article: ${blog.title}`;

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
        onClose();
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        onClose();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        onClose();
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-16 right-4 z-50 bg-white shadow-2xl rounded-2xl p-2 border border-slate-100 flex flex-col gap-1 min-w-[140px]"
        >
            <button onClick={shareOnWhatsApp} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-700 text-sm font-semibold group/item">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white transition-all">
                    <Send size={14} />
                </div>
                WhatsApp
            </button>
            <button onClick={copyToClipboard} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-700 text-sm font-semibold group/item">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover/item:bg-slate-600 group-hover/item:text-white transition-all">
                    <Copy size={14} />
                </div>
                Copy Link
            </button>
        </motion.div>
    );
};

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All';
    
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeShareId, setActiveShareId] = useState(null);

    const navigate = useNavigate();
    const categories = ['All', 'Ear', 'Nose & Sinus', 'Throat & Voice', 'Head & Neck', 'Pediatric ENT', 'Sleep & Snoring', 'General'];

    const breakpointColumnsObj = {
        default: 5,
        1200: 4,
        960: 3,
        720: 2,
        480: 1
    };

    useEffect(() => {
        fetchBlogs();
    }, [activeCategory]);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/blogs?category=${encodeURIComponent(activeCategory)}&publishedOnly=true`);
            if (res.data.success) {
                setBlogs(res.data.blogs);
            }
        } catch (error) {
            console.error("Fetch blogs error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-white font-sans overflow-x-hidden">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@400;500;600;700&display=swap');
                    .font-editorial-title { font-family: 'Lora', serif; }
                `}
            </style>
            <div className="max-w-[1244px] mx-auto px-4 md:px-0 box-content">
                
                <header className="mb-14 text-center px-4 md:px-0">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight font-editorial-title"
                    >
                        Health & Wellness Blog
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-2xl mx-auto text-[13px] leading-relaxed font-medium"
                    >
                        Learn from our specialty ENT doctors about the latest medical innovations, 
                        treatment options, and wellness tips to stay healthy and informed.
                    </motion.p>
                </header>

                <nav className="mb-14 flex justify-center sticky top-24 z-30 py-2 bg-white/95 backdrop-blur-sm">
                    <div className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar gap-2 md:gap-3 p-1.5 bg-slate-100/60 rounded-full border border-slate-200/50 shadow-sm">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSearchParams({ category: cat })}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                                    activeCategory === cat 
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="w-full relative">
                    {isLoading ? (
                        <div className="h-[40vh] flex flex-col items-center justify-center gap-6">
                            <Loader2 className="animate-spin text-sky-dark" size={40} />
                            <p className="text-slate-400 font-medium tracking-wide">Preparing medical insights...</p>
                        </div>
                    ) : (blogs.length === 0 ? (
                        <div className="py-24 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 mt-10">
                            <FileText className="mx-auto mb-4 text-slate-300" size={48} />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No Articles Yet</h3>
                            <p className="text-slate-500">Check back soon for new ENT medical insights!</p>
                        </div>
                    ) : (
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="masonry-grid"
                            columnClassName="masonry-grid_column"
                        >
                            {blogs.map((blog, i) => (
                                <motion.article
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: (i % 5) * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => navigate(`/blogs/${blog._id}`)}
                                    className="group mb-12 cursor-pointer overflow-visible"
                                >
                                    <div className="bg-[#eeeeee] rounded-[1.5rem] p-3.5 border border-slate-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.16),0_8px_20px_-8px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:bg-[#dcdcdc] group-hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.36)] group-hover:translate-y-[-14px] group-hover:border-slate-300/80 group-active:scale-[0.98] relative isolate">
                                        
                                        <Link to={`/blogs/${blog._id}`} className="block relative overflow-hidden bg-white/70 rounded-2xl leading-none border border-black/5 shadow-inner">
                                            <img 
                                                src={blog.imageUrl || '/images/blog-placeholder.png'} 
                                                alt={blog.title}
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setActiveShareId(activeShareId === blog._id ? null : blog._id);
                                                    }}
                                                    className="w-10 h-10 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-slate-800 shadow-xl hover:bg-white active:scale-95 transition-all z-50"
                                                >
                                                    <Share2 size={16} />
                                                </button>
                                            </div>
                                        </Link>
                                        
                                        <div className="px-1.5 pt-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter border border-slate-300 px-1.5 py-0.5 rounded leading-none">
                                                    {blog.category}
                                                </span>
                                                <span className="text-[10px] font-medium text-mint-dark uppercase tracking-wide flex items-center gap-0.5 leading-none">
                                                    Medical Guide <ChevronRight size={8} />
                                                </span>
                                            </div>
                                            
                                            <Link to={`/blogs/${blog._id}`}>
                                                <h2 className="text-[16px] font-bold text-slate-800 leading-tight mb-2 line-clamp-2 transition-colors font-sans group-hover:text-slate-950">
                                                    {blog.title}
                                                </h2>
                                            </Link>
                                            
                                            <p className="text-[12px] text-slate-500 font-medium leading-relaxed line-clamp-1 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                                {blog?.excerpt || (blog?.content ? blog.content.substring(0, 140) + "..." : "Reading more specialized medical insights and expert guidance...")}
                                            </p>
                                            
                                            <Link to={`/blogs/${blog._id}`} className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-900 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-sky-dark">
                                                VIEW BLOG <ChevronRight size={14} className="text-mint-dark" />
                                            </Link>
                                        </div>

                                        {/* Share Menu Portal/Popover */}
                                        <AnimatePresence>
                                            {activeShareId === blog._id && (
                                                <ShareMenu 
                                                    blog={blog} 
                                                    onClose={() => setActiveShareId(null)} 
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.article>
                            ))}
                        </Masonry>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
