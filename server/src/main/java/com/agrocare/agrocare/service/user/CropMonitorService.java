package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.CropMonitor;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CropMonitorRequest;
import com.agrocare.agrocare.pojo.CropMonitorResponse;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.CropMonitorRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropMonitorService {

    @Autowired
    private CommonService commonService;

    @Autowired
    private CropMonitorRepository cropMonitorRepository;

    @Autowired
    private CropService cropService;

    public CropMonitor findById(int cropMonitorId) {
        return this.cropMonitorRepository.findById(cropMonitorId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_MONITOR_NOT_FOUND + cropMonitorId));
    }

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

    public CustomResponse getCropMonitorList(HttpServletRequest request) {
        List<CropMonitor> allByUser = this.cropMonitorRepository.findAllByUser(this.commonService.getUserFromHeader(request));
        return new CustomResponse(commonService.cropMonitorListCustomResponse(allByUser));
    }

    public CustomResponse getCropMonitor(int cropMonitorId, HttpServletRequest request) {
        commonService.getUserFromHeader(request);
        CropMonitor cropMonitorById = this.findById(cropMonitorId);
        return new CustomResponse(commonService.cropMonitorResponse(cropMonitorById));
    }

    public CustomResponse updateCropMonitor(CropMonitorRequest cropMonitorRequest, HttpServletRequest request) {
        Users userFromHeader = this.commonService.getUserFromHeader(request);
        Crops cropById = this.cropService.findCropById(cropMonitorRequest.getCropId());
        CropMonitor cropMonitorById = this.findById(cropMonitorRequest.getId());

        CropMonitor updatedCropMonitor = new CropMonitor(cropMonitorById.getId(), userFromHeader, cropById,
                cropMonitorRequest.getTotalStock(), cropMonitorRequest.getAvailableStock());

        return new CustomResponse(true, this.cropMonitorRepository.save(updatedCropMonitor), Constants.Messages.CROP_MONITOR_UPDATED_SUCCESS);
    }

    @Transactional
    public CustomResponse deleteCropMonitor(int cropMonitorId, HttpServletRequest request) {
        commonService.getUserFromHeader(request);
        this.findById(cropMonitorId);
        cropMonitorRepository.deleteMonitorById(cropMonitorId);
        return new CustomResponse(true, Constants.Messages.CROP_MONITOR_DELETED_SUCCESS);
    }
}
