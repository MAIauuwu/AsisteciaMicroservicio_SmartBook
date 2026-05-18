package org.bubbleplat.asistencia.repository;

import org.bubbleplat.asistencia.model.entity.Asistencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

    Optional<Asistencia> findByUserIdAndFecha(String userId, LocalDate fecha);

    List<Asistencia> findByUserId(String userId);

    Page<Asistencia> findByUserId(String userId, Pageable pageable);

    List<Asistencia> findByFecha(LocalDate fecha);

    Page<Asistencia> findByFecha(LocalDate fecha, Pageable pageable);

    List<Asistencia> findByEstado(String estado);

    Page<Asistencia> findByEstado(String estado, Pageable pageable);

    boolean existsByUserIdAndFecha(String userId, LocalDate fecha);

    @Query("SELECT a FROM Asistencia a WHERE a.userId = :userId AND a.fecha BETWEEN :fechaInicio AND :fechaFin")
    List<Asistencia> findByUserIdAndFechaBetween(
            @Param("userId") String userId,
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin
    );

    @Query("SELECT a FROM Asistencia a WHERE a.fecha BETWEEN :fechaInicio AND :fechaFin")
    Page<Asistencia> findByFechaBetween(
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin,
            Pageable pageable
    );
}
