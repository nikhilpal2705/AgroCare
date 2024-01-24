package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.CropMonitor;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.pojo.CropMonitorRequest;
import com.agrocare.agrocare.pojo.CropMonitorResponse;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.service.user.CropMonitorService;
import com.agrocare.agrocare.service.user.CropService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class CropMonitorController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CropMonitorService cropMonitorService;

    @Autowired
    private CropService cropService;

    // Get crop-monitor data list . . .
    @GetMapping(value = "/crop-monitor")
    public ResponseEntity<CustomResponse> getCropMonitorList(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(cropMonitorService.getCropMonitorList(request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_CROP_MONITOR_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Get a crop-monitor . . .
    @GetMapping(value = "/crop-monitor/{cropMonitorId}")
    public ResponseEntity<CustomResponse> getCropMonitor(@PathVariable("cropMonitorId") int cropMonitorId, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(cropMonitorService.getCropMonitor(cropMonitorId, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_CROP_MONITOR_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Add a crop-monitor data . . .
    @PostMapping(value = "/crop-monitor")
    public ResponseEntity<CustomResponse> createCropMonitor(@RequestBody CropMonitorRequest cropMonitorRequest, HttpServletRequest request) {
        try {
            System.out.println("cropMonitorRequest: " + cropMonitorRequest);
            return new ResponseEntity<>(cropMonitorService.saveCropMonitor(cropMonitorRequest, request), HttpStatus.OK);
        } catch (DataIntegrityViolationException err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_MONITORING_ALREADY_EXISTS
                    + this.cropService.findCropById(cropMonitorRequest.getCropId()).getCropName()), HttpStatus.BAD_REQUEST);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_ADDING_CROP_MONITOR_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Update a crop-monitor . . .
    @PutMapping(value = "/crop-monitor/{cropMonitorId}")
    public ResponseEntity<CustomResponse> updateCropMonitor(@PathVariable("cropMonitorId") int cropMonitorId, @RequestBody CropMonitorRequest cropMonitorRequest,
                                                            HttpServletRequest request) {
        try {
            System.out.println("cropMonitorId: " + cropMonitorId);
            return new ResponseEntity<>(cropMonitorService.updateCropMonitor(cropMonitorRequest, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_UPDATING_CROP_MONITOR_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a crop-monitor . . .
    @DeleteMapping(value = "/crop-monitor/{cropMonitorId}")
    public ResponseEntity<CustomResponse> deleteCropMonitor(@PathVariable("cropMonitorId") int cropMonitorId, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(cropMonitorService.deleteCropMonitor(cropMonitorId, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_DELETING_CROP_MONITOR_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

}
