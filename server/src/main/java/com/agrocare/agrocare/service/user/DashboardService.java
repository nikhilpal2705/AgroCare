package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Irrigation;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.InventoryRepository;
import com.agrocare.agrocare.repository.IrrigationRepository;
import com.agrocare.agrocare.repository.CropRepository;
import com.agrocare.agrocare.repository.PestRepository;
import com.agrocare.agrocare.repository.AlertRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private CommonService commonService;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private PestRepository pestRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private IrrigationRepository irrigationRepository;

    @Autowired
    private AlertRepository alertRepository;

    /**
     * Get comprehensive dashboard details including KPI cards
     */
    public CustomResponse getDashboardDetails(HttpServletRequest request) {
        Users user = commonService.getUserFromHeader(request);
        
        // Get counts
        long cropCount = (long) cropRepository.countByUser(user);
        long pestCount = (long) pestRepository.countByUser(user);
        long inventoryCount = (long) inventoryRepository.countByUser(user);
        long unreadAlertCount = alertRepository.countByUserAndIsRead(user, false);
        
        Map<String, Object> response = new HashMap<>();
        response.put("cropCount", cropCount);
        response.put("pestCount", pestCount);
        response.put("inventoryCount", inventoryCount);
        response.put("unreadAlertCount", unreadAlertCount);

        return new CustomResponse(response);
    }

    /**
     * Get upcoming irrigation tasks
     */
    public CustomResponse getIrrigationList(HttpServletRequest request, String start, String end) {
        Users user = commonService.getUserFromHeader(request);
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);

        List<Irrigation> allByUserAndDateRange = this.irrigationRepository
                .findAllByUser(user, Sort.by(Sort.Direction.DESC, "scheduledDate"))
                .stream()
                .filter(irrigation -> isScheduledInRange(irrigation, startDate, endDate))
                .toList();

        return new CustomResponse(commonService.irrigationListCustomResponse(allByUserAndDateRange));
    }

    private boolean isScheduledInRange(Irrigation irrigation, LocalDate startDate, LocalDate endDate) {
        LocalDate scheduledDate = parseScheduledDate(irrigation.getScheduledDate());
        return scheduledDate != null
                && !scheduledDate.isBefore(startDate)
                && !scheduledDate.isAfter(endDate);
    }

    private LocalDate parseScheduledDate(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }

        try {
            return Instant.parse(value).atZone(ZoneId.systemDefault()).toLocalDate();
        } catch (Exception ignored) {
            return LocalDate.parse(value.substring(0, Math.min(value.length(), 10)));
        }
    }
}
