package com.d3.tieudo.repository;

import com.d3.tieudo.entity.CannonDistance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CannonDistanceRepository extends JpaRepository<CannonDistance, Long> {
}
