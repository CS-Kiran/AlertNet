package com.alertnet.backend.controller;

import com.alertnet.backend.model.UserDetails;
import com.alertnet.backend.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/citizens")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDetails userDetails) {
        userDetailsService.saveUser(userDetails);
        return ResponseEntity.ok("User registered successfully");
    }
}
