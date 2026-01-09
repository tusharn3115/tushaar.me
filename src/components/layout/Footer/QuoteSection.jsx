import React from "react";
import { motion } from 'motion/react';
import quoteVideo from '../../../assets/vids/quote-banner.mp4';

const QuoteSection = () => {
    return (
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
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-instrument italic text-[22px] md:text-4xl text-black dark:text-white leading-tight tracking-tight"
                >
                    "The disciplined mind is your best friend. <br /> The undisciplined mind is your worst enemy."
                </motion.p>
            </div>

            <motion.div
                // Updated: Same Blur + Scale animation as quote
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                // Added delay: 0.5 so it appears slightly after the main text
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
            >
                {/* Updated: text-black for maximum darkness/contrast */}
                <span className="font-instrument italic text-lg text-black dark:text-zinc-200 tracking-wide">
                    — Bhagavad Gita
                </span>
            </motion.div>
        </div>
    );
};

export default QuoteSection;