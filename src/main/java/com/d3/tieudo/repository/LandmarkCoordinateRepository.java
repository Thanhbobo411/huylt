package com.d3.tieudo.repository;

import com.d3.tieudo.entity.LandmarkCoordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LandmarkCoordinateRepository extends JpaRepository<LandmarkCoordinate, Long> {
    List<LandmarkCoordinate> findAll();
    Optional<LandmarkCoordinate> findByValueTactic(String valueTactic);
    Optional<LandmarkCoordinate> findByValueIntership(String valueIntership);
}
