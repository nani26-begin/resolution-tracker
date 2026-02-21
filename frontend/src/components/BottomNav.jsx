import React from 'react';
import {
    Droplet,
    BarChart2,
    Users,
    BookOpen,
    Settings
} from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'home', icon: Droplet },
        { id: 'stats', icon: BarChart2 },
        { id: 'users', icon: Users },
        { id: 'history', icon: BookOpen },
        { id: 'settings', icon: Settings },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[32px] md:max-w-[450px] md:mx-auto">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`p-3 rounded-2xl transition-all ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                                : 'text-slate-400 hover:text-blue-400 hover:bg-blue-50'
                            }`}
                    >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
