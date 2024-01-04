package com.agrocare.agrocare.controller.User;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
public class CropController extends UserService {

    @PostMapping(value = "/crop")
    public ResponseEntity<?> createCrop(@RequestBody Crops crops) {
        try {
            System.out.println("Crop : " + crops);
            return new ResponseEntity<>(crops, HttpStatus.OK);
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.printStackTrace();
            return ResponseEntity.badRequest().body("Error");
        }
    }


    @GetMapping(value = "/crop")
    public ResponseEntity<?> getCrop() {
        try {
            return new ResponseEntity<>("Hello", HttpStatus.OK);
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.printStackTrace();
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
