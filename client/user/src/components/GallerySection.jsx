import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Info, Loader2 } from 'lucide-react';
import axios from 'axios';

const GallerySection = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await axios.get('/api/gallery');
                if (res.data.success) {
                    setItems(res.data.items.slice(0, 6)); // Show latest 6
                }
            } catch (err) {
                console.error("Gallery section fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLatest();
    }, []);

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

    // Helper to determine bento grid size
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
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-sky-dark font-accent text-2xl mb-2 block"
                    >
                        Virtual Tour
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-800 mb-6"
                    >
                        Take a Closer Look
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-2xl mx-auto text-lg"
                    >
                        Experience our world-class facilities and advanced medical technology.
                    </motion.p>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="py-20 flex justify-center">
                        <Loader2 className="animate-spin text-slate-200" size={48} />
                    </div>
                ) : items.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-slate-100">
                        <p className="text-slate-400 italic">No facility images uploaded yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] lg:auto-rows-[300px]">
                        {items.map((img, i) => (
                            <motion.div
                                key={img._id}
                                variants={itemVariants}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-20px" }}
                                onClick={() => setSelectedImg(img)}
                                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50 ${getGridSize(i)}`}
                            >
                                <img 
                                    src={img.mediaUrl} 
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-8">
                                    <h3 className="text-white text-xl font-bold mb-1">{img?.title || "Health Facility"}</h3>
                                    <p className="text-white/70 text-sm font-sans line-clamp-2">{img?.description || "Specialized ENT Care Facility"}</p>
                                </div>

                                {/* Icons */}
                                <div className="absolute top-6 right-6">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform delay-75 duration-300">
                                        <ZoomIn size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Simple Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 md:p-12 overflow-y-auto"
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
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-slate-100 text-slate-800 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="lg:flex-1 h-[300px] lg:h-[600px]">
                                <img src={selectedImg.mediaUrl} alt={selectedImg.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="lg:w-[350px] p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-sky flex items-center justify-center text-sky-dark">
                                        <Info size={20} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{selectedImg.category}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">{selectedImg.title}</h2>
                                <p className="text-slate-500 font-sans leading-relaxed mb-8">
                                    {selectedImg.description}
                                </p>
                                <div className="h-px bg-slate-100 w-full mb-8" />
                                <button onClick={() => setSelectedImg(null)} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg shadow-slate-200">
                                    Back to Tour
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySection;
