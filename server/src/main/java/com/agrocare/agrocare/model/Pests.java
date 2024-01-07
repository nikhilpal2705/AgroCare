package com.agrocare.agrocare.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import com.agrocare.agrocare.helper.Constants;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "pests")
public class Pests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @JsonProperty("userId")
    @Column(name = "userId", nullable = false)
    private int userId;

    @JsonProperty("cropId")
    @Column(name = "cropId", nullable = false)
    private int cropId;

    @JsonProperty("pestName")
    @Column(name = "pestName", nullable = false)
    private String pestName;

    @JsonProperty("pestiside")
    @Column(name = "pestiside", nullable = false)
    private String pestiside;

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status = Constants.Status.ACTIVE;

    @JsonProperty("state")
    @Column(name = "state", nullable = false)
    private int state;

    @JsonProperty("date")
    @Column(name = "date", nullable = false)
    private String date;

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = Instant.now().toString();

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = Instant.now().toString();
}
