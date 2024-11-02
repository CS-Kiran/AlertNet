package com.alertnet.backend.service;

import com.alertnet.backend.model.Alert;
import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.model.Report;
import com.alertnet.backend.model.UserDetails;
import com.alertnet.backend.repository.AlertRepository;
import com.alertnet.backend.repository.PoliceDetailsRepository;
import com.alertnet.backend.repository.ReportRepository;
import com.alertnet.backend.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final AlertRepository alertRepository;
    private final UserDetailsRepository citizenRepository;
    private final PoliceDetailsRepository policeRepository;

    @Value("${upload.directory}")
    private String uploadDir;

    public ReportService(ReportRepository reportRepository, AlertRepository alertRepository,
                         UserDetailsRepository citizenRepository, PoliceDetailsRepository policeRepository) {
        this.reportRepository = reportRepository;
        this.alertRepository = alertRepository;
        this.citizenRepository = citizenRepository;
        this.policeRepository = policeRepository;
    }

    public Report createReport(Long alertId, Long citizenId, Long policeId, List<MultipartFile> images, String message) throws IOException {
        // Validate foreign key references
        Optional<Alert> alert = alertRepository.findById(alertId);
        Optional<UserDetails> citizen = citizenRepository.findById(citizenId);
        Optional<PoliceDetails> police = policeRepository.findById(policeId);

        if (!alert.isPresent() || !citizen.isPresent() || !police.isPresent()) {
            throw new IllegalArgumentException("Invalid foreign key ID(s) provided.");
        }

        // Create the report instance
        Report report = new Report();
        report.setAlert(alert.get());
        report.setCitizen(citizen.get());
        report.setPolice(police.get());
        report.setMessage(message); // Set the message

        // Create parent "reports" folder if it doesn't exist
        String reportsFolderPath = uploadDir + "/reports";
        File reportsFolder = new File(reportsFolderPath);
        if (!reportsFolder.exists()) {
            reportsFolder.mkdirs();
        }

        // Create alert-specific folder within "reports" folder
        String alertFolderPath = reportsFolderPath + "/" + alertId;
        File alertFolder = new File(alertFolderPath);
        if (!alertFolder.exists()) {
            alertFolder.mkdirs();
        }

        // Handle images
        List<String> imagePaths = new ArrayList<>();
        for (int i = 0; i < Math.min(images.size(), 5); i++) {
            MultipartFile image = images.get(i);
            String imageName = "image_" + (i + 1) + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get(alertFolderPath, imageName);
            Files.write(imagePath, image.getBytes());
            imagePaths.add(imagePath.toString());
        }

        report.setImagePaths(imagePaths);
        return reportRepository.save(report);
    }

    // Method to retrieve all reports
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    // Method to retrieve reports by citizen ID
    public List<Report> getReportsByCitizenId(Long citizenId) {
        return reportRepository.findByCitizenId(citizenId); // Implement this method in ReportRepository
    }

    // Method to retrieve reports by police ID
    public List<Report> getReportsByPoliceId(Long policeId) {
        return reportRepository.findByPoliceId(policeId); // Implement this method in ReportRepository
    }

}