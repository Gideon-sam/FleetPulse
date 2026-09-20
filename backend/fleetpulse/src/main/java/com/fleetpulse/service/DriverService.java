package com.fleetpulse.service;

import com.fleetpulse.entity.Role;
import com.fleetpulse.entity.User;
import com.fleetpulse.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.fleetpulse.entity.Vehicle;
import com.fleetpulse.dto.RouteRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final UserRepository userRepository;

    public List<User> getAllDrivers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.DRIVER)
                .toList();
    }

    public User getDriverById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
