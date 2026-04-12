package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.pojo.PestRequest;
import com.agrocare.agrocare.service.common.CommonService;
import com.agrocare.agrocare.service.user.PestService;

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
public class PestController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private PestService pestService;

    @Autowired
    private CommonService commonService;

    // Fetch all pests . . .
    @GetMapping(value = "/pest")
    public ResponseEntity<CustomResponse> getPests(HttpServletRequest request) {
        try {
            Users userFromHeader = commonService.getUserFromHeader(request);
            return new ResponseEntity<>(pestService.getPests(userFromHeader.getId()), HttpStatus.OK);
        } catch (UsernameNotFoundException err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(err.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());

            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Fetch a pest . . .
    @GetMapping(value = "/pest/{pestId}")
    public ResponseEntity<CustomResponse> getPest(@PathVariable("pestId") int pestId) {
        try {
            return new ResponseEntity<>(pestService.getPest(pestId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Add a pest . . .
    @PostMapping(value = "/pest")
    public ResponseEntity<CustomResponse> createPest(@RequestBody PestRequest pests, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(pestService.savePest(pests, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_ADDED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a pest . . .
    @DeleteMapping(value = "/pest/{pestId}")
    public ResponseEntity<CustomResponse> deletePest(@PathVariable("pestId") int pestId) {
        try {
            return new ResponseEntity<>(pestService.deletePest(pestId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_DELETED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Update a pest . . .
    @PutMapping(value = "/pest/{pestId}")
    public ResponseEntity<CustomResponse> updatePest(@PathVariable("pestId") int pestId, @RequestBody PestRequest pest,
            HttpServletRequest request) {
        try {
            return new ResponseEntity<>(pestService.updatePest(pestId, pest, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_UPDATING_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
