package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Irrigation;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.pojo.IrrigationRequest;
import com.agrocare.agrocare.repository.IrrigationRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IrrigationService {

    @Autowired
    private CommonService commonService;

    @Autowired
    private CropService cropService;

    @Autowired
    private IrrigationRepository irrigationRepository;

    public Irrigation findById(int irrigationId) {
        return this.irrigationRepository.findById(irrigationId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.IRRIGATION_NOT_FOUND + irrigationId));
    }

    public CustomResponse saveIrrigation(IrrigationRequest irrigationRequest, HttpServletRequest request) {
        Irrigation irrigation = new Irrigation(this.commonService.getUserFromHeader(request),
                this.cropService.findCropById(irrigationRequest.getCropId()),
                irrigationRequest.getScheduledDate(), irrigationRequest.getStatus());
        return new CustomResponse(true, commonService.irrigationResponse(this.irrigationRepository.save(irrigation)),
                Constants.Messages.IRRIGATION_ADDED_SUCCESS);
    }

    public CustomResponse getIrrigation(int irrigationId, HttpServletRequest request) {
        this.commonService.getUserFromHeader(request);
        return new CustomResponse(this.commonService.irrigationResponse(this.findById(irrigationId)));
    }

    public CustomResponse getIrrigationList(HttpServletRequest request) {
        List<Irrigation> allByUser = this.irrigationRepository
                .findAllByUser(this.commonService.getUserFromHeader(request), Sort.by(Sort.Direction.DESC, "id"));
        return new CustomResponse(commonService.irrigationListCustomResponse(allByUser));
    }

    public CustomResponse deleteIrrigation(int irrigationId, HttpServletRequest request) {
        this.commonService.getUserFromHeader(request);
        this.findById(irrigationId);
        this.irrigationRepository.deleteById(irrigationId);
        return new CustomResponse(true, Constants.Messages.IRRIGATION_DELETED_SUCCESS);
    }

    public CustomResponse updateIrrigation(int irrigationId, IrrigationRequest irrigationRequest,
            HttpServletRequest request) {
        System.out.println(irrigationId);
        Users userFromHeader = this.commonService.getUserFromHeader(request);
        Irrigation irrigation = this.findById(irrigationId);
        Crops crop = this.cropService.findCropById(irrigationRequest.getCropId());
        Irrigation updateIrrigation = new Irrigation(irrigation.getId(), userFromHeader, crop,
                irrigationRequest.getScheduledDate(), irrigationRequest.getStatus());

        return new CustomResponse(true,
                this.commonService.irrigationResponse(this.irrigationRepository.save(updateIrrigation)),
                Constants.Messages.IRRIGATION_UPDATED_SUCCESS);
    }
}
