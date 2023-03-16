package com.d3.tieudo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "coordinate")
public class Coordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "coordinate_code")
    private String coordinateCode;

	@Column(name = "coordinate")
	private String coordinate;

    @Column(name = "flight_id")
    private Long flightId;

    @Column(name = "number")
    private Integer number;

    @Column(name = "height")
    private String height;
    
    @Column(name = "time")
    private String time;
    
    @Column(name = "coordinate_x")
    private Integer coordinateX;
    
    @Column(name = "coordinate_y")
    private Integer coordinateY;

	@Column(name = "type")
	private String type;

	@Column(name = "stt_time")
	private Integer sttTime;

	@Column(name = "status_first")
	private Boolean statusFirst;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCoordinateCode() {
		return coordinateCode;
	}

	public void setCoordinateCode(String coordinateCode) {
		this.coordinateCode = coordinateCode;
	}

	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(String coordinate) {
		this.coordinate = coordinate;
	}

	public Integer getSttTime() {
		return sttTime;
	}

	public void setSttTime(Integer sttTime) {
		this.sttTime = sttTime;
	}


	public Boolean getStatusFirst() {
		return statusFirst;
	}

	public void setStatusFirst(Boolean statusFirst) {
		this.statusFirst = statusFirst;
	}
}
