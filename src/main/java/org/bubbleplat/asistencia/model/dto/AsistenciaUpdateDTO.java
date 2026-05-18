package org.bubbleplat.asistencia.model.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AsistenciaUpdateDTO {

    private LocalDate fecha;

    private LocalTime horaEntrada;

    private LocalTime horaSalida;

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    private String estado;

    @Size(max = 500, message = "Las observaciones no pueden exceder 500 caracteres")
    private String observaciones;
}
