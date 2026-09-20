package com.fleetpulse.controller;

import com.fleetpulse.dto.VehicleRequest;
import com.fleetpulse.entity.Vehicle;
import com.fleetpulse.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/vehicles")
@CrossOrigin("*")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping("/add")
    public ResponseEntity<?> addVehicle(@RequestBody VehicleRequest req) {
        return ResponseEntity.ok(vehicleService.addVehicle(req));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }
}
