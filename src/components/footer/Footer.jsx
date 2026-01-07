import React from "react";
import { motion } from 'motion/react';
import { VisitorCount } from './VisitorCount';

const Footer = () => {
    return (
        <motion.footer
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, filter: "blur(10px)" },
                visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-inter font-medium transition-colors"
        >
            <p>© 2025 Tushar Negi.</p>

            <div className="flex items-center gap-1">
                Profile Visits — <VisitorCount />
            </div>
        </motion.footer>
    );
};

export default Footer;
