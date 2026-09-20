package com.fleetpulse.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ride_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RideRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String pickupLocation;
    private String dropLocation;

    private double pickupLat;
    private double pickupLng;
    private double dropLat;
    private double dropLng;

    private double distanceKm;
    private double durationMin;

    @Column(columnDefinition = "TEXT")
    private String routePolyline;

    private int fare;

    @Builder.Default
    private String status = "pending";
}
