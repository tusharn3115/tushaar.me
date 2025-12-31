import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, ExternalLink, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import VerifiedBadge from '../ui/VerifiedBadge';
import Tooltip from '../ui/Tooltip';
import chd_map from "../../assets/chd_map.png"

const Header = () => {
    // State for dynamic time
    const [currentTime, setCurrentTime] = useState("GMT+5:30");
    const { theme, toggleTheme } = useTheme();

    // Effect to update time every minute (Asia/Kolkata)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            const timeString = now.toLocaleTimeString('en-US', options);
            setCurrentTime(timeString);
        };

        updateTime(); // Initial call
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    // Correct Google Maps Link for Chandigarh
    const mapLink = "https://www.google.com/maps/place/Chandigarh,+India";

    return (
        <motion.section
            variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className="relative mb-12"
        >
            {/* Banner Image */}
            <div className="w-full h-56 rounded-[2rem] overflow-hidden relative border border-black/5 dark:border-white/10 premium-shadow group transition-colors duration-300">
                <img
                    // src="https://i.pinimg.com/originals/cd/0f/1a/cd0f1af4a7a7564d20ad4cb64559d175.gif"
                    src="https://i.pinimg.com/originals/51/2f/c3/512fc362a4ca2663778db016c2b7f703.gif"
                    alt="Profile Banner"
                    className="w-full h-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Theme Toggle - Absolute Top Right */}
                {/* <button
                    onClick={toggleTheme}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all duration-200 z-10 cursor-pointer"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button> */}
            </div>

            {/* Profile Info */}
            <div className="px-6 relative -mt-20 flex flex-col items-start">
                {/* Profile Picture */}
                <motion.div
                    className="w-36 h-36 rounded-full border-[6px] border-[#FDFCF8] dark:border-[#09090b] shadow-xl overflow-hidden bg-white relative z-10 transition-colors duration-300"
                >
                    <img
                        src="https://pbs.twimg.com/profile_images/2004813445838127104/8Go0jvZt_400x400.jpg"
                        alt="Tushar Negi"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Name, Badge & Origin */}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 tracking-tight font-instrument transition-colors duration-300">Tushar Negi</h1>
                    <VerifiedBadge />
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <Tooltip
                        text="I am from India"
                        content={
                            <div className="flex items-center gap-3 min-w-[140px]">
                                {/* Stylized Flag */}
                                <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden relative flex-shrink-0 shadow-sm">
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#ff9933] via-white to-[#138808]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 rounded-full border border-[#000080]" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-white dark:text-zinc-900 text-sm">Based in India</p>
                                    <p className="text-[10px] text-gray-300 dark:text-gray-500 font-mono">{currentTime} IST</p>
                                </div>
                            </div>
                        }
                    />
                </div>

                {/* Role & Bio */}
                <div className="mt-6 w-full">
                    <h2 className="text-4xl sm:text-[2.75rem] font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-5 transition-colors duration-300">
                        Designer Engineer.<br />
                        <span className="text-gray-400 dark:text-gray-500 not-italic font-inter font-light tracking-tighter">Developer who Designs.</span>
                    </h2>

                    <div className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-light font-inter transition-colors duration-300">
                        Currently Frontend Developer at{" "}
                        <Tooltip
                            text="FantasticFare"
                            underline={true}
                            content={
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[#4daaf7] dark:text-[#1D9BF0] font-semibold text-sm">
                                        <Building2 size={16} />
                                        <span>FantasticFare</span>
                                    </div>
                                    <p className="text-gray-300 dark:text-gray-600 leading-snug">Global travel technology & sales optimization platform.</p>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] bg-white/10 dark:bg-gray-200 px-1.5 py-0.5 rounded text-gray-200 dark:text-gray-700">USA</span>
                                        <span className="text-[10px] bg-white/10 dark:bg-gray-200 px-1.5 py-0.5 rounded text-gray-200 dark:text-gray-700">Remote</span>
                                    </div>
                                </div>
                            }
                        />
                        . Previously Freelance for various national and international clients. I'm passionate about building polished interfaces and crafting seamless user experiences.
                    </div>
                </div>

                {/* Location with FIXED Map Tooltip */}
                <div className="flex items-center gap-6 pt-8 text-xs tracking-wide uppercase text-gray-400 font-semibold font-inter">
                    <a
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors cursor-pointer hover:text-[#111827] dark:hover:text-white"
                    >
                        <MapPin size={14} className="text-gray-300" /> Chandigarh, India
                    </a>
                </div>
            </div>
        </motion.section>
    );
};

export default Header;