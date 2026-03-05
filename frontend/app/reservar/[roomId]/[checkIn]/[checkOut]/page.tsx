"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, parseISO, differenceInDays } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import ScrollAnimate from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getAvailableRooms, createReservation } from "@/lib/api";
import { HotelRoom, ReservationResponse } from "@/lib/types";
import { useEffect } from "react";
import { useLanguage } from "@/components/language-provider";

export default function ReservarPage() {
    const params = useParams();
    const router = useRouter();
    const { locale, t } = useLanguage();
    const dateLocale = locale === "es" ? es : enUS;

    const roomId = params.roomId as string;
    const checkIn = params.checkIn as string;
    const checkOut = params.checkOut as string;

    const [room, setRoom] = useState<HotelRoom | null>(null);
    const [roomLoading, setRoomLoading] = useState(true);

    const nights =
        checkIn && checkOut
            ? differenceInDays(parseISO(checkOut), parseISO(checkIn))
            : 0;

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<ReservationResponse | null>(null);

    // Load room data
    useEffect(() => {
        if (!checkIn || !checkOut) return;
        getAvailableRooms(checkIn, checkOut)
            .then((rooms) => {
                const found = rooms.find((r) => r.id === Number(roomId));
                setRoom(found || null);
            })
            .catch(() => setRoom(null))
            .finally(() => setRoomLoading(false));
    }, [roomId, checkIn, checkOut]);

    const precioBase = room?.categoria.precioBase || 0;
    const total = precioBase * nights;
    const roomNumero = room?.numeroHabitacion || "";
    const baseCategoria = room?.categoria.nombre || "";

    const getCategoryName = (name: string) => {
        if (locale === "es") return name;
        if (name === "Habitacion Estandar") return "Standard Room";
        return name;
    };

    const categoria = getCategoryName(baseCategoria);

    const formatDate = (d: string) =>
        format(parseISO(d), "dd MMM yyyy", { locale: dateLocale });

    const getNightText = (n: number) => (n === 1 ? t("results.night") : t("results.nights"));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await createReservation({
                guestNombre: nombre,
                guestEmail: email,
                guestTelefono: telefono,
                roomId: Number(roomId),
                fechaCheckIn: checkIn,
                fechaCheckOut: checkOut,
            });
            setSuccess(result);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Error al crear la reserva"
            );
        } finally {
            setLoading(false);
        }
    };

    // Success state
    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50/50">
                <ScrollAnimate animation="zoom" duration={600}>
                    <div className="mx-auto max-w-md px-6 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-emerald-50">
                            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h1 className="font-playfair text-3xl font-light text-neutral-900">
                            {t("success.title")}
                        </h1>
                        <p className="mt-3 text-sm text-neutral-500">
                            {t("success.subtitle")}
                        </p>

                        <Card className="mt-8 border-neutral-200/60 text-left">
                            <CardContent className="space-y-3 p-6">
                                <div className="flex justify-between border-b border-neutral-100 pb-3">
                                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                                        {t("success.id")}
                                    </span>
                                    <span className="font-mono text-sm font-semibold text-neutral-900">
                                        #{success.id}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("success.guest")}</span>
                                    <span className="text-sm font-medium text-neutral-900">
                                        {success.guestNombre}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("success.room")}</span>
                                    <span className="text-sm font-medium text-neutral-900">
                                        {success.roomNumero} · {getCategoryName(success.categoriaNombre)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("success.dates")}</span>
                                    <span className="text-sm text-neutral-900">
                                        {formatDate(success.fechaCheckIn)} →{" "}
                                        {formatDate(success.fechaCheckOut)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("success.status")}</span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                        {success.estado === "CONFIRMADO" && locale === "en" ? "CONFIRMED" : success.estado}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-neutral-100 pt-3">
                                    <span className="text-sm font-medium text-neutral-700">
                                        {t("success.totalPaid")}
                                    </span>
                                    <span className="text-lg font-semibold text-neutral-900">
                                        ${success.precioTotal.toLocaleString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            variant="outline"
                            className="mt-8 transition-all duration-300 hover:shadow-md"
                            onClick={() => router.push("/")}
                        >
                            {t("success.backHome")}
                        </Button>
                    </div>
                </ScrollAnimate>
            </div>
        );
    }

    if (roomLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50/50">
            {/* Header */}
            <div className="border-b border-neutral-200/60 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-10">
                    <Button
                        variant="ghost"
                        className="mb-4 -ml-3 gap-1 text-neutral-500 transition-all hover:text-neutral-900"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform hover:-translate-x-1" />
                        {t("checkout.back")}
                    </Button>
                    <ScrollAnimate animation="fade" duration={600}>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                            {t("checkout.tag")}
                        </p>
                    </ScrollAnimate>
                    <ScrollAnimate animation="fade-up" delay={100} duration={600}>
                        <h1 className="mt-2 font-playfair text-3xl font-light text-neutral-900">
                            {t("checkout.title")}
                        </h1>
                    </ScrollAnimate>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Form */}
                    <ScrollAnimate animation="fade-right" delay={100} className="lg:col-span-3">
                        <Card className="border-neutral-200/60">
                            <CardHeader>
                                <CardTitle className="font-playfair text-xl font-medium">
                                    {t("checkout.guestData")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre" className="text-sm text-neutral-600">
                                            {t("checkout.fullName")}
                                        </Label>
                                        <Input
                                            id="nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            placeholder={locale === "es" ? "Ej: María García" : "E.g. Mary Garcia"}
                                            required
                                            className="h-11 transition-all duration-300 focus:shadow-md"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm text-neutral-600">
                                            {t("checkout.email")}
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="maria@email.com"
                                            required
                                            className="h-11 transition-all duration-300 focus:shadow-md"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="telefono"
                                            className="text-sm text-neutral-600"
                                        >
                                            {t("checkout.phone")}{" "}
                                            <span className="text-neutral-400">({t("checkout.optional")})</span>
                                        </Label>
                                        <Input
                                            id="telefono"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            placeholder="+54 11 1234-5678"
                                            className="h-11 transition-all duration-300 focus:shadow-md"
                                        />
                                    </div>

                                    {error && (
                                        <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-red-200 bg-red-50 p-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading || !nombre || !email}
                                        className="h-12 w-full gap-2 bg-neutral-900 text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                {t("checkout.processing")}
                                            </>
                                        ) : (
                                            `${t("checkout.confirm")} · $${total.toLocaleString()}`
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </ScrollAnimate>

                    {/* Summary */}
                    <ScrollAnimate animation="fade-left" delay={200} className="lg:col-span-2">
                        <Card className="sticky top-24 border-neutral-200/60">
                            <CardHeader>
                                <CardTitle className="font-playfair text-xl font-medium">
                                    {t("checkout.summary")}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("checkout.room")}</span>
                                    <span className="text-sm font-medium text-neutral-900">
                                        {roomNumero} · {categoria}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("hero.checkin")}</span>
                                    <span className="text-sm text-neutral-900">
                                        {checkIn && formatDate(checkIn)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("hero.checkout")}</span>
                                    <span className="text-sm text-neutral-900">
                                        {checkOut && formatDate(checkOut)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">{t("results.nights")}</span>
                                    <span className="text-sm text-neutral-900">{nights}</span>
                                </div>
                                <div className="flex justify-between border-t border-neutral-100 pt-4">
                                    <span className="text-sm text-neutral-500">
                                        ${precioBase.toLocaleString()} × {nights}{" "}
                                        {getNightText(nights)}
                                    </span>
                                    <span className="text-sm text-neutral-900">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-neutral-200 pt-4">
                                    <span className="text-sm font-semibold text-neutral-900">
                                        {t("checkout.total")}
                                    </span>
                                    <span className="text-xl font-semibold text-neutral-900">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollAnimate>
                </div>
            </div>
        </div>
    );
}
