package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Farm;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.service.user.FarmService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class FarmController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private FarmService farmService;

    // Fetch all farms
    @GetMapping(value = "/farm")
    public ResponseEntity<CustomResponse> getFarms(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(farmService.getFarms(request), HttpStatus.OK);
        } catch (UsernameNotFoundException err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(err.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.FARM_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Fetch a specific farm
    @GetMapping(value = "/farm/{farmId}")
    public ResponseEntity<CustomResponse> getFarm(@PathVariable("farmId") int farmId) {
        try {
            return new ResponseEntity<>(farmService.getFarm(farmId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.FARM_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Create a new farm
    @PostMapping(value = "/farm")
    public ResponseEntity<CustomResponse> createFarm(@RequestBody Farm farm, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(farmService.saveFarm(farm, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.FARM_ADDED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Update a farm
    @PutMapping(value = "/farm/{farmId}")
    public ResponseEntity<CustomResponse> updateFarm(@PathVariable("farmId") int farmId, @RequestBody Farm farm,
            HttpServletRequest request) {
        try {
            return new ResponseEntity<>(farmService.updateFarm(farmId, farm, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.FARM_UPDATING_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a farm
    @DeleteMapping(value = "/farm/{farmId}")
    public ResponseEntity<CustomResponse> deleteFarm(@PathVariable("farmId") int farmId) {
        try {
            return new ResponseEntity<>(farmService.deleteFarm(farmId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.FARM_DELETED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
