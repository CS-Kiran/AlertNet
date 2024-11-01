package com.alertnet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.QuickReport;
import com.alertnet.backend.service.QuickReportService;

import java.io.IOException;

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
}
