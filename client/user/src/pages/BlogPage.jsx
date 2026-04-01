import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Loader2, FileText, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const categories = ['All', 'Ear', 'Nose & Sinus', 'Throat & Voice', 'Head & Neck', 'Pediatric ENT', 'Sleep & Snoring', 'General'];

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
        <div className="pt-32 pb-24 min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sky-dark font-accent text-xl mb-4 block"
                    >
                        Health & Wellness
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-bold text-slate-800 mb-8 font-serif tracking-tight"
                    >
                        Expert medical <br />
                        <span className="text-sky-dark underline decoration-sky/20 underline-offset-8">Information & Advice</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
                    >
                        Stay informed with the latest research, treatment options, and tips for your ENT health from our specialty doctors.
                    </motion.p>
                </div>

                {/* Categories Filter */}
                <div className="mb-16">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm ${
                                    activeCategory === cat 
                                    ? 'bg-slate-800 text-white translate-y-[-2px] shadow-lg shadow-slate-200' 
                                    : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                {isLoading ? (
                    <div className="py-24 flex flex-col items-center justify-center gap-6">
                        <Loader2 className="animate-spin text-sky-dark" size={48} />
                        <p className="text-slate-400 font-bold animate-pulse">Fetching medical articles...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                            <FileText size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">No Articles Yet</h3>
                        <p className="text-slate-400 max-w-md mx-auto">We're currently writing helpful specialty content for this category. Check back soon for expert ENT advice!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog, i) => (
                            <motion.article
                                key={blog._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 group flex flex-col h-full"
                            >
                                <Link to={`/blogs/${blog._id}`} className="block aspect-[16/10] overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-sky-dark text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm">
                                            {blog.category}
                                        </span>
                                    </div>
                                    <img 
                                        src={blog.imageUrl || '/images/blog-placeholder.png'} 
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-800 scale-0 group-hover:scale-100 transition-transform delay-100">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </Link>
                                
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 mb-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5"><Calendar size={14} className="text-sky" /> {new Date(blog.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                        <div className="flex items-center gap-1.5"><User size={14} className="text-mint-dark" /> {blog.author}</div>
                                    </div>
                                    
                                    <Link to={`/blogs/${blog._id}`}>
                                        <h2 className="text-2xl font-bold text-slate-800 mb-4 leading-tight group-hover:text-sky-dark transition-colors font-serif">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    
                                    <p className="text-slate-500 font-sans leading-relaxed mb-8 line-clamp-3">
                                        {blog?.excerpt || (blog?.content ? blog.content.substring(0, 160) + "..." : "Reading more about this specialized care...")}
                                    </p>
                                    
                                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <Link to={`/blogs/${blog._id}`} className="text-sm font-bold text-slate-800 hover:text-sky-dark transition-colors flex items-center gap-2 group/btn">
                                            Read More 
                                            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                        <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
