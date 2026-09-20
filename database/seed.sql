CREATE DATABASE fleetpulse;
USE fleetpulse;
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(200),
  role VARCHAR(20),    -- ADMIN / DRIVER
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * from users;
CREATE TABLE vehicles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vehicle_no VARCHAR(50) UNIQUE,
  model VARCHAR(100),
  type VARCHAR(50),
  driver_id BIGINT,
  status VARCHAR(20), -- Active / Repair / Offline
  lat DOUBLE,
  lng DOUBLE,
  health_status VARCHAR(20),
  FOREIGN KEY (driver_id) REFERENCES users(id)
);
CREATE TABLE vehicle_health_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id BIGINT,
  engine_temp DOUBLE,
  battery_level DOUBLE,
  tire_pressure DOUBLE,
  health_score DOUBLE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
CREATE TABLE maintenance_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  vehicle_id BIGINT,
  issue VARCHAR(200),
  severity VARCHAR(20),
  recommended_action VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
CREATE TABLE bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(100),
  pickup_lat DOUBLE,
  pickup_lng DOUBLE,
  drop_lat DOUBLE,
  drop_lng DOUBLE,
  driver_id BIGINT,
  vehicle_id BIGINT,
  status VARCHAR(20),     -- Scheduled / Completed / Cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (driver_id) REFERENCES users(id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
CREATE TABLE ride_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    pickup_lat DECIMAL(10, 6) NOT NULL,
    pickup_lng DECIMAL(10, 6) NOT NULL,
    drop_lat DECIMAL(10, 6) NOT NULL,
    drop_lng DECIMAL(10, 6) NOT NULL,
    distance_km FLOAT DEFAULT NULL,
    duration_min FLOAT DEFAULT NULL,
    route_polyline TEXT DEFAULT NULL,
    fare INT DEFAULT NULL,
    status ENUM('pending', 'accepted', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_number VARCHAR(20) NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL, 
    password_hash VARCHAR(255) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
