import React from "react";
import { motion } from 'motion/react';


const Footer = () => {
    return (
        <div className="flex flex-col w-full">
            <motion.footer
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="flex mt-8 flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400 dark:text-zinc-500 font-inter tracking-wide transition-colors pb-8 px-4 md:px-6"
            >
                <p className="uppercase tracking-widest opacity-80">© 2026 All rights reserved.</p>

                <div className="uppercase flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100">
                    <span className="font-light">Designed</span>
                    <span className="font-instrument italic text-zinc-800 dark:text-zinc-200 text-lg">&</span>
                    <span className="font-light">Developed by</span>
                    <span className="font-instrument italic text-[16px] text-zinc-900 dark:text-zinc-100 capitalize font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-zinc-800 dark:after:bg-zinc-200 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left cursor-none">
                        Tushar
                    </span>
                </div>
            </motion.footer>
        </div>
    );
};

export default Footer;

