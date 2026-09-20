package com.fleetpulse.controller;

import com.fleetpulse.dto.RideCreateRequest;
import com.fleetpulse.model.RideRequest;
import com.fleetpulse.service.RideRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ride")
@CrossOrigin("*")
@RequiredArgsConstructor
public class RideController {

    private final RideRequestService rideRequestService;

    @PostMapping("/create")
    public ResponseEntity<?> createRide(@RequestBody RideCreateRequest req) {
        try {
            RideRequest saved = rideRequestService.createRide(req);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Ride creation failed: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRide(@PathVariable Long id) {
        RideRequest ride = rideRequestService.getRideById(id);
        if (ride == null)
            return ResponseEntity.status(404).body("Ride not found");
        return ResponseEntity.ok(ride);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRides() {
        return ResponseEntity.ok(rideRequestService.getAllRides());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRidesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(rideRequestService.getRidesByUser(userId));
    }

}
