import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    CalendarCheck, 
    MessageSquare, 
    TrendingUp, 
    Clock, 
    ArrowUpRight, 
    ArrowDownRight,
    Search,
    ChevronRight,
    Plus,
    Activity,
    Loader2
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalAppointments: 0,
        todayAppointments: 0,
        totalInquiries: 0,
        pendingReviews: 12 // Hardcoded for now
    });
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [apptRes, inquiryRes] = await Promise.all([
                    axios.get('/api/appointments'),
                    axios.get('/api/contact')
                ]);

                if (apptRes.data.success) {
                    const appts = apptRes.data.appointments || [];
                    setRecentAppointments(appts.slice(0, 5));
                    setStats(prev => ({
                        ...prev,
                        totalAppointments: appts.length,
                        todayAppointments: appts.filter(a => {
                            const today = new Date().toLocaleDateString();
                            return new Date(a.createdAt).toLocaleDateString() === today;
                        }).length
                    }));
                }

                if (inquiryRes.data.success) {
                    setStats(prev => ({
                        ...prev,
                        totalInquiries: inquiryRes.data.messages?.length || 0
                    }));
                }
            } catch (error) {
                console.error("Dashboard data fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const cards = [
        { title: 'Total Patients', value: stats.totalAppointments, icon: Users, color: 'sky', change: '+12%', up: true },
        { title: "Today's Bookings", value: stats.todayAppointments, icon: CalendarCheck, color: 'mint', change: '+5%', up: true },
        { title: 'New Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'rose', change: '-2%', up: false },
        { title: 'Hospital Rating', value: '4.9', icon: TrendingUp, color: 'slate', change: '+0.1', up: true },
    ];

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">Hospital Console</h1>
                    <p className="text-[13px] text-slate-500 font-sans">Welcome back! Here's a summary of today's activities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-medium text-[13px] shadow-sm hover:bg-slate-50 transition-colors">
                        <Search size={18} />
                        <span>Quick Search</span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 border-b-4 border-slate-700 hover:bg-slate-800 text-white rounded-2xl font-medium text-[13px] shadow-xl active:scale-95 transition-all">
                        <Plus size={18} />
                        <span>New Appointment</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${card.color}/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`w-14 h-14 bg-${card.color} rounded-2xl flex items-center justify-center text-${card.color}-dark shadow-lg shadow-${card.color}/50`}>
                                <card.icon size={28} />
                            </div>
                            <div className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${card.up ? 'bg-mint text-mint-dark' : 'bg-rose text-rose-dark'}`}>
                                {card.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {card.change}
                            </div>
                        </div>
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1 relative z-10">{card.title}</p>
                        <h3 className="text-3xl font-semibold text-slate-800 relative z-10">{isLoading ? '...' : card.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Recent Appointments */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-12 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white flex flex-col"
                >
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                <Activity size={20} />
                            </div>
                            <h4 className="font-semibold text-slate-800 text-base">Hospital Live Activity</h4>
                        </div>
                        <button className="text-[11px] font-semibold text-sky-dark uppercase tracking-widest hover:bg-sky/40 px-3 py-1.5 rounded-lg transition-colors">See Detailed Logs</button>
                    </div>

                    <div className="p-4 flex-1">
                        {isLoading ? (
                            <div className="h-full flex items-center justify-center py-20">
                                <Loader2 className="animate-spin text-slate-200" size={40} />
                            </div>
                        ) : recentAppointments.length === 0 ? (
                            <div className="h-full flex items-center justify-center py-20 text-slate-300 font-sans italic">
                                No recent activity found
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentAppointments.map((appt, idx) => (
                                    <div key={appt._id} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-sky rounded-full flex items-center justify-center text-sky-dark font-bold text-lg">
                                                {appt.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 text-[14px]">{appt.name} {appt.surname}</p>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{appt.reason}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="hidden md:block text-right">
                                                <p className="text-[11px] font-medium text-slate-800 tracking-tight">Scheduled Visit</p>
                                                <div className="flex items-center gap-1.5 justify-end text-[10px] text-slate-400 font-normal uppercase tracking-widest">
                                                    <Clock size={10} />
                                                    {appt.appointmentDate ? `${new Date(appt.appointmentDate).toLocaleDateString()} @ ${appt.timeSlot}` : new Date(appt.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest ${
                                                appt.status === 'confirmed' ? 'bg-mint text-mint-dark' : 'bg-sky text-sky-dark'
                                            }`}>
                                                {appt.status || 'Scheduled'}
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
