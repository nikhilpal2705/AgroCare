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

    public Pests savePest(Pests pest) {
        return this.pestRepository.save(pest);
    }

    public Pests deletePest(int pestId) {
        this.pestRepository.deleteById(pestId);
        return null;
    }

    public List<Pests> getPests() {
        return this.pestRepository.findAll();
    }

    public Pests getPest(int pestId) {
        return this.pestRepository.findById(pestId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.PEST_NOT_FOUND + pestId));
    }

    public Pests updatePest(int pestId, Pests pest) {
        if (this.getPest(pestId) != null && pest != null) {
            pest.setId(pestId);
            return this.pestRepository.save(pest);
        } else {
            return null;
        }
    }
}
