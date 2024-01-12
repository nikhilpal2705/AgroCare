package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.service.user.PestService;
import com.agrocare.agrocare.service.user.UserService;

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
    private UserService userService;

    // Fetch all pests . . .
    @GetMapping(value = "/pest")
    public ResponseEntity<?> getPests(@RequestParam(name = "userId") int userId) {
        try {
            if (userId == Constants.NullCheck.INT) {
                return new ResponseEntity<>(new CustomResponse(Constants.Messages.INVALID_USER_ID),
                        HttpStatus.BAD_REQUEST);
            }

            userService.checkUserByUserId(userId);

            return new ResponseEntity<>(pestService.getPests(userId), HttpStatus.OK);
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
    public ResponseEntity<?> getPest(@PathVariable("pestId") int pestId) {
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
    public ResponseEntity<?> createPest(@RequestBody Pests pests) {
        try {
            return new ResponseEntity<>(pestService.savePest(pests), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_ADDED_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a pest . . .
    @DeleteMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> deletePest(@PathVariable("pestId") int pestId) {
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
    public ResponseEntity<?> updatePest(@PathVariable("pestId") int pestId, @RequestBody Pests pest) {
        try {
            return new ResponseEntity<>(pestService.updatePest(pestId, pest), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.PEST_UPDATING_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
