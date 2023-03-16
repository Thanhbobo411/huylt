package com.d3.tieudo.entity;

import javax.persistence.*;

@Entity
@Table(name = "information_brigade")
public class InformationBrigade {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(length = 5000)
    private String content;

    @Column(length = 2000)
    private String serviceTactic;

    @Column(length = 2000)
    private String serviceInterShip;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getServiceTactic() {
        return serviceTactic;
    }

    public void setServiceTactic(String serviceTactic) {
        this.serviceTactic = serviceTactic;
    }

    public String getServiceInterShip() {
        return serviceInterShip;
    }

    public void setServiceInterShip(String serviceInterShip) {
        this.serviceInterShip = serviceInterShip;
    }
}
