package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Inventory;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class InventoryAlertService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private AlertService alertService;

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;

    /**
     * Check inventory items for stock thresholds and expiry dates
     */
    public void checkInventoryAlerts(Users user) {
        List<Inventory> inventories = inventoryRepository.findAllByUser(user, Sort.by(Sort.Direction.DESC, "id"));
        
        for (Inventory inventory : inventories) {
            // Check minimum stock threshold
            if (inventory.getAvailableStock() < inventory.getMinimumThreshold()) {
                String title = "Low Stock Alert: " + inventory.getCrop().getCropName();
                String description = "Available stock (" + inventory.getAvailableStock() + 
                        ") is below minimum threshold (" + inventory.getMinimumThreshold() + ")";
                alertService.createAlert(user, "low_stock", title, description, "high", 
                        "inventory", inventory.getId(), "/inventory/" + inventory.getId());
            }

            // Check expiry date
            if (inventory.getExpiryDate() != null && !inventory.getExpiryDate().isEmpty()) {
                try {
                    LocalDate expiryDate = LocalDate.parse(inventory.getExpiryDate(), dateFormatter);
                    LocalDate today = LocalDate.now();
                    
                    if (today.isAfter(expiryDate)) {
                        String title = "Expired: " + inventory.getCrop().getCropName();
                        String description = "Item expired on " + inventory.getExpiryDate();
                        alertService.createAlert(user, "expiry_alert", title, description, "high",
                                "inventory", inventory.getId(), "/inventory/" + inventory.getId());
                    } else if (today.plusDays(7).isAfter(expiryDate)) {
                        String title = "Expiring Soon: " + inventory.getCrop().getCropName();
                        String description = "Item will expire on " + inventory.getExpiryDate();
                        alertService.createAlert(user, "expiry_alert", title, description, "medium",
                                "inventory", inventory.getId(), "/inventory/" + inventory.getId());
                    }
                } catch (Exception e) {
                    // Invalid date format, skip
                }
            }
        }
    }
}
