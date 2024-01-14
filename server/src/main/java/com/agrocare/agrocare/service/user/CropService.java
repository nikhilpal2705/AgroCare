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
        cropRepository.save(crop);
        return new CustomResponse(true, Constants.Messages.CROP_ADDED_SUCCESS);
    }

    public CustomResponse deleteCrop(int cropId) {
        this.cropRepository.deleteById(cropId);
        return new CustomResponse(true, Constants.Messages.CROP_DELETED_SUCCESS);
    }

    public CustomResponse getCrops(int userId) {
        return new CustomResponse(this.cropRepository.findAllByUserId(userId));
    }

    public CustomResponse getCrop(int cropId) {
        Crops crop = this.cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
        return new CustomResponse(crop);
    }

    public CustomResponse updateCrop(int cropId, Crops crops) {
        this.getCrop(cropId);
        crops.setId(cropId);
        return new CustomResponse(true, this.cropRepository.save(crops), Constants.Messages.CROP_UPDATED_SUCCESS);
    }

    public Crops getCropById(int cropId) {
        return this.cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
    }
}
