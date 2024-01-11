package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.service.user.PestService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class PestController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private PestService pestService;

    //Fetch all pests . . .
    @GetMapping(value = "/pest")
    public ResponseEntity<?> getPests() {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(pestService.getPests());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setMessage(Constants.Messages.PEST_FETCH_ERROR);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    //Fetch a pest . . .
    @GetMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> getPest(@PathVariable("pestId") int pestId) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(pestService.getPest(pestId));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setMessage(Constants.Messages.PEST_FETCH_ERROR);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    //Add a pest . . .
    @PostMapping(value = "/pest")
    public ResponseEntity<?> createPest(@RequestBody Pests pests) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(pestService.savePest(pests));
            response.setMessage(Constants.Messages.PEST_ADDED_SUCCESS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setMessage(Constants.Messages.PEST_ADDED_ERROR);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    //Delete a pest . . .
    @DeleteMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> deletePest(@PathVariable("pestId") int pestId) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(pestService.deletePest(pestId));
            response.setMessage(Constants.Messages.PEST_DELETED_SUCCESS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setMessage(Constants.Messages.PEST_DELETED_ERROR);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    //Update a pest . . .
    @PutMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> updatePest(@PathVariable("pestId") int pestId, @RequestBody Pests pest) {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(pestService.updatePest(pestId, pest));
            response.setMessage(Constants.Messages.PEST_UPDATED_SUCCESS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setMessage(Constants.Messages.PEST_UPDATING_ERROR);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
