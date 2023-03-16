package com.d3.tieudo.repository;

import com.d3.tieudo.entity.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long> {
    List<Coordinate> findByCoordinateCodeAndFlightId(String coordinateCode, Long flightId);
    List<Coordinate> findByFlightId(Long flightId);
    Optional<Coordinate> findByCoordinateCodeAndFlightIdAndTime(String coordinateCode, Long flightId, String time);
    List<Coordinate> findByFlightIdAndTime(Long flightId, String time);
    List<Coordinate> findByCoordinateCodeAndFlightIdOrderByTime(String coordinateCode, Long flightId);
    Optional<Coordinate> findByCoordinateCodeAndFlightIdAndTimeAndSttTime(String coordinateCode, Long flightId, String time, Integer sttTime);
}
