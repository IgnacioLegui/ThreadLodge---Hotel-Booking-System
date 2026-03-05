package com.hotelboutique.repository;

import com.hotelboutique.entity.HotelRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Long> {

    /**
     * Finds all rooms that are AVAILABLE and have NO overlapping reservations
     * for the given date range.
     */
    @Query("""
        SELECT r FROM HotelRoom r
        WHERE r.estado = 'AVAILABLE'
        AND r.id NOT IN (
            SELECT res.room.id FROM Reservation res
            WHERE res.estado <> 'CANCELLED'
            AND res.fechaCheckIn < :checkOut
            AND res.fechaCheckOut > :checkIn
        )
    """)
    List<HotelRoom> findAvailableRooms(
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );
}
