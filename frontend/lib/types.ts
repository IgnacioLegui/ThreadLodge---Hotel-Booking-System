// TypeScript interfaces matching the backend entities and DTOs

export interface RoomCategory {
    id: number;
    nombre: string;
    precioBase: number;
    capacidadMaxima: number;
}

export interface HotelRoom {
    id: number;
    numeroHabitacion: string;
    estado: string;
    categoria: RoomCategory;
}

export interface ReservationRequest {
    guestNombre: string;
    guestEmail: string;
    guestTelefono: string;
    roomId: number;
    fechaCheckIn: string; // YYYY-MM-DD
    fechaCheckOut: string; // YYYY-MM-DD
}

export interface ReservationResponse {
    id: number;
    guestNombre: string;
    guestEmail: string;
    roomNumero: string;
    categoriaNombre: string;
    fechaCheckIn: string;
    fechaCheckOut: string;
    estado: string;
    precioTotal: number;
}

export interface ApiError {
    timestamp: string;
    status: number;
    error: string;
    message?: string;
    details?: Record<string, string>;
}
