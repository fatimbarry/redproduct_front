// Types d'utilisateur
// src/types/index.ts
export interface User {
    id: number;
    email: string;
    name: string;
    photo: string;
    created_at: string;
    updated_at: string;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

// Interface pour un hôtel
export interface Hotel {
    id: number;
    contactinfo: string;
    nom: string;
    description: string;
    prix: number;
    photo: string;
    adresse: string;
    email: string;
    devise: 'FXOF' | 'EURO' | 'DOLLAR';
    created_at: string;
    updated_at: string;
}

// Interface pour une réservation
export interface Reservation {
    id: number;
    user_id: number;
    hotel_id: number;
    date_reservation: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    created_at: string;
    updated_at: string;
}

// Interface pour une réservation d'hôtel (bookings)
export interface Booking {
    id: number;
    user_id: number;
    hotel_id: number;
    booking_date: string;
    created_at: string;
    updated_at: string;
}

// Types pour l'authentification
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
    photo: string;
}
