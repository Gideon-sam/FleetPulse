package com.fleetpulse.repository;

import com.fleetpulse.entity.VehicleHealthLog;
import com.fleetpulse.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleHealthLogRepository extends JpaRepository<VehicleHealthLog, Long> {

    List<VehicleHealthLog> findByVehicle(Vehicle vehicle);
}
