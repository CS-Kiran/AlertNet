package com.alertnet.backend.service;

import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.repository.PoliceDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PoliceDetailsService {

    @Autowired
    private PoliceDetailsRepository repository;

    private final String uploadDir = "uploads/police-id-proof/";

    public PoliceDetails registerPolice(PoliceDetails policeDetails, MultipartFile govIdProof) throws IOException {
        // Save ID proof to the uploads folder
        if (govIdProof != null && !govIdProof.isEmpty()) {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = govIdProof.getOriginalFilename();
            govIdProof.transferTo(new File(uploadDir + fileName));
            policeDetails.setGovIdProofPath(uploadDir + fileName);
        }

        return repository.save(policeDetails);
    }
}
