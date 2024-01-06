package com.agrocare.agrocare.controller.User;

import com.agrocare.agrocare.helper.Constants;
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
        try {
            return new ResponseEntity<>(pestService.getPests(), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.PEST_FETCH_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Fetch a pest . . .
    @GetMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> getPest(@PathVariable("pestId") int pestId) {
        try {
            return new ResponseEntity<>(pestService.getPest(pestId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.PEST_FETCH_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Add a pest . . .
    @PostMapping(value = "/pest")
    public ResponseEntity<?> createPest(@RequestBody Pests pests) {
        try {
            System.out.println("pests : "+pests);
            return new ResponseEntity<>(pestService.savePest(pests), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.PEST_ADDED_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Delete a pest . . .
    @DeleteMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> deletePest(@PathVariable("pestId") int pestId) {
        try {
            return new ResponseEntity<>(pestService.deletePest(pestId), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.PEST_DELETED_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

    //Update a pest . . .
    @PutMapping(value = "/pest/{pestId}")
    public ResponseEntity<?> updatePest(@PathVariable("pestId") int pestId, @RequestBody Pests pest) {
        try {
            return new ResponseEntity<>(pestService.updatePest(pestId, pest), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.PEST_UPDATING_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
        }
    }

}
