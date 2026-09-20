package com.fleetpulse.repository;

import com.fleetpulse.model.RideRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RideRequestRepository extends JpaRepository<RideRequest, Long> {
    List<RideRequest> findByUserId(Long userId);
}
