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
    private String uploadDir;

    @Autowired
    private PoliceDetailsRepository policeDetailsRepository;

    public String registerPolice(MultipartFile file) throws IOException {
        File directory = new File(uploadDir + "/police-id-proof");
        if (!directory.exists()) {
            directory.mkdirs();
        }

        File imageFile = new File(directory, file.getOriginalFilename());
        
        file.transferTo(imageFile);  // This will save the file

        return imageFile.getAbsolutePath();
    }

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
    
    public Optional<PoliceDetails> findByEmail(String email) {
        return policeDetailsRepository.findByEmail(email);
    }
    
    public boolean validateLogin(String email, String password) {
        Optional<PoliceDetails> policeDetails = findByEmail(email);
        return policeDetails.isPresent() && policeDetails.get().getPassword().equals(password);
    }
}
