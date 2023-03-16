package com.d3.tieudo.service;

import com.d3.tieudo.entity.*;
import com.d3.tieudo.model.FlightProcessModel;
import com.d3.tieudo.model.request.CoordinateDetailRequest;
import com.d3.tieudo.model.request.CoordinateRequest;
import com.d3.tieudo.model.responsive.CoordinateDetailResponsive;
import com.d3.tieudo.model.responsive.CoordinateResponsive;
import com.d3.tieudo.model.responsive.FlightProcessResponsive;
import com.d3.tieudo.model.responsive.SettingFlagBattalionResponsive;
import com.d3.tieudo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightService {
    @Autowired
    private FlightProcessRepository flightProcessRepository;

    @Autowired
    private CoordinateRepository coordinateRepository;

    @Autowired
    private PlantProcessService plantProcessService;

    @Autowired
    private SettingColorFlightRepository settingColorFlightRepository;

    @Autowired
    private BattalionDistanceRepository battalionDistanceRepository;

    @Autowired
    private SettingFlagBattalionRepository settingFlagBattalionRepository;

    @Autowired
    private SettingCannonRepository settingCannonRepository;

    @Autowired
    private LandmarkCoordinateRepository landmarkCoordinateRepository;

    @Autowired
    private CannonDistanceRepository cannonDistanceRepository;

    @Autowired
    private SettingBrigadeRepository settingBrigadeRepository;

    @Autowired
    private ImageMapsRepository imageMapsRepository;

    public List<FlightProcessModel> getAll(){
        List<FlightProcess> list =  flightProcessRepository.findByTypeOrderByFlightName(2);
        List<FlightProcessModel> requests = list.stream().map(tmp -> convertFlightProcessToFlightProcessModel(tmp)).collect(Collectors.toList());

        return requests;
    }

    public FlightProcessModel convertFlightProcessToFlightProcessModel(FlightProcess flightProcess){
        FlightProcessModel flightProcessModel = new FlightProcessModel();
        List<SettingFlagBattalion> settingFlagBattalions = settingFlagBattalionRepository.findByFlightProcessId(flightProcess.getId());
        flightProcessModel.setId(flightProcess.getId());
        flightProcessModel.setFlightName(flightProcess.getFlightName());
        flightProcessModel.setStatusActive(flightProcess.getStatusActive());
        flightProcessModel.setCreatedAt(flightProcess.getCreatedAt());
        flightProcessModel.setType(flightProcess.getType());
        if (!settingFlagBattalions.isEmpty()){
            flightProcessModel.setStatusSetup(true);
        } else {
            flightProcessModel.setStatusSetup(false);
        }
        return flightProcessModel;
    }

    public FlightProcessResponsive getFlightById(Long flightId){
        List<SettingFlagBattalion> settingFlagBattalions = settingFlagBattalionRepository.findByFlightProcessId(flightId);
        FlightProcess process = flightProcessRepository.getOne(flightId);
        List<Coordinate> list = coordinateRepository.findByFlightId(flightId);
        List<BattalionDistance> battalionDistances = battalionDistanceRepository.findAll();

        // get url image
        FlightProcessResponsive flightProcessResponsive = new FlightProcessResponsive();
        if (!settingFlagBattalions.isEmpty()){
            flightProcessResponsive.setStatusBattalion(true);
            flightProcessResponsive.setSettingFlagBattalions(settingFlagBattalions);
        }

        List<SettingCannon> cannonList = settingCannonRepository.findByFlightId(flightId);
        flightProcessResponsive.setSettingCannons(cannonList);

        Optional<SettingBrigade> brigadeOptional = settingBrigadeRepository.findByFlightProcessId(flightId);
        if (brigadeOptional.isPresent()){
            flightProcessResponsive.setFlagBrigadeId(brigadeOptional.get().getId());
            flightProcessResponsive.setToaDoBrigade(brigadeOptional.get().getToaDo());
        }

        if (process.getMapsId() != null){
            ImageMaps imageMaps = imageMapsRepository.getOne(process.getMapsId());
            flightProcessResponsive.setUrlImage(imageMaps.getUrl());
        }
        flightProcessResponsive.setNameFlight(process.getFlightName());
        flightProcessResponsive.setCoordinateList(list);
        flightProcessResponsive.setRadiusTd1(battalionDistances.get(0).getDistance());
        flightProcessResponsive.setRadiusTd2(battalionDistances.get(1).getDistance());

        return flightProcessResponsive;
    }

    public CoordinateDetailResponsive getCoordinateByTime(Long id, CoordinateDetailRequest request){
        CoordinateDetailResponsive result = new CoordinateDetailResponsive();
        List<Coordinate> listByTime = new ArrayList<>();
        List<Coordinate> list = coordinateRepository.findByFlightId(id);
        List<CoordinateResponsive> responsives = new ArrayList<>();
        String timeFirst = list.get(0).getTime();
        if (request.getStatusFirst()){
            result.setTime(timeFirst);
            request.setThoiGian(timeFirst);
            request.setTimes(1);
            listByTime = list.stream().filter(cr -> cr.getTime().equals(timeFirst) && cr.getSttTime() == 1).collect(Collectors.toList());
        } else {
            listByTime = list.stream().filter(cr -> cr.getTime().equals(request.getThoiGian()) && cr.getSttTime() == request.getTimes()).collect(Collectors.toList());
        }

        if (request.getTimes() == 1){
            result.setTime(request.getThoiGian());
            result.setSttTime(2);
        } else {
            result.setTime(findTimeNext(request.getThoiGian()));
            result.setSttTime(1);
        }

        responsives = listByTime.stream().map(value -> convertCoordinate(value)).collect(Collectors.toList());
        result.setList(responsives);
        result.setStatusEnd(false);
        if (request.getNumber() == list.size()){
            result.setStatusEnd(true);
        }
        return result;
    }

    public String findTimeNext(String time){
        Integer tm = Integer.parseInt(time);
        tm += 1;
        String value = tm.toString();
        if (value.length() == 3){
            value = "0" + value;
        }

        return value;
    }

    public CoordinateResponsive convertCoordinate(Coordinate coordinate) {
        CoordinateResponsive responsive = new CoordinateResponsive();

        List<Coordinate> list = coordinateRepository.findByCoordinateCodeAndFlightIdOrderByTime(coordinate.getCoordinateCode(), coordinate.getFlightId());
        responsive.setNumber(coordinate.getNumber());
        responsive.setType(coordinate.getType());
        responsive.setHeight(coordinate.getHeight());
        responsive.setTime(coordinate.getTime());
        responsive.setLocal(plantProcessService.getLocal(coordinate.getCoordinate()));
        responsive.setTopSo(coordinate.getCoordinateCode());
        responsive.setStatusFirst(coordinate.getStatusFirst());
        responsive.setToaDo(coordinate.getCoordinate());
        responsive.setSttTime(coordinate.getSttTime());
        Boolean statusTmt = false;
        if (coordinate.getStatusFirst()) {
            responsive.setIdFirst(coordinate.getId());
            responsive.setX1(coordinate.getCoordinateX());
            responsive.setY1(coordinate.getCoordinateY());
        } else {
            Integer index = list.indexOf(coordinate);
            responsive.setX1(list.get(index - 1).getCoordinateX());
            responsive.setY1(list.get(index - 1).getCoordinateY());
            responsive.setX2(coordinate.getCoordinateX());
            responsive.setY2(coordinate.getCoordinateY());
            if (list.get(index - 1).getType().equals("TMT")) {
                statusTmt = true;
            }
        }

        List<SettingColorFlight> listSetting = settingColorFlightRepository.findAll();
        listSetting.forEach(st -> {
            if (Integer.parseInt(coordinate.getCoordinateCode()) >= st.getPlanFrom() && Integer.parseInt(coordinate.getCoordinateCode()) <= st.getPlanTo()){
                responsive.setColor(st.getColor());
            }
        });

        responsive.setTmt(statusTmt);

        return responsive;
    }

    public Boolean checkCoordinate(CoordinateRequest request){
        Optional<Coordinate> optional = coordinateRepository.findByCoordinateCodeAndFlightIdAndTimeAndSttTime(request.getTopSo(), request.getFlightId(), request.getTime(), request.getSttTime());
        if (optional.isPresent()){
            return true;
        }
        return false;
    }

    public Boolean deleteData(Long flightId){
        List<Coordinate> list = coordinateRepository.findByFlightId(flightId);
        if (!list.isEmpty()){
            coordinateRepository.deleteAll(list);
        }

        List<SettingFlagBattalion> settingFlagBattalions = settingFlagBattalionRepository.findByFlightProcessId(flightId);
        if (!settingFlagBattalions.isEmpty()){
            settingFlagBattalionRepository.deleteAll(settingFlagBattalions);
        }

        Optional<SettingBrigade> brigadeOptional = settingBrigadeRepository.findByFlightProcessId(flightId);
        if (brigadeOptional.isPresent()){
            settingBrigadeRepository.delete(brigadeOptional.get());
        }

        List<SettingCannon> cannonList = settingCannonRepository.findByFlightId(flightId);
        if (!cannonList.isEmpty()){
            settingCannonRepository.deleteAll(cannonList);
        }

        return true;
    }

    public Boolean deleteCoordinateByFlightId(Long flightId){
        List<Coordinate> list = coordinateRepository.findByFlightId(flightId);
        if (!list.isEmpty()){
            coordinateRepository.deleteAll(list);
        }

        return true;
    }

    public Boolean deleteFlightById(Long flightId){
        flightProcessRepository.deleteById(flightId);
        deleteData(flightId);
        return true;
    }

    public Boolean saveCoordinateBrigade(String coordinateBrigade, Long flightId){
        SettingBrigade settingBrigade = new SettingBrigade();
        settingBrigade.setFlightProcessId(flightId);
        settingBrigade.setToaDo(coordinateBrigade);
        settingBrigadeRepository.save(settingBrigade);
        return true;
    }

    public SettingCannon editCannon(String coordinate, Long cannonId, Long type, String name){
        Optional<SettingCannon> optional = settingCannonRepository.findById(cannonId);
        if (optional.isPresent()){
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(coordinate.substring(0, 2)).get();
            SettingCannon settingCannon = optional.get();
            settingCannon.setNameCannon(name);
            settingCannon.setToaDo(coordinate);
            settingCannon.setCoordinateX(plantProcessService.tinhX(coordinate, landmarkCoordinate.getLocal()));
            settingCannon.setCoordinateY(plantProcessService.tinhY(coordinate, landmarkCoordinate.getNumberRow()));

            Optional<CannonDistance> optionalCannonDistance = cannonDistanceRepository.findById(type);
            if (optionalCannonDistance.isPresent()){
                settingCannon.setRadius(optionalCannonDistance.get().getDistance());
            }

            settingCannonRepository.save(settingCannon);

            return settingCannon;
        }

        return null;
    }

    public Boolean deleteCannonById(Long cannonId){
        Optional<SettingCannon> optional = settingCannonRepository.findById(cannonId);
        if (optional.isPresent()){
            settingCannonRepository.delete(optional.get());
            return true;
        }
        return false;
    }

    public Boolean editBrigade(String coordinate, Long brigadeId){
        Optional<SettingBrigade> optional = settingBrigadeRepository.findById(brigadeId);
        if (optional.isPresent()){
            SettingBrigade settingBrigade = optional.get();
            settingBrigade.setToaDo(coordinate);
            settingBrigadeRepository.save(settingBrigade);
            return true;
        }
        return false;
    }

    public SettingFlagBattalion editBattalion(SettingFlagBattalion request, Boolean isShow){
        Optional<SettingFlagBattalion> optional = settingFlagBattalionRepository.findById(request.getId());
        if (optional.isPresent()){
            SettingFlagBattalion settingFlagBattalion = optional.get();
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(request.getToaDo().substring(0, 2)).get();
            settingFlagBattalion.setCoordinateX(plantProcessService.tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            settingFlagBattalion.setCoordinateY(plantProcessService.tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
            settingFlagBattalion.setBattalionName(request.getBattalionName());
            settingFlagBattalion.setToaDo(request.getToaDo());
            settingFlagBattalion.setShow(isShow);
            settingFlagBattalion.setDistance1(request.getDistance1());
            settingFlagBattalion.setDistance2(request.getDistance2());
            settingFlagBattalionRepository.save(settingFlagBattalion);
            return settingFlagBattalion;
        }

        return null;
    }

    public Boolean deleteBattalionById(Long battalionId){
        Optional<SettingFlagBattalion> optional = settingFlagBattalionRepository.findById(battalionId);
        if (optional.isPresent()){
            settingFlagBattalionRepository.delete(optional.get());
            return true;
        }
        return false;
    }

    public Boolean deleteBrigadeById(Long brigadeId){
        Optional<SettingBrigade> optional = settingBrigadeRepository.findById(brigadeId);
        if (optional.isPresent()){
            settingBrigadeRepository.delete(optional.get());
            return true;
        }
        return false;
    }

    public Boolean checkExistBattalion(Long flightId){
        List<SettingFlagBattalion> list = settingFlagBattalionRepository.findByFlightProcessId(flightId);
        if (!list.isEmpty()){
            return true;
        }

        return false;
    }

    public Boolean checkExistBrigade(Long flightId){
        Optional<SettingBrigade> optional = settingBrigadeRepository.findByFlightProcessId(flightId);
        if (optional.isPresent()){
            return true;
        }
        return false;
    }

    public Boolean saveMaps(Long mapsId, Long flightId){
        Optional<FlightProcess> optional = flightProcessRepository.findById(flightId);
        if (optional.isPresent()){
            FlightProcess process = optional.get();
            process.setMapsId(mapsId);
            flightProcessRepository.save(process);
            return true;
        }
        return false;
    }
}
