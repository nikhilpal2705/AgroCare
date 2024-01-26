package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Inventory;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.InventoryRequest;
import com.agrocare.agrocare.pojo.InventoryResponse;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.InventoryRepository;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private CommonService commonService;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private CropService cropService;

    public Inventory findById(int inventoryId) {
        return this.inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException(Constants.Messages.INVENTORY_NOT_FOUND + inventoryId));
    }

    public CustomResponse saveInventory(InventoryRequest inventoryRequest, HttpServletRequest request) {
        // Fetching user from header . . . and crop from cropId . . . at last creating
        // inventory object . . .
        Inventory inventory = new Inventory(this.commonService.getUserFromHeader(request),
                this.cropService.findCropById(inventoryRequest.getCropId()), inventoryRequest.getTotalStock(),
                inventoryRequest.getAvailableStock());

        // Saving inventory . . .
        Inventory savedInventory = this.inventoryRepository.save(inventory);

        // Returning response . . .
        InventoryResponse inventoryResponse = new InventoryResponse(savedInventory.getId(),
                savedInventory.getCrop().getId(),
                savedInventory.getCrop().getId(), savedInventory.getCrop().getCropName(),
                savedInventory.getCrop(), savedInventory.getTotalStock(), savedInventory.getAvailableStock(),
                savedInventory.getCreatedAt(), savedInventory.getUpdatedAt());

        return new CustomResponse(true, inventoryResponse, Constants.Messages.INVENTORY_ADDED_SUCCESS);
    }

    public CustomResponse getInventoryList(HttpServletRequest request) {
        List<Inventory> allByUser = this.inventoryRepository
                .findAllByUser(this.commonService.getUserFromHeader(request), Sort.by(Sort.Direction.DESC, "id"));
        return new CustomResponse(commonService.inventoryListCustomResponse(allByUser));
    }

    public CustomResponse getInventory(int inventoryId, HttpServletRequest request) {
        commonService.getUserFromHeader(request);
        Inventory inventoryById = this.findById(inventoryId);
        return new CustomResponse(commonService.inventoryResponse(inventoryById));
    }

    public CustomResponse updateInventory(int inventoryId, InventoryRequest inventoryRequest,
            HttpServletRequest request) {
        System.out.println(inventoryId);
        Users userFromHeader = this.commonService.getUserFromHeader(request);
        Crops cropById = this.cropService.findCropById(inventoryRequest.getCropId());
        Inventory inventoryById = this.findById(inventoryId);
        Inventory updatedInventory = new Inventory(inventoryById.getId(), userFromHeader, cropById,
                inventoryRequest.getTotalStock(), inventoryRequest.getAvailableStock());

        return new CustomResponse(true, this.inventoryRepository.save(updatedInventory),
                Constants.Messages.INVENTORY_UPDATED_SUCCESS);
    }

    @Transactional
    public CustomResponse deleteInventory(int inventoryId, HttpServletRequest request) {
        commonService.getUserFromHeader(request);
        this.findById(inventoryId);
        inventoryRepository.deleteMonitorById(inventoryId);
        return new CustomResponse(true, Constants.Messages.INVENTORY_DELETED_SUCCESS);
    }
}
