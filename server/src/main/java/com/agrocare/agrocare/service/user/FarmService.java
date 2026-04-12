package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Farm;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.FarmRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import lombok.NonNull;

import java.util.List;
import java.util.Objects;

@Service
public class FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private CommonService commonService;

    public CustomResponse saveFarm(@NonNull Farm farm, HttpServletRequest request) {
        try {
            Farm nonNullFarm = Objects.requireNonNull(farm, "farm must not be null");
            nonNullFarm.setUser(commonService.getUserFromHeader(request));
            farmRepository.save(nonNullFarm);
            return new CustomResponse(true, Constants.Messages.FARM_ADDED_SUCCESS);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.FARM_ADDED_ERROR);
        }
    }

    public CustomResponse getFarms(HttpServletRequest request) {
        try {
            Users user = commonService.getUserFromHeader(request);
            List<Farm> farms = farmRepository.findAllByUser(user, Sort.by(Sort.Direction.DESC, "id"));
            return new CustomResponse(farms);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.FARM_FETCH_ERROR);
        }
    }

    public CustomResponse getFarm(int farmId) {
        try {
            Farm farm = findFarmById(farmId);
            return new CustomResponse(farm);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.FARM_FETCH_ERROR);
        }
    }

    public CustomResponse updateFarm(int farmId, @NonNull Farm farmUpdates, HttpServletRequest request) {
        try {
            Farm farm = findFarmById(farmId);
            if (farmUpdates.getFarmName() != null) farm.setFarmName(farmUpdates.getFarmName());
            if (farmUpdates.getAddress() != null) farm.setAddress(farmUpdates.getAddress());
            if (farmUpdates.getGpsLatitude() != null) farm.setGpsLatitude(farmUpdates.getGpsLatitude());
            if (farmUpdates.getGpsLongitude() != null) farm.setGpsLongitude(farmUpdates.getGpsLongitude());
            if (farmUpdates.getTotalAreaHectares() != null) farm.setTotalAreaHectares(farmUpdates.getTotalAreaHectares());
            if (farmUpdates.getIrrigationSource() != null) farm.setIrrigationSource(farmUpdates.getIrrigationSource());
            
            Farm nonNullFarm = Objects.requireNonNull(farm, "farm must not be null");
            farmRepository.save(nonNullFarm);
            return new CustomResponse(true, Constants.Messages.FARM_UPDATED_SUCCESS);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.FARM_UPDATING_ERROR);
        }
    }

    public CustomResponse deleteFarm(int farmId) {
        try {
            findFarmById(farmId); // Verify exists
            farmRepository.deleteById(farmId);
            return new CustomResponse(true, Constants.Messages.FARM_DELETED_SUCCESS);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.FARM_DELETED_ERROR);
        }
    }

    public Farm findFarmById(int farmId) {
        return farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.FARM_NOT_FOUND));
    }
}
