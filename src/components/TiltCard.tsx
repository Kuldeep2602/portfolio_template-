import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glareColor?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({
    children,
    className = "",
    glareColor = "rgba(255, 255, 255, 0.3)"
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 10 };
    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(0px)",
                    transformStyle: "preserve-3d",
                }}
                className="h-full w-full"
            >
                {children}
            </div>

            {/* Glare Effect */}
            <motion.div
                style={{
                    background: `radial-gradient(circle at center, ${glareColor}, transparent 80%)`,
                    opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.6]),
                    x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
                    y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
                    zIndex: 10,
                    pointerEvents: "none"
                }}
                className="absolute inset-0 w-full h-full mix-blend-overlay rounded-3xl"
            />
        </motion.div>
    );
};

export default TiltCard;
