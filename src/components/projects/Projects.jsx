import { motion } from 'framer-motion';

const Projects = () => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
            }}
        >
            Projects
        </motion.div>
    )
}

export default Projects