package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Irrigation;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.InventoryRepository;
import com.agrocare.agrocare.repository.IrrigationRepository;
import com.agrocare.agrocare.repository.CropRepository;
import com.agrocare.agrocare.repository.PestRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public CustomResponse getDashboardDetails(HttpServletRequest request) {
        Users user = commonService.getUserFromHeader(request);
        Map<String, Object> response = Map.of(
                "cropCount", this.cropRepository.countByUser(user),
                "pestCount", this.pestRepository.countByUser(user),
                "inventoryCount", this.inventoryRepository.countByUser(user));

        return new CustomResponse(response);
    }

    public CustomResponse getIrrigationList(HttpServletRequest request, String start, String end) {
        int userId = commonService.getUserFromHeader(request).getId();

        List<Irrigation> allByUserAndDateRange = this.irrigationRepository
                .findIrrigationsInDateRange(userId, start, end);

        return new CustomResponse(commonService.irrigationListCustomResponse(allByUserAndDateRange));
    }
}
