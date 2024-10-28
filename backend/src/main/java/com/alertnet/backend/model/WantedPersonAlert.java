package com.alertnet.backend.model;

import jakarta.persistence.Entity;

@Entity
public class WantedPersonAlert extends Alert {
    private String crimeCommitted;
    private String dangerLevel;

    public String getCrimeCommitted() {
        return crimeCommitted;
    }

    public void setCrimeCommitted(String crimeCommitted) {
        this.crimeCommitted = crimeCommitted;
    }

    public String getDangerLevel() {
        return dangerLevel;
    }

    public void setDangerLevel(String dangerLevel) {
        this.dangerLevel = dangerLevel;
    }
}
