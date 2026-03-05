package com.hotelboutique.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ReservationResponse {

    private Long id;
    private String guestNombre;
    private String guestEmail;
    private String roomNumero;
    private String categoriaNombre;
    private LocalDate fechaCheckIn;
    private LocalDate fechaCheckOut;
    private String estado;
    private BigDecimal precioTotal;
}
