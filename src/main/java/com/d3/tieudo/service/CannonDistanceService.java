package com.d3.tieudo.service;

import com.d3.tieudo.entity.BattalionDistance;
import com.d3.tieudo.entity.CannonDistance;
import com.d3.tieudo.model.request.CannonRequest;
import com.d3.tieudo.repository.BattalionDistanceRepository;
import com.d3.tieudo.repository.CannonDistanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CannonDistanceService {
    @Autowired
    private CannonDistanceRepository cannonDistanceRepository;

    @Autowired
    private BattalionDistanceRepository battalionDistanceRepository;

    public List<CannonDistance> getAllCannonDistance(){
        return cannonDistanceRepository.findAll();
    }

    public CannonDistance getCannonDistanceById(Long id){
        Optional<CannonDistance> optional = cannonDistanceRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public void saveCannon(CannonRequest request){
        CannonDistance cannonDistance = new CannonDistance();
        cannonDistance.setDistance(request.getDistance());
        cannonDistance.setName(request.getCannonName());

        cannonDistanceRepository.save(cannonDistance);
    }

    public Boolean editCannon(CannonRequest request){
        Optional<CannonDistance> cannonDistanceOptional = cannonDistanceRepository.findById(request.getId());
        if (cannonDistanceOptional.isPresent()){
            CannonDistance cannonDistance = cannonDistanceOptional.get();
            cannonDistance.setDistance(request.getDistance());
            cannonDistance.setName(request.getCannonName());
            cannonDistanceRepository.save(cannonDistance);

            return true;
        }

        return false;
    }

    public void deleteCannon(Long id){
        cannonDistanceRepository.deleteById(id);
    }

    public List<BattalionDistance> getAllBattalionDistance(){
        return battalionDistanceRepository.findAll();
    }

    public BattalionDistance getBattalionDistanceById(Long id){
        Optional<BattalionDistance> optional = battalionDistanceRepository.findById(id);
        return optional.isPresent() ? optional.get() : null;
    }

    public Boolean changeBattalionDistanceById(Long id, Float distance){
        Optional<BattalionDistance> optional = battalionDistanceRepository.findById(id);
        if (optional.isPresent()){
            BattalionDistance battalionDistance = optional.get();
            battalionDistance.setDistance(distance);
            battalionDistanceRepository.save(battalionDistance);
            return true;
        }

        return false;
    }
}
