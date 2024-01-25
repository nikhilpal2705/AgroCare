package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Pests;
import lombok.*;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponse {
    private int id;
    private String name;
    private String email;
    private Collection<?> authorities;
    private int status;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
    private List<Crops> crops;
    private List<Pests> pests;
    private String createdAt;
    private String updatedAt;
}
