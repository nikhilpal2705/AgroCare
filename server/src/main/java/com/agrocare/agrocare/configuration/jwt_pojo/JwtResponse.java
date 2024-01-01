package com.agrocare.agrocare.configuration.jwt_pojo;

import com.agrocare.agrocare.model.Users;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class JwtResponse {
    private String jwtToken;
    private UserResponse user;
}
