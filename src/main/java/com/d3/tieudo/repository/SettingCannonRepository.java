package com.d3.tieudo.repository;

import com.d3.tieudo.entity.SettingCannon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettingCannonRepository extends JpaRepository<SettingCannon, Long> {
    List<SettingCannon> findByFlightId(Long flightId);
}
