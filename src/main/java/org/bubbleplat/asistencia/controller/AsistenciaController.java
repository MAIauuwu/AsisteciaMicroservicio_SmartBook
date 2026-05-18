package org.bubbleplat.asistencia.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bubbleplat.asistencia.model.dto.AsistenciaRequestDTO;
import org.bubbleplat.asistencia.model.dto.AsistenciaResponseDTO;
import org.bubbleplat.asistencia.model.dto.AsistenciaUpdateDTO;
import org.bubbleplat.asistencia.service.AsistenciaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/asistencias")
@RequiredArgsConstructor
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AsistenciaResponseDTO> crearAsistencia(@Valid @RequestBody AsistenciaRequestDTO requestDTO) {
        AsistenciaResponseDTO response = asistenciaService.crearAsistencia(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AsistenciaResponseDTO> obtenerAsistencia(@PathVariable Long id) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciaPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<AsistenciaResponseDTO>> obtenerTodasAsistencias() {
        return ResponseEntity.ok(asistenciaService.obtenerTodasAsistencias());
    }

    @GetMapping("/paginadas")
    public ResponseEntity<Page<AsistenciaResponseDTO>> obtenerAsistenciasPaginadas(
            @PageableDefault(size = 20, sort = "fecha") Pageable pageable) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPaginadas(pageable));
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<AsistenciaResponseDTO>> obtenerAsistenciasPorUsuario(@PathVariable String userId) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorUsuario(userId));
    }

    @GetMapping("/usuario/{userId}/paginadas")
    public ResponseEntity<Page<AsistenciaResponseDTO>> obtenerAsistenciasPorUsuarioPaginadas(
            @PathVariable String userId,
            @PageableDefault(size = 20, sort = "fecha") Pageable pageable) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorUsuarioPaginadas(userId, pageable));
    }

    @GetMapping("/fecha/{fecha}")
    public ResponseEntity<List<AsistenciaResponseDTO>> obtenerAsistenciasPorFecha(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorFecha(fecha));
    }

    @GetMapping("/fecha/{fecha}/paginadas")
    public ResponseEntity<Page<AsistenciaResponseDTO>> obtenerAsistenciasPorFechaPaginadas(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
            @PageableDefault(size = 20, sort = "fecha") Pageable pageable) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorFechaPaginadas(fecha, pageable));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<AsistenciaResponseDTO>> obtenerAsistenciasPorEstado(@PathVariable String estado) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorEstado(estado));
    }

    @GetMapping("/usuario/{userId}/rango")
    public ResponseEntity<List<AsistenciaResponseDTO>> obtenerAsistenciasPorUsuarioYRangoFechas(
            @PathVariable String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorUsuarioYRangoFechas(userId, fechaInicio, fechaFin));
    }

    @GetMapping("/rango")
    public ResponseEntity<Page<AsistenciaResponseDTO>> obtenerAsistenciasPorRangoFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin,
            @PageableDefault(size = 20, sort = "fecha") Pageable pageable) {
        return ResponseEntity.ok(asistenciaService.obtenerAsistenciasPorRangoFechas(fechaInicio, fechaFin, pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AsistenciaResponseDTO> actualizarAsistencia(
            @PathVariable Long id,
            @Valid @RequestBody AsistenciaUpdateDTO updateDTO) {
        return ResponseEntity.ok(asistenciaService.actualizarAsistencia(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> eliminarAsistencia(@PathVariable Long id) {
        asistenciaService.eliminarAsistencia(id);
        return ResponseEntity.noContent().build();
    }
}
