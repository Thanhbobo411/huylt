package com.d3.tieudo.model.request;

public class CoordinateDetailRequest {
    private String thoiGian;
    private Boolean statusFirst;
    private Integer times;
    private Integer number;

    public String getThoiGian() {
        return thoiGian;
    }

    public void setThoiGian(String thoiGian) {
        this.thoiGian = thoiGian;
    }

    public Boolean getStatusFirst() {
        return statusFirst;
    }

    public void setStatusFirst(Boolean statusFirst) {
        this.statusFirst = statusFirst;
    }

    public Integer getTimes() {
        return times;
    }

    public void setTimes(Integer times) {
        this.times = times;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
