package com.agrocare.agrocare.controller.common;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.helper.CustomResponse;
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

@RestController
public class CommonController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CommonService commonService;

    @PostMapping(value = "/register")
    public ResponseEntity<CustomResponse> registerUser(@RequestBody Users user) {
        CustomResponse response = new CustomResponse();
        try {
            if (commonService.existsByEmail(user.getEmail())) {
                response.setSuccess(false);
                response.setResult(null);
                response.setMessage(Constants.Messages.DUPLICATE_EMAIL_MESSAGE);
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.setSuccess(true);
            response.setResult(commonService.registerUser(user));
            response.setMessage(Constants.Messages.REGISTRATION_SUCCESS_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setResult(null);
            response.setMessage(Constants.Messages.INTERNAL_SERVER_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUser", produces = "application/json")
    public ResponseEntity<CustomResponse> getUser() {
        CustomResponse response = new CustomResponse();
        try {
            response.setSuccess(true);
            response.setResult(commonService.getAllUsers());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            response.setSuccess(false);
            response.setMessage(Constants.Messages.INTERNAL_SERVER_ERROR_MESSAGE);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/check-login-user")
    public ResponseEntity<CustomResponse> getLoginUser(Principal principal) {
        CustomResponse response = new CustomResponse();
        response.setSuccess(true);
        response.setResult(principal.getName());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
