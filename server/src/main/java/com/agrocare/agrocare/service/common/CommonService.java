package com.agrocare.agrocare.service.common;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CommonService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomResponse registerUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return new CustomResponse(true, userRepo.save(user), Constants.Messages.REGISTRATION_SUCCESS);
    }

    public boolean existsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    public CustomResponse getAllUsers() {
        return new CustomResponse(userRepo.findAll());
    }

    public Map<String, Object> getCorpAndPestFromCrop(Crops crop) {
        return Map.of(
                "crop", crop,
                "pests", crop.getPests()
//                "crop", List.of(crop),
        );
    }

    public Map<String, Object> getCorpAndPestFromPest(Pests pests) {
        return Map.of("crop", pests.getCropId(),
                "pests", pests);
    }
}
