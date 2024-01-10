package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.agrocare.agrocare.helper.Constants;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    public CustomResponse saveCrop(Crops crop) {
        if (crop.getUserId() == Constants.NullCheck.INT) {
            throw new RuntimeException(Constants.Messages.USER_ID_NOT_AVAILABLE);
        }
        return new CustomResponse(true, cropRepository.save(crop), Constants.Messages.CROP_ADDED_SUCCESS_MESSAGE);
    }

    public CustomResponse deleteCrop(int cropId) {
        this.cropRepository.deleteById(cropId);
        return new CustomResponse(true, Constants.Messages.CROP_DELETED_SUCCESS_MESSAGE);
    }

    public CustomResponse getCrops() {
        return new CustomResponse(true, this.cropRepository.findAll());
    }

    public CustomResponse getCrop(int cropId) {
        Crops crop = this.cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
        return new CustomResponse(true, crop);
    }

    public CustomResponse updateCrop(int cropId, Crops crops) {
        if (this.getCrop(cropId).getResult() != null) {
            crops.setId(cropId);
            return new CustomResponse(true, this.cropRepository.save(crops), Constants.Messages.CROP_UPDATED_SUCCESS_MESSAGE);
        } else {
            return new CustomResponse(true, Constants.Messages.CROP_UPDATING_ERROR_MESSAGE);
        }
    }
}
