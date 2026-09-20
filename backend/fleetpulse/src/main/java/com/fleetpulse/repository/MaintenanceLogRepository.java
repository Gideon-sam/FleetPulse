package com.fleetpulse.repository;

import com.fleetpulse.entity.MaintenanceLog;
import com.fleetpulse.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {

    List<MaintenanceLog> findByVehicle(Vehicle vehicle);
}
