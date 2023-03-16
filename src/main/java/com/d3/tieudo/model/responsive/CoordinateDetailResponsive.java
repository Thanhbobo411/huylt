package com.d3.tieudo.model.responsive;

import java.util.List;

public class CoordinateDetailResponsive {
    private String time;
    private Integer sttTime;
    private List<CoordinateResponsive> list;
    private Boolean statusEnd;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getSttTime() {
        return sttTime;
    }

    public void setSttTime(Integer sttTime) {
        this.sttTime = sttTime;
    }

    public List<CoordinateResponsive> getList() {
        return list;
    }

    public void setList(List<CoordinateResponsive> list) {
        this.list = list;
    }

    public Boolean getStatusEnd() {
        return statusEnd;
    }

    public void setStatusEnd(Boolean statusEnd) {
        this.statusEnd = statusEnd;
    }
}
