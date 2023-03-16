package com.d3.tieudo.model;

public class FlightProcessModel {
    private Long id;
    private String flightName;
    private Integer type;
    private Boolean statusActive;
    private String createdAt;
    private Boolean statusSetup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFlightName() {
        return flightName;
    }

    public void setFlightName(String flightName) {
        this.flightName = flightName;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean getStatusActive() {
        return statusActive;
    }

    public void setStatusActive(Boolean statusActive) {
        this.statusActive = statusActive;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getStatusSetup() {
        return statusSetup;
    }

    public void setStatusSetup(Boolean statusSetup) {
        this.statusSetup = statusSetup;
    }
}
