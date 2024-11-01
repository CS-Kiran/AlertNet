package com.alertnet.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.QuickReport;
import com.alertnet.backend.service.QuickReportService;
import java.util.List;

@RestController
@RequestMapping("/api/quick-report")
@CrossOrigin(origins = "http://localhost:5173")
public class QuickReportController {

    @Autowired
    private QuickReportService quickReportService;

    @PostMapping("/create")
    public ResponseEntity<?> createQuickReport(
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("reporterName") String reporterName,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            QuickReport quickReport = new QuickReport();
            quickReport.setLatitude(latitude);
            quickReport.setLongitude(longitude);
            quickReport.setReporterName(reporterName);

            // Save the quick report, including image handling
            QuickReport savedReport = quickReportService.saveQuickReport(quickReport, image);
            return ResponseEntity.ok(savedReport);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving report: " + e.getMessage());
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllQuickReports() {
        try {
            List<QuickReport> quickReport = quickReportService.findAllQuickAlerts();
            return ResponseEntity.ok(quickReport);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching reports: " + e.getMessage());
        }
    }
    
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadQuickReportFile(@PathVariable String filename) {
        try {
            // Define the path to the quick reports directory
            Path filePath = Paths.get("uploads/quick-reports").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // Check if the file exists and is readable
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException e) {
            // Handle internal server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
