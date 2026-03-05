package com.hotelboutique.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ReservationRequest {

    // Guest data
    @NotBlank(message = "El nombre del huésped es obligatorio")
    private String guestNombre;

    @NotBlank(message = "El email del huésped es obligatorio")
    @Email(message = "El email debe ser válido")
    private String guestEmail;

    private String guestTelefono;

    // Reservation data
    @NotNull(message = "El ID de la habitación es obligatorio")
    private Long roomId;

    @NotNull(message = "La fecha de check-in es obligatoria")
    private LocalDate fechaCheckIn;

    @NotNull(message = "La fecha de check-out es obligatoria")
    private LocalDate fechaCheckOut;
}
