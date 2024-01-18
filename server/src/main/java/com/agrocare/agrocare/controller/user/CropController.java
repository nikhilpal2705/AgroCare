package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.service.common.CommonService;
import com.agrocare.agrocare.service.user.CropService;
import com.agrocare.agrocare.service.user.UserService;

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
public class CropController extends UserService {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CropService cropService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommonService commonService;

    // Fetch all crops . . .
    @GetMapping(value = "/crop")
    public ResponseEntity<CustomResponse> getCrops(HttpServletRequest request) {
        try {
            Users userFromHeader = commonService.getUserFromHeader(request);
            userService.checkUserByUserId(userFromHeader.getId());
            return new ResponseEntity<>(cropService.getCrops(userFromHeader.getId()), HttpStatus.OK);
        } catch (UsernameNotFoundException err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(err.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Fetch a crop . . .
    @GetMapping(value = "/crop/{cropId}")
    public ResponseEntity<CustomResponse> getCrop(@PathVariable("cropId") int cropId) {
        try {
            return new ResponseEntity<>(cropService.getCrop(cropId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Add a crop . . .
    @PostMapping(value = "/crop")
    public ResponseEntity<CustomResponse> createCrop(@RequestBody Crops crops, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(cropService.saveCrop(crops, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_ADDED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a crop . . .
    @DeleteMapping(value = "/crop/{cropId}")
    public ResponseEntity<CustomResponse> deleteCrop(@PathVariable("cropId") int cropId) {
        try {
            return new ResponseEntity<>(cropService.deleteCrop(cropId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_DELETED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Update a crop . . .
    @PutMapping(value = "/crop/{cropId}")
    public ResponseEntity<CustomResponse> updateCrop(@PathVariable("cropId") int cropId, @RequestBody Crops crops,
            HttpServletRequest request) {
        try {
            return new ResponseEntity<>(cropService.updateCrop(cropId, crops, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.CROP_UPDATING_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
