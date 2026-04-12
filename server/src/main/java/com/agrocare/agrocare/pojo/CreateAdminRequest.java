package com.agrocare.agrocare.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for creating/updating admin users
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAdminRequest {
    private String name;
    private String email;
    private String password;
    private String preferredLanguage;
}
