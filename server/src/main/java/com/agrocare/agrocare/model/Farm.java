package com.agrocare.agrocare.model;

import com.agrocare.agrocare.helper.Constants;
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
@Table(name = "farms")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private Users user;

    @JsonProperty("farmName")
    @Column(name = "farmName", nullable = false)
    private String farmName;

    @JsonProperty("address")
    @Column(name = "address")
    private String address;

    @JsonProperty("gpsLatitude")
    @Column(name = "gpsLatitude")
    private Double gpsLatitude;

    @JsonProperty("gpsLongitude")
    @Column(name = "gpsLongitude")
    private Double gpsLongitude;

    @JsonProperty("totalAreaHectares")
    @Column(name = "totalAreaHectares")
    private Double totalAreaHectares;

    @JsonProperty("irrigationSource")
    @Column(name = "irrigationSource")
    private String irrigationSource; // well, canal, pond, borehole, etc.

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status = Constants.Status.ACTIVE;

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = String.valueOf(new Date().toInstant());

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = String.valueOf(new Date().toInstant());

    public Farm(Users user, String farmName, String address, Double gpsLatitude, Double gpsLongitude,
                Double totalAreaHectares, String irrigationSource) {
        this.user = user;
        this.farmName = farmName;
        this.address = address;
        this.gpsLatitude = gpsLatitude;
        this.gpsLongitude = gpsLongitude;
        this.totalAreaHectares = totalAreaHectares;
        this.irrigationSource = irrigationSource;
    }
}
