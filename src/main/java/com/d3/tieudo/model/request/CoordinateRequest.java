package com.d3.tieudo.model.request;

public class CoordinateRequest {
	private String topSo;
	private String toaDo;
	private Integer soLuong;
	private String type;
	private String height;
	private String time;
	private Long flightId;
	private Integer option;
	private Integer sttTime;

	public String getTopSo() {
		return topSo;
	}

	public void setTopSo(String topSo) {
		this.topSo = topSo;
	}

	public String getToaDo() {
		return toaDo;
	}

	public void setToaDo(String toaDo) {
		this.toaDo = toaDo;
	}

	public Integer getSoLuong() {
		return soLuong;
	}

	public void setSoLuong(Integer soLuong) {
		this.soLuong = soLuong;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public Long getFlightId() {
		return flightId;
	}

	public void setFlightId(Long flightId) {
		this.flightId = flightId;
	}

	public Integer getOption() {
		return option;
	}

	public void setOption(Integer option) {
		this.option = option;
	}

	public Integer getSttTime() {
		return sttTime;
	}

	public void setSttTime(Integer sttTime) {
		this.sttTime = sttTime;
	}
}
