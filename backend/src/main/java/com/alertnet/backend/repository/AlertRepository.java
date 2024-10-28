package com.alertnet.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alertnet.backend.model.Alert;

public interface AlertRepository extends JpaRepository<Alert, Long> { }
