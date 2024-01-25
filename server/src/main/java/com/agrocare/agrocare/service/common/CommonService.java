package com.agrocare.agrocare.service.common;

import com.agrocare.agrocare.configuration.jwt.JwtHelper;
import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.*;
import com.agrocare.agrocare.pojo.*;
import com.agrocare.agrocare.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommonService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper jwtHelper;

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

    public CropResponse cropResponse(Crops crop) {
        return new CropResponse(crop.getId(), crop.getUser(), crop.getPests(),
                crop.getCropName(), crop.getCropType(), crop.getCropVariety(),
                crop.getFieldName(), crop.getFieldSize(), crop.getStatus(),
                crop.getPlantingDate(), crop.getHarvestDate(),
                crop.getCreatedAt(), crop.getUpdatedAt());
    }

    public PestResponse pestResponse(Pests pests) {
        return new PestResponse(pests.getId(), pests.getUser(), pests.getUser().getId(),
                pests.getCrop(), pests.getCrop().getId(), pests.getCrop().getCropName(), pests.getPestName(),
                pests.getPestiside(), pests.getStatus(),
                pests.getState(), pests.getDate(),
                pests.getCreatedAt(), pests.getUpdatedAt());
    }

    public UserResponse userResponse(Users user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(),
                user.getAuthorities(), user.getStatus(),
                user.isAccountNonExpired(), user.isAccountNonLocked(),
                user.isCredentialsNonExpired(), user.isEnabled(),
                user.getCrops(), user.getPests(),
                user.getCreatedAt(), user.getUpdatedAt());
    }

    public Users getUserFromHeader(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String userEmail = jwtHelper.getUsernameFromToken(token);
        return userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException(Constants.Messages.USER_ID_NOT_AVAILABLE));
    }

    public List<PestResponse> pestListCustomResponse(List<Pests> pests) {
        List<PestResponse> pestResponseList = new ArrayList<>();
        for (Pests pest : pests) {
            pestResponseList.add(new PestResponse(pest.getId(), null, pest.getUser().getId(),
                    pest.getCrop(), pest.getCrop().getId(), pest.getCrop().getCropName(),
                    pest.getPestName(), pest.getPestiside(), pest.getStatus(),
                    pest.getState(), pest.getDate(), pest.getCreatedAt(),
                    pest.getUpdatedAt()));
        }
        return pestResponseList;
    }

    public InventoryResponse inventoryResponse(Inventory inventoryById) {
        return new InventoryResponse(inventoryById.getId(), inventoryById.getUser().getId(),
                inventoryById.getCrop().getId(), inventoryById.getCrop().getCropName(),
                inventoryById.getCrop(), inventoryById.getTotalStock(), inventoryById.getAvailableStock(),
                inventoryById.getCreatedAt(), inventoryById.getUpdatedAt());
    }

    public List<InventoryResponse> inventoryListCustomResponse(List<Inventory> allByUser) {
        List<InventoryResponse> inventoryResponseList = new ArrayList<>();
        for (Inventory inventory : allByUser) {
            inventoryResponseList.add(this.inventoryResponse(inventory));
        }
        return inventoryResponseList;
    }

    public IrrigationResponse irrigationResponse(Irrigation irrigation) {
        return new IrrigationResponse(irrigation.getId(), irrigation.getCrop().getId(),
                irrigation.getCrop().getCropName(), irrigation.getCrop(),
                irrigation.getScheduledDate(), irrigation.getStatus(),
                irrigation.getCreatedAt(), irrigation.getUpdatedAt());
    }

    public List<IrrigationResponse> irrigationListCustomResponse(List<Irrigation> allByUser) {
        List<IrrigationResponse> irrigationResponses = new ArrayList<>();
        for (Irrigation irrigation : allByUser) {
            irrigationResponses.add(this.irrigationResponse(irrigation));
        }
        return irrigationResponses;
    }
}
