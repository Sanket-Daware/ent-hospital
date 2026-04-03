import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenAppointment }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Happy Patients', path: '/happy-patients' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Blog', path: '/blogs' },
        { name: 'Contact US', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
                ? 'bg-[#f4faf8]/90 backdrop-blur-xl shadow-lg py-2 border-b border-mint-dark/5'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-[94%] mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-6 h-6 rounded-full relative flex items-center justify-center overflow-hidden shadow-sm border-[0.5px] border-white"
                    >
                        {/* Half Green, Half Blue Background */}
                        <div className="absolute inset-0 flex">
                            <div className="w-1/2 h-full bg-[#28a745]" />
                            <div className="w-1/2 h-full bg-[#004aad]" />
                        </div>
                        {/* Silhouette / Icon Overlay */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-10 text-white"
                        >
                            <Heart size={10} fill="white" />
                        </motion.div>
                    </motion.div>

                    <div className="flex flex-col">
                        <motion.div 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex items-center gap-1 leading-none"
                        >
                            <span className="text-base md:text-base font-black text-slate-800 font-sans tracking-tight">सुविधा</span>
                            <span className="text-sm md:text-sm font-bold text-slate-700 tracking-tighter ml-0.5">ENT</span>
                        </motion.div>
                        <motion.div 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="-mt-1.5"
                        >
                            <div className="inline-flex bg-[#565656] px-1.5 py-0 rounded shadow-sm">
                                <span className="text-white text-[7px] md:text-[8px] font-medium tracking-wide">
                                    Head & Neck Cancer Center
                                </span>
                            </div>
                        </motion.div>
                    </div>

                </Link>





                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-2">
                    <div className="flex items-center bg-slate-200/20 p-0.5 rounded-full border border-slate-200/40 backdrop-blur-sm mr-2">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={`relative px-4 py-1.5 text-[13px] font-medium transition-all duration-300 rounded-full overflow-hidden ${location.pathname === link.path
                                    ? 'text-white'
                                    : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-mint-dark shadow-md shadow-mint-dark/20 rounded-full z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                {hoveredLink === link.name && location.pathname !== link.path && (
                                    <motion.div
                                        layoutId="hover-pill"
                                        className="absolute inset-0 bg-mint-dark/5 shadow-sm rounded-full z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
                                <motion.span 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.4 }}
                                    className="relative z-10 block"
                                >
                                    {link.name}
                                </motion.span>
                            </Link>
                        ))}
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -4px rgba(16, 185, 129, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onOpenAppointment}
                        className="px-5 py-2 bg-mint-dark text-white rounded-full text-xs font-bold shadow-lg shadow-mint-dark/20 transition-all flex items-center gap-2 group"
                    >
                        <span>Book Appointment</span>
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Phone size={12} className="group-hover:rotate-12 transition-transform" />
                        </motion.div>
                    </motion.button>
                </div>



                {/* Mobile menu button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 active:bg-slate-200 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <AnimatePresence mode="wait">
                        {mobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-3">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-all ${location.pathname === link.path
                                                ? 'bg-mint-dark/10 text-mint-dark'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span>{link.name}</span>
                                        {location.pathname === link.path && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="w-1.5 h-1.5 rounded-full bg-mint-dark"
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                onClick={() => {
                                    onOpenAppointment();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full py-4 mt-2 bg-mint-dark text-white rounded-2xl font-bold text-lg shadow-xl shadow-mint-dark/20 flex items-center justify-center gap-3"
                            >
                                <Phone size={20} />
                                <span>Book Appointment</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

