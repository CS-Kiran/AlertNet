package com.alertnet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alertnet.backend.service.AdminService;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Accept data in JSON format via @RequestBody
    @PostMapping("/login")
    public String adminLogin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        boolean isAuthenticated = adminService.authenticateAdmin(username, password);
        if (isAuthenticated) {
            return "Admin login successful";
        } else {
            return "Invalid username or password";
        }
    }
}
