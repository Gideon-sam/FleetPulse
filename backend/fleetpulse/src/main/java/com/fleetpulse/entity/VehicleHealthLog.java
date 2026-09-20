package com.fleetpulse.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicle_health_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleHealthLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double engineTemp;
    private Double batteryLevel;
    private Double tirePressure;
    private Double healthScore;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
