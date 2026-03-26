import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onOpenAppointment }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        { name: 'Who we are', path: '/who-we-are' },
        { name: 'Our Expertise', path: '/expertise' },
        { name: 'Contact US', path: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-mint-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-mint-dark/20 group-hover:scale-110 transition-transform">
                        <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                        <span className="text-xl font-bold font-serif text-slate-800 tracking-tight block leading-none">Suvidha ENT</span>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Specialist Hospital</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-mint-dark ${location.pathname === link.path ? 'text-mint-dark' : 'text-slate-600'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={onOpenAppointment}
                        className="px-6 py-2.5 bg-mint-dark hover:bg-green-600 text-white rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-mint-dark/30"
                    >
                        Book Appointment
                    </button>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-slate-600 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl p-6 border-t border-slate-100 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-base font-medium text-slate-600 hover:text-mint-dark transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            onOpenAppointment();
                            setMobileMenuOpen(false);
                        }}
                        className="w-full py-3 bg-mint-dark text-white rounded-xl font-semibold mt-2"
                    >
                        Book Appointment
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
