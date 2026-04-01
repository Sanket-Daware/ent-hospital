import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await login(username, password);
        setIsLoading(false);
        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mint-200/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-md w-full px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-white p-10 md:p-12"
                >
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-sky rounded-[2rem] flex items-center justify-center text-sky-dark mx-auto mb-6 shadow-xl shadow-sky/50 transform -rotate-6">
                            <ShieldCheck size={40} />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Hospital Admin</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure Access Portal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold leading-relaxed flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-dark transition-colors">
                                    <User size={18} />
                                </div>
                                <input 
                                    required
                                    type="text" 
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky/5 focus:border-sky transition-all placeholder:text-slate-300 font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-[10px] font-bold text-sky-dark uppercase tracking-widest hover:text-sky transition-colors">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-sky-dark transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    required
                                    type={showPassword ? 'text' : 'password'} 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky/5 focus:border-sky transition-all placeholder:text-slate-300 font-medium"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            disabled={isLoading}
                            type="submit" 
                            className="w-full py-5 bg-slate-900 border-b-4 border-slate-700 hover:bg-slate-800 hover:border-slate-900 text-white rounded-2xl font-bold tracking-tight shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98] active:border-b-0 mt-8"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In to Dashboard</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                <p className="text-center mt-12 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    Authorized Personnel Only • &copy; 2026 ENT Care Hospital
                </p>
            </div>
        </div>
    );
};

export default Login;
