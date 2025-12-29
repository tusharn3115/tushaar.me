import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, ExternalLink } from 'lucide-react';
import VerifiedBadge from '../ui/VerifiedBadge';
import Tooltip from '../ui/Tooltip';
import chd_map from "../../assets/chd_map.png"

const Header = () => {
    // State for dynamic time
    const [currentTime, setCurrentTime] = useState("GMT+5:30");

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
        <motion.section variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative mb-12">
            {/* Banner Image */}
            <div className="w-full h-56 rounded-[2rem] overflow-hidden relative border border-black/5 premium-shadow group">
                <img
                    src="https://i.pinimg.com/originals/5d/2c/44/5d2c44694918947aede42306cb7154d0.gif"
                    alt="Profile Banner"
                    className="w-full h-full object-cover object-top opacity-90 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Profile Info */}
            <div className="px-6 relative -mt-20 flex flex-col items-start">
                {/* Profile Picture */}
                <motion.div
                    className="w-36 h-36 rounded-full border-[6px] border-[#FDFCF8] shadow-xl overflow-hidden bg-white relative z-10"
                >
                    <img
                        src="https://pbs.twimg.com/profile_images/2004813445838127104/8Go0jvZt_400x400.jpg"
                        alt="Tushar Negi"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Name, Badge & Origin */}
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight font-instrument">Tushar Negi</h1>
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
                                    <p className="font-semibold text-white text-sm">Based in India</p>
                                    <p className="text-[10px] text-gray-400 font-mono">{currentTime} IST</p>
                                </div>
                            </div>
                        }
                    />
                </div>

                {/* Role & Bio */}
                <div className="mt-6 max-w-xl">
                    <h2 className="text-4xl sm:text-[2.75rem] font-instrument italic font-normal text-gray-900 tracking-tight leading-[1.1] mb-5">
                        Designer Engineer.<br />
                        <span className="text-gray-400 not-italic font-inter font-light tracking-tighter">Developer who Designs.</span>
                    </h2>

                    <div className="text-lg text-gray-500 leading-relaxed font-light font-inter">
                        Currently Frontend Developer at{" "}
                        <Tooltip
                            text="FantasticFare"
                            underline={true}
                            content={
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[#1D9BF0] font-semibold text-sm">
                                        <Building2 size={16} />
                                        <span>FantasticFare</span>
                                    </div>
                                    <p className="text-gray-300 leading-snug">Global travel technology & sales optimization platform.</p>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">USA</span>
                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">Remote</span>
                                    </div>
                                </div>
                            }
                        />
                        . Previously Freelance for various national and international clients. I'm passionate about building polished interfaces and crafting seamless user experiences.
                    </div>
                </div>

                {/* Location with FIXED Map Tooltip */}
                <div className="flex items-center gap-6 pt-8 text-xs tracking-wide uppercase text-gray-400 font-semibold font-inter">
                    <Tooltip
                        content={
                            <a
                                href={mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-[280px] p-1 group"
                            >
                                <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-sm aspect-[16/9] bg-gray-900">
                                    {/* FIX: Using a high-quality Unsplash image that looks like a dark map.
                                        This ensures no "black screen" error. 
                                    */}
                                    <img
                                        src={chd_map}
                                        alt="Map Preview"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />

                                    {/* Map Marker Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <div className="relative bg-blue-500 rounded-full p-1.5 border-2 border-white shadow-lg">
                                                <MapPin size={12} className="text-white fill-current" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 'Open Maps' Button Overlay */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                                            <ExternalLink size={10} className="text-blue-600" />
                                            <span className="text-[10px] font-bold text-gray-900 normal-case tracking-normal whitespace-nowrap">
                                                Open Google Maps
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        }
                        text={
                            <a
                                href={mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 transition-colors cursor-pointer hover:text-[#111827]"
                            >
                                <MapPin size={14} className="text-gray-300" /> Chandigarh, India
                            </a>
                        }
                    />
                </div>
            </div>
        </motion.section>
    );
};

export default Header;