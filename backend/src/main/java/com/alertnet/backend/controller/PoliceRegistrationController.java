package com.alertnet.backend.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.service.PoliceDetailsService;
import com.alertnet.backend.util.JwtUtil;

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
            @RequestParam("govIdProof") MultipartFile govIdProof, 
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
            
            // Save the policeDetails to the database
            policeDetailsService.savePoliceDetails(policeDetails);

            return ResponseEntity.ok("Police registered successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> policeLogin(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Map<String, String> response = new HashMap<>();

        // Fetch police details by email first
        Optional<PoliceDetails> policeDetailsOptional = policeDetailsService.findByEmail(email);

        if (policeDetailsOptional.isPresent()) {
            PoliceDetails policeDetails = policeDetailsOptional.get();
            String accountStatus = policeDetails.getAccountStatus();
            Long policeId = policeDetails.getId();
            String policeName = policeDetails.getName();
            
            // Include account status in the response
            response.put("accountStatus", accountStatus);

            // Only allow login if the account is activated
            if (!"activated".equalsIgnoreCase(accountStatus)) {
                response.put("message", "Account not activated. Please contact admin.");
                return ResponseEntity.status(200).body(response);
            }

            if (policeDetails.getPassword().equals(password)) {
                // Generate JWT token with police ID and name
                String token = JwtUtil.generateToken(policeId, policeName);

                response.put("message", "Login successful!");
                response.put("policeId", String.valueOf(policeId)); // Send policeId as a string
                response.put("policeName", policeName);
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



    
    @GetMapping("/all")
    public ResponseEntity<List<PoliceDetails>> getAllPoliceDetails() {
        List<PoliceDetails> policeDetailsList = policeDetailsService.getAllPoliceDetails();
        return new ResponseEntity<>(policeDetailsList, HttpStatus.OK);
    }
    
    @GetMapping("/idproof/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads/police-id-proof").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PutMapping("/activate/{id}")
    public ResponseEntity<String> updateAccountStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {
        return updateStatus(id, requestBody, "activated");
    }
    
    @PutMapping("/suspend/{id}")
    public ResponseEntity<String> suspendAccountStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> requestBody) {
        return updateStatus(id, requestBody, "suspended");
    }

    private ResponseEntity<String> updateStatus(Long id, Map<String, String> requestBody, String expectedStatus) {
        String status = requestBody.get("accountStatus");
        
        if (status == null || !expectedStatus.equalsIgnoreCase(status)) {
            return ResponseEntity.badRequest().body("Invalid status: " + status);
        }
        
        try {
            boolean isUpdated = policeDetailsService.updateAccountStatus(id, status);
            if (isUpdated) {
                return ResponseEntity.ok("Account status updated successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Police officer not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating status: " + e.getMessage());
        }
    }

}
