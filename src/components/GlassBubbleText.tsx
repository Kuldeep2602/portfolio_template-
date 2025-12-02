import React, { type ReactNode } from 'react';

interface GlassBubbleTextProps {
    children: ReactNode;
    className?: string;
    shimmer?: boolean;
}

const GlassBubbleText: React.FC<GlassBubbleTextProps> = ({
    children,
    className = '',
    shimmer = false
}) => {
    const bubbleClass = shimmer ? 'glass-bubble-shimmer' : 'glass-bubble-text';

    return (
        <span className={`${bubbleClass} ${className}`}>
            {children}
        </span>
    );
};

export default GlassBubbleText;
