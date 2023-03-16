package com.d3.tieudo.controller;

import com.d3.tieudo.entity.*;
import com.d3.tieudo.model.FlightProcessModel;
import com.d3.tieudo.model.request.CoordinateDetailRequest;
import com.d3.tieudo.model.request.CoordinateRequest;
import com.d3.tieudo.model.responsive.CoordinateDetailResponsive;
import com.d3.tieudo.model.responsive.CoordinateResponsive;
import com.d3.tieudo.model.responsive.FlightProcessResponsive;
import com.d3.tieudo.model.responsive.SettingFlagBattalionResponsive;
import com.d3.tieudo.service.FlightService;
import com.d3.tieudo.service.SettingColorFlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FlightController {
    @Autowired
    private FlightService flightService;

    @Autowired
    private SettingColorFlightService settingColorFlightService;

    @GetMapping(value = "/flight/all")
    @ResponseBody
    public List<FlightProcessModel> getAllFlight() {
        return flightService.getAll();
    }

    @GetMapping(value = "/flight/{id}")
    @ResponseBody
    public FlightProcessResponsive getFlight(@PathVariable("id") Long flightId) {
        return flightService.getFlightById(flightId);
    }

    @GetMapping(value = "/setting/plan")
    @ResponseBody
    public List<SettingColorFlight> getAllSettingColorFlight() {
        return settingColorFlightService.getAllSettingColorFlight();
    }

    @GetMapping(value = "/show/plan/{id}")
    @ResponseBody
    public SettingColorFlight showSettingPlan(@PathVariable("id") Long id) {
        return settingColorFlightService.getSettingColorFlightById(id);
    }

    @PostMapping(value = "/change/plan/{id}")
    @ResponseBody
    public Boolean changeSettingPlan(@PathVariable("id") Long id, SettingColorFlight request) {
        return settingColorFlightService.changeSettingPlan(id, request);
    }

    @GetMapping(value = "/load/coordinate/{id}")
    @ResponseBody
    public CoordinateDetailResponsive getCoordinateByTime(@PathVariable("id") Long id, CoordinateDetailRequest request) {
        return flightService.getCoordinateByTime(id, request);
    }

    @GetMapping(value = "/coordinate/{id}")
    @ResponseBody
    public Coordinate getCoordinateById(@PathVariable("id") Long id) {
        return settingColorFlightService.getCoordinateById(id);
    }

    @PostMapping(value = "/edit/coordinate")
    @ResponseBody
    public Boolean editCoordinate(Coordinate request) {
        return settingColorFlightService.editCoordinate(request);
    }

    @GetMapping(value = "/coordinate/delete/{id}")
    @ResponseBody
    public Boolean deleteCoordinate(@PathVariable("id") Long id) {
        return settingColorFlightService.deleteCoordinateById(id);
    }

    @GetMapping(value = "/checkExist/coordinate")
    @ResponseBody
    public Boolean checkCoordinate(CoordinateRequest request) {
        return flightService.checkCoordinate(request);
    }

    @GetMapping(value = "/delete/data/{id}")
    @ResponseBody
    public Boolean deleteData(@PathVariable("id") Long flightId) {
        return flightService.deleteCoordinateByFlightId(flightId);
    }

    @GetMapping(value = "/delete/flight/{id}")
    @ResponseBody
    public Boolean deleteFlight(@PathVariable("id") Long flightId) {
        flightService.deleteFlightById(flightId);
        return true;
    }

    @PostMapping(value = "/coordinate/brigade/{coordinate}/{flightId}")
    @ResponseBody
    public Boolean saveCoordinateBrigade(@PathVariable("coordinate") String coordinateBrigade, @PathVariable("flightId") Long flightId) {
        flightService.saveCoordinateBrigade(coordinateBrigade, flightId);
        return true;
    }

    @PostMapping(value = "/edit/cannon/{coordinate}/{cannonId}/{type}/{name}")
    @ResponseBody
    public SettingCannon editCannon(@PathVariable("coordinate") String coordinateBrigade, @PathVariable("cannonId") Long cannonId,
                                    @PathVariable("type") Long type, @PathVariable("name") String name) {
        return flightService.editCannon(coordinateBrigade, cannonId, type, name);
    }

    @GetMapping(value = "/setting/cannon/delete/{id}")
    @ResponseBody
    public Boolean deleteCannon(@PathVariable("id") Long cannonId) {
        return flightService.deleteCannonById(cannonId);
    }

    @PostMapping(value = "/edit/coordinate/brigade/{coordinate}/{brigadeId}")
    @ResponseBody
    public Boolean editBrigade(@PathVariable("coordinate") String coordinate, @PathVariable("brigadeId") Long brigadeId) {
        return flightService.editBrigade(coordinate, brigadeId);
    }

    @PostMapping(value = "/edit/battalion/{isShow}")
    @ResponseBody
    public SettingFlagBattalion editBattalion(SettingFlagBattalion settingFlagBattalion, @PathVariable("isShow") Boolean isShow) {
        return flightService.editBattalion(settingFlagBattalion, isShow);
    }

    @GetMapping(value = "/delete/flag/battalion/{id}")
    @ResponseBody
    public Boolean deleteBattalion(@PathVariable("id") Long battalionId) {
        return flightService.deleteBattalionById(battalionId);
    }

    @GetMapping(value = "/delete/brigade/{id}")
    @ResponseBody
    public Boolean deleteBrigade(@PathVariable("id") Long brigadeId) {
        return flightService.deleteBrigadeById(brigadeId);
    }

    @GetMapping(value = "/check/battalion/{flightId}")
    @ResponseBody
    public Boolean checkExistBattalion(@PathVariable("flightId") Long flightId) {
        return flightService.checkExistBattalion(flightId);
    }

    @GetMapping(value = "/check/brigade/{id}")
    @ResponseBody
    public Boolean checkExistBrigade(@PathVariable("id") Long flightId) {
        return flightService.checkExistBrigade(flightId);
    }

    @GetMapping(value = "/config/maps/{mapsId}/{flightId}")
    @ResponseBody
    public Boolean configMap(@PathVariable("mapsId") Long mapId, @PathVariable("flightId") Long flightId) {
        return flightService.saveMaps(mapId, flightId);
    }
}
