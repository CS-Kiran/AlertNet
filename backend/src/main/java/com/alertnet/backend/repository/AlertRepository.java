package com.alertnet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alertnet.backend.model.Alert;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByPoliceId(Long policeId);
}