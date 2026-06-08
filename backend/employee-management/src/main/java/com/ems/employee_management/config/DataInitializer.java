package com.ems.employee_management.config;

import com.ems.employee_management.enums.Role;
import com.ems.employee_management.model.User;
import com.ems.employee_management.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername("admin")) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .email("admin@ems.com")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .accountNonLocked(true)
                    .build();
            userRepository.save(admin);
            log.info("✅ Admin user created — username: admin, password: admin123");
        }

        if (!userRepository.existsByUsername("hr")) {
            User hr = User.builder()
                    .username("hr")
                    .password(passwordEncoder.encode("hr123"))
                    .email("hr@ems.com")
                    .role(Role.HR)
                    .enabled(true)
                    .accountNonLocked(true)
                    .build();
            userRepository.save(hr);
            log.info("✅ HR user created — username: hr, password: hr123");
        }
    }
}
