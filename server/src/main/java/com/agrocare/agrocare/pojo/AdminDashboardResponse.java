package com.agrocare.agrocare.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private long userCount;
    private long farmerCount;
    private long adminCount;
    private long farmCount;
    private long cropCount;
    private long pestCount;
    private long inventoryCount;
    private long irrigationCount;
    private long alertCount;
    private long unreadAlertCount;
}