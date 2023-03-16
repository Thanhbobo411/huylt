package com.d3.tieudo.entity;

import javax.persistence.*;

@Entity
@Table(name = "landmark_coordinate")
public class LandmarkCoordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

	@Column(name = "value_tactic")
    private String valueTactic;

	@Column(name = "value_intership")
	private String valueIntership;

	@Column(name = "number_row")
	private Integer numberRow;

	@Column(name = "local")
	private Integer local;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getValueTactic() {
		return valueTactic;
	}

	public void setValueTactic(String valueTactic) {
		this.valueTactic = valueTactic;
	}

	public String getValueIntership() {
		return valueIntership;
	}

	public void setValueIntership(String valueIntership) {
		this.valueIntership = valueIntership;
	}

	public Integer getNumberRow() {
		return numberRow;
	}

	public void setNumberRow(Integer numberRow) {
		this.numberRow = numberRow;
	}

	public Integer getLocal() {
		return local;
	}

	public void setLocal(Integer local) {
		this.local = local;
	}
}
