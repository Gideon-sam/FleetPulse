package com.fleetpulse.service;

import com.fleetpulse.dto.VehicleRequest;
import com.fleetpulse.entity.User;
import com.fleetpulse.entity.Vehicle;
import com.fleetpulse.repository.UserRepository;
import com.fleetpulse.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public Vehicle addVehicle(VehicleRequest req) {

        User driver = null;
        if (req.getDriverId() != null) {
            driver = userRepository.findById(req.getDriverId()).orElse(null);
        }

        Vehicle vehicle = Vehicle.builder()
                .vehicleNo(req.getVehicleNo())
                .vehicleType(req.getVehicleType())
                .healthStatus(req.getHealthStatus()) // Now matches String type
                .driver(driver)
                .build();

        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
}
