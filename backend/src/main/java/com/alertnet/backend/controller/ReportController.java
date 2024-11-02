package com.alertnet.backend.controller;

import com.alertnet.backend.model.Report;
import com.alertnet.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/create")
    public ResponseEntity<?> createReport(
            @RequestParam("alertId") Long alertId,
            @RequestParam("citizenId") Long citizenId,
            @RequestParam("policeId") Long policeId,
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("message") String message) {
        try {
            // Save the report
            Report report = reportService.createReport(alertId, citizenId, policeId, images, message);
            return ResponseEntity.ok(report);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving report: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
