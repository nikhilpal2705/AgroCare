package com.agrocare.agrocare.pojo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CropResponse {
    private int id;
    private String cropName;
    private String cropType;
    private String cropVariety;
    private Integer farmId;
    private FarmSummary farm;
    private String fieldName;
    private String fieldSize;
    private int status;
    private String plantingDate;
    private String harvestDate;
    private String cropStage;
    private Double expectedYield;
    private String createdAt;
    private String updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class FarmSummary {
        private Integer id;
        private String farmName;
    }
}
