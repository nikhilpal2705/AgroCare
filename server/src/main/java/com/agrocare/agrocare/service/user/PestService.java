package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.PestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PestService {

    @Autowired
    private PestRepository pestRepository;

    public CustomResponse savePest(Pests pest) {
        if (pest.getUserId() == Constants.NullCheck.INT) {
            throw new RuntimeException(Constants.Messages.USER_ID_NOT_AVAILABLE);
        }
        pestRepository.save(pest);
        return new CustomResponse(true, Constants.Messages.PEST_ADDED_SUCCESS);
    }

    public CustomResponse deletePest(int pestId) {
        pestRepository.deleteById(pestId);
        return new CustomResponse(true, Constants.Messages.PEST_DELETED_SUCCESS);
    }

    public CustomResponse getPests(int userId) {
        return new CustomResponse(this.pestRepository.findAllByUserId(userId));
    }

    public CustomResponse getPest(int pestId) {
        Pests pest = this.pestRepository.findById(pestId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.PEST_NOT_FOUND + pestId));
        return new CustomResponse(pest);
    }

    public CustomResponse updatePest(int pestId, Pests pest) {
        this.getPest(pestId);
        pest.setId(pestId);
        return new CustomResponse(true, this.pestRepository.save(pest), Constants.Messages.PEST_UPDATED_SUCCESS);
    }
}
