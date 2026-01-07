import askai from "../assets/vids/aiask.mp4"
import dynamic from "../assets/vids/dynamic-island.mp4"
import file from "../assets/vids/file-tree.mp4"
import folder from "../assets/vids/folderv2.mp4"
import peeling_checkbox from "../assets/vids/Peeling_Checkbox.mp4"
import qrcode from "../assets/vids/qrcode.mp4"
import recorder from "../assets/vids/recorder.mp4"
import btn from "../assets/vids/submitbtn_v2.1.mp4"
import insightix from "../assets/Insightix.png"
import intellikit from "../assets/IntelliKit.png"
import greyAllegiance from "../assets/greyAllegiance.png"
import motion from "../assets/motion.png"

export const roles = [
    {
        company: "FantasticFare",
        role: "Frontend Developer",
        date: "Aug 2025 — Present",
        logo: "F",
        description:
            "Spearheading the frontend architecture of core travel platforms, optimizing render performance by 40%, and collaborating with design teams to ship pixel-perfect user interfaces.",
    },
    {
        company: "Freelance",
        role: "Full Stack Engineer",
        date: "Aug 2024 — July 2025",
        logo: "FR",
        description:
            "Architected and shipped scalable full-stack solutions for diverse clients, managing the entire lifecycle from system design to deployment and CI/CD integration.",
    },
];

export const projects = [
    {
        id: "intelli-kit",
        title: "IntelliKit",
        role: "Full Stack",
        description: "Boost productivity with AI. Content, visuals, and automation in one kit.",
        longDescription: "IntelliKit is an all-in-one AI-powered toolkit designed to boost your productivity. Effortlessly generate high-quality written content, create stunning visuals, and automate repetitive tasks—all in a single, streamlined platform.",
        stack: ["React", "Tailwind CSS", "NeonDB", "Gemini API"],
        gradient: "from-blue-500 to-indigo-500",
        img: intellikit,
        live: "https://intelli-kit.vercel.app/",
        github: "https://github.com/tusharn3115/IntelliKit"
    },
    {
        id: "insightix",
        title: "Insightix",
        role: "Frontend",
        description: "Sleek, high-performance landing page for modern SaaS startups.",
        longDescription: "Insightix is a sleek, conversion-focused SaaS landing page designed to show case your product with clarity and confidence. Built for modern startups, it combines clean design with responsive layouts to highlight features and value.",
        stack: ["React", "Tailwind CSS", "Motion React", "Shadcn UI"],
        gradient: "from-slate-500 to-zinc-500",
        img: insightix,
        live: "https://insightix-delta.vercel.app/",
        github: "https://github.com/tusharn3115/Insightix"
    },
    {
        id: "grey-allegiance",
        title: "Grey Allegiance",
        role: "Full Stack",
        description: "Discreet digital presence for elite personal security services.",
        longDescription: "Grey Allegiance Security provides discreet and highly professional personal protection services. This platform ensures clients can access tailored security solutions with privacy and comfort, whether for corporate events or private travel.",
        stack: ["React", "Node.js", "MongoDB", "Express"],
        gradient: "from-zinc-600 to-stone-600",
        img: greyAllegiance,
        live: "https://www.greyallegiance.com/",
        github: null
    },
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
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", url: "https://www.php.net" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", url: "https://www.java.com" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", url: "https://spring.io/projects/spring-boot" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org" },
    { name: "Bun", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg", url: "https://bun.sh", invertDark: true },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org", invertDark: true },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" },
    { name: "Shadcn UI", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4", url: "https://ui.shadcn.com", invertDark: true },
    { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", url: "https://threejs.org", invertDark: true },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", url: "https://redux.js.org" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", url: "https://www.docker.com" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "https://www.mysql.com" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", url: "https://www.mongodb.com" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", url: "https://redis.io" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://www.figma.com" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", url: "https://www.adobe.com/products/photoshop.html" },
    { name: "OpenAI", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", url: "https://openai.com", invertDark: true },
    { name: "NeonDB", icon: "https://neon.com/_next/static/svgs/9ec344e46390fe939d46984bf9cecaa7.svg", darkIcon: "https://neon.com/_next/static/svgs/6da928883916f39a4848774319dcaf81.svg", url: "https://neon.tech" },
    { name: "Gemini API", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", url: "https://deepmind.google/technologies/gemini/" },
    { name: "Motion React", icon: motion, url: "https://motion.dev/" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", url: "https://expressjs.com", invertDark: true }
];

export const socialLinks = {
    site: "https://tushaar.me",
    github: "https://github.com/tusharn3115",
    twitter: "https://twitter.com/tushaar_dev",
    linkedin: "https://www.linkedin.com/in/tushar-negi-786571317",
    email: "mailto:negitushar923@gmail.com"
};
