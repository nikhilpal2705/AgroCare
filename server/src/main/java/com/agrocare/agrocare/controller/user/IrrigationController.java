package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.pojo.IrrigationRequest;
import com.agrocare.agrocare.service.user.IrrigationService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class IrrigationController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private IrrigationService irrigationService;

    // Get irrigation data list . . .
    @GetMapping(value = "/irrigation")
    public ResponseEntity<CustomResponse> getIrrigationList(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(irrigationService.getIrrigationList(request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_IRRIGATION),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Get a irrigation . . .
    @GetMapping(value = "/irrigation/{irrigationId}")
    public ResponseEntity<CustomResponse> getIrrigation(@PathVariable("irrigationId") int irrigationId, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(irrigationService.getIrrigation(irrigationId, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_IRRIGATION),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Add a irrigation data . . .
    @PostMapping(value = "/irrigation")
    public ResponseEntity<CustomResponse> createIrrigation(@RequestBody IrrigationRequest irrigationRequest, HttpServletRequest request) {
        try {
            System.out.println("irrigationRequest: " + irrigationRequest);
            return new ResponseEntity<>(irrigationService.saveIrrigation(irrigationRequest, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_ADDING_IRRIGATION),
                    HttpStatus.BAD_REQUEST);
        }
    }


    // Update a irrigation . . .
    @PutMapping(value = "/irrigation/{irrigationId}")
    public ResponseEntity<CustomResponse> updateIrrigation(@PathVariable("irrigationId") int irrigationId, @RequestBody IrrigationRequest irrigationRequest,
                                                          HttpServletRequest request) {
        try {
            return new ResponseEntity<>(irrigationService.updateIrrigation(irrigationId, irrigationRequest, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_UPDATING_IRRIGATION_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a irrigation . . .
    @DeleteMapping(value = "/irrigation/{irrigationId}")
    public ResponseEntity<CustomResponse> deleteIrrigation(@PathVariable("irrigationId") int irrigationId, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(irrigationService.deleteIrrigation(irrigationId, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_DELETING_IRRIGATION_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
