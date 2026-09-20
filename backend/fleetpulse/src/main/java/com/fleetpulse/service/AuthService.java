package com.fleetpulse.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.fleetpulse.repository.UserRepository;
import com.fleetpulse.dto.RegisterRequest;
import com.fleetpulse.dto.LoginRequest;
import com.fleetpulse.dto.LoginResponse;
import com.fleetpulse.entity.User;
import com.fleetpulse.entity.Role;
import com.fleetpulse.entity.Vehicle;
import com.fleetpulse.dto.RouteRequest;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public User register(RegisterRequest req) {
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(req.getPassword()) // No security as required
                .role(Role.valueOf(req.getRole()))
                .build();
        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user == null || !user.getPassword().equals(req.getPassword())) {
            return null;
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name());
    }
}
