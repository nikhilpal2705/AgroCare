package com.agrocare.agrocare.controller.User;

import com.agrocare.agrocare.helper.Constants;
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

@RestController
@RequestMapping(value = "/user")
public class CropController extends UserService {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CropService cropService;

    //Fetch all crops . . .
    @GetMapping(value = "/crop")
    public ResponseEntity<?> getCrops() {
        try {
            return new ResponseEntity<>(cropService.getCrops(), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.CROP_FETCH_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Fetch a crop . . .
    @GetMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> getCrop(@PathVariable("cropId") int cropId) {
        try {
            return new ResponseEntity<>(cropService.getCrop(cropId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.CROP_FETCH_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Add a crop . . .
    @PostMapping(value = "/crop")
    public ResponseEntity<?> createCrop(@RequestBody Crops crops) {
        try {
            return new ResponseEntity<>(cropService.saveCrop(crops), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.CROP_ADDED_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Delete a crop . . .
    @DeleteMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> createCrop(@PathVariable("cropId") int cropId) {
        try {
            return new ResponseEntity<>(cropService.deleteCrop(cropId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.CROP_DELETED_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Update a crop . . .
    @PutMapping(value = "/crop/{cropId}")
    public ResponseEntity<?> updateCrop(@PathVariable("cropId") int cropId, @RequestBody Crops crops) {
        try {
            return new ResponseEntity<>(cropService.updateCrop(cropId, crops), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.CROP_ADDED_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

}
