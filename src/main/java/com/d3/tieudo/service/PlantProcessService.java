package com.d3.tieudo.service;

import com.d3.tieudo.entity.*;
import com.d3.tieudo.model.TacticModel;
import com.d3.tieudo.model.request.CoordinateRequest;
import com.d3.tieudo.model.responsive.CoordinateResponsive;
import com.d3.tieudo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlantProcessService {
    @Autowired
    private PlantProcessRepository plantProcessRepository;

    @Autowired
    private CoordinateRepository coordinateRepository;

    @Autowired
    private LandmarkCoordinateRepository landmarkCoordinateRepository;

    @Autowired
    private FlightProcessRepository flightProcessRepository;

    @Autowired
    private CannonDistanceRepository cannonDistanceRepository;

    @Autowired
    private BattalionDistanceRepository battalionDistanceRepository;

    @Autowired
    private SettingColorFlightRepository settingColorFlightRepository;

    @Autowired
    private SettingFlagBattalionRepository settingFlagBattalionRepository;

    @Autowired
    private SettingCannonRepository settingCannonRepository;

    public FlightProcess createPlantProcess(String name, Integer type) {
        FlightProcess process = new FlightProcess();
        process.setType(type);
        process.setFlightName(name);
        process.setStatusActive(true);

        return plantProcessRepository.save(process);
    }

    public Coordinate addCoordinate(CoordinateRequest request) {
        Coordinate coordinate = new Coordinate();
        coordinate.setCoordinateCode(request.getTopSo());
        coordinate.setHeight(request.getHeight());
        coordinate.setNumber(request.getSoLuong());
        coordinate.setTime(request.getTime());
        coordinate.setFlightId(request.getFlightId());
        coordinate.setType(request.getType());
        coordinate.setCoordinate(request.getToaDo());
        if (request.getOption() == 1) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueTactic(request.getToaDo().substring(0, 2)).get();
            coordinate.setCoordinateX(tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            coordinate.setCoordinateY(tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
        } else if (request.getOption() == 2) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(request.getToaDo().substring(0, 2)).get();
            coordinate.setCoordinateX(tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            coordinate.setCoordinateY(tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
            List<Coordinate> list = coordinateRepository.findByCoordinateCodeAndFlightIdOrderByTime(request.getTopSo(), request.getFlightId());
            if (!list.isEmpty()){
                Optional<Coordinate> coordinateFirstOptional = list.stream().filter(c-> c.getStatusFirst()).findFirst();

                if (coordinateFirstOptional.isPresent()){
                    Coordinate coordinateFirst = coordinateFirstOptional.get();
                    if (request.getTime().compareTo(coordinateFirst.getTime()) < 0){
                        coordinate.setStatusFirst(true);
                        coordinateFirst.setStatusFirst(false);
                        coordinateRepository.save(coordinateFirst);
                    } else {
                        List<Coordinate> list1 = coordinateRepository.findByCoordinateCodeAndFlightId(request.getTopSo(), request.getFlightId());
                        if (list1.isEmpty()){
                            coordinate.setStatusFirst(true);
                        } else {
                            coordinate.setStatusFirst(false);
                        }
                    }
                } else {
                    coordinate.setStatusFirst(true);
                }
            } else {
                coordinate.setStatusFirst(true);
            }
        }

        if (request.getSttTime() != null){
            coordinate.setSttTime(request.getSttTime());
        }

        return coordinateRepository.save(coordinate);
    }

    public CoordinateResponsive createCoordinate(CoordinateRequest request) {
        CoordinateResponsive responsive = new CoordinateResponsive();
        if (checkFlightProcess(request)) {
            responsive.setStatusEnd(checkFlightProcess(request));
            return responsive;
        }
        //save coordinate
        Coordinate coordinate = addCoordinate(request);

        List<Coordinate> list = coordinateRepository.findByCoordinateCodeAndFlightId(request.getTopSo(), request.getFlightId());
        responsive.setNumber(request.getSoLuong());
        responsive.setType(request.getType());
        responsive.setHeight(request.getHeight());
        responsive.setTime(request.getTime());
        Boolean statusTmt = false;
        if (list.size() <= 1) {
            responsive.setIdFirst(coordinate.getId());
            responsive.setStatusFirst(true);
            responsive.setX1(coordinate.getCoordinateX());
            responsive.setY1(coordinate.getCoordinateY());
            responsive.setToaDo(request.getToaDo());
            responsive.setLocal(getLocal(request.getToaDo()));
            responsive.setTopSo(request.getTopSo());
        } else {
            responsive.setStatusFirst(false);
            responsive.setX1(list.get(list.size() - 2).getCoordinateX());
            responsive.setY1(list.get(list.size() - 2).getCoordinateY());
            responsive.setX2(list.get(list.size() - 1).getCoordinateX());
            responsive.setY2(list.get(list.size() - 1).getCoordinateY());
            responsive.setToaDo(request.getToaDo());
            responsive.setLocal(getLocal(request.getToaDo()));
            responsive.setTopSo(request.getTopSo());
            if (list.get(list.size() - 2).getType().equals("TMT")) {
                statusTmt = true;
            }
        }

        List<SettingColorFlight> listSetting = settingColorFlightRepository.findAll();
        listSetting.forEach(st -> {
            if (Integer.parseInt(request.getTopSo()) >= st.getPlanFrom() && Integer.parseInt(request.getTopSo()) <= st.getPlanTo()){
                responsive.setColor(st.getColor());
            }
        });

        responsive.setTmt(statusTmt);

        return responsive;
    }

    public Boolean checkFlightProcess(CoordinateRequest request) {
        List<Coordinate> list = coordinateRepository.findByCoordinateCodeAndFlightId(request.getTopSo(), request.getFlightId());
        Boolean value = list.stream().filter(c -> "MT".equals(c.getType())).findFirst().isPresent();

        return value;
    }

    public Integer tinhX(String toado, Integer local) {
        String[] arr = toado.split("");
        Integer x2 = Integer.parseInt(arr[2]);
        Integer x3 = Integer.parseInt(arr[4]);

        Integer z = 0;
        if (x3 == 1 || x3 == 4) {
            z = 5;
        } else if (x3 == 2 || x3 == 3) {
            z = 15;
        } else if (x3 == 5) {
            z = 10;
        }

        Integer value = (local - 1) * 102 + (x2 - 1) * 20 + z + 1;
        return value;
    }

    public Integer tinhY(String toado, Integer row) {
        String[] arr = toado.split("");
        Integer y2 = Integer.parseInt(arr[3]);
        Integer x3 = Integer.parseInt(arr[4]);

        Integer z = 0;
        if (x3 == 1 || x3 == 2) {
            z = 5;
        } else if (x3 == 3 || x3 == 4) {
            z = 15;
        } else if (x3 == 5) {
            z = 10;
        }
        Integer value = (row - 1) * 102 + (y2 - 1) * 20 + z + 1;

        return value;
    }

    public Integer getLocal(String toado) {
        String[] arr = toado.split("");
        return Integer.parseInt(arr[4]);
    }

    public void endProcess(Long processId) {
        FlightProcess process = flightProcessRepository.getOne(processId);
        process.setStatusActive(false);
        flightProcessRepository.save(process);
    }

    public Boolean saveDataTactic(List<TacticModel> request) {
        List<LandmarkCoordinate> list = landmarkCoordinateRepository.findAll();
        List<LandmarkCoordinate> list1 = new ArrayList<>();
        list.forEach(li -> {
            request.forEach(re -> {
                if (li.getId() == re.getId()) {
                    list1.add(li);
                    Optional<LandmarkCoordinate> optional = landmarkCoordinateRepository.findById(re.getId());
                    if (optional.isPresent()) {
                        optional.get().setValueTactic(re.getValue());
                        landmarkCoordinateRepository.save(optional.get());
                    }
                }
            });
        });

        list.removeAll(list1);
        list.forEach(lc -> {
            lc.setValueTactic("");
            landmarkCoordinateRepository.save(lc);
        });
        return true;
    }

    public Boolean saveDataInterShip(List<TacticModel> request) {
        List<LandmarkCoordinate> list = landmarkCoordinateRepository.findAll();
        List<LandmarkCoordinate> list1 = new ArrayList<>();
        list.forEach(li -> {
            request.forEach(re -> {
                if (li.getId() == re.getId()) {
                    list1.add(li);
                    Optional<LandmarkCoordinate> optional = landmarkCoordinateRepository.findById(re.getId());
                    if (optional.isPresent()) {
                        optional.get().setValueIntership(re.getValue());
                        landmarkCoordinateRepository.save(optional.get());
                    }
                }
            });
        });

        list.removeAll(list1);
        list.forEach(lc -> {
            lc.setValueIntership("");
            landmarkCoordinateRepository.save(lc);
        });
        return true;
    }

    public void saveSettingFlagBattalion(SettingFlagBattalion request, Boolean isShow){
        SettingFlagBattalion settingFlagBattalion = new SettingFlagBattalion();
        FlightProcess process = flightProcessRepository.getOne(request.getFlightProcessId());
        settingFlagBattalion.setToaDo(request.getToaDo());
        settingFlagBattalion.setFlightProcessId(request.getFlightProcessId());
        settingFlagBattalion.setBattalionName(request.getBattalionName());
        settingFlagBattalion.setShow(isShow);
        settingFlagBattalion.setDistance1(request.getDistance1());
        settingFlagBattalion.setDistance2(request.getDistance2());
        if (process.getType() == 1) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueTactic(request.getToaDo().substring(0, 2)).get();
            settingFlagBattalion.setCoordinateX(tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            settingFlagBattalion.setCoordinateY(tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
        } else if (process.getType() == 2) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(request.getToaDo().substring(0, 2)).get();
            settingFlagBattalion.setCoordinateX(tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            settingFlagBattalion.setCoordinateY(tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
        }
        settingFlagBattalionRepository.save(settingFlagBattalion);
    }

    public CoordinateResponsive calculateBattalion(SettingFlagBattalion request, Boolean isShow) {
        saveSettingFlagBattalion(request, isShow);
        FlightProcess process = flightProcessRepository.getOne(request.getFlightProcessId());
        CoordinateResponsive responsive = new CoordinateResponsive();
        List<BattalionDistance> list = battalionDistanceRepository.findAll();
        if (process.getType() == 1) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueTactic(request.getToaDo().substring(0, 2)).get();
            responsive.setX1(tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            responsive.setY1(tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
        } else if (process.getType() == 2) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(request.getToaDo().substring(0, 2)).get();
            responsive.setX1(tinhX(request.getToaDo(), landmarkCoordinate.getLocal()));
            responsive.setY1(tinhY(request.getToaDo(), landmarkCoordinate.getNumberRow()));
        }
        responsive.setRadiusTd1(request.getDistance1());
        responsive.setRadiusTd2(request.getDistance2());
        responsive.setShow(isShow);

        return responsive;
    }

    public CoordinateResponsive getCannon(String toaDo, Long flightId, Long cannonId, String name) {
        FlightProcess process = flightProcessRepository.getOne(flightId);
        CoordinateResponsive responsive = new CoordinateResponsive();
        if (process.getType() == 1) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueTactic(toaDo.substring(0, 2)).get();
            responsive.setX1(tinhX(toaDo, landmarkCoordinate.getLocal()));
            responsive.setY1(tinhY(toaDo, landmarkCoordinate.getNumberRow()));
        } else if (process.getType() == 2) {
            LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(toaDo.substring(0, 2)).get();
            responsive.setX1(tinhX(toaDo, landmarkCoordinate.getLocal()));
            responsive.setY1(tinhY(toaDo, landmarkCoordinate.getNumberRow()));
        }
        CannonDistance cannonDistance = cannonDistanceRepository.getOne(cannonId);
        responsive.setRadius(cannonDistance.getDistance());

        SettingCannon settingCannon = new SettingCannon();
        // save SettingCannon
        settingCannon.setFlightId(flightId);
        settingCannon.setCoordinateX(responsive.getX1());
        settingCannon.setCoordinateY(responsive.getY1());
        settingCannon.setToaDo(toaDo);
        settingCannon.setRadius(responsive.getRadius());
        settingCannon.setNameCannon(name);
        settingCannonRepository.save(settingCannon);

        return responsive;
    }
}
