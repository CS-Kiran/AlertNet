package com.alertnet.backend.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.Alert;
import com.alertnet.backend.service.AlertService;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertController {
    @Autowired
    private AlertService alertService;

    @PostMapping("/create")
    public ResponseEntity<?> createAlert(
        @RequestParam("type") String type,
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("age") int age,
        @RequestParam("gender") String gender,
        @RequestParam("height") Double height,
        @RequestParam("weight") Double weight,
        @RequestParam("eyeColor") String eyeColor,
        @RequestParam("hairColor") String hairColor,
        @RequestParam("lastSeenLocation") String lastSeenLocation,
        @RequestParam("lastSeenDate") LocalDate lastSeenDate,
        @RequestParam("caseID") String caseID,
        @RequestParam("dateOfReport") LocalDate dateOfReport,
        @RequestParam("caseStatus") String caseStatus,
        @RequestParam("contactName") String contactName,
        @RequestParam("contactPhone") String contactPhone,
        @RequestParam("secondaryContactName") String secondaryContactName,
        @RequestParam("secondaryContactPhone") String secondaryContactPhone,
        @RequestParam(value = "crimeCommitted", required = false) String crimeCommitted,
        @RequestParam(value = "dangerLevel", required = false) String dangerLevel,
        @RequestParam(value = "image", required = false) MultipartFile image,
        @RequestParam("policeId") Long policeId
    ) {
        try {
            // Create a new Alert instance
            Alert alert = new Alert();
            alert.setType(type);
            alert.setName(name);
            alert.setDescription(description);
            alert.setAge(age);
            alert.setGender(gender);
            alert.setHeight(height);
            alert.setWeight(weight);
            alert.setEyeColor(eyeColor);
            alert.setHairColor(hairColor);
            alert.setLastSeenLocation(lastSeenLocation);
            alert.setLastSeenDate(lastSeenDate);
            alert.setCaseID(caseID);
            alert.setDateOfReport(dateOfReport);
            alert.setCaseStatus(caseStatus);
            alert.setContactName(contactName);
            alert.setContactPhone(contactPhone);
            alert.setSecondaryContactName(secondaryContactName);
            alert.setSecondaryContactPhone(secondaryContactPhone);
            alert.setPoliceId(policeId);

            // Set optional fields based on alert type
            if (type.equalsIgnoreCase("wanted")) {
                alert.setCrimeCommitted(crimeCommitted);
                alert.setDangerLevel(dangerLevel);
            }

            // Handle image upload if provided
            if (image != null && !image.isEmpty()) {
                // Save the image and get the file path
                String imagePath = alertService.saveImage(image);
                alert.setImagePath(imagePath);  // Assuming Alert has an imagePath field
            }

            // Save the alert
            Alert savedAlert = alertService.saveAlert(alert, image);
            return ResponseEntity.ok(savedAlert);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving alert: " + e.getMessage());
        }
    }

}
