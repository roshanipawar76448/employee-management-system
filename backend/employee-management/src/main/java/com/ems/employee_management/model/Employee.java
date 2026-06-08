package com.ems.employee_management.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    @Column(unique = true)
    private String email;

    private String phone;
    private String department;
    private String designation;
    private Double salary;
    private String employeeCode;
    private LocalDate joiningDate;
    private String address;
    private String city;
    private String profilePhoto;
    private String gender;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    private String emergencyContact;

    @Column(columnDefinition = "boolean default true")
    private boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}