import React from 'react';
import { motion } from 'framer-motion';

const FillableMascot = ({ progress, type = 'human' }) => {
    // progress is 0-100
    const fillHeight = 100 - progress;

    // Path for a simple minimalist humanoid silhouette
    const humanPath = "M50,10 C40,10 35,18 35,25 C35,32 40,40 50,40 C60,40 65,32 65,25 C65,18 60,10 50,10 Z M30,45 C20,45 15,55 15,65 L15,100 L25,100 L25,140 L45,140 L45,100 L55,100 L55,140 L75,140 L75,100 L85,100 L85,65 C85,55 80,45 70,45 L30,45 Z";

    // Path for a simple minimalist robot
    const robotPath = "M30,15 L70,15 L70,45 L30,45 Z M20,50 L80,50 L80,100 L20,100 Z M25,105 L45,105 L45,140 L25,140 Z M55,105 L75,105 L75,140 L55,140 Z M10,60 L20,60 L20,90 L10,90 Z M80,60 L90,60 L90,90 L80,90 Z";

    const path = type === 'human' ? humanPath : robotPath;

    return (
        <div className="relative w-64 h-80 flex items-center justify-center">
            <svg viewBox="0 0 100 150" className="w-full h-full">
                <defs>
                    <clipPath id="mascotClip">
                        <path d={path} />
                    </clipPath>
                </defs>

                {/* Background Silhouette (Empty) */}
                <path
                    d={path}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                />

                {/* Fill Area */}
                <g clipPath="url(#mascotClip)">
                    {/* Static Background of Mascot */}
                    <path d={path} fill="#F8FAFC" />

                    {/* Liquid/Progress Fill */}
                    <motion.rect
                        initial={{ y: 150 }}
                        animate={{ y: fillHeight * 1.5 }} // Scale path height to viewbox
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        x="0"
                        y="0"
                        width="100"
                        height="150"
                        fill="#3B82F6"
                    />

                    {/* Wave effect at the top of the liquid */}
                    <motion.path
                        d="M0,0 Q25,-5 50,0 T100,0 L100,10 L0,10 Z"
                        fill="#3B82F6"
                        animate={{
                            x: [-20, 0, -20],
                            y: (fillHeight * 1.5) - 5
                        }}
                        transition={{
                            x: { duration: 4, repeat: Infinity, ease: "linear" },
                            y: { type: "spring", stiffness: 50, damping: 20 }
                        }}
                    />
                </g>

                {/* Outer Glow/Outline */}
                <path
                    d={path}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1"
                    strokeOpacity="0.2"
                />
            </svg>

            {/* Centered Percentage Overlay (like the gauge in middle phone) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-extrabold text-blue-600 drop-shadow-sm">{progress}%</span>
                {/* We can put Level here too */}
            </div>
        </div>
    );
};

export default FillableMascot;
