package com.d3.tieudo.repository;

import com.d3.tieudo.entity.SettingColorFlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingColorFlightRepository extends JpaRepository<SettingColorFlight, Long> {

}
