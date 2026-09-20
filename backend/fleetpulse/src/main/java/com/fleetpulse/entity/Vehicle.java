package com.fleetpulse.entity;

import jakarta.persistence.*;
import lombok.*;
import com.neurofleetx.entity.User;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String vehicleType;
    private String vehicleNo;

    private String model;

    private String type;

    private String status; // Active / Repair / Offline

    private Double lat;
    private Double lng;

    private String healthStatus; // Good / Warning / Critical

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private User driver;
}
