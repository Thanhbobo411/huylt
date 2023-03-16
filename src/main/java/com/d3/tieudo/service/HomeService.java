package com.d3.tieudo.service;

import com.d3.tieudo.entity.InformationBrigade;
import com.d3.tieudo.repository.InformationBrigadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {
    @Autowired
    private InformationBrigadeRepository informationBrigadeRepository;

    public InformationBrigade getData(){
        return informationBrigadeRepository.findAll().get(0);
    }

    public Boolean saveContent(String content){
        InformationBrigade informationBrigade = informationBrigadeRepository.findAll().get(0);
        informationBrigade.setContent(content);
        informationBrigadeRepository.save(informationBrigade);
        return true;
    }

    public Boolean saveContentTactic(String content){
        InformationBrigade informationBrigade = informationBrigadeRepository.findAll().get(0);
        informationBrigade.setServiceTactic(content);
        informationBrigadeRepository.save(informationBrigade);
        return true;
    }

    public Boolean saveContentInterShip(String content){
        InformationBrigade informationBrigade = informationBrigadeRepository.findAll().get(0);
        informationBrigade.setServiceInterShip(content);
        informationBrigadeRepository.save(informationBrigade);
        return true;
    }
}
