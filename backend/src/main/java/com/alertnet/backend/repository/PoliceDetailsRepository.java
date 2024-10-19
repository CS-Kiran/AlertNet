package com.alertnet.backend.repository;

import com.alertnet.backend.model.PoliceDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoliceDetailsRepository extends JpaRepository<PoliceDetails, Long> {
    // Additional custom query methods can be added here
}
