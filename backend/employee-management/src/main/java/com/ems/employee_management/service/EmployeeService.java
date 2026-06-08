package com.ems.employee_management.service;

import com.ems.employee_management.dto.EmployeeDTO;
import java.util.List;
public interface EmployeeService {
    EmployeeDTO addEmployee(EmployeeDTO dto);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO dto);
    void deleteEmployee(Long id);
    EmployeeDTO getEmployeeById(Long id);
    List<EmployeeDTO> getAllEmployees();
    List<EmployeeDTO> searchByName(String keyword);
    List<EmployeeDTO> getByDepartment(String department);
}
