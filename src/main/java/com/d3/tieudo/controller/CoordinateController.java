package com.d3.tieudo.controller;

import com.d3.tieudo.entity.BattalionDistance;
import com.d3.tieudo.entity.CannonDistance;
import com.d3.tieudo.entity.FlightProcess;
import com.d3.tieudo.entity.SettingFlagBattalion;
import com.d3.tieudo.model.TacticModel;
import com.d3.tieudo.model.request.CannonRequest;
import com.d3.tieudo.model.request.CoordinateRequest;
import com.d3.tieudo.model.responsive.CoordinateResponsive;
import com.d3.tieudo.model.responsive.LandmarkCoordinateResponsive;
import com.d3.tieudo.service.CannonDistanceService;
import com.d3.tieudo.service.LandmarkCoordinateService;
import com.d3.tieudo.service.PlantProcessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CoordinateController {
	@Autowired
	private PlantProcessService plantProcessService;

	@Autowired
	private LandmarkCoordinateService landmarkCoordinateService;

	@Autowired
	private CannonDistanceService cannonDistanceService;

	@PostMapping(value = "/save/coordinate")
	@ResponseBody
	public CoordinateResponsive saveCoordinate(CoordinateRequest request) {
		return plantProcessService.createCoordinate(request);
	}

	@GetMapping(value = "/create/process")
	@ResponseBody
	public FlightProcess createPlantProcess(@RequestParam("plantName") String plantName, @RequestParam("type") Integer type){
		return plantProcessService.createPlantProcess(plantName, type);
	}

	@GetMapping(value = "/config/coordinate")
	@ResponseBody
	public LandmarkCoordinateResponsive getCoordinate(){
		return landmarkCoordinateService.getLandMarkCoordinate();
	}

	@GetMapping(value = "/config/coordinate/{type}")
	@ResponseBody
	public LandmarkCoordinateResponsive getCoordinate(@PathVariable("type") Integer type){
		return landmarkCoordinateService.getLandMarkCoordinateByType(type);
	}

	@PostMapping(value = "/change/coordinate")
	@ResponseBody
	public Boolean changeCoordinate(@RequestParam("id") Long id, @RequestParam("value") String value, @RequestParam("type") Integer type){
		return landmarkCoordinateService.changeCoordinate(id, value, type);
	}

	@PostMapping(value = "/end/process/{id}")
	@ResponseBody
	public Boolean endProcessFlight(@PathVariable("id") Long Id){
		plantProcessService.endProcess(Id);
		return true;
	}

	@PostMapping(value = "/save/tactic")
	public Boolean saveTactic(@RequestBody List<TacticModel> request){
		plantProcessService.saveDataTactic(request);
		return true;
	}

	@PostMapping(value = "/save/interShip")
	public Boolean saveInterShip(@RequestBody List<TacticModel> request){
		plantProcessService.saveDataInterShip(request);
		return true;
	}

	@PostMapping(value = "/coordinate/battalion/{isShow}")
	@ResponseBody
	public CoordinateResponsive calculateBattalion(SettingFlagBattalion settingFlagBattalion, @PathVariable("isShow") Boolean isShow){
		return plantProcessService.calculateBattalion(settingFlagBattalion, isShow);
	}

	@GetMapping(value = "/cannon/distance")
	@ResponseBody
	public List<CannonDistance> getCannon(){
		return cannonDistanceService.getAllCannonDistance();
	}

	@PostMapping(value = "/create/cannon")
	@ResponseBody
	public Boolean saveCannon(CannonRequest request) {
		cannonDistanceService.saveCannon(request);
		return true;
	}

	@GetMapping(value = "/cannon/{id}")
	public CannonDistance getCannonById(@PathVariable("id") Long id){
		return cannonDistanceService.getCannonDistanceById(id);
	}

	@PostMapping(value = "/edit/cannon")
	@ResponseBody
	public Boolean editCannon(CannonRequest request) {
		return cannonDistanceService.editCannon(request);
	}

	@GetMapping(value = "/cannon/delete/{id}")
	public Boolean deleteCannonById(@PathVariable("id") Long id){
		cannonDistanceService.deleteCannon(id);
		return true;
	}

	@PostMapping(value = "/cannon/{value}/{flightId}/{id}/{name}")
	public CoordinateResponsive getCannon(@PathVariable("value") String toaDo, @PathVariable("flightId") Long flightId, @PathVariable("id") Long id, @PathVariable("name") String name){
		return plantProcessService.getCannon(toaDo, flightId, id, name);
	}

	@GetMapping(value = "/battalion/distance")
	public List<BattalionDistance> getAllBattalionDistance(){
		return cannonDistanceService.getAllBattalionDistance();
	}

	@GetMapping(value = "/show/distance/{id}")
	public BattalionDistance getBattalionDistanceById(@PathVariable("id") Long id){
		return cannonDistanceService.getBattalionDistanceById(id);
	}

	@PostMapping(value = "/change/distance/{id}")
	public Boolean changeBattalionDistanceById(@PathVariable("id") Long id, String distance){
		return cannonDistanceService.changeBattalionDistanceById(id, Float.parseFloat(distance));
	}
}
