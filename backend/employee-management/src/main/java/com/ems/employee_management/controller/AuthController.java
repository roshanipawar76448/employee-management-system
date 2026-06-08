package com.ems.employee_management.controller;

import com.ems.employee_management.dto.request.LoginRequest;
import com.ems.employee_management.dto.response.AuthResponse;
import com.ems.employee_management.model.User;
import com.ems.employee_management.repository.UserRepository;
import com.ems.employee_management.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(
                request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        }

        if (!user.isAccountNonLocked()) {
            return ResponseEntity.status(HttpStatus.LOCKED)
                    .body(Map.of("error", "Account is locked. Contact admin."));
        }

        String token = jwtUtil.generateToken(
                user.getUsername(), user.getRole().name());

        return ResponseEntity.ok(AuthResponse.builder()
                .token(token)
                .name(user.getEmployee() != null ?
                        user.getEmployee().getFirstName() + " " +
                                user.getEmployee().getLastName()
                        : user.getUsername())
                .role(user.getRole().name())
                .username(user.getUsername())
                .email(user.getEmail())
                .build());
    }
}