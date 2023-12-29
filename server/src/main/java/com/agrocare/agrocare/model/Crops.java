package com.agrocare.agrocare.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "crops")
public class Crops {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @JsonProperty("userId")
    @Column(name = "userId", nullable = false)
    private int userId;

    @JsonProperty("cropName")
    @Column(name = "cropName", nullable = false)
    private String cropName;

    @JsonProperty("plantingDate")
    @Column(name = "plantingDate", nullable = false)
    private String plantingDate;

    @JsonProperty("harvestDate")
    @Column(name = "harvestDate")
    private String harvestDate;

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status;

    @CreatedDate
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = Instant.now().toString();

    @LastModifiedDate
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt;
}
