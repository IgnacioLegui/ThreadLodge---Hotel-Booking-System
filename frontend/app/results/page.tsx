"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { format, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { Users, ArrowRight, Loader2, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { getAvailableRooms } from "@/lib/api";
import { HotelRoom } from "@/lib/types";

const ROOM_IMAGES: Record<string, string> = {
    "Suite Deluxe":
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop",
    "Habitacion Estandar":
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop",
};

const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1590490360182-c33d955e0f38?q=80&w=800&auto=format&fit=crop";

function ResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";

    const [rooms, setRooms] = useState<HotelRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const nights =
        checkIn && checkOut
            ? differenceInDays(parseISO(checkOut), parseISO(checkIn))
            : 0;

    useEffect(() => {
        if (!checkIn || !checkOut) {
            setError("Fechas no proporcionadas");
            setLoading(false);
            return;
        }
        getAvailableRooms(checkIn, checkOut)
            .then(setRooms)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [checkIn, checkOut]);

    const handleReserve = (room: HotelRoom) => {
        router.push(
            `/checkout?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&roomNumero=${room.numeroHabitacion}&categoria=${encodeURIComponent(room.categoria.nombre)}&precio=${room.categoria.precioBase}`
        );
    };

    const formatDate = (d: string) =>
        format(parseISO(d), "dd MMM yyyy", { locale: es });

    return (
        <div className="min-h-screen bg-neutral-50/50">
            {/* Header */}
            <div className="border-b border-neutral-200/60 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                        Resultados de búsqueda
                    </p>
                    <h1 className="mt-2 font-playfair text-3xl font-light text-neutral-900">
                        Habitaciones disponibles
                    </h1>
                    {checkIn && checkOut && (
                        <p className="mt-2 text-sm text-neutral-500">
                            {formatDate(checkIn)} → {formatDate(checkOut)} ·{" "}
                            <span className="font-medium text-neutral-700">
                                {nights} {nights === 1 ? "noche" : "noches"}
                            </span>
                        </p>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                        <p className="mt-4 text-sm text-neutral-500">
                            Buscando disponibilidad...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <SearchX className="h-10 w-10 text-neutral-300" />
                        <p className="mt-4 text-sm font-medium text-neutral-700">
                            No pudimos completar la búsqueda
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">{error}</p>
                        <Button
                            variant="outline"
                            className="mt-6"
                            onClick={() => router.push("/")}
                        >
                            Volver al inicio
                        </Button>
                    </div>
                )}

                {!loading && !error && rooms.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <SearchX className="h-10 w-10 text-neutral-300" />
                        <p className="mt-4 text-sm font-medium text-neutral-700">
                            No hay habitaciones disponibles
                        </p>
                        <p className="mt-1 text-sm text-neutral-500">
                            Intenta con otras fechas para encontrar disponibilidad.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-6"
                            onClick={() => router.push("/")}
                        >
                            Nueva búsqueda
                        </Button>
                    </div>
                )}

                {!loading && !error && rooms.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rooms.map((room) => (
                            <Card
                                key={room.id}
                                className="group overflow-hidden border-neutral-200/60 bg-white transition-shadow hover:shadow-lg"
                            >
                                {/* Room image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={
                                            ROOM_IMAGES[room.categoria.nombre] || DEFAULT_IMAGE
                                        }
                                        alt={`${room.categoria.nombre} - Habitación ${room.numeroHabitacion}`}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute left-3 top-3">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
                                            Hab. {room.numeroHabitacion}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader className="pb-2">
                                    <h3 className="font-playfair text-lg font-medium text-neutral-900">
                                        {room.categoria.nombre}
                                    </h3>
                                </CardHeader>

                                <CardContent className="pb-4">
                                    <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                                        <Users className="h-3.5 w-3.5" />
                                        Hasta {room.categoria.capacidadMaxima}{" "}
                                        {room.categoria.capacidadMaxima === 1
                                            ? "huésped"
                                            : "huéspedes"}
                                    </div>
                                    <div className="mt-3">
                                        <span className="text-2xl font-light text-neutral-900">
                                            ${room.categoria.precioBase.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-neutral-500"> / noche</span>
                                    </div>
                                    {nights > 0 && (
                                        <p className="mt-1 text-xs text-neutral-400">
                                            Total: $
                                            {(room.categoria.precioBase * nights).toLocaleString()}{" "}
                                            por {nights} {nights === 1 ? "noche" : "noches"}
                                        </p>
                                    )}
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        onClick={() => handleReserve(room)}
                                        className="w-full gap-2 bg-neutral-900 text-white hover:bg-neutral-800"
                                    >
                                        Reservar
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                </div>
            }
        >
            <ResultsContent />
        </Suspense>
    );
}
