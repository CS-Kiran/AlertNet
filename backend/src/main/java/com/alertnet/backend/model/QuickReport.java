package com.alertnet.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class QuickReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quickReportId;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private String reporterName;

    @Column
    private String imagePath;

    @Column(nullable = false)
    private LocalDateTime reportTime;

    // Default Constructor
    public QuickReport() {
        this.reportTime = LocalDateTime.now(); // Set report time to the current date and time
    }

    // Getters and Setters
    public Long getQuickReportId() {
        return quickReportId;
    }

    public void setQuickReportId(Long quickReportId) {
        this.quickReportId = quickReportId;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public LocalDateTime getReportTime() {
        return reportTime;
    }

    public void setReportTime(LocalDateTime reportTime) {
        this.reportTime = reportTime;
    }
}
