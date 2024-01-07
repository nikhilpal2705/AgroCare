package com.agrocare.agrocare.controller.User;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.service.user.CropService;
import com.agrocare.agrocare.service.user.UserService;
import com.agrocare.utils.CustomResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class CropController extends UserService {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CropService cropService;

    // Fetch all crops . . .
    @GetMapping(value = "/crop")
    public ResponseEntity<?> getCrops() {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(cropService.getCrops());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setResult(null);
            response.setMessage(Constants.Messages.CROP_FETCH_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    // Fetch a crop . . .
    @GetMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> getCrop(@PathVariable("cropId") int cropId) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(cropService.getCrop(cropId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setResult(null);
            response.setMessage(Constants.Messages.CROP_FETCH_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    // Add a crop . . .
    @PostMapping(value = "/crop")
    public ResponseEntity<?> createCrop(@RequestBody Crops crops) {
        CustomResponse response = new CustomResponse();
        try {
            Object savedCropData = cropService.saveCrop(crops);
            response.setSuccess(true);
            response.setResult(savedCropData);
            response.setMessage(Constants.Messages.CROP_ADDED_SUCCESS_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setResult(null);
            response.setMessage(Constants.Messages.CROP_ADDED_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a crop . . .
    @DeleteMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> deleteCrop(@PathVariable("cropId") int cropId) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(cropService.deleteCrop(cropId));
            response.setMessage(Constants.Messages.CROP_DELETED_SUCCESS_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setResult(null);
            response.setMessage(Constants.Messages.CROP_DELETED_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    // Update a crop . . .
    @PutMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> updateCrop(@PathVariable("cropId") int cropId, @RequestBody Crops crops) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(cropService.updateCrop(cropId, crops));
            response.setMessage(Constants.Messages.CROP_UPDATED_SUCCESS_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setResult(null);
            response.setMessage(Constants.Messages.CROP_UPDATING_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
