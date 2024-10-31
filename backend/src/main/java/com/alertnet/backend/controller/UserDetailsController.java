package com.alertnet.backend.controller;

import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.model.UserDetails;
import com.alertnet.backend.service.UserDetailsService;
import com.alertnet.backend.util.JwtUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/citizens")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDetails userDetails) {
        userDetailsService.saveUser(userDetails);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Map<String, String> response = new HashMap<>();

        // Fetch user details by email first
        Optional<UserDetails> userDetailsOptional = userDetailsService.findByEmail(email);

        if (userDetailsOptional.isPresent()) {
            UserDetails userDetails = userDetailsOptional.get();
            String accountStatus = userDetails.getAccountStatus();
            Long userId = userDetails.getId();
            String userName = userDetails.getName();

            // Include account status in the response
            response.put("accountStatus", accountStatus);

            // Only allow login if the account is activated
            if (!"activated".equalsIgnoreCase(accountStatus)) {
                response.put("message", "Account not activated. Please contact admin.");
                return ResponseEntity.status(200).body(response);
            }

            if (userDetails.getPassword().equals(password)) {
                // Generate JWT token with user ID and name
                String token = JwtUtil.generateToken(userId, userName);

                response.put("message", "Login successful!");
                response.put("userId", String.valueOf(userId)); // Send userId as a string
                response.put("userName", userName);
                response.put("token", token); // Include JWT token

                return ResponseEntity.ok(response);
            } else {
                response.put("message", "Invalid email or password.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            response.put("message", "Email not found.");
            response.put("accountStatus", "not-registered");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDetails> getUserById(@PathVariable Long id) {
        Optional<UserDetails> userDetailsOptional = userDetailsService.findById(id);

        if (userDetailsOptional.isPresent()) {
            return ResponseEntity.ok(userDetailsOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePolice(
            @PathVariable Long id,
            @RequestBody PoliceDetails updatedDetails) {
        try {
            boolean isUpdated = userDetailsService.updateCitizenDetails(id, updatedDetails);
            if (isUpdated) {
                return ResponseEntity.ok("Citizen details updated successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Citizen officer not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating police details: " + e.getMessage());
        }
    }

}
