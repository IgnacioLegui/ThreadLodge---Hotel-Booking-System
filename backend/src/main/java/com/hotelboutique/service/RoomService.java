package com.hotelboutique.service;

import com.hotelboutique.entity.HotelRoom;
import com.hotelboutique.entity.RoomCategory;
import com.hotelboutique.repository.HotelRoomRepository;
import com.hotelboutique.repository.RoomCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final HotelRoomRepository hotelRoomRepository;
    private final RoomCategoryRepository roomCategoryRepository;

    /**
     * Returns all rooms available for the given date range
     * (no overlapping active reservations and status = AVAILABLE).
     */
    public List<HotelRoom> findAvailableRooms(LocalDate checkIn, LocalDate checkOut) {
        if (checkOut == null || checkIn == null) {
            throw new IllegalArgumentException("Las fechas de check-in y check-out son obligatorias");
        }
        if (!checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("La fecha de check-out debe ser posterior a la fecha de check-in");
        }
        return hotelRoomRepository.findAvailableRooms(checkIn, checkOut);
    }

    /**
     * Returns all room categories.
     */
    public List<RoomCategory> findAllCategories() {
        return roomCategoryRepository.findAll();
    }
}
