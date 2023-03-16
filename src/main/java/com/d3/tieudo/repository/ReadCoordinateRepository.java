package com.d3.tieudo.repository;

import com.d3.tieudo.entity.ReadCoordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReadCoordinateRepository extends JpaRepository<ReadCoordinate, Long> {
    Optional<ReadCoordinate> findByName(String name);
}
