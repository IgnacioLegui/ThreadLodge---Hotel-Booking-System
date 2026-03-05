package com.hotelboutique.repository;

import com.hotelboutique.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * Counts overlapping (non-cancelled) reservations for a specific room
     * in the given date range. Used to prevent double-booking.
     *
     * Overlap logic: existing.checkIn < newCheckOut AND existing.checkOut > newCheckIn
     */
    @Query("""
        SELECT COUNT(r) FROM Reservation r
        WHERE r.room.id = :roomId
        AND r.estado <> 'CANCELLED'
        AND r.fechaCheckIn < :checkOut
        AND r.fechaCheckOut > :checkIn
    """)
    Long countOverlapping(
            @Param("roomId") Long roomId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );
}
