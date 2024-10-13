package com.alertnet.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class DatabaseConnectivityController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/check-connection")
    public ResponseEntity<String> checkConnection() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection != null && !connection.isClosed()) {
                return new ResponseEntity<>("Connected to the PostgreSQL database successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to establish a database connection.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (SQLException e) {
            return new ResponseEntity<>("Error connecting to the database: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
