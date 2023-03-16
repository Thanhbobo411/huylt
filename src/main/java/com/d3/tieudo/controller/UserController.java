package com.d3.tieudo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class UserController {
    @GetMapping({ "/", "/login" })
    public String showLogin() {
        return "login";
    }

    @GetMapping("/api/tactic")
    public String showTactic(){
        return "flightTactic";
    }

    @GetMapping("/api/config")
    public String showBid(){
        return "config";
    }

    @GetMapping("/api/interShip")
    public String showFlights(){
        return "flights";
    }

    @GetMapping("/api/interShip/{id}")
    public String showFlightsDetail(@PathVariable("id") Long flightId){
        return "flights/detail";
    }

    @GetMapping("/api/interShip/edit/{id}")
    public String editFlightsDetail(@PathVariable("id") Long flightId){
        return "flights/edit";
    }

    @GetMapping("/api/home")
    public String showHome(){
        return "home";
    }
}
