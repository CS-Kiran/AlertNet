package com.alertnet.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alertnet.backend.model.Admin;
import com.alertnet.backend.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public boolean authenticateAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && admin.getPassword().equals(password)) {
            System.out.println("Admin authenticated successfully!");
            return true;
        } else {
            System.out.println("Invalid credentials!");
            return false;
        }
    }
}
