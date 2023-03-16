package com.d3.tieudo.repository;

import com.d3.tieudo.entity.SettingFlagBattalion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SettingFlagBattalionRepository extends JpaRepository<SettingFlagBattalion, Long> {
    List<SettingFlagBattalion> findByFlightProcessId(Long flightProcessId);
}
