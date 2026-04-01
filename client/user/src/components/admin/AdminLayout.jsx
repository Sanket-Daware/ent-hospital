import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    MessageSquare, 
    LogOut, 
    Bell,
    User,
    Menu,
    X,
    Image,
    FileText,
    Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    // Responsive toggle: on mobile it shows/hides completely, on desktop it expands/collapses
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Appointments', icon: CalendarCheck, path: '/admin/appointments' },
        { name: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
        { name: 'Gallery', icon: Image, path: '/admin/gallery' },
        { name: 'Blogs', icon: FileText, path: '/admin/blogs' },
        { name: 'Testimonials', icon: Quote, path: '/admin/testimonials' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans overflow-x-hidden">
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside 
                initial={false}
                animate={{ 
                    width: isSidebarOpen ? 280 : 80,
                    x: isSidebarOpen ? 0 : (window.innerWidth < 768 ? -280 : 0)
                }}
                className={`bg-white border-r border-slate-200 flex flex-col fixed h-full z-40 transition-shadow ${isSidebarOpen && 'shadow-2xl md:shadow-none'}`}
            >
                {/* Sidebar Header with Universal Hamburger */}
                <div className="p-6 flex items-center gap-4">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors flex shrink-0"
                    >
                        <Menu size={22} />
                    </button>
                    {isSidebarOpen && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            className="font-bold text-slate-800 text-lg tracking-tight truncate"
                        >
                            Suvidha Admin
                        </motion.div>
                    )}
                </div>

                <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.name}
                                to={item.path}
                                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                                    isActive 
                                    ? 'bg-sky text-sky-dark shadow-sm' 
                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                }`}
                            >
                                <item.icon size={22} className={isActive ? 'text-sky-dark' : 'group-hover:scale-110 transition-transform flex shrink-0'} />
                                {isSidebarOpen && (
                                    <span className="font-bold text-sm tracking-tight truncate">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-slate-100 bg-white">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all group"
                    >
                        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform flex shrink-0" />
                        {isSidebarOpen && (
                            <span className="font-bold text-sm tracking-tight">Log Out</span>
                        )}
                    </button>
                    
                    {isSidebarOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100"
                        >
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                                <User size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-800 truncate">{user?.username}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.role}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main 
                className={`flex-1 transition-all duration-300 min-w-0 ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-[80px]'}`}
            >
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors md:hidden"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="flex items-center gap-6 ml-auto md:ml-0">
                        <button className="relative p-2.5 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="flex items-center gap-3">
                            <p className="text-sm font-bold text-slate-800 hidden md:block">ENT Hospital Admin</p>
                            <div className="w-10 h-10 bg-mint rounded-xl flex items-center justify-center text-mint-dark font-bold shrink-0">H</div>
                        </div>
                    </div>
                </header>

                {/* Viewport */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
