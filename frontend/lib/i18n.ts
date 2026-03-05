export type Locale = "en" | "es";

export const translations = {
    // Navbar
    "nav.home": { en: "Home", es: "Inicio" },
    "nav.rooms": { en: "Rooms", es: "Habitaciones" },
    "nav.contact": { en: "Contact", es: "Contacto" },

    // Hero
    "hero.tag": { en: "Boutique Design Hotel", es: "Hotel Boutique de Diseño" },
    "hero.title1": { en: "An extraordinary", es: "Una experiencia" },
    "hero.title2": { en: "experience", es: "extraordinaria" },
    "hero.subtitle": {
        en: "Discover a retreat where contemporary architecture meets the warmth of home. Your next unforgettable stay starts here.",
        es: "Descubre un refugio donde la arquitectura contemporánea se encuentra con la calidez de un hogar. Tu próxima estadía inolvidable comienza aquí.",
    },
    "hero.checkin": { en: "Check-in", es: "Check-in" },
    "hero.checkout": { en: "Check-out", es: "Check-out" },
    "hero.search": { en: "Search", es: "Buscar" },
    "hero.scroll": { en: "Scroll", es: "Scroll" },

    // Rooms section
    "rooms.tag": { en: "Our rooms", es: "Nuestras habitaciones" },
    "rooms.title": { en: "Designed for rest", es: "Diseñado para el descanso" },
    "rooms.whyTag": { en: "Why choose us?", es: "¿Por qué elegirnos?" },
    "rooms.feature1.title": { en: "Exclusive Design", es: "Diseño Exclusivo" },
    "rooms.feature1.desc": {
        en: "Each room has been curated with contemporary design pieces and noble materials.",
        es: "Cada habitación ha sido curada con piezas de diseño contemporáneo y materiales nobles.",
    },
    "rooms.feature2.title": { en: "Secure Booking", es: "Reserva Segura" },
    "rooms.feature2.desc": {
        en: "Your reservation is protected with instant confirmation and flexible cancellation.",
        es: "Tu reserva está protegida con confirmación instantánea y cancelación flexible.",
    },
    "rooms.feature3.title": { en: "Unique Experience", es: "Experiencia Única" },
    "rooms.feature3.desc": {
        en: "Personalized attention and premium amenities for a stay you'll always remember.",
        es: "Atención personalizada y amenidades premium para una estadía que recordarás siempre.",
    },

    // Contact section
    "contact.tag": { en: "Contact", es: "Contacto" },
    "contact.title": { en: "Have a question?", es: "¿Tenés alguna consulta?" },
    "contact.subtitle": {
        en: "Our team is available to help you plan your perfect stay.",
        es: "Nuestro equipo está disponible para ayudarte a planificar tu estadía perfecta.",
    },

    // Results page
    "results.tag": { en: "Search results", es: "Resultados de búsqueda" },
    "results.title": { en: "Available rooms", es: "Habitaciones disponibles" },
    "results.night": { en: "night", es: "noche" },
    "results.nights": { en: "nights", es: "noches" },
    "results.searching": { en: "Searching availability...", es: "Buscando disponibilidad..." },
    "results.errorTitle": { en: "We couldn't complete the search", es: "No pudimos completar la búsqueda" },
    "results.emptyTitle": { en: "No rooms available", es: "No hay habitaciones disponibles" },
    "results.emptySubtitle": {
        en: "Try different dates to find availability.",
        es: "Intenta con otras fechas para encontrar disponibilidad.",
    },
    "results.backHome": { en: "Back to home", es: "Volver al inicio" },
    "results.newSearch": { en: "New search", es: "Nueva búsqueda" },
    "results.upTo": { en: "Up to", es: "Hasta" },
    "results.guest": { en: "guest", es: "huésped" },
    "results.guests": { en: "guests", es: "huéspedes" },
    "results.total": { en: "Total", es: "Total" },
    "results.per": { en: "for", es: "por" },
    "results.reserve": { en: "Reserve", es: "Reservar" },

    // Checkout page
    "checkout.tag": { en: "Finalize reservation", es: "Finalizar reserva" },
    "checkout.title": { en: "Checkout", es: "Checkout" },
    "checkout.back": { en: "Back", es: "Volver" },
    "checkout.guestData": { en: "Guest details", es: "Datos del huésped" },
    "checkout.fullName": { en: "Full name", es: "Nombre completo" },
    "checkout.email": { en: "Email", es: "Email" },
    "checkout.phone": { en: "Phone", es: "Teléfono" },
    "checkout.optional": { en: "optional", es: "opcional" },
    "checkout.confirm": { en: "Confirm reservation", es: "Confirmar reserva" },
    "checkout.processing": { en: "Processing...", es: "Procesando..." },
    "checkout.summary": { en: "Summary", es: "Resumen" },
    "checkout.room": { en: "Room", es: "Habitación" },
    "checkout.total": { en: "Total", es: "Total" },

    // Success
    "success.title": { en: "Booking confirmed!", es: "¡Reserva confirmada!" },
    "success.subtitle": {
        en: "Your stay at ThreadLodge has been successfully booked.",
        es: "Tu estadía en ThreadLodge ha sido reservada exitosamente.",
    },
    "success.id": { en: "Booking ID", es: "ID Reserva" },
    "success.guest": { en: "Guest", es: "Huésped" },
    "success.room": { en: "Room", es: "Habitación" },
    "success.dates": { en: "Dates", es: "Fechas" },
    "success.status": { en: "Status", es: "Estado" },
    "success.totalPaid": { en: "Total paid", es: "Total pagado" },
    "success.backHome": { en: "Back to home", es: "Volver al inicio" },

    // Footer
    "footer.desc": {
        en: "An exclusive design retreat where every detail is crafted for your comfort.",
        es: "Un refugio de diseño exclusivo donde cada detalle está pensado para tu confort.",
    },
    "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
} as const;

export type TranslationKey = keyof typeof translations;
