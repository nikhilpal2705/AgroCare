package com.agrocare.agrocare.controller.auth;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Pests;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.CropRepository;
import com.agrocare.agrocare.repository.PestRepository;
import com.agrocare.agrocare.service.common.CommonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.List;

@RestController
public class CommonController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private PestRepository pestRepository;

    @PostMapping(value = "/register")
    public ResponseEntity<CustomResponse> registerUser(@RequestBody Users user) {
        try {
            if (commonService.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>(new CustomResponse(Constants.Messages.DUPLICATE_EMAIL),
                        HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(commonService.registerUser(user), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUser", produces = "application/json")
    public ResponseEntity<CustomResponse> getUser() {
        try {
            return new ResponseEntity<>(commonService.getAllUsers(), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping(value = "/test", produces = "application/json")
    public ResponseEntity<?> test() {
        try {


//            Crops crops = new Crops();
//            crops.setUserId(5);
//            crops.setCropName("Crop Name");
//            crops.setCropType("Crop Type");
//            crops.setCropVariety("Crop Variety");
//            crops.setFieldName("Field Name");
//            crops.setFieldSize("Field Size");
//            crops.setPlantingDate("Planting Date");
//            crops.setHarvestDate("Harvest Date");
//            crops.setStatus(Constants.Status.ACTIVE);
//
//            Pests pests = new Pests();
//            pests.setUserId(5);
//            pests.setCropId(crops);
//            pests.setPestName("Pest Name");
//            pests.setPestiside("Pestiside");
//            pests.setStatus(Constants.Status.ACTIVE);
//            pests.setState(1);
//            pests.setDate("Date");
//
//
//            Pests pests1 = new Pests();
//            pests1.setUserId(5);
//            pests1.setCropId(crops);
//            pests1.setPestName("11Pest Name");
//            pests1.setPestiside("11Pestiside");
//            pests1.setStatus(Constants.Status.ACTIVE);
//            pests1.setState(1);
//            pests1.setDate("Date1");
//
//            crops.setPests(List.of(pests, pests1));
//
//            System.out.println("crops 11111111111111: " + crops.getCropName());
//            System.out.println("crops 11111111111111: " + crops);
//            Crops save = cropRepository.save(crops);
//            System.out.println("save 11111111111111: " + save);

            Crops crop = cropRepository.findById(1).get();
            List<Pests> pests = crop.getPests();


            System.out.println("all 11111111111111: "+crop.getCropName());
            System.out.println(pests.size());

            for (Pests pest : pests) {
                System.out.println("pest 11111111111111: " + pest.getPestName());
            }


//            Pests pests1 = pestRepository.findById(1).get();
//            System.out.println("pests1 11111111111111: " + pests1.getPestName());
//            System.out.println("pests1 11111111111111: " + pests1.getCropId().getCropName());


            if (crop != null) {
                System.out.println("crop 11111111111111: " + crop.getCropName());
            } else {
                System.out.println("crop 22222222222222: " + crop.getCropName());
            }


            return ResponseEntity.ok(crop);

        } catch (Exception err) {
            logger.info("Error: 999999999999999999999999 " + err.getMessage());
            return new ResponseEntity<>(Constants.Messages.INTERNAL_SERVER_ERROR,
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
