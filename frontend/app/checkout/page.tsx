"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { format, parseISO, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { createReservation } from "@/lib/api";
import { ReservationResponse } from "@/lib/types";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const roomId = searchParams.get("roomId") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";
    const roomNumero = searchParams.get("roomNumero") || "";
    const categoria = searchParams.get("categoria") || "";
    const precioBase = Number(searchParams.get("precio") || "0");

    const nights =
        checkIn && checkOut
            ? differenceInDays(parseISO(checkOut), parseISO(checkIn))
            : 0;
    const total = precioBase * nights;

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<ReservationResponse | null>(null);

    const formatDate = (d: string) =>
        format(parseISO(d), "dd MMM yyyy", { locale: es });

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
                <div className="mx-auto max-w-md px-6 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h1 className="font-playfair text-3xl font-light text-neutral-900">
                        ¡Reserva confirmada!
                    </h1>
                    <p className="mt-3 text-sm text-neutral-500">
                        Tu estadía en ThreadLodge ha sido reservada exitosamente.
                    </p>

                    <Card className="mt-8 border-neutral-200/60 text-left">
                        <CardContent className="space-y-3 p-6">
                            <div className="flex justify-between border-b border-neutral-100 pb-3">
                                <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                                    ID Reserva
                                </span>
                                <span className="font-mono text-sm font-semibold text-neutral-900">
                                    #{success.id}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500">Huésped</span>
                                <span className="text-sm font-medium text-neutral-900">
                                    {success.guestNombre}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500">Habitación</span>
                                <span className="text-sm font-medium text-neutral-900">
                                    {success.roomNumero} · {success.categoriaNombre}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500">Fechas</span>
                                <span className="text-sm text-neutral-900">
                                    {formatDate(success.fechaCheckIn)} →{" "}
                                    {formatDate(success.fechaCheckOut)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-neutral-500">Estado</span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                                    {success.estado}
                                </span>
                            </div>
                            <div className="flex justify-between border-t border-neutral-100 pt-3">
                                <span className="text-sm font-medium text-neutral-700">
                                    Total pagado
                                </span>
                                <span className="text-lg font-semibold text-neutral-900">
                                    ${success.precioTotal.toLocaleString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        variant="outline"
                        className="mt-8"
                        onClick={() => router.push("/")}
                    >
                        Volver al inicio
                    </Button>
                </div>
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
                        className="mb-4 -ml-3 gap-1 text-neutral-500 hover:text-neutral-900"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </Button>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
                        Finalizar reserva
                    </p>
                    <h1 className="mt-2 font-playfair text-3xl font-light text-neutral-900">
                        Checkout
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <Card className="border-neutral-200/60">
                            <CardHeader>
                                <CardTitle className="font-playfair text-xl font-medium">
                                    Datos del huésped
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre" className="text-sm text-neutral-600">
                                            Nombre completo
                                        </Label>
                                        <Input
                                            id="nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            placeholder="Ej: María García"
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm text-neutral-600">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="maria@email.com"
                                            required
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="telefono"
                                            className="text-sm text-neutral-600"
                                        >
                                            Teléfono{" "}
                                            <span className="text-neutral-400">(opcional)</span>
                                        </Label>
                                        <Input
                                            id="telefono"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            placeholder="+54 11 1234-5678"
                                            className="h-11"
                                        />
                                    </div>

                                    {error && (
                                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading || !nombre || !email}
                                        className="h-12 w-full gap-2 bg-neutral-900 text-white hover:bg-neutral-800"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Procesando...
                                            </>
                                        ) : (
                                            `Confirmar reserva · $${total.toLocaleString()}`
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-2">
                        <Card className="sticky top-24 border-neutral-200/60">
                            <CardHeader>
                                <CardTitle className="font-playfair text-xl font-medium">
                                    Resumen
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">Habitación</span>
                                    <span className="text-sm font-medium text-neutral-900">
                                        {roomNumero} · {categoria}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">Check-in</span>
                                    <span className="text-sm text-neutral-900">
                                        {checkIn && formatDate(checkIn)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">Check-out</span>
                                    <span className="text-sm text-neutral-900">
                                        {checkOut && formatDate(checkOut)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-neutral-500">Noches</span>
                                    <span className="text-sm text-neutral-900">{nights}</span>
                                </div>
                                <div className="flex justify-between border-t border-neutral-100 pt-4">
                                    <span className="text-sm text-neutral-500">
                                        ${precioBase.toLocaleString()} × {nights}{" "}
                                        {nights === 1 ? "noche" : "noches"}
                                    </span>
                                    <span className="text-sm text-neutral-900">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t border-neutral-200 pt-4">
                                    <span className="text-sm font-semibold text-neutral-900">
                                        Total
                                    </span>
                                    <span className="text-xl font-semibold text-neutral-900">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                </div>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}
