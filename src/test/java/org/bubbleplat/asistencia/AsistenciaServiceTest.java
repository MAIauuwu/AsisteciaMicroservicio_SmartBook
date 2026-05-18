package org.bubbleplat.asistencia;

import org.bubbleplat.asistencia.exception.DuplicateResourceException;
import org.bubbleplat.asistencia.exception.InvalidDataException;
import org.bubbleplat.asistencia.exception.ResourceNotFoundException;
import org.bubbleplat.asistencia.model.dto.AsistenciaRequestDTO;
import org.bubbleplat.asistencia.model.dto.AsistenciaResponseDTO;
import org.bubbleplat.asistencia.model.dto.AsistenciaUpdateDTO;
import org.bubbleplat.asistencia.service.AsistenciaService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AsistenciaServiceTest {

    @Autowired
    private AsistenciaService asistenciaService;

    @Test
    @DisplayName("Crear asistencia exitosamente")
    void crearAsistencia_Success() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER001")
                .fecha(LocalDate.now())
                .horaEntrada(LocalTime.of(8, 0))
                .estado("PRESENTE")
                .build();

        AsistenciaResponseDTO response = asistenciaService.crearAsistencia(request);

        assertNotNull(response.getId());
        assertEquals("USER001", response.getUserId());
        assertEquals(LocalDate.now(), response.getFecha());
        assertEquals(LocalTime.of(8, 0), response.getHoraEntrada());
        assertEquals("PRESENTE", response.getEstado());
    }

    @Test
    @DisplayName("Crear asistencia duplicada debe lanzar excepción")
    void crearAsistencia_Duplicate_ThrowsException() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER002")
                .fecha(LocalDate.now())
                .horaEntrada(LocalTime.of(9, 0))
                .estado("PRESENTE")
                .build();

        asistenciaService.crearAsistencia(request);

        assertThrows(DuplicateResourceException.class, () -> {
            asistenciaService.crearAsistencia(request);
        });
    }

    @Test
    @DisplayName("Crear asistencia con estado inválido debe lanzar excepción")
    void crearAsistencia_InvalidEstado_ThrowsException() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER003")
                .fecha(LocalDate.now())
                .estado("ESTADO_INVALIDO")
                .build();

        assertThrows(InvalidDataException.class, () -> {
            asistenciaService.crearAsistencia(request);
        });
    }

    @Test
    @DisplayName("Crear asistencia con hora de salida anterior a entrada debe lanzar excepción")
    void crearAsistencia_InvalidHorarios_ThrowsException() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER004")
                .fecha(LocalDate.now())
                .horaEntrada(LocalTime.of(17, 0))
                .horaSalida(LocalTime.of(8, 0))
                .estado("PRESENTE")
                .build();

        assertThrows(InvalidDataException.class, () -> {
            asistenciaService.crearAsistencia(request);
        });
    }

    @Test
    @DisplayName("Obtener asistencia por ID exitosamente")
    void obtenerAsistenciaPorId_Success() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER005")
                .fecha(LocalDate.now())
                .horaEntrada(LocalTime.of(8, 30))
                .estado("TARDANZA")
                .build();

        AsistenciaResponseDTO created = asistenciaService.crearAsistencia(request);
        AsistenciaResponseDTO found = asistenciaService.obtenerAsistenciaPorId(created.getId());

        assertEquals(created.getId(), found.getId());
        assertEquals("USER005", found.getUserId());
        assertEquals("TARDANZA", found.getEstado());
    }

    @Test
    @DisplayName("Obtener asistencia por ID inexistente debe lanzar excepción")
    void obtenerAsistenciaPorId_NotFound_ThrowsException() {
        assertThrows(ResourceNotFoundException.class, () -> {
            asistenciaService.obtenerAsistenciaPorId(99999L);
        });
    }

    @Test
    @DisplayName("Actualizar asistencia exitosamente")
    void actualizarAsistencia_Success() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER006")
                .fecha(LocalDate.now())
                .horaEntrada(LocalTime.of(8, 0))
                .estado("PRESENTE")
                .build();

        AsistenciaResponseDTO created = asistenciaService.crearAsistencia(request);

        AsistenciaUpdateDTO update = AsistenciaUpdateDTO.builder()
                .horaSalida(LocalTime.of(17, 0))
                .observaciones("Jornada completa")
                .build();

        AsistenciaResponseDTO updated = asistenciaService.actualizarAsistencia(created.getId(), update);

        assertEquals(LocalTime.of(17, 0), updated.getHoraSalida());
        assertEquals("Jornada completa", updated.getObservaciones());
    }

    @Test
    @DisplayName("Eliminar asistencia exitosamente")
    void eliminarAsistencia_Success() {
        AsistenciaRequestDTO request = AsistenciaRequestDTO.builder()
                .userId("USER007")
                .fecha(LocalDate.now())
                .estado("PRESENTE")
                .build();

        AsistenciaResponseDTO created = asistenciaService.crearAsistencia(request);

        asistenciaService.eliminarAsistencia(created.getId());

        assertThrows(ResourceNotFoundException.class, () -> {
            asistenciaService.obtenerAsistenciaPorId(created.getId());
        });
    }

    @Test
    @DisplayName("Obtener asistencias por usuario")
    void obtenerAsistenciasPorUsuario_Success() {
        String userId = "USER008";

        asistenciaService.crearAsistencia(AsistenciaRequestDTO.builder()
                .userId(userId)
                .fecha(LocalDate.now().minusDays(2))
                .estado("PRESENTE")
                .build());

        asistenciaService.crearAsistencia(AsistenciaRequestDTO.builder()
                .userId(userId)
                .fecha(LocalDate.now().minusDays(1))
                .estado("TARDANZA")
                .build());

        var asistencias = asistenciaService.obtenerAsistenciasPorUsuario(userId);

        assertEquals(2, asistencias.size());
    }

    @Test
    @DisplayName("Obtener asistencias por rango de fechas con fecha inicio mayor a fecha fin debe lanzar excepción")
    void obtenerAsistenciasPorRangoFechas_InvalidRange_ThrowsException() {
        assertThrows(InvalidDataException.class, () -> {
            asistenciaService.obtenerAsistenciasPorUsuarioYRangoFechas(
                    "USER009",
                    LocalDate.now().plusDays(5),
                    LocalDate.now().minusDays(5)
            );
        });
    }
}
