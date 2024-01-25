package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IrrigationResponse {
    private int id;
    private int cropId;
    private String cropName;
    private Crops crop;
    private String scheduleDate;
    private int status;
    private String createdAt;
    private String updatedAt;
}
