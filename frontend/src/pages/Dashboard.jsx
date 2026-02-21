import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import FillableMascot from '../components/FillableMascot';
import BottomNav from '../components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, CheckCircle,
    Search, ChevronRight, X, User
} from 'lucide-react';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [resolutions, setResolutions] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [activeTab, setActiveTab] = useState('home');
    const [allUsers, setAllUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchAllUsers();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get('/resolutions');
            setResolutions(res.data);
            const profile = await api.get('/auth/profile');
            setUser(profile.data);
            localStorage.setItem('user', JSON.stringify(profile.data));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await api.get('/auth/users');
            setAllUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTitle) return;
        try {
            await api.post('/resolutions', { title: newTitle });
            setNewTitle('');
            setShowModal(false);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleComplete = async (id) => {
        try {
            await api.put(`/resolutions/${id}`, { status: 'Completed', progress: 100 });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/resolutions/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return null;

    const xpPercent = user.xp % 100;

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center pb-32">
            {/* Minimalist Header */}
            <header className="w-full max-w-[450px] p-8 flex justify-between items-center bg-white/40 sticky top-0 backdrop-blur-md z-40">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Level</p>
                        <p className="text-xl font-black text-blue-600 leading-none mt-1">{user.level}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Current XP</p>
                    <p className="text-xl font-black text-slate-800">{user.xp}</p>
                </div>
            </header>

            {/* Content Swapper Based on activeTab */}
            <main className="w-full max-w-[450px] px-6">
                <AnimatePresence mode="wait">
                    {activeTab === 'home' && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center"
                        >
                            <h1 className="text-2xl font-black text-slate-800 mt-4 mb-2 tracking-tight">Level Progress</h1>

                            {/* Fillable Mascot Container */}
                            <div className="my-6">
                                <FillableMascot progress={xpPercent} type="human" />
                            </div>

                            {/* Mission Tiles Grid (2 columns like inspiration) */}
                            <div className="w-full grid grid-cols-2 gap-4 mt-8">
                                {resolutions.slice(0, 4).map(res => (
                                    <div key={res.id} className="bg-white p-6 rounded-[32px] shadow-soft border border-slate-50 relative overflow-hidden group">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase truncate pr-4">{res.title}</p>
                                            <div className={`w-2 h-2 rounded-full ${res.status === 'Completed' ? 'bg-green-400' : 'bg-blue-400 animate-pulse'}`}></div>
                                        </div>
                                        <p className="text-xl font-bold text-slate-800">{res.progress}%</p>
                                        <div className="absolute bottom-0 left-0 h-1 bg-blue-100 w-full">
                                            <div className="h-full bg-blue-500" style={{ width: `${res.progress}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'users' && (
                        <motion.div
                            key="users"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="pt-4"
                        >
                            <h2 className="text-2xl font-bold mb-6">Player Directory</h2>
                            <div className="space-y-3">
                                {allUsers.map((p) => (
                                    <div key={p.id} className="bg-white p-5 rounded-[24px] shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                            {p.level}
                                        </div>
                                        <div className="grow">
                                            <p className="font-bold text-slate-800">{p.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{p.xp} XP</p>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-300" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'history' && (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pt-4"
                        >
                            <h2 className="text-2xl font-bold mb-6">All Missions</h2>
                            <div className="space-y-4">
                                {resolutions.map(res => (
                                    <div key={res.id} className="bg-white p-6 rounded-[32px] shadow-soft flex items-center gap-4">
                                        <button
                                            onClick={() => handleComplete(res.id)}
                                            className={`p-3 rounded-2xl ${res.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-slate-300 hover:bg-blue-50 hover:text-blue-500'}`}
                                        >
                                            <CheckCircle size={24} />
                                        </button>
                                        <div className="grow">
                                            <p className={`font-bold text-slate-800 ${res.status === 'Completed' ? 'line-through opacity-50' : ''}`}>{res.title}</p>
                                            <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                                <div className="h-full bg-blue-500" style={{ width: `${res.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(res.id)} className="text-slate-200 hover:text-red-400 transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Central Floating Action Button (FAB) */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-28 bg-blue-600 text-white w-20 h-20 rounded-[30px] shadow-2xl shadow-blue-400/40 flex items-center justify-center z-50 transform hover:scale-105 active:scale-95 transition-all"
            >
                <Plus size={40} strokeWidth={3} />
            </button>

            {/* New Mission Modal Overlay */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            className="bg-white w-full max-w-[450px] p-10 rounded-[48px] shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-slate-800 tracking-tight">New Mission</h3>
                                <button onClick={() => setShowModal(false)} className="bg-slate-100 p-3 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleAdd} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Mission Name</label>
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Drink more water, Code daily..."
                                        className="w-full bg-slate-50 border-2 border-transparent p-6 rounded-[24px] text-lg font-bold focus:outline-none focus:border-blue-500/30 transition-all shadow-inner"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="w-full bg-blue-600 py-6 rounded-[24px] text-white font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
                                    START MISSION
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default Dashboard;
