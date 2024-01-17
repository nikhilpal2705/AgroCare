package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PestResponse {
    private int id;
    private Users user;
    private int userId;
    private Crops crop;
    private int cropId;
    private String cropName;
    private String pestName;
    private String pestiside;
    private int status;
    private int state;
    private String date;
    private String createdAt;
    private String updatedAt;
}
