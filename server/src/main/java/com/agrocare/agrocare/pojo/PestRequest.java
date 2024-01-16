package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PestRequest {
    private int id;
    private int userId;
    private int cropId;
    private String pestName;
    private String pestiside;
    private int status = Constants.Status.ACTIVE;
    private int state;
    private String date;
}
