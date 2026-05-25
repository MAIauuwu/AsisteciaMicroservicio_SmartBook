package org.bubbleplat.asistencia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bubbleplat.asistencia.exception.DuplicateResourceException;
import org.bubbleplat.asistencia.exception.InvalidDataException;
import org.bubbleplat.asistencia.exception.ResourceNotFoundException;
import org.bubbleplat.asistencia.model.dto.AsistenciaRequestDTO;
import org.bubbleplat.asistencia.model.dto.AsistenciaResponseDTO;
import org.bubbleplat.asistencia.model.dto.AsistenciaUpdateDTO;
import org.bubbleplat.asistencia.model.entity.Asistencia;
import org.bubbleplat.asistencia.repository.AsistenciaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AsistenciaService {

    private static final Set<String> ESTADOS_VALIDOS = Set.of(
            "PRESENTE", "AUSENTE", "TARDANZA", "PERMISO", "JUSTIFICADO"
    );

    private final AsistenciaRepository asistenciaRepository;

    @Transactional
    public AsistenciaResponseDTO crearAsistencia(AsistenciaRequestDTO requestDTO) {
        log.debug("Creando asistencia para usuario: {}, fecha: {}", requestDTO.getUserId(), requestDTO.getFecha());

        validarEstado(requestDTO.getEstado());

        if (asistenciaRepository.existsByUserIdAndFecha(requestDTO.getUserId(), requestDTO.getFecha())) {
            throw new DuplicateResourceException(
                    "Ya existe un registro de asistencia para el usuario " + requestDTO.getUserId() + " en la fecha " + requestDTO.getFecha()
            );
        }

        validarHorarios(requestDTO.getHoraEntrada(), requestDTO.getHoraSalida());

        Asistencia asistencia = Asistencia.builder()
                .userId(requestDTO.getUserId())
                .fecha(requestDTO.getFecha())
                .horaEntrada(requestDTO.getHoraEntrada())
                .horaSalida(requestDTO.getHoraSalida())
                .estado(requestDTO.getEstado().toUpperCase())
                .observaciones(requestDTO.getObservaciones())
                .build();

        Asistencia guardada = asistenciaRepository.save(asistencia);
        log.info("Asistencia creada exitosamente con ID: {}", guardada.getId());
        return convertToResponseDTO(guardada);
    }

    public AsistenciaResponseDTO obtenerAsistenciaPorId(Long id) {
        log.debug("Buscando asistencia con ID: {}", id);
        Asistencia asistencia = asistenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asistencia no encontrada con ID: " + id));
        return convertToResponseDTO(asistencia);
    }

    public List<AsistenciaResponseDTO> obtenerTodasAsistencias() {
        log.debug("Obteniendo todas las asistencias");
        return asistenciaRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public Page<AsistenciaResponseDTO> obtenerAsistenciasPaginadas(Pageable pageable) {
        log.debug("Obteniendo asistencias paginadas");
        return asistenciaRepository.findAll(pageable).map(this::convertToResponseDTO);
    }

    public List<AsistenciaResponseDTO> obtenerAsistenciasPorUsuario(String userId) {
        log.debug("Buscando asistencias para usuario: {}", userId);
        return asistenciaRepository.findByUserId(userId).stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public Page<AsistenciaResponseDTO> obtenerAsistenciasPorUsuarioPaginadas(String userId, Pageable pageable) {
        log.debug("Buscando asistencias paginadas para usuario: {}", userId);
        return asistenciaRepository.findByUserId(userId, pageable).map(this::convertToResponseDTO);
    }

    public List<AsistenciaResponseDTO> obtenerAsistenciasPorFecha(LocalDate fecha) {
        log.debug("Buscando asistencias para fecha: {}", fecha);
        return asistenciaRepository.findByFecha(fecha).stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public Page<AsistenciaResponseDTO> obtenerAsistenciasPorFechaPaginadas(LocalDate fecha, Pageable pageable) {
        log.debug("Buscando asistencias paginadas para fecha: {}", fecha);
        return asistenciaRepository.findByFecha(fecha, pageable).map(this::convertToResponseDTO);
    }

    public List<AsistenciaResponseDTO> obtenerAsistenciasPorEstado(String estado) {
        log.debug("Buscando asistencias con estado: {}", estado);
        validarEstado(estado);
        return asistenciaRepository.findByEstado(estado.toUpperCase()).stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public List<AsistenciaResponseDTO> obtenerAsistenciasPorUsuarioYRangoFechas(
            String userId, LocalDate fechaInicio, LocalDate fechaFin) {
        log.debug("Buscando asistencias para usuario: {} entre {} y {}", userId, fechaInicio, fechaFin);

        if (fechaInicio.isAfter(fechaFin)) {
            throw new InvalidDataException("La fecha de inicio debe ser anterior o igual a la fecha de fin");
        }

        return asistenciaRepository.findByUserIdAndFechaBetween(userId, fechaInicio, fechaFin).stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public Page<AsistenciaResponseDTO> obtenerAsistenciasPorRangoFechas(
            LocalDate fechaInicio, LocalDate fechaFin, Pageable pageable) {
        log.debug("Buscando asistencias entre {} y {}", fechaInicio, fechaFin);

        if (fechaInicio.isAfter(fechaFin)) {
            throw new InvalidDataException("La fecha de inicio debe ser anterior o igual a la fecha de fin");
        }

        return asistenciaRepository.findByFechaBetween(fechaInicio, fechaFin, pageable).map(this::convertToResponseDTO);
    }

    @Transactional
    public AsistenciaResponseDTO actualizarAsistencia(Long id, AsistenciaUpdateDTO updateDTO) {
        log.debug("Actualizando asistencia con ID: {}", id);

        Asistencia asistencia = asistenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asistencia no encontrada con ID: " + id));

        if (updateDTO.getEstado() != null) {
            validarEstado(updateDTO.getEstado());
            asistencia.setEstado(updateDTO.getEstado().toUpperCase());
        }

        if (updateDTO.getFecha() != null) {
            asistencia.setFecha(updateDTO.getFecha());
        }

        if (updateDTO.getHoraEntrada() != null) {
            asistencia.setHoraEntrada(updateDTO.getHoraEntrada());
        }

        if (updateDTO.getHoraSalida() != null) {
            asistencia.setHoraSalida(updateDTO.getHoraSalida());
        }

        validarHorarios(asistencia.getHoraEntrada(), asistencia.getHoraSalida());

        if (updateDTO.getObservaciones() != null) {
            asistencia.setObservaciones(updateDTO.getObservaciones());
        }

        Asistencia actualizada = asistenciaRepository.save(asistencia);
        log.info("Asistencia actualizada exitosamente con ID: {}", actualizada.getId());
        return convertToResponseDTO(actualizada);
    }

    @Transactional
    public void eliminarAsistencia(Long id) {
        log.debug("Eliminando asistencia con ID: {}", id);

        if (!asistenciaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asistencia no encontrada con ID: " + id);
        }

        asistenciaRepository.deleteById(id);
        log.info("Asistencia eliminada exitosamente con ID: {}", id);
    }

    private void validarEstado(String estado) {
        if (estado != null && !ESTADOS_VALIDOS.contains(estado.toUpperCase())) {
            throw new InvalidDataException(
                    "Estado inválido: " + estado + ". Estados válidos: " + String.join(", ", ESTADOS_VALIDOS)
            );
        }
    }

    private void validarHorarios(LocalTime horaEntrada, LocalTime horaSalida) {
        if (horaEntrada != null && horaSalida != null && horaSalida.isBefore(horaEntrada)) {
            throw new InvalidDataException("La hora de salida no puede ser anterior a la hora de entrada");
        }
    }

    private AsistenciaResponseDTO convertToResponseDTO(Asistencia asistencia) {
        return AsistenciaResponseDTO.builder()
                .id(asistencia.getId())
                .userId(asistencia.getUserId())
                .fecha(asistencia.getFecha())
                .horaEntrada(asistencia.getHoraEntrada())
                .horaSalida(asistencia.getHoraSalida())
                .estado(asistencia.getEstado())
                .observaciones(asistencia.getObservaciones())
                .createdAt(asistencia.getCreatedAt())
                .updatedAt(asistencia.getUpdatedAt())
                .build();
    }
}
