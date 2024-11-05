package com.alertnet.backend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    
    @Value("${upload.directory}")
    private String uploadDir;

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
    public ResponseEntity<?> downloadQuickReportFile(@PathVariable String filename) {
    	String filePath = uploadDir + File.separator + "quick-reports" + File.separator + filename;
        File file = new File(filePath);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found");
        }

        try (FileInputStream inputStream = new FileInputStream(file)) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=" + URLEncoder.encode(file.getName(), "UTF-8"));
            return new ResponseEntity<>(inputStream.readAllBytes(), headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error downloading file: " + e.getMessage());
        }
    }
}
