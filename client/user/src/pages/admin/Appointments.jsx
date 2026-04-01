import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Filter, 
    MoreVertical, 
    Calendar, 
    User, 
    Phone, 
    CheckCircle2, 
    XCircle, 
    Clock,
    Trash2,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Download,
    Settings as SettingsIcon,
    X,
    Plus
} from 'lucide-react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [updatingId, setUpdatingId] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [closedDates, setClosedDates] = useState([]);
    const [newClosedDate, setNewClosedDate] = useState({ date: '', reason: '' });

    useEffect(() => {
        fetchAppointments();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get('/api/settings');
            if (res.data.success) {
                setClosedDates(res.data.settings.closedDates);
            }
        } catch (error) {
            console.error("Fetch settings error:", error);
        }
    };

    const handleAddClosedDate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/settings/closed-dates', newClosedDate);
            if (res.data.success) {
                setClosedDates(res.data.settings.closedDates);
                setNewClosedDate({ date: '', reason: '' });
            }
        } catch (error) {
            console.error("Add closed date error:", error);
        }
    };

    const handleRemoveClosedDate = async (id) => {
        try {
            const res = await axios.delete(`/api/settings/closed-dates/${id}`);
            if (res.data.success) {
                setClosedDates(res.data.settings.closedDates);
            }
        } catch (error) {
            console.error("Remove closed date error:", error);
        }
    };

    const downloadCSV = () => {
        if (appointments.length === 0) return;
        
        const headers = ["Name", "Surname", "Contact", "Reason", "Status", "Date"];
        const rows = appointments.map(a => [
            a.name, 
            a.surname, 
            a.contact, 
            a.reason, 
            a.status || 'pending', 
            new Date(a.createdAt).toLocaleDateString()
        ]);

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `appointments_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const fetchAppointments = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/appointments');
            if (res.data.success) {
                setAppointments(res.data.appointments);
            }
        } catch (error) {
            console.error("Fetch appointments error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            const res = await axios.patch(`/api/appointments/${id}/status`, { status: newStatus });
            if (res.data.success) {
                setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
            }
        } catch (error) {
            console.error("Update status error:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment record?')) return;
        setUpdatingId(id);
        try {
            const res = await axios.delete(`/api/appointments/${id}`);
            if (res.data.success) {
                setAppointments(prev => prev.filter(a => a._id !== id));
            }
        } catch (error) {
            console.error("Delete appointment error:", error);
            alert('Failed to delete appointment. Only authorized administrators can perform this action.');
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredAppointments = appointments.filter(a => {
        const matchesSearch = 
            (a.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
            (a.surname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(a.contact || '').includes(searchTerm);
        
        const matchesFilter = filterStatus === 'All' || (a.status || '').toLowerCase() === filterStatus.toLowerCase();
        
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Patient Appointments</h1>
                    <p className="text-slate-500 font-sans">Manage and schedule incoming hospital visits.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={downloadCSV}
                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg active:scale-95"
                    >
                        <Download size={18} />
                        <span>Export CSV</span>
                    </button>
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                    >
                        <SettingsIcon size={18} className="text-slate-400" />
                        <span>Manage Dates</span>
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-slate-400">
                    <Filter size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Filter By</span>
                </div>
                {['All', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                            filterStatus === status 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'bg-white text-slate-500 hover:bg-slate-50 border border-transparent'
                        }`}
                    >
                        {status}
                    </button>
                ))}
                <div className="ml-auto flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest px-4">
                    <span>{filteredAppointments.length} Appointments Found</span>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Patient Details</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Reason for Visit</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Date Logged</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <Loader2 className="animate-spin text-slate-200 mx-auto" size={48} />
                                    </td>
                                </tr>
                            ) : filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-slate-300 italic font-sans">
                                        No matching appointments found.
                                    </td>
                                </tr>
                            ) : (
                                filteredAppointments.map((appt, i) => (
                                    <motion.tr 
                                        key={appt._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-sky rounded-full flex items-center justify-center text-sky-dark font-bold text-xl shadow-inner uppercase">
                                                    {appt.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 tracking-tight leading-none mb-1.5">{appt.name} {appt.surname}</p>
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Phone size={12} />
                                                        <span className="text-xs font-medium font-sans">{appt.contact}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="px-3 py-1 bg-slate-100 inline-block text-[10px] font-bold text-slate-500 uppercase tracking-widest rounded-lg w-fit">
                                                    Secondary Care
                                                </span>
                                                <p className="font-bold text-slate-600 text-sm tracking-tight">{appt.reason}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    {new Date(appt.appointmentDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                    <Clock size={12} />
                                                    {appt.timeSlot}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${
                                                appt.status === 'confirmed' ? 'bg-mint text-mint-dark' : 
                                                appt.status === 'cancelled' ? 'bg-rose text-rose-dark shadow-sm shadow-rose/20' : 
                                                'bg-sky text-sky-dark'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    appt.status === 'confirmed' ? 'bg-mint-dark' : 
                                                    appt.status === 'cancelled' ? 'bg-rose-dark' : 
                                                    'bg-sky-dark'
                                                }`} />
                                                {appt.status || 'Pending'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-2">
                                                {updatingId === appt._id ? (
                                                    <Loader2 className="animate-spin text-slate-300" size={20} />
                                                ) : (
                                                    <>
                                                        {appt.status !== 'confirmed' && (
                                                            <button 
                                                                onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                                                                className="p-2.5 bg-mint-50 text-mint-dark rounded-xl hover:bg-mint hover:text-white transition-all shadow-sm active:scale-90"
                                                                title="Confirm Appointment"
                                                            >
                                                                <CheckCircle2 size={18} />
                                                            </button>
                                                        )}
                                                        {appt.status !== 'cancelled' && (
                                                            <button 
                                                                onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                                                                className="p-2.5 bg-rose-50 text-rose-dark rounded-xl hover:bg-rose hover:text-white transition-all shadow-sm active:scale-90"
                                                                title="Cancel Appointment"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        )}
                                                        <div className="w-px h-6 bg-slate-100 mx-1" />
                                                        <button 
                                                            disabled={updatingId === appt._id}
                                                            onClick={() => handleDelete(appt._id)}
                                                            className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-90"
                                                            title="Delete Record"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Visual Placeholder) */}
                <div className="p-8 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic font-sans">
                        Showing {filteredAppointments.length} of {appointments.length} records
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors pointer-events-none opacity-50"><ChevronLeft size={20} /></button>
                        <button className="w-10 h-10 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg">1</button>
                        <button className="w-10 h-10 bg-white border border-slate-200 text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">2</button>
                        <button className="p-2 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-colors"><ChevronRight size={20} /></button>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
                        onClick={() => setIsSettingsOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Clinic Availability</h2>
                                    <p className="text-slate-400 text-sm font-sans mt-1">Manage closed dates and holiday schedule.</p>
                                </div>
                                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Add New Closed Date Form */}
                                <form onSubmit={handleAddClosedDate} className="bg-slate-50 p-6 rounded-3xl space-y-4">
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest pl-1">Add Blocked Date</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input 
                                            required
                                            type="date" 
                                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky"
                                            value={newClosedDate.date}
                                            onChange={e => setNewClosedDate({...newClosedDate, date: e.target.value})}
                                        />
                                        <input 
                                            placeholder="Reason (e.g. Holiday)"
                                            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky"
                                            value={newClosedDate.reason}
                                            onChange={e => setNewClosedDate({...newClosedDate, reason: e.target.value})}
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                                    >
                                        <Plus size={18} /> Add Date
                                    </button>
                                </form>

                                {/* List of Closed Dates */}
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest pl-1">Scheduled Closures</h3>
                                    {closedDates.length === 0 ? (
                                        <p className="text-center py-6 text-slate-300 italic font-sans">No closed dates scheduled.</p>
                                    ) : (
                                        closedDates.map((d) => (
                                            <div key={d._id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-rose-50 text-rose-dark rounded-xl flex items-center justify-center">
                                                        <Calendar size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800">{new Date(d.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                                        <p className="text-xs text-slate-400 font-sans tracking-tight">{d.reason}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => handleRemoveClosedDate(d._id)}
                                                    className="p-2 text-slate-300 hover:text-rose transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Appointments;
