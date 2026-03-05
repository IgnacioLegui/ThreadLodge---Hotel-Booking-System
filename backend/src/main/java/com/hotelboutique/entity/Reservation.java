package com.hotelboutique.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "reservations")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El huésped es obligatorio")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_guest", nullable = false)
    private Guest guest;

    @NotNull(message = "La habitación es obligatoria")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_room", nullable = false)
    private HotelRoom room;

    @NotNull(message = "La fecha de check-in es obligatoria")
    @Column(name = "fecha_check_in", nullable = false)
    private LocalDate fechaCheckIn;

    @NotNull(message = "La fecha de check-out es obligatoria")
    @Column(name = "fecha_check_out", nullable = false)
    private LocalDate fechaCheckOut;

    @Column(nullable = false)
    private String estado; // CONFIRMED, CANCELLED

    @Column(name = "precio_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioTotal;

    @Version
    private Long version;
}
