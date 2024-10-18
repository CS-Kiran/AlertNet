package com.alertnet.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "police_details")
public class PoliceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long police_id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private LocalDate dob;
    
    @Column(nullable = false)
    private String gender;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false, unique = true)
    private String phone;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private String department;
    
    @Column(nullable = false)
    private String rank;
    
    @Column(nullable = false, unique = true)
    private String badgeNumber;
    
    @Column(nullable = false, unique = true)
    private String stationAddress;
    
    @Column(nullable = false)
    private int yearsOfService;

    @Column(name = "gov_id_proof_path")
    private String govIdProofPath;

    @Column(nullable = false, unique = true)
    private String emergencyContactName;
    
    @Column(nullable = false, unique = true)
    private String emergencyContactPhone;
    
    @Column(nullable = false)
    private String emergencyContactRelation;

    // Default constructor
    public PoliceDetails() {
    }

    // Constructor with all fields
    public PoliceDetails(String name, LocalDate dob, String gender, String email, String password, 
                         String phone, String address, String department, String rank, String badgeNumber, 
                         String stationAddress, int yearsOfService, String govIdProofPath, 
                         String emergencyContactName, String emergencyContactPhone, String emergencyContactRelation) {
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.department = department;
        this.rank = rank;
        this.badgeNumber = badgeNumber;
        this.stationAddress = stationAddress;
        this.yearsOfService = yearsOfService;
        this.govIdProofPath = govIdProofPath;
        this.emergencyContactName = emergencyContactName;
        this.emergencyContactPhone = emergencyContactPhone;
        this.emergencyContactRelation = emergencyContactRelation;
    }

    // Getters and setters
    public Long getId() {
        return police_id;
    }

    public void setId(Long id) {
        this.police_id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public String getBadgeNumber() {
        return badgeNumber;
    }

    public void setBadgeNumber(String badgeNumber) {
        this.badgeNumber = badgeNumber;
    }

    public String getStationAddress() {
        return stationAddress;
    }

    public void setStationAddress(String stationAddress) {
        this.stationAddress = stationAddress;
    }

    public int getYearsOfService() {
        return yearsOfService;
    }

    public void setYearsOfService(int yearsOfService) {
        this.yearsOfService = yearsOfService;
    }

    public String getGovIdProofPath() {
        return govIdProofPath;
    }

    public void setGovIdProofPath(String govIdProofPath) {
        this.govIdProofPath = govIdProofPath;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }

    public String getEmergencyContactRelation() {
        return emergencyContactRelation;
    }

    public void setEmergencyContactRelation(String emergencyContactRelation) {
        this.emergencyContactRelation = emergencyContactRelation;
    }
}
