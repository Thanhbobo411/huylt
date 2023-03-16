package com.d3.tieudo.controller;

import com.d3.tieudo.entity.Coordinate;
import com.d3.tieudo.entity.ImageMaps;
import com.d3.tieudo.model.responsive.DataFileResponsive;
import com.d3.tieudo.service.ImportDataService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
public class ImportDataController {
    @Autowired
    private ImportDataService importDataService;

    @Autowired
    private ResourceLoader resourceLoader;

    @PostMapping("/import/data/{id}")
    public DataFileResponsive importFile(@RequestParam("file") MultipartFile file, @PathVariable("id") Long flightId) throws Exception {
        return importDataService.convertExcelToObject(file, flightId);
    }

    @PostMapping("/import/image")
    public String importImage(@RequestParam("fileInput") MultipartFile file) throws IOException {
        String imgUrl = "/maps/";
        String folderPath = "D:/maps/";
        if (!file.getOriginalFilename().isEmpty()) {

            String imgExtention = FilenameUtils.getExtension(file.getOriginalFilename());

            String imgName = importDataService.getNameImage() + "." + imgExtention;

            BufferedOutputStream outputStream = new BufferedOutputStream(
                    new FileOutputStream(
                            new File(folderPath, imgName)));
            outputStream.write(file.getBytes());
            outputStream.flush();
            outputStream.close();
            imgUrl = imgUrl + imgName;
            importDataService.saveImage(imgUrl, imgName);
        }
        return imgUrl;
    }

    @GetMapping("/images")
    public List<ImageMaps> getAllImageMaps() {
        return importDataService.getAllImage();
    }

    @GetMapping("/delete/image/{id}")
    public Boolean deleteImage(@PathVariable("id") Long id) throws IOException {
        return importDataService.deleteImage(id);
    }

    @GetMapping("/image/{id}")
    public ImageMaps getImageMaps(@PathVariable("id") Long id) {
        return importDataService.getImageById(id);
    }
}
