package com.d3.tieudo.service;

import com.d3.tieudo.entity.Coordinate;
import com.d3.tieudo.entity.SettingColorFlight;
import com.d3.tieudo.repository.CoordinateRepository;
import com.d3.tieudo.repository.SettingColorFlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SettingColorFlightService {
    @Autowired
    private SettingColorFlightRepository settingColorFlightRepository;

    @Autowired
    private CoordinateRepository coordinateRepository;

    public List<SettingColorFlight> getAllSettingColorFlight(){
        return settingColorFlightRepository.findAll();
    }

    public SettingColorFlight getSettingColorFlightById(Long id){
        Optional<SettingColorFlight> optional = settingColorFlightRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public Boolean changeSettingPlan(Long id, SettingColorFlight request){
        List<SettingColorFlight> list = settingColorFlightRepository.findAll();
        Boolean check = true;
        Optional<SettingColorFlight> optional = settingColorFlightRepository.findById(id);
        if (optional.isPresent()){
            SettingColorFlight settingColorFlight = optional.get();
            settingColorFlight.setPlanFrom(request.getPlanFrom());
            settingColorFlight.setPlanTo(request.getPlanTo());
            settingColorFlightRepository.save(settingColorFlight);
            return true;
        }
        return false;
    }

    public Coordinate getCoordinateById(Long id){
        Optional<Coordinate> optional = coordinateRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public Boolean editCoordinate(Coordinate request){
        Optional<Coordinate> optional = coordinateRepository.findById(request.getId());
        if (optional.isPresent()){
            List<Coordinate> list = coordinateRepository.findByCoordinateCodeAndFlightIdOrderByTime(request.getCoordinateCode(), request.getFlightId());
            Coordinate coordinate = optional.get();
            if (!list.isEmpty()){
                Coordinate coordinateFirst = list.stream().filter(c-> c.getStatusFirst()).findFirst().get();
                Integer index = list.indexOf(coordinate);
                Integer indexFirst = list.indexOf(coordinateFirst);

                if (index < indexFirst){
                    coordinate.setStatusFirst(true);
                    coordinateFirst.setStatusFirst(false);
                    coordinateRepository.save(coordinateFirst);
                }
            }


            coordinate.setCoordinateCode(request.getCoordinateCode());
            coordinate.setCoordinate(request.getCoordinate());
            coordinate.setNumber(request.getNumber());
            coordinate.setType(request.getType());
            coordinate.setHeight(request.getHeight());
            coordinate.setTime(request.getTime());
            coordinateRepository.save(coordinate);
            return true;
        }
        return false;
    }

    public Boolean deleteCoordinateById(Long id){
        Optional<Coordinate> optional = coordinateRepository.findById(id);
        if (optional.isPresent()){
            Coordinate coordinate = optional.get();
            coordinateRepository.delete(coordinate);

            if (coordinate.getStatusFirst()){
                List<Coordinate> list = coordinateRepository.findByCoordinateCodeAndFlightIdOrderByTime(coordinate.getCoordinateCode(), coordinate.getFlightId());
                if (!list.isEmpty()){
                    list.get(0).setStatusFirst(true);
                    coordinateRepository.save(list.get(0));
                }
            }

            return true;
        }
        return false;
    }
}
