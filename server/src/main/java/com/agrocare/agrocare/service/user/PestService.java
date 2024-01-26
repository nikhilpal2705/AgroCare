package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.pojo.PestRequest;
import com.agrocare.agrocare.pojo.PestResponse;
import com.agrocare.agrocare.repository.PestRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PestService {

    @Autowired
    private PestRepository pestRepository;

    @Autowired
    private CommonService commonService;

    @Autowired
    private CropService cropService;

    public CustomResponse savePest(PestRequest pest, HttpServletRequest request) {
        Pests newPest = new Pests(commonService.getUserFromHeader(request),
                cropService.findCropById(pest.getCropId()),
                pest.getPestName(), pest.getPestiside(), pest.getStatus(),
                pest.getState(), pest.getDate());
        pestRepository.save(newPest);
        return new CustomResponse(true, Constants.Messages.PEST_ADDED_SUCCESS);
    }

    public CustomResponse deletePest(int pestId) {
        pestRepository.deleteById(pestId);
        return new CustomResponse(true, Constants.Messages.PEST_DELETED_SUCCESS);
    }

    public CustomResponse getPests(int userId) {
        List<PestResponse> pestResponses = this.commonService
                .pestListCustomResponse(this.pestRepository.findAllByUserId(userId, Sort.by(Sort.Direction.DESC, "id")));
        return new CustomResponse(pestResponses);
    }

    public CustomResponse getPest(int pestId) {
        Pests pest = this.pestRepository.findById(pestId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.PEST_NOT_FOUND + pestId));
        return new CustomResponse(pest);
    }

    public Pests findPestById(int pestId) {
        return this.pestRepository.findById(pestId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.PEST_NOT_FOUND + pestId));
    }

    public CustomResponse updatePest(int pestId, PestRequest pestRequest, HttpServletRequest request) {
        this.findPestById(pestId);
        Pests updatePest = new Pests(pestId, commonService.getUserFromHeader(request),
                cropService.findCropById(pestRequest.getCropId()),
                pestRequest.getPestName(), pestRequest.getPestiside(), pestRequest.getStatus(),
                pestRequest.getState(), pestRequest.getDate());
        return new CustomResponse(true, this.pestRepository.save(updatePest), Constants.Messages.PEST_UPDATED_SUCCESS);
    }
}
