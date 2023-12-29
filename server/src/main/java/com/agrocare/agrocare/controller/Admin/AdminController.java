package com.agrocare.agrocare.controller.Admin;

import com.agrocare.agrocare.helper.Messages;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.service.AdminService;
import com.agrocare.agrocare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/admin")
public class AdminController extends AdminService {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello Admin");
    }

    @GetMapping(value = "/dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Hello Admin Dashboard");
    }

    @GetMapping(value = "/fetch-users")
    public ResponseEntity<List<Users>> fetchUserList() {
        try {
            return new ResponseEntity<>(this.userService.fetchUser(), HttpStatus.OK);
        } catch (Exception err) {
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
