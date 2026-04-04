import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mail, 
    Search, 
    Filter, 
    Trash2, 
    Archive, 
    CheckCircle2, 
    Clock, 
    User, 
    Phone, 
    MessageCircle,
    Loader2,
    ChevronRight,
    AtSign,
    MoreHorizontal
} from 'lucide-react';
import axios from 'axios';

const Inquiries = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/contact');
            if (res.data.success) {
                setMessages(res.data.messages);
            }
        } catch (error) {
            console.error("Fetch messages error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMessages = messages.filter(m => {
        const matchesSearch = 
            (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
            (m.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(m.phone || '').includes(searchTerm);
            
        const matchesTab = 
            activeTab === 'All' ? true :
            activeTab === 'Unread' ? !m.read :
            activeTab === 'Starred' ? false : true; // Starred property does not exist in backend schema yet
                
        return matchesSearch && matchesTab;
    });

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            const res = await axios.delete(`/api/contact/${id}`);
            if (res.data.success) {
                setMessages(prev => prev.filter(m => m._id !== id));
                if (selectedMessage?._id === id) setSelectedMessage(null);
            }
        } catch (error) {
            console.error("Delete inquiry error:", error);
            alert("Failed to delete inquiry");
        }
    };

    const handleResolve = async (id) => {
        try {
            const res = await axios.patch(`/api/contact/${id}/read`);
            if (res.data.success) {
                setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
                setSelectedMessage(prev => ({ ...prev, read: true }));
            }
        } catch (error) {
            console.error("Resolve inquiry error:", error);
            alert("Failed to mark as resolved");
        }
    };

    return (
        <div className="h-[calc(100vh-160px)] flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800 tracking-tight mb-1">Patient Inquiries</h1>
                    <p className="text-[13px] text-slate-500 font-sans">Review and respond to messages from the website contact form.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search size={18} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky/5 focus:border-sky transition-all placeholder:text-slate-400 font-normal text-[13px] w-[300px]"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden min-h-0">
                {/* List Column */}
                <div className="w-full lg:w-2/5 flex flex-col bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 shrink-0">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-sky rounded-lg flex items-center justify-center text-sky-dark">
                                <Mail size={16} />
                             </div>
                             <span className="font-semibold text-slate-800 text-[13px]">Inbox</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {['All', 'Unread', 'Starred'].map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors ${
                                        activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {isLoading ? (
                            <div className="py-20 flex justify-center">
                                <Loader2 className="animate-spin text-slate-200" size={40} />
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="py-20 text-center text-slate-300 italic font-sans">
                                No messages found.
                            </div>
                        ) : (
                            filteredMessages.map((msg, i) => (
                                <motion.div 
                                    key={msg._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedMessage(msg)}
                                    className={`p-6 rounded-3xl cursor-pointer transition-all border-l-4 group relative ${
                                        selectedMessage?._id === msg._id 
                                        ? 'bg-sky/5 border-sky shadow-sm' 
                                        : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800 tracking-tight text-[13px] leading-none mb-1">{msg.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{msg.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <span className="text-[10px] font-medium text-slate-300 uppercase tracking-tighter">
                                                {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                            </span>
                                            {!msg.read && <div className="w-1.5 h-1.5 rounded-full bg-sky shadow-[0_0_8px_#b3f6e1]" />}
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-slate-500 font-normal font-sans line-clamp-2 leading-relaxed pl-1">
                                        {msg.message}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail Column */}
                <div className="hidden lg:flex lg:flex-1 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden flex-col">
                    <AnimatePresence mode="wait">
                        {selectedMessage ? (
                            <motion.div 
                                key={selectedMessage._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="h-full flex flex-col"
                            >
                                <div className="p-8 border-b border-slate-50 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-sky rounded-2xl flex items-center justify-center text-sky-dark font-semibold text-xl uppercase shadow-inner">
                                            {selectedMessage.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 tracking-tight">{selectedMessage.name}</h3>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                                                    <AtSign size={12} className="text-sky" />
                                                    {selectedMessage.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                                                    <Phone size={12} className="text-mint" />
                                                    {selectedMessage.phone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Archive size={20} /></button>
                                        <button 
                                            onClick={() => handleDelete(selectedMessage._id)}
                                            className="p-3 bg-rose-50 text-rose-dark rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        <div className="w-px h-8 bg-slate-100 mx-2" />
                                        <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 transition-colors shadow-sm"><MoreHorizontal size={20} /></button>
                                    </div>
                                </div>

                                <div className="p-10 flex-1 overflow-y-auto">
                                    <div className="mb-10 flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl w-fit">
                                        <Clock size={16} className="text-slate-400" />
                                        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest">
                                            Inquiry Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-6 mb-12">
                                        <div className="w-12 h-12 bg-mint/10 rounded-2xl flex items-center justify-center text-mint-dark shrink-0">
                                            <MessageCircle size={24} />
                                        </div>
                                        <div className="flex-1 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner relative">
                                            <div className="absolute -left-3 top-6 w-6 h-6 bg-slate-50 border-l border-b border-slate-100 rotate-45" />
                                            <p className="text-base text-slate-800 font-sans leading-relaxed whitespace-pre-wrap relative z-10">
                                                {selectedMessage.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 border-t border-slate-50 bg-slate-50/20 shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-16 bg-white border border-slate-200 rounded-2xl flex items-center px-6 text-slate-300 font-sans text-[13px] shadow-sm cursor-not-allowed">
                                            Compose clinical response... (Coming Soon)
                                        </div>
                                        {selectedMessage.read ? (
                                            <div className="h-16 px-10 bg-mint/20 text-mint-dark rounded-2xl font-semibold tracking-tight flex items-center gap-3">
                                                <CheckCircle2 size={20} />
                                                <span>Resolved</span>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => handleResolve(selectedMessage._id)}
                                                className="h-16 px-10 bg-slate-900 text-white rounded-2xl font-medium tracking-tight shadow-xl shadow-slate-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                                            >
                                                <CheckCircle2 size={20} />
                                                <span>Mark as Resolved</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12">
                                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-8 border border-slate-100 shadow-inner group transition-all">
                                    <Mail size={48} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 mb-2 tracking-tight">Email Viewer</h3>
                                <p className="text-[13px] text-slate-400 max-w-[280px] font-sans leading-relaxed">Select a patient message from the inbox to read the full inquiry details.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Inquiries;
