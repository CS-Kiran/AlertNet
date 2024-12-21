package com.alertnet.backend.service;

import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.model.UserDetails;
import com.alertnet.backend.repository.UserDetailsRepository;

import java.util.List;
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
    
    public Optional<UserDetails> findById(Long citizen_id) {
        return userDetailsRepository.findById(citizen_id);
    }
    
    public boolean updateCitizenDetails(Long id, PoliceDetails updatedDetails) {
        Optional<UserDetails> existingDetailsOptional = userDetailsRepository.findById(id);
        if (existingDetailsOptional.isPresent()) {
        	UserDetails existingDetails = existingDetailsOptional.get();

            existingDetails.setPhone(updatedDetails.getPhone());
            existingDetails.setAddress(updatedDetails.getAddress());
            userDetailsRepository.save(existingDetails);
            return true;
        }
        return false;
    }
    
    public boolean updateAccountStatus(Long id, String status) {
        Optional<UserDetails> userOptional = userDetailsRepository.findById(id);
        if (userOptional.isPresent()) {
            UserDetails userDetails = userOptional.get();
            userDetails.setAccountStatus(status);
            userDetailsRepository.save(userDetails);
            return true;
        }
        return false;
    }
    
    public List<UserDetails> findAllUsers() {
        return userDetailsRepository.findAll();
    }
}
