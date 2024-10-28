package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.alertnet.backend.model.Alert;
import com.alertnet.backend.model.WantedPersonAlert;
import com.alertnet.backend.model.MissingPersonAlert;
import com.alertnet.backend.repository.MissingPersonAlertRepository;
import com.alertnet.backend.repository.WantedPersonAlertRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.commons.io.FilenameUtils;


@Service
public class AlertService {
    @Autowired
    private MissingPersonAlertRepository missingRepo;

    @Autowired
    private WantedPersonAlertRepository wantedRepo;

    @Value("${alert.upload.directory}")
    private String uploadDir;

    public Alert saveAlert(Alert alert, MultipartFile image) throws IOException {
        Alert savedAlert = alert instanceof WantedPersonAlert
                ? wantedRepo.save((WantedPersonAlert) alert)
                : missingRepo.save((MissingPersonAlert) alert);

        if (image != null && !image.isEmpty()) {
            String imageFileName = savedAlert.getAlertId() + "." + FilenameUtils.getExtension(image.getOriginalFilename());
            Path imagePath = Paths.get(uploadDir, imageFileName);
            Files.createDirectories(imagePath.getParent());
            image.transferTo(imagePath.toFile());

            savedAlert.setImagePath(imagePath.toString());
            if (savedAlert instanceof WantedPersonAlert) {
                wantedRepo.save((WantedPersonAlert) savedAlert);
            } else {
                missingRepo.save((MissingPersonAlert) savedAlert);
            }
        }

        return savedAlert;
    }
}
