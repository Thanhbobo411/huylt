package com.d3.tieudo.model.responsive;

import com.d3.tieudo.entity.Coordinate;
import com.d3.tieudo.entity.SettingCannon;
import com.d3.tieudo.entity.SettingFlagBattalion;

import java.util.List;

public class FlightProcessResponsive {
    private Long flagBrigadeId;
    private String urlImage;
    private String nameFlight;
    private Float radiusTd1;
    private Float radiusTd2;
    private Boolean statusBattalion = false;
    private List<SettingFlagBattalion> settingFlagBattalions;
    private List<SettingCannon> settingCannons;
    private List<Coordinate> coordinateList;
    private String toaDoBrigade;

    public Long getFlagBrigadeId() {
        return flagBrigadeId;
    }

    public void setFlagBrigadeId(Long flagBrigadeId) {
        this.flagBrigadeId = flagBrigadeId;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getNameFlight() {
        return nameFlight;
    }

    public void setNameFlight(String nameFlight) {
        this.nameFlight = nameFlight;
    }

    public Float getRadiusTd1() {
        return radiusTd1;
    }

    public void setRadiusTd1(Float radiusTd1) {
        this.radiusTd1 = radiusTd1;
    }

    public Float getRadiusTd2() {
        return radiusTd2;
    }

    public void setRadiusTd2(Float radiusTd2) {
        this.radiusTd2 = radiusTd2;
    }

    public Boolean getStatusBattalion() {
        return statusBattalion;
    }

    public void setStatusBattalion(Boolean statusBattalion) {
        this.statusBattalion = statusBattalion;
    }

    public List<SettingFlagBattalion> getSettingFlagBattalions() {
        return settingFlagBattalions;
    }

    public void setSettingFlagBattalions(List<SettingFlagBattalion> settingFlagBattalions) {
        this.settingFlagBattalions = settingFlagBattalions;
    }

    public List<SettingCannon> getSettingCannons() {
        return settingCannons;
    }

    public void setSettingCannons(List<SettingCannon> settingCannons) {
        this.settingCannons = settingCannons;
    }

    public List<Coordinate> getCoordinateList() {
        return coordinateList;
    }

    public void setCoordinateList(List<Coordinate> coordinateList) {
        this.coordinateList = coordinateList;
    }

    public String getToaDoBrigade() {
        return toaDoBrigade;
    }

    public void setToaDoBrigade(String toaDoBrigade) {
        this.toaDoBrigade = toaDoBrigade;
    }
}
