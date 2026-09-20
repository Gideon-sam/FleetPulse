package com.fleetpulse.repository;

import com.fleetpulse.entity.Vehicle;
import com.fleetpulse.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByDriver(User driver);
}
