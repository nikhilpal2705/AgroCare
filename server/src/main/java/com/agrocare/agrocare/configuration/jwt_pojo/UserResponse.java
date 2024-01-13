package com.agrocare.agrocare.configuration.jwt_pojo;

import lombok.*;

import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserResponse {
    private int id;
    private String name;
    private String email;
    private Collection<?> authorities;
    private int status;
}
