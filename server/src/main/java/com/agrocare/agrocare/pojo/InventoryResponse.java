package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.model.Crops;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InventoryResponse {

    private int id;
    private int userId;
    private int cropId;
    private String cropName;
    private Crops crop;
    private int totalStock;
    private int availableStock;
    private String createdAt;
    private String updatedAt;

}
