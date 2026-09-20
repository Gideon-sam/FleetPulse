package com.fleetpulse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fleetpulse.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // <- must return Optional<User>
}
