import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Trash2, 
    Edit, 
    X,
    Loader2,
    Calendar,
    User,
    FileText,
    Image as ImageIcon,
    Upload,
    CheckCircle,
    Eye,
    EyeOff
} from 'lucide-react';
import axios from 'axios';

const BlogsAdmin = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: 'Admin',
        category: 'General',
        excerpt: '',
        isPublished: true
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const categories = ['All', 'Ear', 'Nose & Sinus', 'Throat & Voice', 'Head & Neck', 'Pediatric ENT', 'Sleep & Snoring', 'General'];

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/blogs');
            if (res.data.success) {
                setBlogs(res.data.blogs);
            }
        } catch (error) {
            console.error("Fetch blogs error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const data = new FormData();
        if (selectedFile) data.append('image', selectedFile);
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('author', formData.author);
        data.append('category', formData.category);
        data.append('excerpt', formData.excerpt);
        data.append('isPublished', formData.isPublished);

        try {
            let res;
            if (editingBlog) {
                res = await axios.put(`/api/blogs/${editingBlog._id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.data.success) {
                    setBlogs(prev => prev.map(b => b._id === editingBlog._id ? res.data.blog : b));
                }
            } else {
                res = await axios.post('/api/blogs', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.data.success) {
                    setBlogs([res.data.blog, ...blogs]);
                }
            }
            closeModal();
        } catch (error) {
            console.error("Submit blog error:", error);
            alert("Error saving blog article");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await axios.delete(`/api/blogs/${id}`);
            if (res.data.success) {
                setBlogs(blogs.filter(b => b._id !== id));
            }
        } catch (error) {
            console.error("Delete blog error:", error);
        }
    };

    const openModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                content: blog.content,
                author: blog.author || 'Admin',
                category: blog.category || 'General',
                excerpt: blog.excerpt || '',
                isPublished: blog.isPublished !== undefined ? blog.isPublished : true
            });
            setPreviewUrl(blog.imageUrl);
        } else {
            setEditingBlog(null);
            setFormData({ title: '', content: '', author: 'Admin', category: 'General', excerpt: '', isPublished: true });
            setPreviewUrl(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        setFormData({ title: '', content: '', author: 'Admin', category: 'General', excerpt: '', isPublished: true });
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const filteredBlogs = activeFilter === 'All' 
        ? blogs 
        : blogs.filter(b => b.category === activeFilter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">Blogs & Articles</h1>
                    <p className="text-[13px] text-slate-500 font-sans">Manage specialty content for patients. Images are auto-compressed.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-medium text-[13px] hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={18} />
                    <span>Create New Post</span>
                </button>
            </div>

            {/* Specialty Filters */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 rounded-xl text-[11px] font-semibold transition-all whitespace-nowrap ${
                            activeFilter === cat 
                            ? 'bg-sky-dark text-white shadow-md' 
                            : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="py-20 flex justify-center">
                    <Loader2 className="animate-spin text-slate-200" size={48} />
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                        <FileText size={32} />
                    </div>
                    <p className="text-slate-300 italic font-sans">No blog posts found here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredBlogs.map((blog) => (
                        <motion.div 
                            key={blog._id}
                            className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all duration-500 group relative"
                        >
                            {!blog.isPublished && (
                                <div className="absolute top-6 left-6 z-10 bg-slate-800/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                                    <EyeOff size={12} /> Draft
                                </div>
                            )}
                            <div className="w-full md:w-64 h-48 rounded-3xl overflow-hidden bg-slate-50 shrink-0">
                                {blog.imageUrl ? (
                                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-4 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(blog.publishedDate).toLocaleDateString()}</div>
                                    <div className="flex items-center gap-1.5"><User size={12} /> {blog.author}</div>
                                    <div className="px-2 py-0.5 bg-sky/20 text-sky-dark rounded-md">{blog.category}</div>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 leading-tight group-hover:text-sky-dark transition-colors">{blog?.title || "Untitled Article"}</h3>
                                <p className="text-[13px] text-slate-500 font-sans line-clamp-2 leading-relaxed">{blog?.excerpt || blog?.content?.substring(0, 150) || "No content available."}</p>
                                <div className="flex items-center gap-6 pt-2">
                                    <button 
                                        onClick={() => openModal(blog)}
                                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-800 hover:text-sky-dark transition-colors"
                                    >
                                        <Edit size={16} /> Edit Article
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(blog._id)}
                                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-rose hover:text-rose-dark transition-colors"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
                            className="bg-white rounded-[3rem] w-full max-w-4xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-800">{editingBlog ? 'Edit Post' : 'Create New Post'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
                                            <input 
                                                required
                                                placeholder="Enter title..."
                                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-semibold text-base"
                                                value={formData.title}
                                                onChange={e => setFormData({...formData, title: e.target.value})}
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Short Excerpt</label>
                                            <textarea 
                                                rows="2"
                                                placeholder="Brief summary for list view..."
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-sans text-[13px]"
                                                value={formData.excerpt}
                                                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Article Content</label>
                                            <textarea 
                                                required
                                                rows="12"
                                                placeholder="Write your article content here..."
                                                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-sans leading-relaxed resize-none shadow-inner text-[13px]"
                                                value={formData.content}
                                                onChange={e => setFormData({...formData, content: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Featured Image</label>
                                            <div 
                                                onClick={() => document.getElementById('blog-image').click()}
                                                className="aspect-square border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-sky bg-slate-50 overflow-hidden relative group"
                                            >
                                                <input id="blog-image" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                                {previewUrl ? (
                                                    <>
                                                        <img src={previewUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                            <Upload className="text-white" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center p-4 text-center">
                                                        <Upload className="text-slate-300 mb-2" size={32} />
                                                        <p className="text-[11px] font-semibold text-slate-500">Tap to upload an image</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-slate-50">
                                            <div className="space-y-1">
                                                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Specialty Category</label>
                                                <select 
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-medium"
                                                    value={formData.category}
                                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                                >
                                                    {categories.filter(c => c !== 'All').map(c => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest ml-1">Author</label>
                                                <input 
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-sky font-medium"
                                                    value={formData.author}
                                                    onChange={e => setFormData({...formData, author: e.target.value})}
                                                />
                                            </div>

                                            <div className="flex items-center gap-3 pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({...formData, isPublished: !formData.isPublished})}
                                                    className={`h-8 w-14 rounded-full transition-all relative ${formData.isPublished ? 'bg-mint-dark' : 'bg-slate-200'}`}
                                                >
                                                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.isPublished ? 'right-1' : 'left-1 shadow-sm'}`} />
                                                </button>
                                                <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
                                                    {formData.isPublished ? 'Published' : 'Draft Mode'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    disabled={(!selectedFile && !editingBlog) || isSubmitting}
                                    type="submit"
                                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                                    <span>{editingBlog ? 'Save Article Changes' : 'Publish Article to Site'}</span>
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogsAdmin;
