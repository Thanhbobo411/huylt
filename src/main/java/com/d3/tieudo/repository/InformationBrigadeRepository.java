package com.d3.tieudo.repository;

import com.d3.tieudo.entity.InformationBrigade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InformationBrigadeRepository extends JpaRepository<InformationBrigade, Long> {
}
