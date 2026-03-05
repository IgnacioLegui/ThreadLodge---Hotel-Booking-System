package com.hotelboutique.controller;

import com.hotelboutique.entity.HotelRoom;
import com.hotelboutique.entity.RoomCategory;
import com.hotelboutique.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    /**
     * GET /api/rooms/available?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
     * Returns rooms available for the given date range.
     */
    @GetMapping("/available")
    public ResponseEntity<List<HotelRoom>> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {

        List<HotelRoom> availableRooms = roomService.findAvailableRooms(checkIn, checkOut);
        return ResponseEntity.ok(availableRooms);
    }

    /**
     * GET /api/rooms/categories
     * Returns all room categories.
     */
    @GetMapping("/categories")
    public ResponseEntity<List<RoomCategory>> getAllCategories() {
        return ResponseEntity.ok(roomService.findAllCategories());
    }
}
