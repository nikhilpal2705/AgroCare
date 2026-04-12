package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Alert;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    private AlertRepository alertRepository;

    /**
     * Create a new alert for a user
     */
    public Alert createAlert(Users user, String alertType, String title, String description,
                           String severity, String relatedEntityType, Integer relatedEntityId, String actionUrl) {
        Alert alert = new Alert(user, alertType, title, description, severity, relatedEntityType, relatedEntityId, actionUrl);
        return alertRepository.save(alert);
    }

    /**
     * Get all unread alerts for a user
     */
    public CustomResponse getUnreadAlerts(Users user) {
        try {
            List<Alert> alerts = alertRepository.findAllByUserAndIsRead(user, false, Sort.by(Sort.Direction.DESC, "id"));
            return new CustomResponse(alerts);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.ALERT_FETCH_ERROR);
        }
    }

    /**
     * Get all alerts for a user
     */
    public CustomResponse getAllAlerts(Users user) {
        try {
            List<Alert> alerts = alertRepository.findAllByUser(user, Sort.by(Sort.Direction.DESC, "id"));
            return new CustomResponse(alerts);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.ALERT_FETCH_ERROR);
        }
    }

    /**
     * Mark alert as read
     */
    public CustomResponse markAlertAsRead(int alertId) {
        try {
            Alert alert = alertRepository.findById(alertId)
                    .orElseThrow(() -> new RuntimeException(Constants.Messages.ALERT_NOT_FOUND));
            alert.setRead(true);
            alertRepository.save(alert);
            return new CustomResponse(true, Constants.Messages.ALERT_MARKED_READ);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.ALERT_UPDATE_ERROR);
        }
    }

    /**
     * Delete an alert
     */
    public CustomResponse deleteAlert(int alertId) {
        try {
            alertRepository.deleteById(alertId);
            return new CustomResponse(true, Constants.Messages.ALERT_DELETED_SUCCESS);
        } catch (Exception e) {
            return new CustomResponse(Constants.Messages.ALERT_DELETED_ERROR);
        }
    }

    /**
     * Get count of unread alerts
     */
    public long getUnreadAlertCount(Users user) {
        return alertRepository.countByUserAndIsRead(user, false);
    }
}
