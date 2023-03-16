package com.d3.tieudo.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.d3.tieudo.entity.FlightProcess;
import com.d3.tieudo.model.responsive.DataFileResponsive;
import com.d3.tieudo.repository.FlightProcessRepository;
import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.d3.tieudo.entity.Coordinate;
import com.d3.tieudo.entity.ImageMaps;
import com.d3.tieudo.entity.LandmarkCoordinate;
import com.d3.tieudo.repository.CoordinateRepository;
import com.d3.tieudo.repository.ImageMapsRepository;
import com.d3.tieudo.repository.LandmarkCoordinateRepository;

@Service
public class ImportDataService {
    @Autowired
    private CoordinateRepository coordinateRepository;

    @Autowired
    private PlantProcessService plantProcessService;

    @Autowired
    private LandmarkCoordinateRepository landmarkCoordinateRepository;

    @Autowired
    private ImageMapsRepository imageMapsRepository;

    @Autowired
    private FlightProcessRepository flightProcessRepository;

    public DataFileResponsive convertExcelToObject(MultipartFile file, Long flightId) throws Exception {
        DataFormatter formatter = new DataFormatter();
        List<Coordinate> list = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Integer status = validTitleFileExcel(sheet, formatter);
        DataFileResponsive responsive = new DataFileResponsive();
        if (status != 0) {
            responsive.setStatusImport(status);
        } else {
            String time = "";
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                Coordinate coordinate = new Coordinate();
                coordinate.setFlightId(flightId);
                Row row = sheet.getRow(i);
                if (!isRowEmpty(row)) {
                    String[] arr = formatter.formatCellValue(row.getCell(0)).split(" ");
                    if (arr.length == 2 && arr[0].equals("XH")) {
                        coordinate.setStatusFirst(true);
                        coordinate.setCoordinateCode(arr[1]);
                    } else {
                        coordinate.setStatusFirst(false);
                        coordinate.setCoordinateCode(formatter.formatCellValue(row.getCell(0)));
                    }
                    coordinate.setCoordinate(formatter.formatCellValue(row.getCell(1)).equals("") ? "" : formatter.formatCellValue(row.getCell(1)));
                    coordinate.setNumber(formatter.formatCellValue(row.getCell(2)).equals("") ? null : Integer.parseInt(formatter.formatCellValue(row.getCell(2))));
                    coordinate.setType(formatter.formatCellValue(row.getCell(3)));
                    coordinate.setHeight(formatter.formatCellValue(row.getCell(4)));

                    if (formatter.formatCellValue(row.getCell(5)).equals("")) {
                        coordinate.setSttTime(2);
                    } else {
                        time = formatter.formatCellValue(row.getCell(5));
                        coordinate.setSttTime(1);
                    }
                    coordinate.setTime(time);

                    // Tinh X, Y
                    String toaDo = formatter.formatCellValue(row.getCell(1));
                    if (checkCoordinate(toaDo)) {
                        LandmarkCoordinate landmarkCoordinate = landmarkCoordinateRepository.findByValueIntership(toaDo.substring(0, 2)).get();
                        coordinate.setCoordinateX(plantProcessService.tinhX(toaDo, landmarkCoordinate.getLocal()));
                        coordinate.setCoordinateY(plantProcessService.tinhY(toaDo, landmarkCoordinate.getNumberRow()));
                        list.add(coordinate);
                    }
                    responsive.setStatusImport(status);
                }
            }
            coordinateRepository.saveAll(list);
            responsive.setList(list);
        }
        return responsive;
    }

    public Boolean checkCoordinate(String coordinate) {
        List<LandmarkCoordinate> list = landmarkCoordinateRepository.findAll();
        String[] arr = coordinate.split("");
        if (coordinate.equals("")) {
            return false;
        }
        if (coordinate.length() != 5) {
            return false;
        } else {
            if (Integer.parseInt(arr[2]) > 5 || Integer.parseInt(arr[3]) > 5 || Integer.parseInt(arr[4]) > 5) {
                return false;
            } else {
                Boolean checkExist = list.stream().filter(c -> c.getValueIntership().equals(arr[0] + arr[1])).findFirst().isPresent();
                return checkExist;
            }
        }
    }

    /**
     * return 1: if row is empty
     * return 2: if row number is different 6
     * return 3: if title is different template
     */
    public Integer validTitleFileExcel(Sheet sheet, DataFormatter formatter) {
        Row row = sheet.getRow(0);
        if (isRowEmpty(row)) {
            return 1;
        } else {
            if (row.getPhysicalNumberOfCells() != 6) {
                return 2;
            } else {
                String title1 = formatter.formatCellValue(row.getCell(0));
                String title2 = formatter.formatCellValue(row.getCell(1));
                String title3 = formatter.formatCellValue(row.getCell(2));
                String title4 = formatter.formatCellValue(row.getCell(3));
                String title5 = formatter.formatCellValue(row.getCell(4));
                String title6 = formatter.formatCellValue(row.getCell(5));
                if (!title1.equals("Tốp số") || !title2.equals("Tọa độ") || !title3.equals("Số lượng") || !title4.equals("Kiểu loại") || !title5.equals("Cao độ") || !title6.equals("Thời gian")) {
                    return 3;
                }
            }
        }
        return 0;
    }

    public boolean isRowEmpty(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK)
                return false;
        }
        return true;
    }

    public void saveImage(String url, String nameImage) {
        Integer stt = 0;
        List<ImageMaps> imageMaps = imageMapsRepository.findAll();
        ImageMaps maps = new ImageMaps();
        if (imageMaps.isEmpty()) {
            stt = 1;
        } else {
            ImageMaps im = imageMaps.get(imageMaps.size() - 1);
            stt = im.getStt() + 1;
        }
        maps.setName(nameImage);
        maps.setStt(stt);
        maps.setUrl(url);

        imageMapsRepository.save(maps);
    }

    public String getNameImage() {
        String nameImage = "picture";
        Integer stt = 0;
        String name;
        List<ImageMaps> imageMaps = imageMapsRepository.findAll();
        if (imageMaps.isEmpty()) {
            name = nameImage + 1;
        } else {
            ImageMaps im = imageMaps.get(imageMaps.size() - 1);
            stt = im.getStt() + 1;
            name = nameImage + stt;
        }
        return name;

    }

    public List<ImageMaps> getAllImage() {
        List<ImageMaps> imageMaps = imageMapsRepository.findAll();
        return imageMaps;
    }

    public Boolean deleteImage(Long id) throws IOException {
        ImageMaps imageMaps = imageMapsRepository.getOne(id);
        List<FlightProcess> flightProcesses = flightProcessRepository.findByMapsId(id);
        flightProcesses.forEach(fl -> fl.setMapsId(null));
        flightProcessRepository.saveAll(flightProcesses);
        imageMapsRepository.deleteById(id);
        File file = new File("D:\\maps\\" + imageMaps.getName());

        if (file.delete()) {
            return true;
        } else {
            return false;
        }
    }

    public ImageMaps getImageById(Long id) {
        Optional<ImageMaps> imageMaps = imageMapsRepository.findById(id);
        if (imageMaps.isPresent()) {
            return imageMaps.get();
        }
        return null;
    }
}
