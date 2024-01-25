package com.agrocare.agrocare.pojo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InventoryRequest {
    private int id;
    private int userId;
    private int cropId;
    private int totalStock;
    private int availableStock;
}
