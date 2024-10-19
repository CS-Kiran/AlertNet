package com.alertnet.backend.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.service.PoliceDetailsService;

@RestController
@RequestMapping("/api/police")
@CrossOrigin(origins = "http://localhost:5173")
public class PoliceRegistrationController {

    private final PoliceDetailsService policeDetailsService;

    public PoliceRegistrationController(PoliceDetailsService policeDetailsService) {
        this.policeDetailsService = policeDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerPolice(
            @RequestParam("name") String name,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam("department") String department,
            @RequestParam("rank") String rank,
            @RequestParam("badgeNumber") String badgeNumber,
            @RequestParam("stationAddress") String stationAddress,
            @RequestParam("yearsOfService") Integer yearsOfService,
            @RequestParam("govIdProof") MultipartFile govIdProof, // Update this line
            @RequestParam("emergencyContactName") String emergencyContactName,
            @RequestParam("emergencyContactPhone") String emergencyContactPhone,
            @RequestParam("emergencyContactRelation") String emergencyContactRelation) {
        try {
            // Save the file and get the path
            String filePath = policeDetailsService.registerPolice(govIdProof);
            
            // Create a new PoliceDetails object
            PoliceDetails policeDetails = new PoliceDetails(name, dob, gender, email, password, phone,
                    address, department, rank, badgeNumber, stationAddress, yearsOfService, 
                    filePath, emergencyContactName, emergencyContactPhone, emergencyContactRelation);
            
            // Save the policeDetails to the database (implement this in your service)
            policeDetailsService.savePoliceDetails(policeDetails);

            return ResponseEntity.ok("Police registered successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
        }
    }
}
