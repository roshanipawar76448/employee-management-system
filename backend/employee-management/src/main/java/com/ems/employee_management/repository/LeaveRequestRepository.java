package com.ems.employee_management.repository;

import com.ems.employee_management.enums.LeaveStatus;
import com.ems.employee_management.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployeeId(Long employeeId);

    List<LeaveRequest> findByStatus(LeaveStatus status);

    List<LeaveRequest> findByEmployeeIdAndStatus(
            Long employeeId,
            LeaveStatus status
    );

    long countByEmployeeIdAndStatus(
            Long employeeId,
            LeaveStatus status
    );
}