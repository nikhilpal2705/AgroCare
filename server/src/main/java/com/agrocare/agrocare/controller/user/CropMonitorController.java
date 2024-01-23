package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CropMonitorRequest;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class CropMonitorController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CropMonitorService cropMonitorService;

    @Autowired
    private CropService cropService;

    // Add a crop . . .
    @PostMapping(value = "/crop-monitor")
    public ResponseEntity<CustomResponse> createCrop(@RequestBody CropMonitorRequest cropMonitorRequest, HttpServletRequest request) {
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

}
