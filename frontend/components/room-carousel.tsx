"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselImage {
    src: string;
    alt: string;
    caption: string;
}

const images: CarouselImage[] = [
    {
        src: "/images/suite-deluxe.png",
        alt: "Suite Deluxe con vista panoramica",
        caption: "Suite Deluxe",
    },
    {
        src: "/images/standard-room.png",
        alt: "Habitacion Estandar moderna",
        caption: "Habitacion Estandar",
    },
    {
        src: "/images/hotel-lobby.png",
        alt: "Vista del lobby del hotel",
        caption: "Lobby & Recepcion",
    },
    {
        src: "/images/hotel-bathroom.png",
        alt: "Bano de la Suite Deluxe",
        caption: "Amenidades Premium",
    },
    {
        src: "/images/hotel-pool.png",
        alt: "Area de piscina del hotel",
        caption: "Area de Relax",
    },
];

export default function RoomCarousel() {
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % images.length);
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }, []);

    // Auto-advance every 4 seconds unless hovered
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [isHovered, next]);

    return (
        <div
            className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image container */}
            <div className="relative overflow-hidden bg-neutral-200" style={{ aspectRatio: "16 / 9" }}>
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="absolute inset-0"
                        style={{
                            opacity: i === current ? 1 : 0,
                            transform: i === current ? "scale(1)" : "scale(1.08)",
                            transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0, 0.2, 1)",
                            zIndex: i === current ? 1 : 0,
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img.src}
                            alt={img.alt}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>
                ))}

                {/* Gradient overlay for text */}
                <div className="absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-6 left-6 z-[3]">
                    <p className="text-lg font-medium text-white drop-shadow-lg">
                        {images[current].caption}
                    </p>
                </div>

                {/* Counter */}
                <div className="absolute bottom-6 right-6 z-[3]">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {current + 1} / {images.length}
                    </span>
                </div>

                {/* Navigation buttons */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={prev}
                    className="absolute left-3 top-1/2 z-[3] h-10 w-10 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:text-white"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={next}
                    className="absolute right-3 top-1/2 z-[3] h-10 w-10 -translate-y-1/2 rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:text-white"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 bg-white py-4">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                                ? "w-6 bg-neutral-800"
                                : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
