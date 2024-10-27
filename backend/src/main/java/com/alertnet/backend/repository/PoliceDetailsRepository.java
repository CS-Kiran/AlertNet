package com.alertnet.backend.repository;

import com.alertnet.backend.model.PoliceDetails;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PoliceDetailsRepository extends JpaRepository<PoliceDetails, Long> {
    Optional<PoliceDetails> findByEmailAndPasswordAndAccountStatus(String email, String password, String accountStatus);
    Optional<PoliceDetails> findByEmail(String email);

}
