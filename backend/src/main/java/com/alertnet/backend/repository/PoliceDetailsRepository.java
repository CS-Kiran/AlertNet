package com.alertnet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.alertnet.backend.model.PoliceDetails;

public interface PoliceDetailsRepository extends JpaRepository<PoliceDetails, Long> {
}
