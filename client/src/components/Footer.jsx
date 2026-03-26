import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Globe, MessageCircle, Camera, Plus, Zap } from 'lucide-react';

const Footer = ({ onOpenAppointment }) => {
    return (
        <footer className="bg-comfort-gray text-slate-800 pt-0 pb-10 overflow-hidden font-sans border-t border-slate-100">
            {/* Zone 1: Map + SVG Bump Overlay */}
            <div className="relative w-full h-[400px] bg-slate-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3726.2011585905298!2d77.7651827!3d20.9444354!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a3fdfd9f5259%3A0xf499e091d3ed6cc2!2sSuvidha%20ENT%2C%20Head%20and%20Neck%20Cancer%20Centre%20-%20ENT%20Doctor%20in%20Amravati%20%7C%20ENT%20Specialist%20%7C%20Head%20and%20Neck%20Cancer%20Surgeon!5e0!3m2!1sen!2sin!4v1774501375074!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clinic Location"
                ></iframe>

                {/* SVG Bump Shape Layer */}
                <div className="absolute inset-x-0 bottom-[-2px] w-full">
                    <svg 
                        viewBox="0 0 1440 120" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="w-full h-auto drop-shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
                    >
                        <path 
                            d="M0 120H1440V60C1440 60 1100 60 1000 60C900 60 880 0 720 0C560 0 540 60 440 60C340 60 0 60 0 60V120Z" 
                            fill="#f5f7fa" 
                        />
                    </svg>
                    
                    {/* Bump Content: Address & Hours */}
                    <div className="absolute top-[40px] left-0 right-0 flex justify-center items-center">
                        <div className="max-w-5xl w-full flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 px-6">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Address</span>
                                <p className="text-sm font-bold text-slate-700 text-center md:text-left leading-relaxed">
                                    Suvidha ENT, Amravati<br/>
                                    Maharashtra, India
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-start border-l-0 md:border-l border-slate-200 md:pl-24">
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Office Hours</span>
                                <p className="text-sm font-bold text-slate-700 text-center md:text-left leading-relaxed">
                                    Mon–Sat: 11:00 am – 4:00 pm<br/>
                                    Eve: 7:00 pm – 9:00 pm
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zone 2: Middle Layout (Phone, Logo, CTA) */}
            <div className="max-w-7xl mx-auto px-6 mt-20 mb-20 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Phone Number */}
                    <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors">
                            <Phone size={20} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-700">(+91) 9422519279</span>
                    </div>

                    {/* Branding Divider Center */}
                    <div className="flex items-center gap-4 flex-1 justify-center max-w-sm">
                        <div className="h-px flex-1 bg-slate-200 hidden lg:block" />
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-mint-dark rounded-xl flex items-center justify-center text-white shadow-md">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <span className="text-2xl font-bold font-serif text-slate-800 tracking-tight">Suvidha ENT</span>
                        </Link>
                        <div className="h-px flex-1 bg-slate-200 hidden lg:block" />
                    </div>

                    {/* CTA Button */}
                    <button 
                        onClick={onOpenAppointment}
                        className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-slate-200 transition-all hover:scale-105 flex items-center gap-2 group"
                    >
                        <Plus size={18} strokeWidth={4} className="group-hover:rotate-90 transition-transform" />
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Zone 3: Main Content Grid (Data from Image 1) */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                             <div className="w-10 h-10 bg-mint-dark rounded-xl flex items-center justify-center text-white">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold font-serif text-slate-800 tracking-tight">Suvidha ENT</span>
                        </Link>
                        <p className="text-slate-500 text-sm font-sans leading-relaxed max-w-xs">
                            Providing specialist ear, nose, and throat care with a commitment to excellence and compassionate patient service since 2010.
                        </p>
                        <div className="flex gap-4">
                            {/* Icons from Image 1 style: White circles with slate icons */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-sky-dark transition-colors border border-slate-100">
                                <Globe size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-mint-dark transition-colors border border-slate-100">
                                <MessageCircle size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-dark transition-colors border border-slate-100">
                                <Camera size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-800 font-bold mb-8">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Who we are', 'Our Expertise', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-slate-500 hover:text-slate-800 transition-colors text-sm font-sans font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Specialties */}
                    <div>
                        <h4 className="text-slate-800 font-bold mb-8">Our Specialties</h4>
                        <ul className="space-y-4">
                            {['Ear Care', 'Nose & Sinus', 'Throat & Voice', 'Head & Neck', 'Pediatric ENT', 'Sleep & Snoring'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-slate-500 hover:text-slate-800 transition-colors text-sm font-sans font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Us (Specific Data/Icon styles from Image 1) */}
                    <div>
                        <h4 className="text-slate-800 font-bold mb-8">Contact Us</h4>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-sky flex items-center justify-center text-sky-dark shrink-0 transition-transform hover:scale-110">
                                    <MapPin size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-slate-500 text-xs font-sans leading-relaxed">
                                        Suvidha ENT, Head and Neck Cancer Centre<br />
                                        ENT Doctor in Amravati | ENT Specialist | Head and Neck Cancer Surgeon
                                    </p>
                                    <a href="#" className="text-xs font-bold text-mint-dark hover:underline flex items-center gap-1 mt-1">
                                        View on Google Maps
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center text-mint-dark shrink-0 transition-transform hover:scale-110">
                                    <Phone size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-slate-700 font-bold text-sm">9422519279</p>
                                    <p className="text-slate-500 text-xs font-sans font-medium">
                                        Mon – Sat: 11 am – 4 pm and 7 pm – 9 pm
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-rose flex items-center justify-center text-rose-dark shrink-0 transition-transform hover:scale-110">
                                    <Mail size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-slate-700 font-bold text-sm">care@entcarehospital.com</p>
                                    <p className="text-slate-500 text-xs font-sans font-medium">
                                        24/7 Priority Support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright */}
            <div className="max-w-7xl mx-auto px-6 border-t border-slate-200/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                <p>© 2026 Suvidha ENT Hospital. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
