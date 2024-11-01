package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.alertnet.backend.model.QuickReport;
import com.alertnet.backend.repository.QuickReportRepository;

import java.io.File;
import java.io.IOException;

@Service
public class QuickReportService {
    
    @Autowired
    private QuickReportRepository quickReportRepository;
    
    @Value("${upload.directory}")
    private String uploadDir;

    public QuickReport saveQuickReport(QuickReport quickReport, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imagePath = saveImage(image);
            quickReport.setImagePath(imagePath);
        }
        return quickReportRepository.save(quickReport);
    }

    private String saveImage(MultipartFile image) throws IOException {
    	File directory = new File(uploadDir + "/quick-reports");
        if (!directory.exists()) {
            directory.mkdirs();
        }

        File imageFile = new File(directory, image.getOriginalFilename());
        
        image.transferTo(imageFile);  // This will save the file

        return imageFile.getAbsolutePath();
    }
}
