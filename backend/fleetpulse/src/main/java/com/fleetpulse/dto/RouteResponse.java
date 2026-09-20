package com.fleetpulse.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RouteResponse {
    private double distance;
    private double duration;
    private JsonNode geometry; // encoded polyline
}
