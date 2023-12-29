package com.agrocare.agrocare.controller.User;

import com.agrocare.agrocare.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController extends UserService {

    @GetMapping(value = "/")
    public ResponseEntity<String> index() {
        try {
            return ResponseEntity.ok("Hello User");
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.printStackTrace();
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping(value = "/dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Hello User Dashboard");
    }
}
