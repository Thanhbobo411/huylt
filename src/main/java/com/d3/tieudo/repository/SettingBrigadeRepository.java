package com.d3.tieudo.repository;

import com.d3.tieudo.entity.SettingBrigade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SettingBrigadeRepository extends JpaRepository<SettingBrigade, Long> {
    Optional<SettingBrigade> findByFlightProcessId(Long flightId);
}
