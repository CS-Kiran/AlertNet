package com.alertnet.backend.repository;

import com.alertnet.backend.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
    Optional<UserDetails> findByEmailAndPasswordAndAccountStatus(String email, String password, String accountStatus);
    Optional<UserDetails> findByEmail(String email);
}
