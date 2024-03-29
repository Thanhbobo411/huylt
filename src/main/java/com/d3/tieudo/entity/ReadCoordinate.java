package com.d3.tieudo.entity;

import javax.persistence.*;

@Entity
@Table(name = "read_coordinate")
public class ReadCoordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String name;
    private String src;
    private String timeDelay;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getTimeDelay() {
        return timeDelay;
    }

    public void setTimeDelay(String timeDelay) {
        this.timeDelay = timeDelay;
    }
}
