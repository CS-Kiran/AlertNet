package com.alertnet.backend.controller;

import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.service.PoliceDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/police")
@CrossOrigin(origins = "http://localhost:5173")
public class PoliceRegistrationController {

    @Autowired
    private PoliceDetailsService policeDetailsService;

    @PostMapping("/register")
    public ResponseEntity<PoliceDetails> registerPolice(
            @ModelAttribute PoliceDetails policeDetails,
            @RequestParam("govIdProof") MultipartFile govIdProof) {

        try {
            PoliceDetails registeredPolice = policeDetailsService.registerPolice(policeDetails, govIdProof);
            return ResponseEntity.ok(registeredPolice);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
