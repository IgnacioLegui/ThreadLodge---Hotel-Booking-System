"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parseISO, differenceInDays } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Users, ArrowRight, Loader2, SearchX } from "lucide-react";
import ScrollAnimate from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { getAvailableRooms } from "@/lib/api";
import { HotelRoom } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

const ROOM_IMAGES: Record<string, string> = {
    "Suite Deluxe": "/images/suite-deluxe.png",
    "Habitacion Estandar": "/images/standard-room.png",
};

const DEFAULT_IMAGE = "/images/hotel-lobby.png";

export default function HabitacionesPage() {
    const params = useParams();
    const router = useRouter();
    const { locale, t } = useLanguage();
    const dateLocale = locale === "es" ? es : enUS;

    const checkIn = params.checkIn as string;
    const checkOut = params.checkOut as string;

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
        router.push(`/reservar/${room.id}/${checkIn}/${checkOut}`);
    };

    const formatDate = (d: string) =>
        format(parseISO(d), "dd MMM yyyy", { locale: dateLocale });

    const getNightText = (n: number) => (n === 1 ? t("results.night") : t("results.nights"));
    const getGuestText = (n: number) => (n === 1 ? t("results.guest") : t("results.guests"));

    // Translate room category names if in English
    const getCategoryName = (name: string) => {
        if (locale === "es") return name;
        if (name === "Habitacion Estandar") return "Standard Room";
        return name;
    };

    return (
        <div className="min-h-screen bg-neutral-50/50">
            {/* Header */}
            <div className="border-b border-neutral-200/60 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <ScrollAnimate animation="fade" duration={600}>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                            {t("results.tag")}
                        </p>
                    </ScrollAnimate>
                    <ScrollAnimate animation="fade-up" delay={100} duration={600}>
                        <h1 className="mt-2 font-playfair text-3xl font-light text-neutral-900">
                            {t("results.title")}
                        </h1>
                    </ScrollAnimate>
                    {checkIn && checkOut && (
                        <ScrollAnimate animation="fade-up" delay={200} duration={600}>
                            <p className="mt-2 text-sm text-neutral-500">
                                {formatDate(checkIn)} → {formatDate(checkOut)} ·{" "}
                                <span className="font-medium text-neutral-700">
                                    {nights} {getNightText(nights)}
                                </span>
                            </p>
                        </ScrollAnimate>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                        <p className="mt-4 text-sm text-neutral-500">
                            {t("results.searching")}
                        </p>
                    </div>
                )}

                {error && (
                    <ScrollAnimate animation="fade-up">
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <SearchX className="h-10 w-10 text-neutral-300" />
                            <p className="mt-4 text-sm font-medium text-neutral-700">
                                {t("results.errorTitle")}
                            </p>
                            <p className="mt-1 text-sm text-neutral-500">{error}</p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => router.push("/")}
                            >
                                {t("results.backHome")}
                            </Button>
                        </div>
                    </ScrollAnimate>
                )}

                {!loading && !error && rooms.length === 0 && (
                    <ScrollAnimate animation="fade-up">
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <SearchX className="h-10 w-10 text-neutral-300" />
                            <p className="mt-4 text-sm font-medium text-neutral-700">
                                {t("results.emptyTitle")}
                            </p>
                            <p className="mt-1 text-sm text-neutral-500">
                                {t("results.emptySubtitle")}
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6"
                                onClick={() => router.push("/")}
                            >
                                {t("results.newSearch")}
                            </Button>
                        </div>
                    </ScrollAnimate>
                )}

                {!loading && !error && rooms.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rooms.map((room, i) => (
                            <ScrollAnimate key={room.id} animation="fade-up" delay={i * 100}>
                                <Card className="group overflow-hidden border-neutral-200/60 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                                    {/* Room image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={
                                                ROOM_IMAGES[room.categoria.nombre] || DEFAULT_IMAGE
                                            }
                                            alt={`${room.categoria.nombre} - Habitación ${room.numeroHabitacion}`}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                                        <div className="absolute left-3 top-3">
                                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-sm">
                                                {locale === "en" ? "Room" : "Hab."} {room.numeroHabitacion}
                                            </span>
                                        </div>
                                    </div>

                                    <CardHeader className="pb-2">
                                        <h3 className="font-playfair text-lg font-medium text-neutral-900">
                                            {getCategoryName(room.categoria.nombre)}
                                        </h3>
                                    </CardHeader>

                                    <CardContent className="pb-4">
                                        <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                                            <Users className="h-3.5 w-3.5" />
                                            {t("results.upTo")} {room.categoria.capacidadMaxima}{" "}
                                            {getGuestText(room.categoria.capacidadMaxima)}
                                        </div>
                                        <div className="mt-3">
                                            <span className="text-2xl font-light text-neutral-900">
                                                ${room.categoria.precioBase.toLocaleString()}
                                            </span>
                                            <span className="text-sm text-neutral-500"> / {t("results.night")}</span>
                                        </div>
                                        {nights > 0 && (
                                            <p className="mt-1 text-xs text-neutral-400">
                                                {t("results.total")}: $
                                                {(room.categoria.precioBase * nights).toLocaleString()}{" "}
                                                {t("results.per")} {nights} {getNightText(nights)}
                                            </p>
                                        )}
                                    </CardContent>

                                    <CardFooter>
                                        <Button
                                            onClick={() => handleReserve(room)}
                                            className="group/btn w-full gap-2 bg-neutral-900 text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg"
                                        >
                                            {t("results.reserve")}
                                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </ScrollAnimate>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
