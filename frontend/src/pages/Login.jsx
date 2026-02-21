import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Droplets } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Check your credentials and try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-6 pb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[420px]"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-blue-100 mb-6">
                        <Droplets className="text-blue-500 w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">LevelUp 2026</h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Personal Growth Tracker</p>
                </div>

                <div className="bg-white p-10 rounded-[48px] shadow-strong">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="input-pill bg-slate-50 shadow-inner"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input-pill bg-slate-50 shadow-inner"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 bg-blue-600 text-white rounded-[32px] font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 mt-4"
                            disabled={isLoading}
                        >
                            {isLoading ? 'SIGNING IN...' : (
                                <>
                                    SIGN IN <ArrowRight size={24} strokeWidth={3} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center px-4">
                        <p className="text-slate-400 text-sm font-bold">
                            Don't have an account? <Link to="/signup" className="text-blue-600">Join Quest</Link>
                        </p>
                    </div>
                </div>

                <p className="mt-12 text-center text-slate-300 font-bold text-[10px] uppercase tracking-widest">Built with ❤️ by Kakumanu Ajit Babu</p>
            </motion.div>
        </div>
    );
};

export default Login;
