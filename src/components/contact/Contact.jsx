import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Paperclip } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

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
        preview: 'https://placehold.co/600x400/1e293b/cbd5e1/png?text=GitHub+Profile'
    },
    {
        id: 'twitter',
        label: 'Twitter',
        icon: Twitter,
        href: 'https://twitter.com/yourusername',
        type: 'screenshot',
        preview: 'https://placehold.co/600x400/1e293b/cbd5e1/png?text=Twitter+Profile'
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: Linkedin,
        href: 'https://linkedin.com/in/yourusername',
        type: 'screenshot',
        preview: 'https://placehold.co/600x400/1e293b/cbd5e1/png?text=LinkedIn+Profile'
    },
    {
        id: 'mail',
        label: 'Mail',
        icon: Mail,
        href: 'mailto:negitushar923@gmail.com',
        type: 'text', // Special type for Mail
        content: 'negitushar923@gmail.com'
    },
    {
        id: 'resume',
        label: 'Resume',
        icon: Paperclip,
        href: '/resume.pdf',
        type: 'screenshot',
        preview: 'https://placehold.co/400x600/1e293b/cbd5e1/png?text=Resume+PDF'
    }
];

const SocialPill = ({ link }) => {
    // 1. The Trigger Button
    const TriggerButton = (
        <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            // whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-gray-200 transition-colors cursor-pointer hover:border-white/20"
        >
            <link.icon size={18} strokeWidth={2} className="text-gray-300" />
            <span className="text-sm font-medium font-inter">{link.label}</span>
        </motion.a>
    );

    // 2. The Tooltip Content
    const TooltipContent = link.type === 'text' ? (
        // CLEAN TEXT STYLE: No extra background div, just the text.
        // The parent Tooltip component handles the main floating container.
        <div className="py-1 px-1">
            <span className="text-sm font-medium text-gray-200 tracking-wide font-mono">
                {link.content}
            </span>
        </div>
    ) : (
        // IMAGE STYLE
        <div className="w-[280px] h-[170px] rounded-lg overflow-hidden bg-gray-900 border border-white/10 shadow-xl p-1">
            <img
                src={link.preview}
                alt={`${link.label} Preview`}
                className="w-full h-full object-cover rounded-md opacity-90"
            />
        </div>
    );

    return (
        <Tooltip
            content={TooltipContent}
            text={TriggerButton}
            underline={false}
        />
    );
};

const Contact = () => {
    return (
        <motion.section
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="py-12 mb-20"
        >
            <div className="flex flex-col items-start">
                {/* Fixed Visibility: Lighter colors for better contrast */}
                <h3 className="text-lg text-gray-400 font-medium font-instrument italic mb-2">
                    Let's connect
                </h3>
                <h2 className="text-3xl font-semibold text-gray-400 font-instrument tracking-tight">
                    Find me on these platforms
                </h2>

                <div className="flex flex-wrap items-center gap-3 mt-8">
                    {socialLinks.map((link) => (
                        <SocialPill key={link.id} link={link} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;