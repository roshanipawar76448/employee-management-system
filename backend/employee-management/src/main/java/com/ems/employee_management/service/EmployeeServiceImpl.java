package com.ems.employee_management.service;

import com.ems.employee_management.dto.EmployeeDTO;
import com.ems.employee_management.exception.ResourceNotFoundException;
import com.ems.employee_management.model.Employee;
import com.ems.employee_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public EmployeeDTO addEmployee(EmployeeDTO dto) {
        Employee emp = mapToEntity(dto);
        return mapToDTO(repository.save(emp));
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee emp = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setDesignation(dto.getDesignation());
        emp.setSalary(dto.getSalary());
        emp.setPhone(dto.getPhone());
        return mapToDTO(repository.save(emp));
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee emp = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        repository.delete(emp);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        return repository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return repository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDTO> searchByName(String keyword) {
        return repository
                .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDTO> getByDepartment(String department) {
        return repository.findByDepartment(department)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private EmployeeDTO mapToDTO(Employee emp) {
        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(emp.getId());
        dto.setFirstName(emp.getFirstName());
        dto.setLastName(emp.getLastName());
        dto.setEmail(emp.getEmail());
        dto.setDepartment(emp.getDepartment());
        dto.setDesignation(emp.getDesignation());
        dto.setSalary(emp.getSalary());
        dto.setPhone(emp.getPhone());
        return dto;
    }

    private Employee mapToEntity(EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setDesignation(dto.getDesignation());
        emp.setSalary(dto.getSalary());
        emp.setPhone(dto.getPhone());
        return emp;
    }
}
