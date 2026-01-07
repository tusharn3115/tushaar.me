import React, { useEffect, useState } from "react";
import { motion } from 'motion/react';

const Footer = () => {
    const [visits, setVisits] = useState(null);

    useEffect(() => {
        const getVisits = async () => {
            try {
                const res = await fetch(
                    "https://api.countapi.dev/hit/tushar-portfolio/visits",
                    { cache: "no-store" }
                );
                const data = await res.json();
                setVisits(data.value);
            } catch (err) {
                console.log("Counter Error:", err);
                setVisits("—");
            }
        };

        getVisits();
    }, []);

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

            <p>
                {visits !== null ? `Profile Visits — ${visits}` : "Loading..."}
            </p>
        </motion.footer>
    );
};

export default Footer;
