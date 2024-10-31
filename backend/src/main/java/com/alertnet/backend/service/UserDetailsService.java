package com.alertnet.backend.service;

import com.alertnet.backend.model.UserDetails;
import com.alertnet.backend.repository.UserDetailsRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public UserDetails saveUser(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }

    public boolean authenticateUser(String email, String password) {
        return userDetailsRepository.findByEmailAndPasswordAndAccountStatus(email, password, "activated").isPresent();
    }
    
    public Optional<UserDetails> findByEmail(String email) {
        return userDetailsRepository.findByEmail(email);
    }
}
