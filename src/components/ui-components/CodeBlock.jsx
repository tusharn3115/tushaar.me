import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-gray-800 bg-[#0d0d0d] font-mono text-sm shadow-2xl">
            {/* Header / Mac-style buttons */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-gray-800">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                <span className="text-xs text-gray-500 font-medium">JSX</span>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-400 hover:text-white transition-all text-xs border border-gray-700 hover:border-gray-600"
                >
                    <AnimatePresence mode='wait'>
                        {copied ? (
                            <motion.span
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5 text-green-400"
                            >
                                <Check size={12} />
                                Copied!
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5"
                            >
                                <Copy size={12} />
                                Copy
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto custom-scrollbar bg-[#0d0d0d] text-gray-300">
                <pre className="font-mono text-[13px] leading-6">
                    <code>
                        {code.split('\n').map((line, i) => (
                            <div key={i} className="table-row">
                                <span className="table-cell text-right w-8 pr-4 select-none text-gray-700 text-xs">
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
