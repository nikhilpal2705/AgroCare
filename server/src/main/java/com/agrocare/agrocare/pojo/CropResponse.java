package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.model.Pests;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CropResponse {
    private int id;
    private int userId;
    private List<Pests> pests;
    private String cropName;
    private String cropType;
    private String cropVariety;
    private String fieldName;
    private String fieldSize;
    private int status;
    private String plantingDate;
    private String harvestDate;
    private String createdAt;
    private String updatedAt;

}
