package com.d3.tieudo.service;

import com.d3.tieudo.repository.ReadCoordinateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReadCoordinateService {
    @Autowired
    private ReadCoordinateRepository readCoordinateRepository;
}
