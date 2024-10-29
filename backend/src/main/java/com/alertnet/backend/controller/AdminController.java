package com.alertnet.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alertnet.backend.service.AdminService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public Map<String, Object> adminLogin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        String token = adminService.authenticateAdmin(username, password);
        Map<String, Object> response = new HashMap<>();

        if (token != null) {
            response.put("success", true);
            response.put("message", "Admin login successful");
            response.put("token", token);
        } else {
            response.put("success", false);
            response.put("message", "Invalid username or password");
        }

        return response;
    }
}
