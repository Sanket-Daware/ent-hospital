import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Globe, Video, X, ZoomIn, Info, Loader2, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

const GalleryPage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ['All', 'Facilities', 'Equipment', 'Staff', 'Events', 'Procedures', 'Before & After'];

    useEffect(() => {
        fetchGallery();
    }, [activeCategory]);

    const fetchGallery = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/gallery?category=${activeCategory}`);
            if (res.data.success) {
                setItems(res.data.items);
            }
        } catch (error) {
            console.error("Fetch gallery error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const itemVariants = {
        hidden: (i) => ({
            opacity: 0,
            y: 20
        }),
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: i * 0.05
            }
        })
    };

    // Helper to determine bento grid size based on index or metadata
    const getGridSize = (index) => {
        const patterns = [
            'md:col-span-2 md:row-span-1',
            'md:col-span-1 md:row-span-2',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1',
            'md:col-span-1 md:row-span-1'
        ];
        return patterns[index % patterns.length];
    };

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
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-mint/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-sky/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sky-dark font-accent text-xl mb-4 block"
                    >
                        Virtual Tour
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-5xl font-bold font-serif text-slate-800 tracking-tight leading-tight mb-8"
                    >
                        Inside Our <br />
                        <span className="text-sky-dark underline decoration-sky/20 underline-offset-8">Medical Facility</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed"
                    >
                        Experience our world-class facilities and state-of-the-art medical technology designed for your comfort and safety.
                    </motion.p>
                </div>
            </section>

            {/* Filter Controls */}
            <section className="pb-12 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                                    activeCategory === cat 
                                    ? 'bg-slate-800 text-white' 
                                    : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-300'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento Grid Gallery */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-sky-dark" size={48} />
                            <p className="text-slate-400 font-bold animate-pulse">Loading gallery...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                <ImageIcon size={32} />
                            </div>
                            <p className="text-slate-400 italic">No images found in this category yet. Check back soon!</p>
                        </div>
                    ) : (
                        <motion.div 
                            layout
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] lg:auto-rows-[300px]"
                        >
                            <AnimatePresence mode="popLayout">
                                {items.map((img, i) => (
                                    <motion.div
                                        key={img._id}
                                        layout
                                        variants={itemVariants}
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-20px" }}
                                        onClick={() => setSelectedImg(img)}
                                        className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50 ${getGridSize(i)}`}
                                    >
                                        <img 
                                            src={img.mediaUrl} 
                                            alt={img.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-8">
                                            <h3 className="text-white text-xl font-bold mb-1">{img?.title || "Gallery Image"}</h3>
                                            <p className="text-white/70 text-sm font-sans line-clamp-2">{img?.description || "Suvidha ENT Hospital Facility"}</p>
                                        </div>

                                        {/* Icons */}
                                        <div className="absolute top-6 right-6">
                                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform delay-75 duration-300">
                                                <ZoomIn size={18} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 overflow-y-auto"
                        onClick={() => setSelectedImg(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[3rem] overflow-hidden max-w-5xl w-full relative flex flex-col lg:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedImg(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-slate-100 text-slate-800 transition-colors z-10 shadow-lg"
                            >
                                <X size={24} />
                            </button>

                            <div className="lg:flex-1 h-[300px] lg:h-[600px] bg-slate-100">
                                <img src={selectedImg.mediaUrl} alt={selectedImg.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="lg:w-[350px] p-8 md:p-12 flex flex-col justify-center bg-white">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-sky flex items-center justify-center text-sky-dark shadow-sm">
                                        <Info size={20} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{selectedImg.category}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedImg.title}</h2>
                                <p className="text-slate-500 font-sans leading-relaxed mb-8">
                                    {selectedImg.description}
                                </p>
                                <div className="h-px bg-slate-100 w-full mb-8" />
                                <button 
                                    onClick={() => setSelectedImg(null)}
                                    className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
                                >
                                    Close View
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </div>
    );
};

export default GalleryPage;
