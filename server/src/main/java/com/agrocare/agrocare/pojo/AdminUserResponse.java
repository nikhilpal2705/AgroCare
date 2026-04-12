package com.agrocare.agrocare.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {
    private int id;
    private String name;
    private String email;
    private String role;
    private int status;
    private String preferredLanguage;
    private String createdAt;
    private String updatedAt;
    private long farmCount;
    private long cropCount;
    private long pestCount;
    private long inventoryCount;
    private long irrigationCount;
    private long alertCount;
}