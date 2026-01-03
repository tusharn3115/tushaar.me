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

export const techStack = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", url: "https://graphql.org" },
    { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", url: "https://supabase.com" },
    { name: "Motion", icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 34 12"><path d="M 12.838 0 L 6.12 11.989 L 0 11.989 L 5.245 2.628 C 6.059 1.176 8.088 0 9.778 0 Z M 27.846 2.997 C 27.846 1.342 29.216 0 30.906 0 C 32.596 0 33.966 1.342 33.966 2.997 C 33.966 4.653 32.596 5.995 30.906 5.995 C 29.216 5.995 27.846 4.653 27.846 2.997 Z M 13.985 0 L 20.105 0 L 13.387 11.989 L 7.267 11.989 Z M 21.214 0 L 27.334 0 L 22.088 9.362 C 21.275 10.813 19.246 11.989 17.556 11.989 L 14.496 11.989 Z" fill="%230b1012"></path></svg>', url: "https://www.framer.com/motion/" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "https://www.postgresql.org" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", url: "https://www.docker.com" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", url: "https://aws.amazon.com" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://www.figma.com" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com" }
];
