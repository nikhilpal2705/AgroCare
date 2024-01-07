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

    public Crops saveCrop(Crops crop) {
        return cropRepository.save(crop);
    }

    public Crops deleteCrop(int cropId) {
        this.cropRepository.deleteById(cropId);
        return null;
    }

    public List<Crops> getCrops() {
        return this.cropRepository.findAll();
    }

    public Crops getCrop(int cropId) {
        return this.cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.CROP_NOT_FOUND + cropId));
    }

    public Crops updateCrop(int cropId, Crops crops) {
        if (this.getCrop(cropId) != null && crops != null) {
            crops.setId(cropId);
            return this.cropRepository.save(crops);
        } else {
            return null;
        }
    }
}
