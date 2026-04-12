package com.agrocare.agrocare.controller.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.service.user.DashboardService;
import com.agrocare.agrocare.service.user.AlertService;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.service.common.CommonService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

@RestController
@RequestMapping(value = "/user")
public class DashboardController {

    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private AlertService alertService;

    @Autowired
    private CommonService commonService;

    @GetMapping(value = "/dashboard")
    public ResponseEntity<CustomResponse> getDashboardDetails(HttpServletRequest request) {
        try {
            return new ResponseEntity<>(dashboardService.getDashboardDetails(request), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_FETCHING_DASHBOARD_DETAILS),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/dashboard-irrigation")
    public ResponseEntity<CustomResponse> getUpcomingIrrigation(@RequestParam(name = "start") String start,
            @RequestParam(name = "end") String end,
            HttpServletRequest request) {
        try {
            return new ResponseEntity<>(dashboardService.getIrrigationList(request, start, end), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ERROR_WHILE_FETCHING_IRRIGATION),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/dashboard-alerts")
    public ResponseEntity<CustomResponse> getUnreadAlerts(HttpServletRequest request) {
        try {
            Users user = commonService.getUserFromHeader(request);
            return new ResponseEntity<>(alertService.getUnreadAlerts(user), HttpStatus.OK);
        } catch (Exception err) {
            logger.info("Error: " + err.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.ALERT_FETCH_ERROR),
                    HttpStatus.BAD_REQUEST);
        }
    }

}
