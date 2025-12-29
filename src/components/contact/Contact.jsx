import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, FileText, Check, Copy, ExternalLink } from 'lucide-react';
import Tooltip from '../ui/Tooltip'; // Assuming this handles positioning
import git from "../../assets/git_ss.png";
import twitter from "../../assets/twitter_ss.png";

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
const socialLinks = [
    {
        id: 'github',
        label: 'GitHub',
        icon: Github,
        href: 'https://github.com/yourusername',
        type: 'screenshot',
        preview: git,
        color: 'hover:text-white group-hover:border-white/30'
    },
    {
        id: 'twitter',
        label: 'Twitter',
        icon: Twitter,
        href: 'https://twitter.com/yourusername',
        type: 'screenshot',
        preview: twitter,
        color: 'hover:text-blue-400 group-hover:border-blue-400/30'
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: Linkedin,
        href: 'https://linkedin.com/in/yourusername',
        type: 'screenshot',
        preview: 'https://placehold.co/600x400/1e293b/cbd5e1/png?text=LinkedIn+Profile',
        color: 'hover:text-blue-500 group-hover:border-blue-500/30'
    },
    {
        id: 'mail',
        label: 'Email',
        icon: Mail,
        href: 'mailto:negitushar923@gmail.com',
        type: 'copy', // Changed type to 'copy' for logic handling
        content: 'negitushar923@gmail.com',
        color: 'hover:text-emerald-400 group-hover:border-emerald-400/30'
    },
    {
        id: 'resume',
        label: 'Resume',
        icon: FileText,
        href: '/resume.pdf',
        type: 'screenshot',
        preview: 'https://placehold.co/400x600/1e293b/cbd5e1/png?text=Resume+PDF',
        color: 'hover:text-orange-400 group-hover:border-orange-400/30'
    }
];

const SocialPill = ({ link }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        if (link.type === 'copy') {
            e.preventDefault(); // Prevent mailto opening if user wants to copy
            navigator.clipboard.writeText(link.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // 1. The Trigger Button
    const TriggerButton = (
        <motion.a
            href={link.href}
            target={link.type === 'copy' ? undefined : "_blank"}
            rel="noopener noreferrer"
            onClick={link.type === 'copy' ? handleCopy : undefined}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`group relative flex items-center gap-2.5 px-5 py-3 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-full transition-all duration-300 ${link.color} hover:bg-white/[0.08] cursor-pointer`}
        >
            {/* Icon */}
            <div className="relative">
                <link.icon
                    size={18}
                    strokeWidth={2}
                    className="text-gray-400 transition-colors duration-300 group-hover:text-current"
                />
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors font-inter">
                {link.label}
            </span>

            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
        </motion.a>
    );

    // 2. The Tooltip Content
    const TooltipContent = link.type === 'copy' ? (
        // EMAIL / COPY STYLE
        <div className="flex items-center gap-3 py-2 px-3 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl">
            <div className={`p-1.5 rounded-md ${copied ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-400'}`}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-0.5">
                    {copied ? 'Copied!' : 'Click to copy'}
                </span>
                <span className="text-xs font-mono text-gray-200 font-medium">
                    {link.content}
                </span>
            </div>
        </div>
    ) : (
        // IMAGE / PREVIEW STYLE
        <div className="p-1 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl">
            <div className="relative w-[260px] h-[150px] rounded-lg overflow-hidden bg-gray-900 group">
                <img
                    src={link.preview}
                    alt={`${link.label} Preview`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                />

                {/* Overlay on Image */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium text-white">
                        <span>Visit {link.label}</span>
                        <ExternalLink size={10} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Tooltip
            content={TooltipContent}
            text={TriggerButton}
        />
    );
};

const Contact = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-24"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-start gap-2">
                    {/* Header */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-gray-600/50"></span>
                            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                                Contact
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-white font-instrument tracking-tight leading-tight">
                            Let's build something <br />
                            <span className="text-gray-500">extraordinary together.</span>
                        </h2>
                    </div>

                    {/* Links Grid */}
                    <div className="flex flex-wrap items-center gap-4">
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