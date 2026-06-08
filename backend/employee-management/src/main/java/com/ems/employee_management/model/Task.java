package com.ems.employee_management.model;
import com.ems.employee_management.enums.TaskPriority;
import com.ems.employee_management.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.TODO;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority = TaskPriority.MEDIUM;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private Employee assignedTo;

    @ManyToOne
    @JoinColumn(name = "assigned_by")
    private User assignedBy;

    private LocalDate dueDate;
    private int completionPercentage = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
