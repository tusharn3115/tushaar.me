'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, FileText, Check, Copy, ExternalLink, ArrowUpRight } from 'lucide-react';
import GithubIcon from '../icons/GithubIcon';
import TwitterIcon from '../icons/TwitterIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import GmailIcon from '../icons/GmailIcon';
import FileDescriptionIcon from '../icons/FileDescriptionIcon';


import SectionHeading from '../ui/SectionHeading';
import { ShimmeringText } from '../ui/ShimmeringText';

// --- ASSETS ---
// Make sure these paths match your project structure
import gitImg from "../../assets/git_ss.png";
import twitterImg from "../../assets/twitter_ss.png";
import linkedinImg from "../../assets/linkedin.png";
import TwitterXIcon from '../icons/TwitterXIcon';


const PLACEHOLDER_RESUME = "https://placehold.co/400x500/ffffff/000000/png?text=Resume+PDF";

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
const socialLinks = [
    {
        id: 'github',
        label: 'GitHub',
        icon: GithubIcon,
        href: 'https://github.com/tusharn3115', // Update with your actual URL
        type: 'image',
        preview: gitImg, // FIXED: Using the imported variable
        color: 'group-hover:text-black group-hover:dark:text-white group-hover:border-black/20 group-hover:dark:border-white/20 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
    },
    {
        id: 'twitter',
        label: 'Twitter',
        icon: TwitterXIcon,
        href: 'https://twitter.com/tushaar_dev',
        type: 'image',
        preview: twitterImg, // FIXED: Using the imported variable
        color: 'group-hover:text-blue-400 group-hover:border-blue-400/20 bg-blue-500/5 hover:bg-blue-500/10'
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: LinkedinIcon,
        href: 'https://linkedin.com/in/tushar-negi-786571317',
        type: 'image',
        preview: linkedinImg,
        color: 'group-hover:text-blue-500 group-hover:border-blue-500/20 bg-blue-600/5 hover:bg-blue-600/10'
    },

    {
        id: 'mail',
        label: 'Email',
        icon: GmailIcon,
        href: 'mailto:negitushar923@gmail.com',
        type: 'copy',
        content: 'negitushar923@gmail.com',
        color: 'group-hover:text-emerald-400 group-hover:border-emerald-400/20 bg-emerald-500/5 hover:bg-emerald-500/10'
    },
    {
        id: 'resume',
        label: 'Resume',
        icon: FileDescriptionIcon,
        href: '/resume.pdf',
        type: 'image',
        preview: PLACEHOLDER_RESUME,
        color: 'group-hover:text-orange-400 group-hover:border-orange-400/20 bg-orange-500/5 hover:bg-orange-500/10'
    }

];

const SocialPill = ({ link }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);
    const iconRef = React.useRef(null);

    const handleAction = (e) => {
        if (link.type === 'copy') {
            e.preventDefault();
            navigator.clipboard.writeText(link.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        iconRef.current?.startAnimation();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        iconRef.current?.stopAnimation();
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* --- TOOLTIP --- */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-none"
                    >
                        {link.type === 'image' ? (
                            // IMAGE TOOLTIP
                            <div className="relative w-[240px] h-[140px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
                                <img
                                    src={link.preview}
                                    alt={link.label}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Link Label Overlay */}

                                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
                                    <span className="text-[10px] font-semibold text-white/90 uppercase tracking-wider bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                                        {link.label} Profile
                                    </span>
                                    <ArrowUpRight size={14} className="text-white/70" />
                                </div>
                            </div>
                        ) : (
                            // TEXT TOOLTIP (Email)
                            <div className="flex items-center gap-3 py-2 px-4 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl whitespace-nowrap">
                                <div className={`p-1 rounded-md ${copied ? 'text-emerald-500' : 'text-zinc-400'}`}>
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${copied ? 'text-emerald-500' : 'text-zinc-500'}`}>
                                        {copied ? 'Copied!' : 'Copy Email'}
                                    </span>
                                    <span className="text-xs font-mono text-zinc-300">
                                        {link.content}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-zinc-800"></div>
                    </motion.div>

                )}
            </AnimatePresence>

            {/* --- PILL BUTTON --- */}
            <motion.a
                href={link.href}
                target={link.type === 'copy' ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={handleAction}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative flex items-center gap-2.5 px-5 py-3 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${link.color}`}
            >
                <div className="relative z-10">
                    <link.icon
                        ref={iconRef}
                        size={18}
                        strokeWidth={2}
                        disableHover={true}
                        className="text-zinc-500 dark:text-zinc-400 transition-colors duration-300 group-hover:text-current"
                    />
                </div>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white transition-colors z-10">
                    {link.label}
                </span>
            </motion.a>
        </div>
    );
};


const Contact = () => {
    return (
        <motion.section
            variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } }
            }}
        // className="py-24"
        >
            <div className="container mx-auto px-4 max-w-4xl">
                <SectionHeading>Contact</SectionHeading>

                <div className="flex flex-col items-start gap-8 mt-8">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-instrument italic font-normal text-gray-900 dark:text-white tracking-tight leading-tight transition-colors">
                            Let's build something <br />
                            <span className="text-gray-400 dark:text-zinc-500 font-inter not-italic font-light">extraordinary <ShimmeringText text="together." className="font-instrument italic font-normal text-gray-900 dark:text-white inline-block" /></span>
                        </h2>
                        {/* <p className="text-zinc-400 leading-relaxed">
                            Whether you have a distinct idea or just a rough concept, I'm always up for a conversation about new projects and opportunities.
                        </p> */}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {socialLinks.map((link) => (
                            <SocialPill key={link.id} link={link} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;