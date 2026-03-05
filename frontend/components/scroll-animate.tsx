"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade" | "zoom" | "blur";

interface ScrollAnimateProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;      // ms
    duration?: number;   // ms
    threshold?: number;  // 0-1
    className?: string;
    once?: boolean;      // animate only once
}

const animationStyles: Record<AnimationType, { from: string; to: string }> = {
    "fade-up": {
        from: "translate-y-8 opacity-0",
        to: "translate-y-0 opacity-100",
    },
    "fade-down": {
        from: "-translate-y-8 opacity-0",
        to: "translate-y-0 opacity-100",
    },
    "fade-left": {
        from: "translate-x-8 opacity-0",
        to: "translate-x-0 opacity-100",
    },
    "fade-right": {
        from: "-translate-x-8 opacity-0",
        to: "translate-x-0 opacity-100",
    },
    fade: {
        from: "opacity-0",
        to: "opacity-100",
    },
    zoom: {
        from: "scale-95 opacity-0",
        to: "scale-100 opacity-100",
    },
    blur: {
        from: "opacity-0 blur-sm",
        to: "opacity-100 blur-0",
    },
};

export default function ScrollAnimate({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 700,
    threshold = 0.15,
    className = "",
    once = true,
}: ScrollAnimateProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, once]);

    const style = animationStyles[animation];

    return (
        <div
            ref={ref}
            className={`transition-all ${isVisible ? style.to : style.from} ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            {children}
        </div>
    );
}
