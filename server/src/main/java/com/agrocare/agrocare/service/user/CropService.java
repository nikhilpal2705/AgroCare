package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.repository.CropRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.agrocare.agrocare.helper.Constants;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private CommonService commonService;

    public CustomResponse saveCrop(Crops crop, HttpServletRequest request) {
        crop.setUser(commonService.getUserFromHeader(request));
        cropRepository.save(crop);
        return new CustomResponse(true, Constants.Messages.CROP_ADDED_SUCCESS);
    }

    public CustomResponse deleteCrop(int cropId) {
        Crops crop = this.findCropById(cropId);
        // Check if crop is connected with pests or crop monitor
        if (crop.getInventory() != null && !crop.getPests().isEmpty()) {
            return new CustomResponse(true, false, Constants.Messages.CROP_CONNECTED_WITH_PESTS_AND_INVENTORY);
        }

        // Check if crop is connected with crop monitor
        if (crop.getInventory() != null) {
            return new CustomResponse(true, false, Constants.Messages.CROP_CONNECTED_WITH_INVENTORY);
        }

        // Check if crop is connected with pests
        if (!crop.getPests().isEmpty()) {
            return new CustomResponse(true, false, Constants.Messages.CROP_CONNECTED_WITH_PESTS);
        }

        this.cropRepository.deleteById(cropId);
        return new CustomResponse(true, Constants.Messages.CROP_DELETED_SUCCESS);
    }

    public Crops findCropById(int cropId) {
        return this.cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
    }

    public CustomResponse getCrops(int userId) {
        return new CustomResponse(this.cropRepository.findAllByUserId(userId, Sort.by(Sort.Direction.DESC, "id")));
    }

    public CustomResponse getCrop(int cropId) {
        Crops crop = this.cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
        return new CustomResponse(crop);
    }

    public CustomResponse updateCrop(int cropId, Crops crops, HttpServletRequest request) {
        this.getCrop(cropId);
        crops.setId(cropId);
        crops.setUser(commonService.getUserFromHeader(request));
        return new CustomResponse(true, this.cropRepository.save(crops), Constants.Messages.CROP_UPDATED_SUCCESS);
    }

}
