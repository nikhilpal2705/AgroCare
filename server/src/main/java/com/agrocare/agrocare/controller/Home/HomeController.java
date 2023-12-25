package com.agrocare.agrocare.controller.Home;

import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import com.agrocare.agrocare.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;

@RestController
public class HomeController extends HomeService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepo;

    @GetMapping(value = "/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello World");
    }

    @GetMapping(value = "/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Hello Test");
    }

    @PostMapping(value = "/registerUser")
    public ResponseEntity<Users> registerUser(@RequestBody Users user) {
        try {
            user.setUpdatedAt(Instant.now().toString());
            System.out.println("Encoded Password : "+passwordEncoder.encode(user.getPassword()));
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            System.out.println("Registering user : " + user);
            Users savedUser = userRepo.save(user);
            return new ResponseEntity<Users>(savedUser, HttpStatus.OK);
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.fillInStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUser", produces = "application/json")
    public ResponseEntity<?> getUser() {
        try {
            List<Users> userList = userRepo.findAll();
            System.out.println("User list from repository: " + userList);
            return new ResponseEntity<List<Users>>(userList, HttpStatus.OK);
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
