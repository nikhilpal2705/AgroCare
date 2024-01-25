package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.InventoryRequest;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.service.user.InventoryService;
import com.agrocare.agrocare.service.user.CropService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class InventoryController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private CropService cropService;

    // Get inventory data list . . .
    @GetMapping(value = "/inventory")
    public ResponseEntity<CustomResponse> getInventoryList(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(inventoryService.getInventoryList(request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_INVENTORY_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Get a inventory . . .
    @GetMapping(value = "/inventory/{inventoryId}")
    public ResponseEntity<CustomResponse> getInventory(@PathVariable("inventoryId") int inventoryId, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(inventoryService.getInventory(inventoryId, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_INVENTORY_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Add a inventory data . . .
    @PostMapping(value = "/inventory")
    public ResponseEntity<CustomResponse> createInventory(@RequestBody InventoryRequest inventoryRequest, HttpServletRequest request) {
        try {
            System.out.println("inventoryRequest: " + inventoryRequest);
            return new ResponseEntity<>(inventoryService.saveInventory(inventoryRequest, request), HttpStatus.OK);
        } catch (DataIntegrityViolationException err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INVENTORY_ALREADY_EXISTS
                    + this.cropService.findCropById(inventoryRequest.getCropId()).getCropName()), HttpStatus.BAD_REQUEST);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_ADDING_INVENTORY_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Update a inventory . . .
    @PutMapping(value = "/inventory/{inventoryId}")
    public ResponseEntity<CustomResponse> updateInventory(@PathVariable("inventoryId") int inventoryId, @RequestBody InventoryRequest inventoryRequest,
                                                            HttpServletRequest request) {
        try {
            System.out.println("inventoryId: " + inventoryId);
            return new ResponseEntity<>(inventoryService.updateInventory(inventoryId, inventoryRequest, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_UPDATING_INVENTORY_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

    // Delete a inventory . . .
    @DeleteMapping(value = "/inventory/{inventoryId}")
    public ResponseEntity<CustomResponse> deleteInventory(@PathVariable("inventoryId") int inventoryId, HttpServletRequest request) {
        try {
            return new ResponseEntity<>(inventoryService.deleteInventory(inventoryId, request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_DELETING_INVENTORY_DATA),
                    HttpStatus.BAD_REQUEST);
        }
    }

}
