package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.CropMonitor;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CropMonitorRequest;
import com.agrocare.agrocare.pojo.CropMonitorResponse;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.CropMonitorRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CropMonitorService {

    @Autowired
    private CommonService commonService;

    @Autowired
    private CropMonitorRepository cropMonitorRepository;

    @Autowired
    private CropService cropService;

    public CustomResponse saveCropMonitor(CropMonitorRequest cropMonitorRequest, HttpServletRequest request) {
        // Fetching user from header . . . and crop from cropId . . . at last creating cropMonitor object . . .
        CropMonitor cropMonitor = new CropMonitor(this.commonService.getUserFromHeader(request),
                this.cropService.findCropById(cropMonitorRequest.getCropId()), cropMonitorRequest.getTotalStock(), cropMonitorRequest.getAvailableStock());

        // Saving cropMonitor . . .
        CropMonitor savedCropMonitor = this.cropMonitorRepository.save(cropMonitor);

        // Returning response . . .
        CropMonitorResponse cropMonitorResponse = new CropMonitorResponse(savedCropMonitor.getId(), savedCropMonitor.getCrop().getId(),
                savedCropMonitor.getCrop().getId(), savedCropMonitor.getCrop().getCropName(),
                savedCropMonitor.getCrop(), savedCropMonitor.getTotalStock(), savedCropMonitor.getAvailableStock(),
                savedCropMonitor.getCreatedAt(), savedCropMonitor.getUpdatedAt());

        return new CustomResponse(true, cropMonitorResponse, Constants.Messages.CROP_MONITOR_ADDED_SUCCESS);
    }

}
