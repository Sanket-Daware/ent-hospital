import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Globe, MessageCircle, Camera } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-comfort-gray pt-20 pb-10 border-t border-mint-dark/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-mint-dark rounded-xl flex items-center justify-center text-white">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold font-serif text-slate-800 tracking-tight">Suvidha ENT</span>
                        </Link>
                        <p className="text-slate-500 font-sans leading-relaxed">
                            Providing specialist ear, nose, and throat care with a commitment to excellence and compassionate patient service since 2010.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-mint-dark transition-colors">
                                <Globe size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-mint-dark transition-colors">
                                <MessageCircle size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-mint-dark transition-colors">
                                <Camera size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-800 font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Who we are', 'Our Expertise', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 hover:text-mint-dark transition-colors text-sm font-sans font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Specialties */}
                    <div>
                        <h4 className="text-slate-800 font-bold mb-6">Our Specialties</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Ear Care', path: '/ear' },
                                { name: 'Nose & Sinus', path: '/nose' },
                                { name: 'Throat & Voice', path: '/throat' },
                                { name: 'Head & Neck', path: '/head-neck' },
                                { name: 'Pediatric ENT', path: '/pediatric' },
                                { name: 'Sleep & Snoring', path: '/sleep' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-slate-500 hover:text-mint-dark transition-colors text-sm font-sans font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-slate-800 font-bold mb-6">Contact Us</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-sky flex items-center justify-center text-sky-dark shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-500 text-sm font-sans leading-relaxed">
                                        Suvidha ENT, Head and Neck Cancer Centre<br />ENT Doctor in Amravati | ENT Specialist | Head and Neck Cancer Surgeon
                                    </p>
                                    <a href="https://www.google.com/maps/place/Suvidha+ENT,+Head+and+Neck+Cancer+Centre+-+ENT+Doctor+in+Amravati+%7C+ENT+Specialist+%7C+Head+and+Neck+Cancer+Surgeon/@20.9444354,77.7651827,17z/" target="_blank" rel="noopener noreferrer" className="text-mint-dark hover:underline text-sm">
                                        View on Google Maps
                                    </a>
                                    
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-mint-dark shrink-0">
                                    <Phone size={18} />
                                </div>
                                <p className="text-slate-500 text-sm font-sans">
                                    9422519279<br />Mon - Sat: 11 am–4 pm and 
7pm–9 pm
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-rose flex items-center justify-center text-rose-dark shrink-0">
                                    <Mail size={18} />
                                </div>
                                <p className="text-slate-500 text-sm font-sans">
                                    care@entcarehospital.com<br />24/7 Priority Support
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                    <p>© 2026 ENT Care Hospital. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
