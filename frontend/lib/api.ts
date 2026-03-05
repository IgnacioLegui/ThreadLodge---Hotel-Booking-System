import { HotelRoom, ReservationRequest, ReservationResponse } from "./types";

const API_BASE = "http://localhost:8080/api";

export async function getAvailableRooms(
    checkIn: string,
    checkOut: string
): Promise<HotelRoom[]> {
    const res = await fetch(
        `${API_BASE}/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`
    );
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al buscar habitaciones disponibles");
    }
    return res.json();
}

export async function createReservation(
    data: ReservationRequest
): Promise<ReservationResponse> {
    const res = await fetch(`${API_BASE}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(
            err.message || "Error al crear la reserva. Intente nuevamente."
        );
    }
    return res.json();
}
