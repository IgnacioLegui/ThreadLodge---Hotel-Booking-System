package com.hotelboutique.service;

import com.hotelboutique.dto.ReservationRequest;
import com.hotelboutique.dto.ReservationResponse;
import com.hotelboutique.entity.Guest;
import com.hotelboutique.entity.HotelRoom;
import com.hotelboutique.entity.Reservation;
import com.hotelboutique.repository.GuestRepository;
import com.hotelboutique.repository.HotelRoomRepository;
import com.hotelboutique.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final HotelRoomRepository hotelRoomRepository;
    private final GuestRepository guestRepository;

    /**
     * Creates a new reservation after validating dates and overlap rules.
     */
    @Transactional
    public ReservationResponse createReservation(ReservationRequest request) {

        // 1. Validate dates
        if (!request.getFechaCheckOut().isAfter(request.getFechaCheckIn())) {
            throw new IllegalArgumentException(
                    "La fecha de check-out debe ser posterior a la fecha de check-in");
        }

        // 2. Find the room
        HotelRoom room = hotelRoomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "No se encontró la habitación con ID: " + request.getRoomId()));

        // 3. Check for overlapping reservations
        Long overlapping = reservationRepository.countOverlapping(
                room.getId(),
                request.getFechaCheckIn(),
                request.getFechaCheckOut()
        );

        if (overlapping > 0) {
            throw new IllegalStateException(
                    "La habitación " + room.getNumeroHabitacion() +
                    " ya tiene una reserva en las fechas seleccionadas");
        }

        // 4. Find or create guest
        Guest guest = guestRepository.findByEmail(request.getGuestEmail())
                .orElseGet(() -> guestRepository.save(
                        Guest.builder()
                                .nombre(request.getGuestNombre())
                                .email(request.getGuestEmail())
                                .telefono(request.getGuestTelefono())
                                .build()
                ));

        // 5. Calculate total price (nights × base price)
        long nights = ChronoUnit.DAYS.between(request.getFechaCheckIn(), request.getFechaCheckOut());
        BigDecimal precioTotal = room.getCategoria().getPrecioBase()
                .multiply(BigDecimal.valueOf(nights));

        // 6. Create and save reservation
        Reservation reservation = Reservation.builder()
                .guest(guest)
                .room(room)
                .fechaCheckIn(request.getFechaCheckIn())
                .fechaCheckOut(request.getFechaCheckOut())
                .estado("CONFIRMED")
                .precioTotal(precioTotal)
                .build();

        Reservation saved = reservationRepository.save(reservation);

        // 7. Build response
        return ReservationResponse.builder()
                .id(saved.getId())
                .guestNombre(guest.getNombre())
                .guestEmail(guest.getEmail())
                .roomNumero(room.getNumeroHabitacion())
                .categoriaNombre(room.getCategoria().getNombre())
                .fechaCheckIn(saved.getFechaCheckIn())
                .fechaCheckOut(saved.getFechaCheckOut())
                .estado(saved.getEstado())
                .precioTotal(saved.getPrecioTotal())
                .build();
    }
}
