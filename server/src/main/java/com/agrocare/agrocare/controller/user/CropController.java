package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomRequest;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.service.user.CropService;
import com.agrocare.agrocare.service.user.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class CropController extends UserService {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CropService cropService;

    // Fetch all crops . . .
    @GetMapping(value = "/crop")
    public ResponseEntity<?> getCrops(@RequestBody CustomRequest customRequest) {
        try {
            System.out.println("customRequest : " + customRequest.getData());
            // Assuming data is a Map<String, Object>
//            Map<String, Object> requestData = (Map<String, Object>) customRequest.getData();
//
//            // Extract individual fields
//            String first = (String) requestData.get("first");
//            System.out.println("first : " + first);
//            String second = (String) requestData.get("second");
//            System.out.println("second : " + second);
//            String other = (String) requestData.get("Other");
//            System.out.println("other : " + other);

            return new ResponseEntity<>(cropService.getCrops(), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_FETCH_ERROR_MESSAGE), HttpStatus.BAD_REQUEST);
        }
    }

    // Fetch a crop . . .
    @GetMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> getCrop(@PathVariable("cropId") int cropId) {
        try {
            return new ResponseEntity<>(cropService.getCrop(cropId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_FETCH_ERROR_MESSAGE), HttpStatus.BAD_REQUEST);
        }
    }

    // Add a crop . . .
    @PostMapping(value = "/crop")
    public ResponseEntity<?> createCrop(@RequestBody Crops crops) {
        try {
            return new ResponseEntity<>(cropService.saveCrop(crops), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_ADDED_ERROR_MESSAGE), HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a crop . . .
    @DeleteMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> deleteCrop(@PathVariable("cropId") int cropId) {
        try {
            return new ResponseEntity<>(cropService.deleteCrop(cropId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_DELETED_ERROR_MESSAGE), HttpStatus.BAD_REQUEST);
        }
    }

    // Update a crop . . .
    @PutMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> updateCrop(@PathVariable("cropId") int cropId, @RequestBody Crops crops) {
        try {
            return new ResponseEntity<>(cropService.updateCrop(cropId, crops), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_UPDATING_ERROR_MESSAGE), HttpStatus.BAD_REQUEST);
        }
    }
}
