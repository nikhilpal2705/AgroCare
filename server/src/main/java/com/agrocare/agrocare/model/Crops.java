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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private Users user;

    @JsonIgnore
    @OneToMany(mappedBy = "crop", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Pests> pests = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "crop", fetch = FetchType.LAZY)
    private Inventory inventory;

    @JsonIgnore
    @OneToMany(mappedBy = "crop", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Irrigation> irrigations = new ArrayList<>();

    @JsonProperty("cropName")
    @Column(name = "cropName", nullable = false)
    private String cropName;

    @JsonProperty("cropType")
    @Column(name = "cropType", nullable = false)
    private String cropType;

    @JsonProperty("cropVariety")
    @Column(name = "cropVariety", nullable = false)
    private String cropVariety;

    @JsonProperty("fieldName")
    @Column(name = "fieldName")
    private String fieldName;

    @JsonProperty("fieldSize")
    @Column(name = "fieldSize")
    private String fieldSize;

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status = Constants.Status.ACTIVE;

    @JsonProperty("plantingDate")
    @Column(name = "plantingDate", nullable = false)
    private String plantingDate;

    @JsonProperty("harvestDate")
    @Column(name = "harvestDate")
    private String harvestDate;

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = String.valueOf(new Date().toInstant());

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = String.valueOf(new Date().toInstant());

}
