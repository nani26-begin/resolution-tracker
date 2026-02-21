import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PixelCharacter = ({ action, message }) => {
    // Modern Flat Design Character (Routiner Style)
    const variants = {
        idle: {
            y: [0, -6, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        },
        jump: {
            y: [0, -50, 0],
            scaleY: [1, 0.8, 1.1, 1],
            transition: { duration: 0.6 }
        },
        victory: {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.8, repeat: 1 }
        },
        thumbsUp: {
            scale: [1, 1.1, 1],
            transition: { duration: 0.3 }
        },
        sad: {
            opacity: [1, 0.7, 1],
            scale: [1, 0.95, 1],
            transition: { duration: 1 }
        },
        shake: {
            x: [-5, 5, -5, 5, 0],
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-primary text-white text-xs px-4 py-2 rounded-2xl shadow-lg relative font-medium mb-2"
                    >
                        {message}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rotate-45 rounded-sm"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                animate={action || 'idle'}
                variants={variants}
                className="w-24 h-24 relative bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner"
            >
                {/* Modern Flat Icon Character */}
                <div className="relative w-16 h-16">
                    {/* Head & Body (Circle based) */}
                    <div className="absolute inset-0 bg-primary rounded-3xl overflow-hidden shadow-lg">
                        {/* Face Area */}
                        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 bg-white/20 rounded-2xl backdrop-blur-sm"></div>

                        {/* Eyes */}
                        <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-white rounded-full"></div>

                        {/* Smile */}
                        <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-4 h-1 bg-white/50 rounded-full"></div>
                    </div>

                    {/* Accent Detail */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-white"></div>
                </div>

                {/* Special Overlay Action */}
                {action === 'victory' && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        className="absolute -top-2 -right-2 text-2xl"
                    >
                        🏆
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default PixelCharacter;
