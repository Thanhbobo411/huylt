package com.d3.tieudo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.d3.tieudo.entity.ImageMaps;

@Repository
public interface ImageMapsRepository extends JpaRepository<ImageMaps, Long> {
}
