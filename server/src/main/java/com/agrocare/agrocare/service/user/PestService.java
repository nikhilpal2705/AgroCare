package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.repository.PestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PestService {

    @Autowired
    private PestRepository pestRepository;

    public String savePest(Pests pest) {
        this.pestRepository.save(pest);
        return Constants.Messages.PEST_ADDED_SUCCESS_MESSAGE;
    }

    public String deletePest(int pestId) {
//        Pests pests = this.pestRepository.findById(pestId).orElseThrow(() ->
//                new RuntimeException(Constants.Messages.PEST_NOT_FOUND + pestId));
//        pests.setStatus(Constants.Status.DELETE);
//        this.pestRepository.save(pests);
        this.pestRepository.deleteById(pestId);
        return Constants.Messages.PEST_DELETED_SUCCESS_MESSAGE;
    }

    public List<Pests> getPests() {
        return this.pestRepository.findAll();
    }

    public Pests getPest(int pestId) {
        return this.pestRepository.findById(pestId).orElseThrow(() ->
                new RuntimeException(Constants.Messages.PEST_NOT_FOUND + pestId));
    }

    public String updatePest(int pestId, Pests pest) {
        if (this.getPest(pestId) != null && pest != null) {
            pest.setId(pestId);
            this.pestRepository.save(pest);
            return Constants.Messages.PEST_UPDATED_SUCCESS_MESSAGE;
        } else {
            return Constants.Messages.SOME_ERROR_OCCURRED;
        }
    }
}
