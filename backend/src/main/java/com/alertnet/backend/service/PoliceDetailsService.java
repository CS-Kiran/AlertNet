package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.alertnet.backend.model.PoliceDetails;
import com.alertnet.backend.repository.PoliceDetailsRepository; // Add your repository import

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PoliceDetailsService {

    @Value("${upload.directory}")
    private String uploadDir;  // Property to set the upload directory path

    @Autowired
    private PoliceDetailsRepository policeDetailsRepository;

    public String registerPolice(MultipartFile file) throws IOException {
        // Create the directory if it does not exist
        File directory = new File(uploadDir + "/police-id-proof");
        if (!directory.exists()) {
            directory.mkdirs();  // Create the directory
        }

        // Define the file path where the image will be stored
        File imageFile = new File(directory, file.getOriginalFilename());
        
        // Save the file to the specified path
        file.transferTo(imageFile);  // This will save the file

        // Return the path for saving in the database
        return imageFile.getAbsolutePath();
    }

    // Method to save PoliceDetails entity
    public void savePoliceDetails(PoliceDetails policeDetails) {
        policeDetailsRepository.save(policeDetails);
    }

    public List<PoliceDetails> getAllPoliceDetails() {
        return policeDetailsRepository.findAll();
    }

    public PoliceDetails getPoliceDetailsById(Long id) {
        return policeDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Police details not found for id: " + id));
    }

    public boolean updateAccountStatus(Long id, String status) {
        Optional<PoliceDetails> optionalPolice = policeDetailsRepository.findById(id);
        if (optionalPolice.isPresent()) {
            PoliceDetails policeDetails = optionalPolice.get();
            policeDetails.setAccountStatus(status); // Make sure to set the account status
            policeDetailsRepository.save(policeDetails);
            return true;
        }
        return false;
    }
}
