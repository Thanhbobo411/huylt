package com.d3.tieudo.model.request;

public class CannonRequest {
    private Long id;
    private String cannonName;
    private Float distance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCannonName() {
        return cannonName;
    }

    public void setCannonName(String cannonName) {
        this.cannonName = cannonName;
    }

    public Float getDistance() {
        return distance;
    }

    public void setDistance(Float distance) {
        this.distance = distance;
    }
}
