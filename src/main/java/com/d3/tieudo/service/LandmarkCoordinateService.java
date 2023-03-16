package com.d3.tieudo.service;

import com.d3.tieudo.entity.LandmarkCoordinate;
import com.d3.tieudo.model.LandmarkCoordinateModel;
import com.d3.tieudo.model.responsive.LandmarkCoordinateResponsive;
import com.d3.tieudo.repository.LandmarkCoordinateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class LandmarkCoordinateService {
    @Autowired
    private LandmarkCoordinateRepository landmarkCoordinateRepository;

    /**
     * @return
     */
    public LandmarkCoordinateResponsive getLandMarkCoordinate(){
        List<LandmarkCoordinate> list = landmarkCoordinateRepository.findAll();

        Map<Integer, List<LandmarkCoordinate>> result = list.stream().collect(Collectors.groupingBy(LandmarkCoordinate::getNumberRow));

        LandmarkCoordinateResponsive responsive = new LandmarkCoordinateResponsive();
        List<LandmarkCoordinateModel> tmp = new ArrayList<>();
        result.forEach((key, value) -> {
            LandmarkCoordinateModel model = new LandmarkCoordinateModel();
            model.setList(value);
            tmp.add(model);
        });
        Integer size = list.stream()
                .filter(distinctByKey(c -> c.getValueIntership()))
                .collect(Collectors.toList()).size();

        responsive.setList(tmp);
        return responsive;
    }

    /**
     * @param type
     * @return
     */
    public LandmarkCoordinateResponsive getLandMarkCoordinateByType(Integer type){
        List<LandmarkCoordinate> list = landmarkCoordinateRepository.findAll();
        List<LandmarkCoordinate> coordinateList = new ArrayList<>();
        if (!list.isEmpty()){
            if (type == 1){
                coordinateList = list.stream().filter(co -> !co.getValueTactic().equals("")).collect(Collectors.toList());
            } else {
                coordinateList = list.stream().filter(co -> !co.getValueIntership().equals("")).collect(Collectors.toList());
            }
        }

        Map<Integer, List<LandmarkCoordinate>> result = list.stream().collect(Collectors.groupingBy(LandmarkCoordinate::getNumberRow));

        LandmarkCoordinateResponsive responsive = new LandmarkCoordinateResponsive();
        List<LandmarkCoordinateModel> tmp = new ArrayList<>();
        result.forEach((key, value) -> {
            LandmarkCoordinateModel model = new LandmarkCoordinateModel();
            model.setList(value);
            tmp.add(model);
        });
        if (type == 1){
            Integer size = coordinateList.stream()
                    .filter(distinctByKey(c -> c.getValueTactic()))
                    .collect(Collectors.toList()).size();

            if (size != coordinateList.size()){
                responsive.setStatus(false);
            } else {
                responsive.setStatus(true);
            }
        } else if (type == 2){
            Integer size = coordinateList.stream()
                    .filter(distinctByKey(c -> c.getValueIntership()))
                    .collect(Collectors.toList()).size();

            if (size != coordinateList.size()){
                responsive.setStatus(false);
            } else {
                responsive.setStatus(true);
            }
        }

        responsive.setList(tmp);
        return responsive;
    }

    /**
     * @param id
     * @param value
     * @param type
     * @return
     */
    public Boolean changeCoordinate(Long id, String value, Integer type){
        Optional<LandmarkCoordinate> optional = landmarkCoordinateRepository.findById(id);
        if (optional.isPresent()){
            LandmarkCoordinate coordinate = optional.get();
            if (type == 1){
                Optional<LandmarkCoordinate> optional1 = landmarkCoordinateRepository.findByValueTactic(value);
                if (optional1.isPresent()){
                    return false;
                }
                coordinate.setValueTactic(value);
            } else {
                Optional<LandmarkCoordinate> optional2 = landmarkCoordinateRepository.findByValueIntership(value);
                if (optional2.isPresent()){
                    return false;
                }
                coordinate.setValueIntership(value);
            }
            landmarkCoordinateRepository.save(coordinate);
            return true;
        }
        return false;
    }

    /**
     * @param keyExtractor
     * @param <T>
     * @return
     */
    public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor)
    {
        Map<Object, Boolean> map = new ConcurrentHashMap<>();
        return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }
}
