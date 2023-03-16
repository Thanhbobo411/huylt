package com.d3.tieudo.entity;

import javax.persistence.*;

@Entity
@Table(name = "setting_flag_battalion")
public class SettingFlagBattalion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String battalionName;
    private String toaDo;
    private Integer coordinateX;
    private Integer coordinateY;
    private Long flightProcessId;
    private Float distance1;
    private Float distance2;
    private Boolean isShow;

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

    public Float getDistance1() {
        return distance1;
    }

    public void setDistance1(Float distance1) {
        this.distance1 = distance1;
    }

    public Float getDistance2() {
        return distance2;
    }

    public void setDistance2(Float distance2) {
        this.distance2 = distance2;
    }

    public Boolean getShow() {
        return isShow;
    }

    public void setShow(Boolean show) {
        isShow = show;
    }
}
