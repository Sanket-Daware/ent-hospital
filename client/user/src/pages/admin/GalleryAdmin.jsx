import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Trash2, 
    Image as ImageIcon, 
    Video, 
    Upload, 
    X,
    Loader2,
    Search,
    Filter,
    Edit3
} from 'lucide-react';
import axios from 'axios';

const GalleryAdmin = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [uploadData, setUploadData] = useState({
        title: '',
        description: '',
        mediaType: 'image',
        category: 'General',
        displayOrder: 0
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Facilities', 'Equipment', 'Staff', 'Events', 'Procedures', 'Before & After', 'General'];

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/gallery');
            if (res.data.success) {
                setItems(res.data.items);
            }
        } catch (error) {
            console.error("Fetch gallery error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        setIsUploading(true);
        const formData = new FormData();
        if (selectedFile) formData.append('media', selectedFile);
        formData.append('title', uploadData.title);
        formData.append('description', uploadData.description);
        formData.append('mediaType', uploadData.mediaType);
        formData.append('category', uploadData.category);
        formData.append('displayOrder', uploadData.displayOrder);

        try {
            if (editingItem) {
                const res = await axios.put(`/api/gallery/${editingItem._id}`, uploadData);
                if (res.data.success) {
                    setItems(items.map(item => item._id === editingItem._id ? res.data.item : item));
                }
            } else {
                if (!selectedFile) return alert("Please select a file to upload");
                const res = await axios.post('/api/gallery', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                if (res.data.success) {
                    setItems([res.data.item, ...items]);
                }
            }
            closeModal();
        } catch (error) {
            console.error("Upload error:", error);
            alert(error.response?.data?.message || "Something went wrong during upload");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await axios.delete(`/api/gallery/${id}`);
            if (res.data.success) {
                setItems(items.filter(item => item._id !== id));
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setUploadData({
            title: item.title,
            description: item.description,
            mediaType: item.mediaType,
            category: item.category,
            displayOrder: item.displayOrder || 0
        });
        setPreviewUrl(item.mediaUrl);
        setIsUploadModalOpen(true);
    };

    const closeModal = () => {
        setIsUploadModalOpen(false);
        setEditingItem(null);
        setUploadData({ title: '', description: '', mediaType: 'image', category: 'General', displayOrder: 0 });
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const filteredItems = activeFilter === 'All' 
        ? items 
        : items.filter(item => item.category === activeFilter);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Gallery Management</h1>
                    <p className="text-slate-500 font-sans">Upload photos to Cloudinary. Images will be auto-compressed.</p>
                </div>
                <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={18} />
                    <span>Upload Media</span>
                </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 custom-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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
            ) : filteredItems.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="text-slate-200" size={32} />
                    </div>
                    <p className="text-slate-300 italic font-sans">No items found for this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <motion.div 
                            key={item._id}
                            layout
                            className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white group relative"
                        >
                            <div className="aspect-video relative overflow-hidden bg-slate-50">
                                <img 
                                    src={item.mediaUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button 
                                        onClick={() => openEditModal(item)}
                                        className="p-2 bg-white/80 backdrop-blur-md text-slate-800 rounded-full hover:bg-sky hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Edit3 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 bg-white/80 backdrop-blur-md text-rose rounded-full hover:bg-rose hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-3 py-1 bg-white/80 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-slate-800 line-clamp-1">{item.title || "Untitled"}</h3>
                                    <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">Order: {item.displayOrder}</span>
                                </div>
                                <p className="text-sm text-slate-400 font-sans line-clamp-2">{item.description || "No description."}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Upload/Edit Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
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
                            className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-800">{editingItem ? 'Edit Media' : 'Upload New Media'}</h2>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleUpload} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {!editingItem && (
                                    <div className="space-y-4">
                                        <div 
                                            onClick={() => document.getElementById('file-upload').click()}
                                            className={`border-2 border-dashed rounded-[2rem] p-8 text-center transition-all cursor-pointer overflow-hidden relative min-h-[200px] flex items-center justify-center ${
                                                previewUrl ? 'border-sky bg-sky/5' : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                                            }`}
                                        >
                                            <input 
                                                id="file-upload"
                                                type="file" 
                                                className="hidden" 
                                                onChange={handleFileChange}
                                                accept="image/*,video/*"
                                            />
                                            {previewUrl ? (
                                                <div className="w-full h-full absolute inset-0">
                                                    <img src={previewUrl} className="w-full h-full object-cover opacity-30" alt="Preview" />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                                        <p className="font-bold text-slate-800 text-sm">{selectedFile?.name || "Image Preview"}</p>
                                                        <p className="text-xs text-slate-400 mt-1">Click to change</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <Upload className="text-slate-300 mb-4" size={40} />
                                                    <p className="text-sm font-bold text-slate-500">Tap to select image</p>
                                                    <p className="text-xs text-slate-400 mt-1">Images only (Auto-compressed)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                            <select 
                                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-sky font-medium"
                                                value={uploadData.category}
                                                onChange={e => setUploadData({...uploadData, category: e.target.value})}
                                            >
                                                {categories.filter(c => c !== 'All').map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Display Order</label>
                                            <input 
                                                type="number"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-sky font-medium"
                                                value={uploadData.displayOrder}
                                                onChange={e => setUploadData({...uploadData, displayOrder: parseInt(e.target.value) || 0})}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                        <input 
                                            placeholder="Enter media title..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-sky font-medium"
                                            value={uploadData.title}
                                            onChange={e => setUploadData({...uploadData, title: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea 
                                            rows="3"
                                            placeholder="Enter brief description..."
                                            className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 outline-none focus:border-sky font-medium resize-none shadow-inner"
                                            value={uploadData.description}
                                            onChange={e => setUploadData({...uploadData, description: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <button 
                                    disabled={(!selectedFile && !editingItem) || isUploading}
                                    type="submit"
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={20} />
                                            <span>{editingItem ? 'Save Changes' : 'Upload to Cloudinary'}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryAdmin;
