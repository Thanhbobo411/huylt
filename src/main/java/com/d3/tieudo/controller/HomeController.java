package com.d3.tieudo.controller;

import com.d3.tieudo.entity.InformationBrigade;
import com.d3.tieudo.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @Autowired
    private HomeService homeService;

    @GetMapping(value = "/get/content/home")
    public InformationBrigade getInformation(){
        return homeService.getData();
    }

    @PostMapping(value = "/save/content")
    public Boolean saveContent(@RequestParam("content") String content){
        return homeService.saveContent(content);
    }

    @PostMapping(value = "/save/content/tactic")
    public Boolean saveContentTactic(@RequestParam("content") String content){
        return homeService.saveContentTactic(content);
    }

    @PostMapping(value = "/save/content/interShip")
    public Boolean saveContentInterShip(@RequestParam("content") String content){
        return homeService.saveContentInterShip(content);
    }
}
