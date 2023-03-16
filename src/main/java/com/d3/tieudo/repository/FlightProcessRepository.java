package com.d3.tieudo.repository;

import com.d3.tieudo.entity.FlightProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightProcessRepository extends JpaRepository<FlightProcess, Long> {
    List<FlightProcess> findByTypeOrderByFlightName(Integer type);
    List<FlightProcess> findByMapsId(Long mapId);
}
