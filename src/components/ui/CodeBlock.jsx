import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CodeBlock = ({ code, fileName = 'JSX' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-[#0c0c0e] font-mono text-sm shadow-sm">
            {/* Header / Mac-style buttons */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-[#121214] border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium font-sans tracking-wide uppercase ml-2">{fileName}</span>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all text-[10px] font-medium cursor-pointer border border-transparent hover:border-black/5 dark:hover:border-white/5"
                >
                    <AnimatePresence mode='wait'>
                        {copied ? (
                            <motion.span
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5 text-emerald-500"
                            >
                                <Check size={10} />
                                Copied
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5"
                            >
                                <Copy size={10} />
                                Copy
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto custom-scrollbar bg-zinc-50/50 dark:bg-[#0c0c0e] text-zinc-600 dark:text-zinc-300 border-t border-transparent">
                <pre className="font-mono text-[13px] leading-6">
                    <code className="table w-full">
                        {code.split('\n').map((line, i) => (
                            <div key={i} className="table-row">
                                <span className="table-cell text-right w-8 pr-4 select-none text-zinc-300 dark:text-zinc-700 text-xs">
                                    {i + 1}
                                </span>
                                <span className="table-cell whitespace-pre">
                                    {line}
                                </span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #333;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #444;
                }
            `}</style>
        </div>
    );
};

export default CodeBlock;
