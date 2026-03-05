package com.hotelboutique.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "hotel_rooms")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class HotelRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El número de habitación es obligatorio")
    @Column(name = "numero_habitacion", nullable = false, unique = true)
    private String numeroHabitacion;

    @NotBlank(message = "El estado es obligatorio")
    @Column(nullable = false)
    private String estado; // AVAILABLE, OCCUPIED, MAINTENANCE

    @NotNull(message = "La categoría es obligatoria")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_categoria", nullable = false)
    private RoomCategory categoria;
}
