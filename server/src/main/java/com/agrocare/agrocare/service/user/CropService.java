package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.repository.CropRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    public Crops saveCrop(Crops crops){
        return this.cropRepository.save(crops);
    }

}
