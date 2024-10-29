package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.Alert;
import com.alertnet.backend.repository.AlertRepository; // Assuming you have created this repository

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AlertService {
    private static final Logger logger = LoggerFactory.getLogger(AlertService.class);
    
    @Autowired
    private AlertRepository alertRepository; // Single repository for Alert

    @Value("${upload.directory}/alerts")
    private String uploadDir;

    public Alert saveAlert(Alert alert, MultipartFile image) throws IOException {
        // Save the alert directly to the repository
        Alert savedAlert = alertRepository.save(alert);

        // Handle image upload if present
        if (image != null && !image.isEmpty()) {
            String imageFileName = savedAlert.getAlertId() + "." + FilenameUtils.getExtension(image.getOriginalFilename());
            Path imagePath = Paths.get(uploadDir, imageFileName);
            Files.createDirectories(imagePath.getParent());
            image.transferTo(imagePath.toFile());

            savedAlert.setImagePath(imagePath.toString());
            logger.info("Image saved at path: {}", imagePath);
            // Update the alert in the repository after setting the image path
            alertRepository.save(savedAlert); // Save the updated alert
        }

        return savedAlert;
    }
    public String saveImage(MultipartFile image) throws IOException {
        // Define the directory to save the images
        String directory = "uploads/alerts/";
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = Paths.get(directory + fileName);
        
        // Ensure the directory exists
        Files.createDirectories(path.getParent());
        
        // Save the file
        Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        
        return path.toString();  // Return the file path
    }
    
    public List<Alert> findAllAlerts() {
        return alertRepository.findAll(); // This method retrieves all alerts from the database
    }

    // Method to find alerts by police ID
    public List<Alert> findAlertsByPoliceId(Long policeId) {
        return alertRepository.findByPoliceId(policeId); // This method retrieves alerts by police ID
    }

}
