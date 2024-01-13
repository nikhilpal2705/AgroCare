package com.agrocare.agrocare.controller.admin;

import com.agrocare.agrocare.service.admin.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/admin")
public class AdminController extends AdminService {

    @GetMapping(value = "/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello Admin");
    }

    @GetMapping(value = "/dashboard")
    public ResponseEntity<String> dashboard() {
        return ResponseEntity.ok("Hello Admin Dashboard");
    }

}
