package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.agrocare.agrocare.helper.Constants;

import java.util.List;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    public String saveCrop(Crops crop) {
        this.cropRepository.save(crop);
        return Constants.Messages.CROP_ADDED_SUCCESS_MESSAGE;
    }

    public String deleteCrop(int cropId) {
//        Crops crop = this.cropRepository.findById(cropId).orElseThrow(() ->
//                new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId)));
//        crop.setStatus(Constants.Status.DELETE);
//        this.cropRepository.save(crop);
        this.cropRepository.deleteById(cropId);
        return Constants.Messages.CROP_DELETED_SUCCESS_MESSAGE;
    }

    public List<Crops> getCrops() {
        return this.cropRepository.findAll();
    }

    public Crops getCrop(int cropId) {
        return this.cropRepository.findById(cropId).orElseThrow(() ->
                new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
    }

    public String updateCrop(int cropId, Crops crops) {
        if (this.getCrop(cropId) != null && crops != null) {
            crops.setId(cropId);
            this.cropRepository.save(crops);
            return Constants.Messages.CROP_UPDATED_SUCCESS_MESSAGE;
        } else {
            return Constants.Messages.SOME_ERROR_OCCURRED;
        }
    }
}
