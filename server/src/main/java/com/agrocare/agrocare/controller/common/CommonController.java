package com.agrocare.agrocare.controller.common;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.service.common.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import java.security.Principal;
import java.util.List;

@RestController
public class CommonController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CommonService commonService;

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            System.out.println("User :::::- > " + user);
            // Check for duplicate email
            if (commonService.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>(Constants.Messages.DUPLICATE_EMAIL_MESSAGE, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(commonService.registerUser(user), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.INTERNAL_SERVER_ERROR_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUser", produces = "application/json")
    public ResponseEntity<List<Users>> getUser() {
        try {
            List<Users> userList = commonService.getAllUsers();
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception err) {
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/check-login-user")
    public ResponseEntity<String> getLoginUser(Principal principal) {
        return new ResponseEntity<>(principal.getName(), HttpStatus.OK);
    }

}