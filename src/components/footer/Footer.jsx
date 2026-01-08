import React from "react";
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import quoteVideo from '../../assets/vids/quote-banner.mp4';


const Footer = () => {
    return (
        <div className="flex flex-col w-full">
            {/* Quote Section */}
            <div className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div
                    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent), linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                        maskComposite: 'intersect',
                        WebkitMaskComposite: 'source-in'
                    }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60 md:opacity-60 dark:opacity-40 dark:md:opacity-40 grayscale"
                    >
                        <source src={quoteVideo} type="video/mp4" />
                    </video>
                    {/* Subtle Overlay to blend edges */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#FDFCF8] via-[#FDFCF8]/80 to-[#FDFCF8] dark:from-[#09090b] dark:via-[#09090b]/80 dark:to-[#09090b] opacity-30 md:opacity-30" />
                </div>


                <div className="relative z-10 max-w-4xl px-6 pt-6 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-instrument italic text-2xl md:text-4xl text-black dark:text-white leading-tight tracking-tight"
                    >
                        "The disciplined mind is your best friend. <br /> The undisciplined mind is your worst enemy."
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-8"
                >
                    <span className="font-instrument italic text-lg text-zinc-900 dark:text-zinc-400 tracking-wide">
                        — Bhagavad Gita
                    </span>
                </motion.div>
            </div>

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

                <div className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100">
                    <span className="font-light">Designed</span>
                    <span className="font-instrument italic text-zinc-800 dark:text-zinc-200 text-lg">&</span>
                    <span className="font-light">Developed by</span>
                    <span className="font-instrument italic text-lg text-zinc-900 dark:text-zinc-100 capitalize font-medium ml-0.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-zinc-800 dark:after:bg-zinc-200 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left cursor-none">
                        Tushar
                    </span>
                </div>
            </motion.footer>
        </div>
    );
};

export default Footer;
