import React, { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import {
    Folder,
    FolderOpen,
    FileCode,
    FileJson,
    FileImage,
    FileText,
    ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** * UTILS */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const INITIAL_DATA = [
    {
        id: "project",
        name: "project",
        type: "folder",
        children: [
            {
                id: "src",
                name: "src",
                type: "folder",
                children: [
                    {
                        id: "app",
                        name: "app",
                        type: "folder",
                        children: [
                            { id: "page.tsx", name: "page.tsx", type: "file", meta: "React Component" },
                            { id: "layout.tsx", name: "layout.tsx", type: "file", meta: "Layout" },
                        ],
                    },
                    {
                        id: "components",
                        name: "components",
                        type: "folder",
                        children: [
                            { id: "button.tsx", name: "button.tsx", type: "file" },
                            { id: "input.tsx", name: "input.tsx", type: "file" },
                        ],
                    },
                ],
            },
            {
                id: "public",
                name: "public",
                type: "folder",
                children: [
                    { id: "images", name: "images", type: "folder", children: [] },
                ],
            },
            { id: "README.md", name: "README.md", type: "file", meta: "Markdown" },
            { id: "package.json", name: "package.json", type: "file", meta: "JSON" },
        ],
    },
];

/**
 * ANIMATION CONFIGURATION
 * "Professional" feel: Snappy, no bounce, linear-ish start, smooth end.
 */
const TRANSITION_VARS = {
    type: "spring",
    bounce: 0,
    duration: 0.3,
};

/**
 * ICONS HELPER
 */
const getFileIcon = (filename, type, isOpen) => {
    const iconClass = "w-4 h-4 text-neutral-500 transition-colors duration-200 group-hover:text-neutral-300";

    if (type === "folder") {
        return isOpen ? (
            <FolderOpen className={cn(iconClass, "text-neutral-200")} />
        ) : (
            <Folder className={iconClass} />
        );
    }

    if (filename.endsWith("json")) return <FileJson className={iconClass} />;
    if (filename.endsWith("png") || filename.endsWith("svg")) return <FileImage className={iconClass} />;
    if (filename.endsWith("md")) return <FileText className={iconClass} />;

    return <FileCode className={iconClass} />;
};

/**
 * COMPONENT: FileRow
 * Removed wobble/3D effects. Added simple slide for label on hover.
 */
const FileRow = ({
    node,
    depth,
    isOpen,
    isSelected,
    onToggle,
    onSelect,
}) => {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
                if (node.type === "folder") onToggle();
            }}
            className={cn(
                "group flex items-center h-[34px] w-full cursor-pointer select-none transition-colors duration-200",
                isSelected ? "bg-gray-200 dark:bg-[#1f1f1f]" : "hover:bg-gray-100 dark:hover:bg-[#151515]"
            )}
            style={{ paddingLeft: `${depth * 1.2 + 0.5} rem` }}
        >
            {/* CARET CONTAINER */}
            <div className="flex items-center justify-center w-5 h-5 shrink-0 mr-1 text-neutral-500">
                {node.type === "folder" && (
                    <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>
                )}
            </div>

            {/* ICON */}
            <div className="shrink-0 mr-2">
                {getFileIcon(node.name, node.type, isOpen)}
            </div>

            {/* LABEL */}
            <motion.span
                className={cn(
                    "text-[13px] tracking-tight truncate",
                    isSelected ? "text-black dark:text-white font-medium" : "text-gray-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-neutral-200"
                )}
                animate={{ x: isSelected ? 2 : 0 }}
                transition={{ duration: 0.2 }}
            >
                {node.name}
            </motion.span>
        </div>
    );
};

/**
 * COMPONENT: FileTreeRecursive
 * Handles the accordion logic with smooth height/opacity transitions.
 */
const FileTreeRecursive = ({
    nodes,
    depth = 0,
    selectedId,
    onSelect,
}) => {
    // Pre-expand 'project', 'src', and 'app' to match image
    const [expanded, setExpanded] = useState(new Set(["project", "src", "app"]));

    const toggleExpand = (id) => {
        const next = new Set(expanded);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setExpanded(next);
    };

    return (
        <ul className="flex flex-col">
            {nodes.map((node) => {
                const isExpanded = expanded.has(node.id);
                const hasChildren = node.children && node.children.length > 0;

                return (
                    <li key={node.id}>
                        <FileRow
                            node={node}
                            depth={depth}
                            isOpen={isExpanded}
                            isSelected={selectedId === node.id}
                            onToggle={() => toggleExpand(node.id)}
                            onSelect={() => onSelect(node.id)}
                        />

                        <AnimatePresence initial={false}>
                            {isExpanded && hasChildren && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: "auto",
                                        opacity: 1,
                                        transition: TRANSITION_VARS
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: { ...TRANSITION_VARS, duration: 0.2 }
                                    }}
                                    className="overflow-hidden"
                                >
                                    {/* Inner wrapper ensures content slides down rather than squishing */}
                                    <motion.div
                                        initial={{ y: -10, opacity: 0, filter: "blur(4px)" }}
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                            filter: "blur(0px)",
                                            transition: {
                                                duration: 0.3,
                                                delay: 0.05, // Slight delay to let height open first
                                            }
                                        }}
                                        exit={{
                                            y: -10,
                                            opacity: 0,
                                            filter: "blur(4px)",
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <FileTreeRecursive
                                            nodes={node.children}
                                            depth={depth + 1}
                                            selectedId={selectedId}
                                            onSelect={onSelect}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                );
            })}
        </ul>
    );
};

/**
 * MAIN COMPONENT
 */
const FileTree = () => {
    const [selectedId, setSelectedId] = useState("app");

    return (
        // FIX: Changed items-center to items-start and added pt-20.
        // This anchors the component to the top-center, preventing upward shifts during expansion.
        <div className="w-full h-full flex items-start justify-center pt-20 p-8 font-sans antialiased text-gray-900 dark:text-neutral-200">

            {/* Container */}
            <div className="w-full max-w-[300px] select-none">
                <FileTreeRecursive
                    nodes={INITIAL_DATA}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>

        </div>
    );
};

export default FileTree;
