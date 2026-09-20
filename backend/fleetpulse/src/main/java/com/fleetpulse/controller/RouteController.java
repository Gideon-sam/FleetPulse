package com.fleetpulse.controller;

import com.fleetpulse.dto.RouteRequest;
import com.fleetpulse.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/route")
@CrossOrigin("*")
@RequiredArgsConstructor
public class RouteController {

    private final RouteService routeService;

    @PostMapping("/optimize")
    public ResponseEntity<?> optimize(@RequestBody RouteRequest req) {
        try {
            return ResponseEntity.ok(routeService.getOptimizedRoute(req));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Route calculation failed");
        }
    }
}
