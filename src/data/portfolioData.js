import askai from "../assets/vids/aiask.mp4"
import dynamic from "../assets/vids/dynamic-island.mp4"
import file from "../assets/vids/file-tree.mp4"
import folder from "../assets/vids/folderv2.mp4"
import peeling_checkbox from "../assets/vids/Peeling_Checkbox.mp4"
import qrcode from "../assets/vids/qrcode.mp4"
import recorder from "../assets/vids/recorder.mp4"
import btn from "../assets/vids/submitbtn_v2.1.mp4"

export const roles = [
    {
        company: "FantasticFare",
        role: "Frontend Developer",
        date: "Aug 2025 — Present",
        logo: "F",
        description:
            "Building and optimizing responsive web interfaces, improving performance, and collaborating closely with designers to ship high-quality user experiences.",
    },
    {
        company: "Freelance",
        role: "Full Stack Engineer",
        date: "Aug 2024 — July 2025",
        logo: "FR",
        description:
            "Delivered end-to-end web solutions for clients, handling UI development, backend integrations, and deployment while ensuring clean, scalable architecture.",
    },
];


export const projects = [
    {
        title: "Chronicle",
        role: "Engineering Lead",
        description: "A minimal journaling app built with React and Tailwind. Features rich text editing, local-first architecture, and seamless Supabase sync.",
        stack: "React • Tailwind • Supabase",
        icon: "C",
    },
    {
        title: "Apex UI",
        role: "Creator",
        description: "An accessible, unstyled component library for rapid prototyping. Used by 500+ developers for internal tools and dashboards.",
        stack: "TypeScript • Radix • Stitches",
        icon: "A",
    },
    {
        title: "Velvet",
        role: "Frontend Architect",
        description: "High-performance e-commerce dashboard with real-time analytics, inventory management, and Stripe integration.",
        stack: "Next.js • GraphQL • Stripe",
        icon: "V",
    }
];

export const componentsImages = [
    { src: askai, title: "AI Assistant" },
    { src: dynamic, title: "Dynamic Island" },
    { src: file, title: "File Tree" },
    { src: folder, title: "Folder Interaction" },
    { src: peeling_checkbox, title: "Peeling Checkbox" },
    { src: qrcode, title: "QR Scanner" },
    { src: recorder, title: "Voice Memo" },
    { src: btn, title: "Smart Submit" }
];
