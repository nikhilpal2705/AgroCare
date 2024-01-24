package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.CropMonitorRepository;
import com.agrocare.agrocare.repository.CropRepository;
import com.agrocare.agrocare.repository.PestRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
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
    private CropMonitorRepository cropMonitorRepository;

    public CustomResponse getDashboardDetails(HttpServletRequest request) {
        Users user = commonService.getUserFromHeader(request);
        Map<String, Object> response = Map.of(
                "cropCount", this.cropRepository.countByUser(user),
                "pestCount", this.pestRepository.countByUser(user),
                "cropMonitorCount", this.cropMonitorRepository.countByUser(user)
        );

        return new CustomResponse(response);
    }
}
