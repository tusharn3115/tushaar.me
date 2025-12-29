
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-gray-400 font-inter font-medium">
            <div className="flex items-center gap-2">
                {/* <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> */}
                <p>© 2025 Tushar Negi.</p>
            </div>
            <p>no of visitors</p>
        </motion.footer>
    );
};

export default Footer;
