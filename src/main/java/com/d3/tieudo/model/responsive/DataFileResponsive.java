package com.d3.tieudo.model.responsive;

import com.d3.tieudo.entity.Coordinate;

import java.util.List;

public class DataFileResponsive {
    private Integer statusImport;
    private List<Coordinate> list;

    public Integer getStatusImport() {
        return statusImport;
    }

    public void setStatusImport(Integer statusImport) {
        this.statusImport = statusImport;
    }

    public List<Coordinate> getList() {
        return list;
    }

    public void setList(List<Coordinate> list) {
        this.list = list;
    }
}
