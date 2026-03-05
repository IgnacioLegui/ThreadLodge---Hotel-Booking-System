package com.hotelboutique.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "room_categories")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class RoomCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    @Column(nullable = false, unique = true)
    private String nombre;

    @NotNull(message = "El precio base es obligatorio")
    @Positive(message = "El precio base debe ser positivo")
    @Column(name = "precio_base", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioBase;

    @NotNull(message = "La capacidad máxima es obligatoria")
    @Positive(message = "La capacidad máxima debe ser positiva")
    @Column(name = "capacidad_maxima", nullable = false)
    private Integer capacidadMaxima;
}
