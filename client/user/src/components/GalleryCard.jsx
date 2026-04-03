import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';



// Bento grid sizing pattern (repeats every 6 cards)
// Creates the staggered magazine layout from the reference
const gridPatterns = [
    'md:col-span-1 md:row-span-2',   // 1: Tall left
    'md:col-span-1 md:row-span-1',   // 2: Standard
    'md:col-span-1 md:row-span-1',   // 3: Standard
    'md:col-span-1 md:row-span-2',   // 4: Tall center
    'md:col-span-1 md:row-span-1',   // 5: Standard
    'md:col-span-1 md:row-span-1',   // 6: Standard
];

export const getGridSize = (index) => gridPatterns[index % gridPatterns.length];



const GalleryCard = ({ item, index, onClick }) => {
    const isTall = (index % 6 === 0) || (index % 6 === 3);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        type: 'spring',
                        stiffness: 60,
                        damping: 16,
                        delay: index * 0.06,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            onClick={() => onClick && onClick(item)}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 ${getGridSize(index)}`}
        >
            {/* Background Image */}
            <img
                src={item.mediaUrl}
                alt={item.title || 'Gallery'}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 transition-all duration-300" />



            {/* Content — Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">


                {/* Title */}
                <h3
                    className={`font-bold text-white leading-snug mb-2 ${
                        isTall ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    {item.title || 'Gallery Image'}
                </h3>

                {/* Description (if present) */}
                {item.description && (
                    <p className={`text-white/65 text-xs font-sans leading-relaxed mb-3 ${isTall ? 'line-clamp-3' : 'line-clamp-2'}`}>
                        {item.description}
                    </p>
                )}

                {/* Read More */}
                <div className="flex items-center gap-1.5 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">Read More</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </motion.div>
    );
};

export default GalleryCard;
