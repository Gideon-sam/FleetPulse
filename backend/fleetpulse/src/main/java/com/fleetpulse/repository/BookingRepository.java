package com.fleetpulse.repository;

import com.fleetpulse.entity.Booking;
import com.fleetpulse.entity.User;
import com.fleetpulse.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByDriver(User driver);

    List<Booking> findByVehicle(Vehicle vehicle);
}
