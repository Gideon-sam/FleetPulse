package com.fleetpulse.service;

import java.util.List;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.fleetpulse.model.RideRequest;
import com.fleetpulse.repository.RideRequestRepository;
import com.fleetpulse.dto.RideCreateRequest;
import com.fleetpulse.dto.RouteRequest;

@Service
@RequiredArgsConstructor
public class RideRequestService {

    private final RideRequestRepository rideRepo;
    private final RouteService routeService;

    public RideRequest createRide(RideCreateRequest req) throws Exception {

        // Map RideCreateRequest -> RouteRequest
        RouteRequest routeReq = new RouteRequest(
                req.getPickupLat(), req.getPickupLng(),
                req.getDropLat(), req.getDropLng());

        // Call RouteService
        var route = routeService.getOptimizedRoute(routeReq);

        int fare = (int) (route.getDistance() / 1000 * 10); // ₹10 per km

        RideRequest ride = RideRequest.builder()
                .userId(req.getUserId())
                .pickupLocation(req.getPickupLocation())
                .dropLocation(req.getDropLocation())
                .pickupLat(req.getPickupLat())
                .pickupLng(req.getPickupLng())
                .dropLat(req.getDropLat())
                .dropLng(req.getDropLng())
                .distanceKm(route.getDistance() / 1000)
                .durationMin(route.getDuration() / 60)
                .routePolyline(route.getGeometry().toString())
                .fare(fare)
                .status("pending")
                .build();

        return rideRepo.save(ride);
    }

    public RideRequest getRideById(Long id) {
        return rideRepo.findById(id).orElse(null);
    }

    public List<RideRequest> getAllRides() {
        return rideRepo.findAll();
    }

    public List<RideRequest> getRidesByUser(Long userId) {
        return rideRepo.findByUserId(userId);
    }
}
