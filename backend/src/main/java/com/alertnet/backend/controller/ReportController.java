package com.alertnet.backend.controller;

import com.alertnet.backend.model.Report;
import com.alertnet.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Value("${upload.directory}")
    private String uploadDir;

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

    // Get all reports
    @GetMapping("/all")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    // Get reports by citizen ID
    @GetMapping("/citizen/{citizenId}")
    public ResponseEntity<List<Report>> getReportsByCitizenId(@PathVariable Long citizenId) {
        List<Report> reports = reportService.getReportsByCitizenId(citizenId);
        return ResponseEntity.ok(reports);
    }

    // Get reports by police ID
    @GetMapping("/police/{policeId}")
    public ResponseEntity<List<Report>> getReportsByPoliceId(@PathVariable Long policeId) {
        List<Report> reports = reportService.getReportsByPoliceId(policeId);
        return ResponseEntity.ok(reports);
    }

    // Get all images in directory and allow downloading
    @GetMapping("/images/{reportId}")
    public ResponseEntity<?> getImages(@PathVariable Long reportId) {
        String imageDirectoryPath = uploadDir + File.separator + "reports" + File.separator + reportId;
        File directory = new File(imageDirectoryPath);
        if (!directory.exists() || !directory.isDirectory()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Directory not found");
        }

        // Get all files in the directory
        File[] files = directory.listFiles();
        if (files != null && files.length > 0) {
            return ResponseEntity.ok(files);
        } else {
            return ResponseEntity.ok("No images found in the directory");
        }
    }

    // Download specific image
    @GetMapping("/download/{reportId}/{fileName:.+}")
    public ResponseEntity<?> downloadImage(@PathVariable Long reportId, @PathVariable String fileName) {
        String filePath = uploadDir + File.separator + "reports" + File.separator + reportId + File.separator + fileName;
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
