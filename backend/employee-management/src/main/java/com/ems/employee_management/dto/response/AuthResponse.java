package com.ems.employee_management.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String name;
    private String role;
    private String username;
    private String email;
}
