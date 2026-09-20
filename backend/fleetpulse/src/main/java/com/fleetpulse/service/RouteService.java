package com.fleetpulse.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fleetpulse.dto.RouteRequest;
import com.fleetpulse.dto.RouteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class RouteService {

  @Value("${ors.api.key}")
  private String apiKey;

  private final RestTemplate restTemplate = new RestTemplate();
  private final ObjectMapper mapper = new ObjectMapper();

  public RouteResponse getOptimizedRoute(RouteRequest req) throws Exception {

    String url = "https://api.openrouteservice.org/v2/directions/driving-car/json";

    // JSON payload required by ORS
    String body = """
        {
          "coordinates": [
            [%f, %f],
            [%f, %f]
          ]
        }
        """.formatted(
        req.getStartLng(), req.getStartLat(),
        req.getEndLng(), req.getEndLat());

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", apiKey);
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<String> entity = new HttpEntity<>(body, headers);

    ResponseEntity<String> response = restTemplate.exchange(
        url,
        HttpMethod.POST,
        entity,
        String.class);

    JsonNode json = mapper.readTree(response.getBody());

    double distance = json.get("features").get(0).get("properties").get("summary").get("distance").asDouble();
    double duration = json.get("features").get(0).get("properties").get("summary").get("duration").asDouble();
    JsonNode geometry = json.get("features").get(0).get("geometry");

    return new RouteResponse(distance, duration, geometry);
  }
}
