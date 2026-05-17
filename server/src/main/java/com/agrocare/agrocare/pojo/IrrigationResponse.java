package com.agrocare.agrocare.pojo;

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
    private CropResponse crop;
    private String scheduledDate;
    private int status;
    private String createdAt;
    private String updatedAt;
}
