package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.configuration.jwt.JwtHelper;
import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/login-user")
    public ResponseEntity<CustomResponse> getLoginUser(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            return new ResponseEntity<>(userService.getUserByEmailAddress(this.jwtHelper.getUsernameFromToken(token)), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/login-user-email")
    public ResponseEntity<CustomResponse> getLoginUserEmail(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            return new ResponseEntity<>(new CustomResponse(true, (Object) this.jwtHelper.getUsernameFromToken(token)), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/login-user-expiration-date-time")
    public ResponseEntity<CustomResponse> getLoginUserExpirationDateTime(HttpServletRequest request) {
        try {
            String token = request.getHeader("Authorization").substring(7);
            Date expirationDateFromToken = this.jwtHelper.getExpirationDateFromToken(token);

            return new ResponseEntity<>(new CustomResponse(true,
                    Map.of("Date", expirationDateFromToken,
                            "localDate", expirationDateFromToken.toLocaleString(),
                            "dateString", expirationDateFromToken.toString(),
                            "dateISO", expirationDateFromToken.toInstant())), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
