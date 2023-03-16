package com.d3.tieudo.entity;

import javax.persistence.*;

@Entity
@Table(name = "setting_brigade")
public class SettingBrigade {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private Long flightProcessId;
    private String toaDo;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFlightProcessId() {
        return flightProcessId;
    }

    public void setFlightProcessId(Long flightProcessId) {
        this.flightProcessId = flightProcessId;
    }

    public String getToaDo() {
        return toaDo;
    }

    public void setToaDo(String toaDo) {
        this.toaDo = toaDo;
    }
}
