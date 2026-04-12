package com.agrocare.agrocare.controller.admin;

import com.agrocare.agrocare.pojo.CreateAdminRequest;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping(value = "/")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello Admin");
    }

    @GetMapping(value = "/dashboard")
    public ResponseEntity<CustomResponse> dashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping(value = "/users")
    public ResponseEntity<CustomResponse> users() {
        return ResponseEntity.ok(adminService.getUsers());
    }

    @GetMapping(value = "/admins")
    public ResponseEntity<CustomResponse> admins() {
        return ResponseEntity.ok(adminService.getAdmins());
    }

    /**
     * INTERNAL USE ONLY: Create a new admin user via Admin Dashboard
     * Only accessible by existing admins
     * Frontend: Called from AdminCreateUser component
     */
    @PostMapping(value = "/manage/admins")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CustomResponse> createAdminUser(@RequestBody CreateAdminRequest request) {
        return ResponseEntity.ok(adminService.createAdmin(request));
    }

}
