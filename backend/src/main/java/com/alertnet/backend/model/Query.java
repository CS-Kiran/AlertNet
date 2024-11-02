package com.alertnet.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queries")
public class Query {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long queryId;

    private String name;
    private String role;
    private String citizenOrPoliceId;
    private String message;
    private String queryType;
    private String status;
    private String adminResponse;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    public Long getQueryId() {
        return queryId;
    }

    public void setQueryId(Long queryId) {
        this.queryId = queryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCitizenOrPoliceId() {
        return citizenOrPoliceId;
    }

    public void setCitizenOrPoliceId(String citizenOrPoliceId) {
        this.citizenOrPoliceId = citizenOrPoliceId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getQueryType() {
        return queryType;
    }

    public void setQueryType(String queryType) {
        this.queryType = queryType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAdminResponse() {
        return adminResponse;
    }

    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
