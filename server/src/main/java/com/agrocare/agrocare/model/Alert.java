package com.agrocare.agrocare.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private Users user;

    @JsonProperty("alertType")
    @Column(name = "alertType", nullable = false)
    private String alertType; // low_stock, pending_irrigation, high_pest_risk, expiry_alert, task_deadline

    @JsonProperty("title")
    @Column(name = "title", nullable = false)
    private String title;

    @JsonProperty("description")
    @Column(name = "description")
    private String description;

    @JsonProperty("severity")
    @Column(name = "severity", nullable = false)
    private String severity; // low, medium, high

    @JsonProperty("relatedEntityType")
    @Column(name = "relatedEntityType")
    private String relatedEntityType; // crop, pest, inventory, irrigation, farm

    @JsonProperty("relatedEntityId")
    @Column(name = "relatedEntityId")
    private Integer relatedEntityId;

    @JsonProperty("isRead")
    @Column(name = "isRead", nullable = false)
    private boolean isRead = false;

    @JsonProperty("actionUrl")
    @Column(name = "actionUrl")
    private String actionUrl; // link to take action on the alert

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = String.valueOf(new Date().toInstant());

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = String.valueOf(new Date().toInstant());

    public Alert(Users user, String alertType, String title, String description, String severity,
                 String relatedEntityType, Integer relatedEntityId, String actionUrl) {
        this.user = user;
        this.alertType = alertType;
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.relatedEntityType = relatedEntityType;
        this.relatedEntityId = relatedEntityId;
        this.actionUrl = actionUrl;
    }
}
