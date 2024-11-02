package com.alertnet.backend.model;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.*;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private LocalDateTime reportedTime;

    @ManyToOne
    @JoinColumn(name = "alert_id", nullable = false)
    private Alert alert;

    @ManyToOne
    @JoinColumn(name = "citizen_id", nullable = false)
    private UserDetails citizen;

    @ManyToOne
    @JoinColumn(name = "police_id", nullable = false)
    private PoliceDetails police;

    @Column(length = 1000)  // Adjust length as needed
    private String message;

    @ElementCollection
    private List<String> imagePaths;

    // Default constructor
    public Report() {
        this.reportedTime = LocalDateTime.now(); // Auto-set the report time
    }

    // Getters and setters

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public LocalDateTime getReportedTime() {
        return reportedTime;
    }

    public void setReportedTime(LocalDateTime reportedTime) {
        this.reportedTime = reportedTime;
    }

    public Alert getAlert() {
        return alert;
    }

    public void setAlert(Alert alert) {
        this.alert = alert;
    }

    public UserDetails getCitizen() {
        return citizen;
    }

    public void setCitizen(UserDetails citizen) {
        this.citizen = citizen;
    }

    public PoliceDetails getPolice() {
        return police;
    }

    public void setPolice(PoliceDetails police) {
        this.police = police;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getImagePaths() {
        return imagePaths;
    }

    public void setImagePaths(List<String> imagePaths) {
        this.imagePaths = imagePaths;
    }
}
