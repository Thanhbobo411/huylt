package com.d3.tieudo.entity;

import javax.persistence.*;

@Entity
@Table(name = "setting_color_flight")
public class SettingColorFlight {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String topPlan;
    private Integer planFrom;
    private Integer planTo;
    private String color;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopPlan() {
        return topPlan;
    }

    public void setTopPlan(String topPlan) {
        this.topPlan = topPlan;
    }

    public Integer getPlanFrom() {
        return planFrom;
    }

    public void setPlanFrom(Integer planFrom) {
        this.planFrom = planFrom;
    }

    public Integer getPlanTo() {
        return planTo;
    }

    public void setPlanTo(Integer planTo) {
        this.planTo = planTo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
