package com.d3.tieudo.model.responsive;

import com.d3.tieudo.model.LandmarkCoordinateModel;

import java.util.List;

public class LandmarkCoordinateResponsive {
    private List<LandmarkCoordinateModel> list;
    private Boolean status;

    public List<LandmarkCoordinateModel> getList() {
        return list;
    }

    public void setList(List<LandmarkCoordinateModel> list) {
        this.list = list;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
