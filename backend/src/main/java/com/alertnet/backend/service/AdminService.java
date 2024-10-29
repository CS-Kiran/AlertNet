package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alertnet.backend.repository.AdminRepository;
import com.alertnet.backend.util.JwtUtil;
import com.alertnet.backend.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public String authenticateAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);

        // Assuming password verification logic is implemented here
        if (admin != null && admin.getPassword().equals(password)) {
            Long adminId = admin.getId();
            return JwtUtil.generateToken(adminId, username);
        } else {
            return null;
        }
    }
}
