package com.agrocare.agrocare.controller.Admin;

import com.agrocare.agrocare.service.admin.AdminService;
import com.agrocare.agrocare.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
