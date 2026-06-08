package com.ems.employee_management.repository;

import com.ems.employee_management.model.Attendance;
import com.ems.employee_management.enums.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeId(Long employeeId);

    List<Attendance> findByDate(LocalDate date);

    Optional<Attendance> findByEmployeeIdAndDate(
            Long employeeId,
            LocalDate date
    );

    List<Attendance> findByEmployeeIdAndDateBetween(
            Long employeeId,
            LocalDate start,
            LocalDate end
    );

    List<Attendance> findByDateBetween(
            LocalDate start,
            LocalDate end
    );

    long countByEmployeeIdAndStatusAndDateBetween(
            Long employeeId,
            AttendanceStatus status,
            LocalDate start,
            LocalDate end
    );

    @Query("""
            SELECT COUNT(a)
            FROM Attendance a
            WHERE a.date = :date
            """)
    long countPresentByDate(LocalDate date);
}