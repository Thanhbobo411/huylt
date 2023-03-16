package com.d3.tieudo.model.responsive;

public class SettingFlagBattalionResponsive {
    private Long id;
    private String battalionName;
    private String toaDo;
    private Integer coordinateX;
    private Integer coordinateY;
    private Long flightProcessId;
    private Float radius1;
    private Float radius2;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBattalionName() {
        return battalionName;
    }

    public void setBattalionName(String battalionName) {
        this.battalionName = battalionName;
    }

    public String getToaDo() {
        return toaDo;
    }

    public void setToaDo(String toaDo) {
        this.toaDo = toaDo;
    }

    public Integer getCoordinateX() {
        return coordinateX;
    }

    public void setCoordinateX(Integer coordinateX) {
        this.coordinateX = coordinateX;
    }

    public Integer getCoordinateY() {
        return coordinateY;
    }

    public void setCoordinateY(Integer coordinateY) {
        this.coordinateY = coordinateY;
    }

    public Long getFlightProcessId() {
        return flightProcessId;
    }

    public void setFlightProcessId(Long flightProcessId) {
        this.flightProcessId = flightProcessId;
    }

    public Float getRadius1() {
        return radius1;
    }

    public void setRadius1(Float radius1) {
        this.radius1 = radius1;
    }

    public Float getRadius2() {
        return radius2;
    }

    public void setRadius2(Float radius2) {
        this.radius2 = radius2;
    }
}
